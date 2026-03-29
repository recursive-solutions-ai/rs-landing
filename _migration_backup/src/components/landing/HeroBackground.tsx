"use client"

import { Suspense, useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import * as THREE from "three"

/* ── Types ──────────────────────────────────────────────────────────── */

interface OrbConfig {
	position: [number, number, number]
	radius: number
	color: string
	emissive?: string
	emissiveIntensity?: number
	distort: number
	speed: number
	floatSpeed: number
	floatIntensity: number
	roughness: number
}

/* ── Orb Configs ────────────────────────────────────────────────────── */

const DESKTOP_ORBS: OrbConfig[] = [
	{
		position: [-3.2, 1.4, -1],
		radius: 2.0,
		color: "#6419E6",
		distort: 0.4,
		speed: 2.5,
		floatSpeed: 1.5,
		floatIntensity: 0.8,
		roughness: 0.2,
	},
	{
		position: [3.0, -0.8, -0.5],
		radius: 1.5,
		color: "#1DB88E",
		distort: 0.35,
		speed: 3.0,
		floatSpeed: 2.0,
		floatIntensity: 0.6,
		roughness: 0.2,
	},
	{
		position: [0.5, 2.5, -2],
		radius: 1.2,
		color: "#8B5CF6",
		emissive: "#8B5CF6",
		emissiveIntensity: 0.6,
		distort: 0.45,
		speed: 3.5,
		floatSpeed: 1.2,
		floatIntensity: 1.0,
		roughness: 0.15,
	},
	{
		position: [-1.5, -2.0, -1.5],
		radius: 0.9,
		color: "#2D1B69",
		distort: 0.3,
		speed: 2.0,
		floatSpeed: 1.8,
		floatIntensity: 0.5,
		roughness: 0.4,
	},
	{
		position: [2.2, 1.8, -2.5],
		radius: 0.8,
		color: "#134E4A",
		distort: 0.3,
		speed: 2.2,
		floatSpeed: 2.5,
		floatIntensity: 0.4,
		roughness: 0.35,
	},
]

const MOBILE_ORBS: OrbConfig[] = [
	{
		position: [-2.0, 1.0, -1],
		radius: 1.8,
		color: "#6419E6",
		distort: 0.25,
		speed: 2.0,
		floatSpeed: 1.2,
		floatIntensity: 0.6,
		roughness: 0.2,
	},
	{
		position: [2.0, -0.5, -0.5],
		radius: 1.3,
		color: "#1DB88E",
		distort: 0.2,
		speed: 2.5,
		floatSpeed: 1.5,
		floatIntensity: 0.5,
		roughness: 0.2,
	},
]

/* ── Floating Orb ───────────────────────────────────────────────────── */

function FloatingOrb({ config }: { config: OrbConfig }) {
	const meshRef = useRef<THREE.Mesh>(null)
	const { pointer } = useThree()
	const basePosition = useRef(new THREE.Vector3(...config.position))

	useFrame(() => {
		if (!meshRef.current) return

		const targetX = basePosition.current.x + pointer.x * 0.3
		const targetY = basePosition.current.y + pointer.y * 0.3

		meshRef.current.position.x = THREE.MathUtils.lerp(
			meshRef.current.position.x,
			targetX,
			0.02
		)
		meshRef.current.position.y = THREE.MathUtils.lerp(
			meshRef.current.position.y,
			targetY,
			0.02
		)
	})

	return (
		<Float
			speed={config.floatSpeed}
			rotationIntensity={0.4}
			floatIntensity={config.floatIntensity}
		>
			<mesh ref={meshRef} position={config.position}>
				<sphereGeometry args={[config.radius, 64, 64]} />
				<MeshDistortMaterial
					color={config.color}
					emissive={config.emissive ?? config.color}
					emissiveIntensity={config.emissiveIntensity ?? 0.1}
					distort={config.distort}
					speed={config.speed}
					roughness={config.roughness}
					metalness={0.1}
					transparent
					opacity={0.85}
				/>
			</mesh>
		</Float>
	)
}

/* ── Particle Field ─────────────────────────────────────────────────── */

const PARTICLE_COUNT = 300

function ParticleField() {
	const pointsRef = useRef<THREE.Points>(null)

	const { positions, offsets } = useMemo(() => {
		const pos = new Float32Array(PARTICLE_COUNT * 3)
		const off = new Float32Array(PARTICLE_COUNT)

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			pos[i * 3] = (Math.random() - 0.5) * 16
			pos[i * 3 + 1] = (Math.random() - 0.5) * 16
			pos[i * 3 + 2] = (Math.random() - 0.5) * 16
			off[i] = Math.random() * Math.PI * 2
		}

		return { positions: pos, offsets: off }
	}, [])

	const baseY = useMemo(() => {
		const arr = new Float32Array(PARTICLE_COUNT)
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			arr[i] = positions[i * 3 + 1]
		}
		return arr
	}, [positions])

	useFrame(({ clock }) => {
		if (!pointsRef.current) return
		const geo = pointsRef.current.geometry
		const posAttr = geo.attributes.position as THREE.BufferAttribute

		const time = clock.getElapsedTime()

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			posAttr.array[i * 3 + 1] =
				baseY[i] + Math.sin(time * 0.5 + offsets[i]) * 0.3
		}

		posAttr.needsUpdate = true
	})

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[positions, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				color="#d4d4d4"
				size={0.015}
				transparent
				opacity={0.3}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	)
}

/* ── Scene ──────────────────────────────────────────────────────────── */

function Scene({ isMobile }: { isMobile: boolean }) {
	const orbs = isMobile ? MOBILE_ORBS : DESKTOP_ORBS

	return (
		<>
			<PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} intensity={1} />

			{orbs.map((config, i) => (
				<FloatingOrb key={i} config={config} />
			))}

			{!isMobile && <ParticleField />}
		</>
	)
}

/* ── Fallback ───────────────────────────────────────────────────────── */

function CanvasFallback() {
	return (
		<div
			className="absolute inset-0 bg-base-200"
			aria-hidden="true"
		/>
	)
}

/* ── Main Component ─────────────────────────────────────────────────── */

export function HeroBackground() {
	const reducedMotion = useReducedMotion()
	const [isMobile, setIsMobile] = useState(false)
	const [isVisible, setIsVisible] = useState(true)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsMobile(window.innerWidth < 768)

		const handleResize = () => setIsMobile(window.innerWidth < 768)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	// Pause rendering when hero is scrolled out of view
	useEffect(() => {
		if (!containerRef.current) return

		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0 }
		)
		observer.observe(containerRef.current)
		return () => observer.disconnect()
	}, [])

	const frameloop = reducedMotion || !isVisible ? "never" : "always"

	return (
		<div ref={containerRef} className="absolute inset-0 z-0 blur-xl" aria-hidden="true">
			<Suspense fallback={<CanvasFallback />}>
				<Canvas
					dpr={[1, 1.5]}
					frameloop={frameloop}
					gl={{
						antialias: !isMobile,
						alpha: true,
						powerPreference: "high-performance",
					}}
					onCreated={({ gl }) => {
						gl.setClearColor(0x000000, 0)
					}}
				>
					<Scene isMobile={isMobile} />
				</Canvas>
			</Suspense>
		</div>
	)
}
