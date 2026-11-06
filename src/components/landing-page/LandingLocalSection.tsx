"use client"

import type { CSSProperties } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface LandingLocalSectionProps {
	heading: string
	city?: string | null
	service?: string | null
	children: React.ReactNode
}

/** Local section: copy on one side, a styled radar-style "service area" graphic on the other. */
export function LandingLocalSection({ heading, city, service, children }: LandingLocalSectionProps) {
	const { ref, inView } = useInView<HTMLElement>()

	return (
		<section
			ref={ref}
			id="local"
			className={cn("mx-auto max-w-7xl px-6 py-16", inView && "reveal-in")}
		>
			<div className="grid items-center gap-12 lg:grid-cols-2">
				<div className="reveal order-2 lg:order-1">
					<span className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary">
						<span className="inline-block size-2.5 rounded-[2px] bg-primary" />
						{city ? `Serving ${city}` : "Local"}
					</span>
					<h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-base-content md:text-4xl">
						{heading}
					</h2>
					<div className="mt-6 space-y-4 text-lg leading-relaxed text-base-content/70">{children}</div>
				</div>

				<div
					className="reveal order-1 lg:order-2"
					style={{ "--reveal-delay": "0.15s" } as CSSProperties}
				>
					<div
						data-theme="rs-dark"
						className="blueprint-grid relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] border border-base-content/20 bg-base-100"
						role="img"
						aria-label={city ? `Service area: ${city}` : "Service area"}
					>
						{/* Concentric service-area rings */}
						{[88, 64, 40].map((size, i) => (
							<span
								key={size}
								aria-hidden="true"
								className="absolute rounded-full border border-primary/30"
								style={{ width: `${size}%`, height: `${size}%`, opacity: 1 - i * 0.15 }}
							/>
						))}
						{/* Crosshair */}
						<span aria-hidden="true" className="absolute inset-x-6 top-1/2 h-px bg-base-content/15" />
						<span aria-hidden="true" className="absolute inset-y-6 left-1/2 w-px bg-base-content/15" />
						{/* Pulse + pin */}
						<span aria-hidden="true" className="absolute size-24 animate-ping rounded-full bg-primary/20 [animation-duration:3s]" />
						<span aria-hidden="true" className="absolute size-5 rounded-full bg-primary ring-4 ring-primary/30" />
						{/* Satellite dots */}
						<span aria-hidden="true" className="absolute left-[22%] top-[28%] size-2 rounded-full bg-accent/80" />
						<span aria-hidden="true" className="absolute right-[18%] top-[38%] size-2 rounded-full bg-accent/60" />
						<span aria-hidden="true" className="absolute bottom-[24%] left-[34%] size-2 rounded-full bg-accent/70" />
						<span aria-hidden="true" className="absolute bottom-[30%] right-[26%] size-2 rounded-full bg-accent/50" />
						{/* City badge */}
						<div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 px-6 text-center">
							{service && (
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/50">
									{service}
								</span>
							)}
							{city && (
								<span className="rounded-md bg-primary px-3 py-1.5 font-display text-lg font-bold text-primary-content">
									{city}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
