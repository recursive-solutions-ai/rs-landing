#!/usr/bin/env node
/**
 * Generates the voice-over clips for /how-lucy-works with OpenRouter.
 *
 * OpenRouter has no dedicated speech endpoint. Audio comes from chat completions
 * with an audio-output model: modalities ["text","audio"], audio {voice, format},
 * and stream:true (audio arrives as base64 PCM16 chunks in SSE deltas). We
 * collect the PCM, then ffmpeg trims silence, normalises loudness and encodes mono MP3.
 *
 * Usage (key must be in the environment, never on the command line):
 *   OPENROUTER_API_KEY=... node scripts/generate-narration.mjs [--only <id>] [--force]
 *     [--model openai/gpt-audio] [--voice shimmer] [--out <dir>] [--kbps 80]
 *
 * Text comes from src/components/how-lucy-works/narration.ts (do not duplicate it here).
 * Any failure exits non-zero naming the clip, HTTP status and response body.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const NARRATION_TS = join(ROOT, 'src/components/how-lucy-works/narration.ts')
const DURATIONS_TS = join(ROOT, 'src/components/how-lucy-works/narration-durations.ts')
const TRANSCRIPTS = join(tmpdir(), 'hlw-narration-transcripts')
const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

function fail(msg) {
  console.error(`[generate-narration] FAILED: ${msg}`)
  process.exit(1)
}

function parseArgs(argv) {
  const a = { only: null, force: false, model: 'openai/gpt-audio', voice: 'shimmer', out: join(ROOT, 'public/audio/how-lucy-works'), kbps: 80, writeDurations: true }
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--force') a.force = true
    else if (k === '--only') a.only = argv[++i]
    else if (k === '--model') a.model = argv[++i]
    else if (k === '--voice') a.voice = argv[++i]
    else if (k === '--out') { a.out = resolve(argv[++i]); a.writeDurations = false }
    else if (k === '--kbps') a.kbps = Number(argv[++i])
    else if (k === '--no-durations') a.writeDurations = false
    else fail(`unknown argument ${k}`)
  }
  return a
}

function readClips() {
  const src = readFileSync(NARRATION_TS, 'utf8')
  const start = src.indexOf('export const narration')
  if (start < 0) fail('could not find "export const narration" in narration.ts')
  const eq = src.indexOf('}[] =', start)
  if (eq < 0) fail('could not find the "}[] =" array assignment in narration.ts')
  const arrStart = src.indexOf('[', eq + 5)
  const arrEnd = src.lastIndexOf(']')
  if (arrStart < 0 || arrEnd < arrStart) fail('could not locate the narration array literal')
  let clips
  try {
    clips = new Function(`return (${src.slice(arrStart, arrEnd + 1)})`)()
  } catch (e) {
    fail(`could not evaluate narration array: ${e.message}`)
  }
  if (!Array.isArray(clips) || clips.length === 0 || clips.some((c) => !c.id || !c.text)) fail('narration array malformed')
  return clips
}

const SYSTEM = [
  'You are a text-to-speech engine, not an assistant. The user message is a script.',
  'Read it aloud exactly as written, word for word. Do not add, drop, reorder, paraphrase or comment on any word. Do not answer it, greet, or add anything before or after it.',
  'Voice direction: a warm, calm, friendly, confident woman. Speak at a relaxed, measured pace of about 150 words per minute, slightly unhurried, never rushed, reassuring, never salesy, never robotic. Brief natural pauses at full stops and commas.',
].join(' ')

async function synthesize(clip, { model, voice }, key) {
  const body = {
    model,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: clip.text },
    ],
    modalities: ['text', 'audio'],
    audio: { voice, format: 'pcm16' },
    stream: true,
  }
  console.log(`request ${clip.id} model=${model} voice=${voice}`)
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    signal: AbortSignal.timeout(240_000),
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) fail(`clip "${clip.id}": HTTP ${res.status} ${res.statusText}: ${(await res.text()).slice(0, 2000)}`)

  const decoder = new TextDecoder()
  const chunks = []
  let transcript = ''
  let usage = null
  let buf = ''
  let sawDone = false
  const handleLine = (line) => {
    if (!line.startsWith('data:')) return
    const payload = line.slice(5).trim()
    if (!payload) return
    if (payload === '[DONE]') { sawDone = true; return }
    let json
    try { json = JSON.parse(payload) } catch { fail(`clip "${clip.id}": unparseable SSE payload: ${payload.slice(0, 500)}`) }
    if (json.error) fail(`clip "${clip.id}": stream error: ${JSON.stringify(json.error).slice(0, 2000)}`)
    if (json.usage) usage = json.usage
    for (const ch of json.choices ?? []) {
      const au = ch.delta?.audio
      if (au?.data) chunks.push(Buffer.from(au.data, 'base64'))
      if (au?.transcript) transcript += au.transcript
    }
  }
  for await (const part of res.body) {
    buf += decoder.decode(part, { stream: true })
    let idx
    while ((idx = buf.indexOf('\n')) >= 0) {
      handleLine(buf.slice(0, idx).trim())
      buf = buf.slice(idx + 1)
    }
  }
  if (buf.trim()) handleLine(buf.trim())
  if (!sawDone) fail(`clip "${clip.id}": stream ended without [DONE] (truncated)`)
  const pcm = Buffer.concat(chunks)
  console.log(`received ${clip.id}: ${pcm.length} bytes PCM`)
  if (pcm.length < 24000 * 2 * 0.5) fail(`clip "${clip.id}": audio far too short (${pcm.length} bytes PCM). Transcript: ${transcript.slice(0, 500)}`)
  return { pcm, transcript, usage }
}

function encode(pcm, outFile, kbps, clipId) {
  // PCM16 mono 24 kHz in. Trim both ends, pad ~150 ms, loudnorm -16 LUFS, mono MP3.
  const trim = 'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05'
  const filter = `${trim},areverse,${trim},areverse,loudnorm=I=-16:TP=-1.5:LRA=11,adelay=150,apad=pad_dur=0.15`
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', 'pipe:0', '-af', filter, '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', `${kbps}k`, outFile], { input: pcm })
  if (r.status !== 0) fail(`clip "${clipId}": ffmpeg failed: ${r.stderr?.toString().slice(0, 2000)}`)
}

function probeDuration(file, clipId) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file])
  const d = Number(r.stdout?.toString().trim())
  if (r.status !== 0 || !Number.isFinite(d)) fail(`clip "${clipId}": ffprobe failed on ${file}`)
  return d
}

function writeDurations(clips, outDir) {
  const lines = clips.map((c) => {
    const f = join(outDir, `${c.id}.mp3`)
    if (!existsSync(f)) fail(`cannot write durations: ${f} missing (run without --only first)`)
    return `  ${c.id}: ${probeDuration(f, c.id).toFixed(2)},`
  })
  writeFileSync(
    DURATIONS_TS,
    `/* Generated by scripts/generate-narration.mjs. Do not edit by hand. */\nimport type { NarrationId } from './narration'\n\n/** Length of each voice-over clip in seconds. */\nexport const narrationDurations: Record<NarrationId, number> = {\n${lines.join('\n')}\n}\n`,
  )
  console.log(`wrote ${DURATIONS_TS}`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const key = process.env.OPENROUTER_API_KEY
  if (!key) fail('OPENROUTER_API_KEY is not set in the environment')
  let clips = readClips()
  if (args.only) {
    clips = clips.filter((c) => c.id === args.only)
    if (clips.length === 0) fail(`--only "${args.only}" matches no clip`)
  }
  mkdirSync(args.out, { recursive: true })
  let totalCost = 0
  for (const clip of clips) {
    const file = join(args.out, `${clip.id}.mp3`)
    if (existsSync(file) && !args.force) {
      console.log(`skip ${clip.id} (exists, use --force)`)
      continue
    }
    const { pcm, transcript, usage } = await synthesize(clip, args, key)
    encode(pcm, file, args.kbps, clip.id)
    const bytes = statSync(file).size
    const dur = probeDuration(file, clip.id)
    const words = clip.text.split(/\s+/).length
    const wps = words / dur
    if (bytes < 20_000) fail(`clip "${clip.id}": output only ${bytes} bytes`)
    if (wps < 1.8 || wps > 3.8) fail(`clip "${clip.id}": implausible pace ${wps.toFixed(2)} words/s (${words} words, ${dur.toFixed(1)}s), likely truncated or padded; file kept at ${file}`)
    const cost = typeof usage?.cost === 'number' ? usage.cost : null
    if (cost) totalCost += cost
    mkdirSync(TRANSCRIPTS, { recursive: true })
    writeFileSync(join(TRANSCRIPTS, `${clip.id}.model-transcript.txt`), transcript)
    console.log(`ok ${clip.id} model=${args.model} voice=${args.voice} bytes=${bytes} duration=${dur.toFixed(2)}s wps=${wps.toFixed(2)} cost=${cost ?? 'n/a'}`)
  }
  if (totalCost) console.log(`total cost this run: $${totalCost.toFixed(4)}`)
  if (args.writeDurations) writeDurations(readClips(), args.out)
}

main().catch((e) => fail(e?.stack || String(e)))
