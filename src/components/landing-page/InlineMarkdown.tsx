import { Fragment, type ReactNode } from "react"

const TOKEN = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

function safeHref(href: string): string | null {
	return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : null
}

/** Minimal inline markdown (bold, italic, code, links) as React nodes. No raw HTML is ever emitted. */
export function InlineMarkdown({ text }: { text: string }): ReactNode {
	const parts = text.split(TOKEN).filter((p) => p !== "")
	return (
		<>
			{parts.map((part, i) => {
				if (/^\*\*[^*]+\*\*$/.test(part) || /^__[^_]+__$/.test(part)) {
					return <strong key={i} className="font-semibold text-base-content">{part.slice(2, -2)}</strong>
				}
				if (/^\*[^*\s][^*]*\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>
				if (/^`[^`]+`$/.test(part)) {
					return <code key={i} className="rounded bg-base-200 px-1 py-0.5 text-sm">{part.slice(1, -1)}</code>
				}
				const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
				if (link) {
					const href = safeHref(link[2])
					if (!href) return <Fragment key={i}>{link[1]}</Fragment>
					return (
						<a key={i} href={href} className="font-semibold text-primary underline-offset-4 hover:underline">
							{link[1]}
						</a>
					)
				}
				return <Fragment key={i}>{part}</Fragment>
			})}
		</>
	)
}
