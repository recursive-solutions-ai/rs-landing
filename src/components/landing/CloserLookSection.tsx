"use client"

import { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const CLOSER_LOOK_ITEMS = [
	{
		id: "support",
		title: "Customer Support 24/7",
		description: "Never miss a lead. We integrate your sales and support so every customer gets a response, even when you're busy.",
		image: "/images/landing/look/support.png"
	},
	{
		id: "sales",
		title: "Sale onboarding flows",
		description: "Automate your sales process from lead capture to deal closure. Our smart systems handle the follow-ups, so your team can focus on building relationships.",
		image: "/images/landing/look/sales.png"
	},
	{
		id: "seo",
		title: "Online presence (SEO/GEO)",
		description: "Get found by your customers. We optimize your online presence with local SEO and geo-targeting to put your business at the top of search results.",
		image: "/images/landing/look/seo.png"
	},
	{
		id: "localization",
		title: "Localization",
		description: "Translate your content to more languages and capture more leads. Our platform makes it easy to manage multilingual content and reach a global audience.",
		image: "/images/landing/look/localization.png"
	},
	{
		id: "documents",
		title: "Document creation automation",
		description: "Automate the creation of proposals, contracts, and other documents. Our system pulls data from your CRM to generate pixel-perfect documents in seconds.",
		image: "/images/landing/look/documents.png"
	}
]

export const CloserLookSection = () => {
	const [activeId, setActiveId] = useState(CLOSER_LOOK_ITEMS[0].id)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" })
		}
	}

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" })
		}
	}

	return (
		<div className="py-24 bg-base-100 border-b border-base-200 overflow-hidden">
			<div className="container mx-auto px-6">
				<h2 className="text-4xl md:text-5xl font-black text-base-content mb-12 text-center md:text-left">
					Take a closer look.
				</h2>

				<div className="bg-base-200 relative flex flex-col md:flex-row rounded-[2rem] overflow-hidden border border-base-300 min-h-[500px]">

					{/* Right side: Image display (Fills 3/4 of space, no padding) */}
					<div className="w-full md:w-3/4 h-[300px] md:h-full md:absolute right-0 top-0 bottom-0 z-0 order-first md:order-last">
						{CLOSER_LOOK_ITEMS.map((item) => (
							<div
								key={item.id}
								className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeId === item.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
							>
								<div className="w-full h-full bg-base-300">
									<img
										src={item.image}
										alt={item.title}
										className="w-full h-full object-cover object-top md:object-left-top"
										onError={(e) => {
											e.currentTarget.src = "/images/landing/desktop.jpg"
										}}
									/>
								</div>
							</div>
						))}
					</div>

					{/* Left side: Accordion */}
					<div className="w-full md:w-1/3 relative z-10 py-6 md:p-12 flex flex-col justify-center bg-transparent mt-2 md:mt-0">
						<div className="relative w-full">
							{/* Mobile Navigation Arrows */}
							<button
								onClick={scrollLeft}
								className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center bg-base-100/90 rounded-full shadow border border-base-300 outline-none focus:outline-none focus:ring-0"
							>
								<FontAwesomeIcon icon={faChevronLeft} className="text-base-content/70 text-sm" />
							</button>

							<div
								ref={scrollContainerRef}
								className="flex md:flex-col overflow-x-auto md:overflow-visible gap-3 w-full px-12 py-4 md:p-0 snap-x snap-mandatory scroll-smooth barra-invisible"
							>
								{CLOSER_LOOK_ITEMS.map((item) => {
									const isActive = activeId === item.id

									return (
										<button
											key={item.id}
											onClick={() => setActiveId(item.id)}
											className={`snap-center shrink-0 text-left transition-all duration-300 relative outline-none focus:outline-none focus:ring-0 rounded-3xl ${isActive ? "w-[70vw] md:w-[140%] max-w-[320px] md:max-w-none bg-base-100/50 backdrop-blur-2xl shadow-xl border border-base-content/10 p-6 z-20" : "w-auto bg-base-100/10 backdrop-blur-md shadow-sm border border-base-content/5 hover:bg-base-100/20 py-3 px-5 z-10"}`}
										>
											{!isActive && (
												<div className="flex items-center gap-3">
													<div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full border border-base-content/10 text-base-content/50 bg-base-100/80">
														<FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
													</div>
													<span className="font-semibold text-base-content/80 text-sm whitespace-nowrap">
														{item.title}
													</span>
												</div>
											)}

											{isActive && (
												<div className="animate-in fade-in duration-500 opacity-100 flex flex-col">
													<p className="text-base-content/80 text-md leading-relaxed whitespace-normal m-0 w-full">
														<span className="font-bold text-base-content">{item.title}.</span> {item.description}
													</p>
												</div>
											)}
										</button>
									)
								})}
							</div>

							<button
								onClick={scrollRight}
								className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center bg-base-100/90 rounded-full shadow border border-base-300 outline-none focus:outline-none focus:ring-0"
							>
								<FontAwesomeIcon icon={faChevronRight} className="text-base-content/70 text-sm" />
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
