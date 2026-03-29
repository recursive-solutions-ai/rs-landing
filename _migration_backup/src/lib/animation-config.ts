"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins once
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

/* ── Easings ───────────────────────────────────────────────────────── */
export const EASE_REVEAL = "power3.out" // y/opacity entrances
export const EASE_TEXT = "expo.out" // clip-path text reveals

/* ── Entrance distances ────────────────────────────────────────────── */
export const DISTANCE_SM = 20 // tags, small elements
export const DISTANCE_MD = 40 // cards, blocks
export const DISTANCE_LG = 60 // hero-scale elements

/* ── Durations ─────────────────────────────────────────────────────── */
export const DURATION_FAST = 0.6 // tags, buttons
export const DURATION_NORMAL = 0.8 // most reveals
export const DURATION_SLOW = 1.0 // hero heading

/* ── ScrollTrigger start positions ─────────────────────────────────── */
export const START_HEADING = "top 85%"
export const START_CONTENT = "top 80%"

export { gsap, ScrollTrigger }
export { useGSAP } from "@gsap/react"
