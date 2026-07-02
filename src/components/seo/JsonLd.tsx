/**
 * Renders one or more JSON-LD objects as <script type="application/ld+json">.
 * Server component — safe to use in layouts and server pages.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
	const items = Array.isArray(data) ? data : [data]
	return (
		<>
			{items.map((item, i) => (
				<script
					key={i}
					type="application/ld+json"
					// Escape < so data (e.g. blog post titles) can never close the script tag.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
				/>
			))}
		</>
	)
}
