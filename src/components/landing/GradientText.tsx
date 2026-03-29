"use client"

interface GradientTextProps {
	children: string
	className?: string
	glow?: boolean
}

export function GradientText({
	children,
	className = "",
	glow = true,
}: GradientTextProps) {
	return (
		<span className={`relative inline-block ${className}`}>
			<span className="gradient-animated-text">{children}</span>
			{glow && (
				<span
					className="absolute inset-0 gradient-animated-text blur-xl opacity-40 pointer-events-none"
					aria-hidden
				>
					{children}
				</span>
			)}
		</span>
	)
}
