/**
 * Landing page — the public home page at `/`.
 *
 * Uses the (public) route group layout so it gets the public navbar/footer.
 * Includes Hero, Help Not Replace, Pillars of Service, and Contact CTA sections.
 */

import { ButtonLink } from "@/components/ui"
import { CloserLookSection } from "@/components/landing/CloserLookSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Modern Systems for Growing Businesses",
	description:
		"We find the repetitive 'busy work' slowing you down and replace it with smart, integrated systems that give your team their time back.",
}

export default async function LandingPage() {
	return (
		<div className="selection:bg-blue-100">
			{/* ── Hero Section ─────────────────────────────────────────────── */}
			<header className="px-6 pt-20 pb-28 max-w-5xl mx-auto text-center">
				<div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-8 uppercase tracking-widest">
					The Bridge to Modern Efficiency
				</div>
				<h1 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tight leading-[1.05] text-base-content">
					Modern Systems for <br />
					<span className="gradient-text">Growing Businesses.</span>
				</h1>
				<p className="text-lg md:text-2xl text-base-content/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
					We find the repetitive &ldquo;busy work&rdquo; slowing you down and
					replace it with smart, integrated systems that give your team their
					time back.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<ButtonLink
						href="#contact"
						className="btn btn-primary px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 border-none h-auto"
					>
						Book Your Free Audit
					</ButtonLink>
					<ButtonLink
						href="#services"
						variant="ghost"
						className="bg-base-100 border border-base-300 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-base-200 transition hover:-translate-y-1 h-auto"
					>
						Explore Solutions
					</ButtonLink>
				</div>
			</header>

			{/* ── Help Not Replace Section ─────────────────────────────────── */}
			<section
				id="about"
				className="py-24 bg-neutral text-neutral-content rounded-[3rem] mx-4 overflow-hidden relative"
			>
				<div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<path
							d="M0 100 C 20 0, 50 0, 100 100"
							stroke="currentColor"
							strokeWidth="0.5"
							fill="none"
						/>
						<path
							d="M0 80 C 20 -20, 50 -20, 100 80"
							stroke="currentColor"
							strokeWidth="0.5"
							fill="none"
						/>
					</svg>
				</div>

				<div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center relative z-10">
					<div>
						<h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
							Your Team, <br />
							<span className="text-accent underline decoration-accent/30 underline-offset-8">Empowered.</span> Not Replaced.
						</h2>
						<p className="text-neutral-content/70 text-lg md:text-xl leading-relaxed mb-10">
							We don&apos;t believe in replacing people with machines. We
							believe in using technology to{" "}
							<strong className="text-neutral-content">free your team from the mundane.</strong>
						</p>
						<div className="space-y-6">
							<div className="flex items-start space-x-5">
								<div className="bg-accent/20 text-accent rounded-lg p-2 mt-1">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>
								<div>
									<h4 className="font-bold text-xl">Eliminate 10+ Hours/Week</h4>
									<p className="text-neutral-content/60">
										We remove the manual admin work so your people can focus on
										high-value strategy.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-5">
								<div className="bg-accent/20 text-accent rounded-lg p-2 mt-1">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>
								<div>
									<h4 className="font-bold text-xl">Zero Lead Leakage</h4>
									<p className="text-neutral-content/60">
										Automated systems ensure every customer gets an instant
										response, every time.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white/5 backdrop-blur-lg p-10 md:p-16 rounded-[2rem] border border-white/10 shadow-2xl">
						<p className="text-2xl md:text-3xl font-light italic leading-snug mb-8 text-neutral-content">
							&ldquo;We didn&apos;t know how much we were missing until our
							systems started talking to each other. Recursive gave us our
							Saturdays back.&rdquo;
						</p>
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-tr from-primary to-accent rounded-full"></div>
							<div>
								<p className="font-bold text-neutral-content">David Marshall</p>
								<p className="text-sm text-neutral-content/50">
									Director, Marshall Real Estate
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Closer Look Section ──────────────────────────────────────── */}
			<CloserLookSection />

			{/* ── Pillars of Service ───────────────────────────────────────── */}
			<section id="services" className="py-32 max-w-7xl mx-auto px-6">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-base-content">
						Three Pillars of Support
					</h2>
					<p className="text-base-content/70 text-xl max-w-2xl mx-auto">
						We implement automated workflows that learn your business and
						improve over time.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-12">
					{/* Support */}
					<div className="group p-10 rounded-[2.5rem] bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition duration-500">
						<div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition duration-500">
							💬
						</div>
						<h3 className="text-2xl font-bold mb-5 text-base-content">
							Seamless Support
						</h3>
						<p className="text-base-content/70 leading-relaxed text-lg">
							Never miss a lead. We integrate your sales and support so every
							customer gets a response, even when you&apos;re busy.
						</p>
					</div>

					{/* Scheduling */}
					<div className="group p-10 rounded-[2.5rem] bg-base-100 border border-base-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition duration-500">
						<div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition duration-500">
							📅
						</div>
						<h3 className="text-2xl font-bold mb-5 text-base-content">
							Master Your Time
						</h3>
						<p className="text-base-content/70 leading-relaxed text-lg">
							Automated booking and team syncing that eliminates the
							back-and-forth. Professional scheduling that works while you
							sleep.
						</p>
					</div>

					{/* Growth */}
					<div className="group p-10 rounded-[2.5rem] bg-neutral text-neutral-content shadow-2xl transition duration-500">
						<div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition duration-500">
							🚀
						</div>
						<h3 className="text-2xl font-bold mb-5 text-accent">
							Smart Presence
						</h3>
						<p className="text-neutral-content/70 leading-relaxed text-lg mb-6">
							Modern Squarespace builds with local SEO and GEO-optimization that
							puts your business on top of search results.
						</p>
						<ButtonLink
							href="#contact"
							variant="ghost"
							className="inline-flex items-center text-accent font-bold hover:text-accent/80 transition group/link p-0 bg-transparent border-none min-h-0 h-auto"
						>
							Explore Strategy
							<svg
								className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								></path>
							</svg>
						</ButtonLink>
					</div>
				</div>
			</section>

			{/* ── Contact CTA Section ──────────────────────────────────────── */}
			<section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
				<div className="bg-primary rounded-[3rem] p-12 md:p-20 text-primary-content shadow-2xl">
					<h2 className="text-3xl md:text-5xl font-bold mb-6">
						Ready to find your efficiency gaps?
					</h2>
					<p className="text-primary-content/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
						Book a 15-minute consultation to see exactly which manual tasks we
						can automate for you this week.
					</p>
					<ButtonLink
						href="#contact"
						className="btn btn-neutral text-neutral-content px-10 py-5 rounded-2xl text-xl font-bold hover:bg-neutral/80 transition shadow-xl border-none h-auto"
					>
						Schedule Your Audit
					</ButtonLink>
				</div>
			</section>
		</div>
	)
}
