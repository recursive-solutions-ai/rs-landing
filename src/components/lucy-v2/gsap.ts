"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register client-side only; importing this module on the server is a no-op.
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
	ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }
