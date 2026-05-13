"use client"

import { VisualFrame } from "./VisualFrame"

export function CaptureVisual() {
	return (
		<VisualFrame glowFrom="rgba(0,211,187,0.3)" glowTo="rgba(96,93,255,0.15)">
			<style>{`
				@keyframes lcFillLine {
					0% { width: 0; opacity: 0; }
					5% { opacity: 1; }
					25% { width: 80%; opacity: 1; }
					30%, 100% { width: 80%; opacity: 0; }
				}
				@keyframes lcBtnPress {
					0%, 38% { transform: scale(1); box-shadow: none; }
					40% { transform: scale(0.95); box-shadow: 0 0 20px rgba(0,211,187,0.4); }
					45%, 100% { transform: scale(1); }
				}
				@keyframes lcWireOn {
					0%, 42% { opacity: 0; }
					45%, 80% { opacity: 0.5; }
					85%, 100% { opacity: 0; }
				}
				@keyframes lcFlyPacket {
					0%, 42% { opacity: 0; left: 0%; transform: translateY(-50%) scale(0.5); }
					45% { opacity: 1; transform: translateY(-50%) scale(1); }
					70% { opacity: 1; left: 100%; transform: translateY(-50%) scale(1); }
					78% { opacity: 0; left: 108%; transform: translateY(-50%) scale(0.5); }
					100% { opacity: 0; }
				}
				@keyframes lcMailIn {
					0%, 72% { opacity: 0; transform: translateY(-6px); }
					77%, 92% { opacity: 1; transform: translateY(0); border-color: rgba(0,211,187,0.35); box-shadow: 0 0 16px rgba(0,211,187,0.18); }
					96%, 100% { opacity: 1; border-color: rgba(255,255,255,0.07); box-shadow: none; }
				}
				.lc-f1::after { animation-delay: 0.5s; }
				.lc-f2::after { animation-delay: 1.2s; }
				.lc-f3::after { animation-delay: 1.9s; }
				.lc-fill-bar::after {
					content: "";
					position: absolute;
					left: 0;
					top: 50%;
					height: 1.5px;
					width: 0;
					border-radius: 9999px;
					background: #00d3bb;
					box-shadow: 0 0 6px #00d3bb;
					animation: lcFillLine 7s infinite;
					transform: translateY(-50%);
				}
				.lc-btn { animation: lcBtnPress 7s infinite; }
				.lc-wire { animation: lcWireOn 7s infinite; }
				.lc-packet { animation: lcFlyPacket 7s infinite; }
				.lc-m1 { animation: lcMailIn 7s 0s infinite; }
				.lc-m2 { animation: lcMailIn 7s 0.3s infinite; }
			`}</style>

			<div className="flex w-full items-center justify-between gap-3 px-1">
				{/* Form */}
				<div className="w-[42%] shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
					<div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-white/80">
						<span
							className="h-[6px] w-[6px] rounded-full"
							style={{ background: "#00d3bb", boxShadow: "0 0 8px #00d3bb" }}
						/>
						Free Growth Audit
					</div>
					<div className="space-y-2">
						{(["lc-f1", "lc-f2", "lc-f3"] as const).map((cls) => (
							<div
								key={cls}
								className={`lc-fill-bar ${cls} relative h-7 overflow-hidden rounded-md border border-white/10 bg-black/30`}
							/>
						))}
					</div>
					<button
						className="lc-btn mt-3 w-full rounded-lg py-2 text-[10px] font-bold"
						style={{ background: "#00d3bb", color: "#062821" }}
					>
						Request my audit →
					</button>
				</div>

				{/* Wire + packet */}
				<div className="relative flex flex-1 items-center">
					<div
						className="lc-wire absolute inset-x-0 h-px"
						style={{
							background:
								"linear-gradient(90deg, rgba(0,211,187,0.35), #00d3bb, rgba(96,93,255,0.35))",
						}}
					/>
					<div
						className="lc-packet absolute top-1/2 rounded-md border px-2 py-1 text-[8px] font-bold uppercase tracking-widest"
						style={{
							borderColor: "#00d3bb",
							background: "rgba(0,211,187,0.15)",
							color: "#00d3bb",
							boxShadow: "0 0 16px rgba(0,211,187,0.25)",
							left: "0%",
						}}
					>
						→ lead
					</div>
				</div>

				{/* Inbox */}
				<div className="w-[44%] shrink-0 space-y-2">
					<div className="flex items-center justify-between px-0.5 text-[9px] uppercase tracking-widest text-white/40">
						<span>Inbox</span>
						<span style={{ color: "#00d3bb", fontFamily: "monospace" }}>●●● live</span>
					</div>

					<div
						className="lc-m1 rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-[9px]"
						style={{ opacity: 0 }}
					>
						<div className="mb-1 flex justify-between">
							<span style={{ color: "#00d3bb" }} className="font-semibold uppercase tracking-wider">
								New lead
							</span>
							<span className="text-white/40" style={{ fontFamily: "monospace" }}>just now</span>
						</div>
						<div className="font-medium text-white/90" style={{ fontFamily: "Georgia, serif", fontSize: "10px" }}>
							Jamie Reyes — Apex Partners
						</div>
						<div className="mt-0.5 text-white/50 leading-snug">
							"Lead response time is killing us"
						</div>
					</div>

					<div
						className="lc-m2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-[9px]"
						style={{ opacity: 0 }}
					>
						<div className="mb-1 flex justify-between">
							<span style={{ color: "#00d3bb" }} className="font-semibold uppercase tracking-wider">
								Auto-reply
							</span>
							<span className="text-white/40" style={{ fontFamily: "monospace" }}>12s</span>
						</div>
						<div className="font-medium text-white/90" style={{ fontFamily: "Georgia, serif", fontSize: "10px" }}>
							We got your request
						</div>
						<div className="mt-0.5 text-white/50 leading-snug">
							Confirmation sent to submitter
						</div>
					</div>

					<div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5 text-[9px] opacity-40">
						<div className="mb-1 flex justify-between text-white/40">
							<span className="uppercase tracking-wider">Earlier</span>
							<span style={{ fontFamily: "monospace" }}>2h</span>
						</div>
						<div className="text-white/80" style={{ fontFamily: "Georgia, serif", fontSize: "10px" }}>
							Sara Holt — Holt CPA
						</div>
						<div className="mt-0.5 text-white/40 leading-snug">
							"Looking for tax prep automation…"
						</div>
					</div>
				</div>
			</div>
		</VisualFrame>
	)
}
