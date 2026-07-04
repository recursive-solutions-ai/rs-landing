"use client"

// Branded error boundary for the locale segment — a render/data failure
// shows a recoverable message instead of a blank screen.
export default function LocaleError({
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
			<span className="text-sm font-semibold uppercase tracking-widest text-primary">
				Something went wrong
			</span>
			<h1 className="font-display mt-4 text-3xl font-bold text-base-content sm:text-4xl">
				We hit an unexpected error.
			</h1>
			<p className="mt-4 max-w-md text-lg text-base-content/60">
				Try again — if it keeps happening, we&rsquo;d appreciate hearing about
				it through the contact form.
			</p>
			<button type="button" onClick={reset} className="btn btn-primary mt-8">
				Try again
			</button>
		</div>
	)
}
