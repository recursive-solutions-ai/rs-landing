import { cn } from "@/lib/utils"

interface ThemeLogoProps {
	height?: number
	className?: string
}

export function ThemeLogo({ height = 36, className }: ThemeLogoProps) {
	return (
		<span className={cn("inline-flex items-center", className)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/logo-horizontal-no-bg-with-text-dark.png"
				alt="Recursive Solutions"
				height={height}
				className="dark:hidden h-auto"
				style={{ height, width: "auto" }}
			/>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/logo-horizontal-no-bg-with-text-light.png"
				alt="Recursive Solutions"
				height={height}
				className="hidden dark:block h-auto"
				style={{ height, width: "auto" }}
			/>
		</span>
	)
}
