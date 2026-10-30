export function LucyV2Video() {
	return (
		<section aria-labelledby="lv2-video-h" className="relative px-5 py-28 sm:px-8 md:py-40">
			<div className="mx-auto max-w-4xl text-center">
				<p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
					<span aria-hidden="true" className="size-1.5 rounded-full bg-sky-400" />
					See Lucy in action
				</p>
				<h2 id="lv2-video-h" className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
					Two minutes on how Lucy runs your growth
				</h2>
			</div>
			<div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(56,189,248,0.25)]">
				<iframe
					className="block aspect-video h-auto w-full border-0"
					src="https://www.youtube-nocookie.com/embed/htLKHvrdAAo"
					title="Lucy video"
					width="1280"
					height="720"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</div>
		</section>
	)
}
