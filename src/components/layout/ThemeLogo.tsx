import Image from "next/image"
import { cn } from "@/lib/utils"

// Intrinsic logo aspect ratio (539×103).
const LOGO_RATIO = 539 / 103

interface ThemeLogoProps {
	height?: number
	className?: string
}

export function ThemeLogo({ height = 36, className }: ThemeLogoProps) {
	const width = Math.round(height * LOGO_RATIO)

	return (
		<span className={cn("inline-flex items-center", className)}>
			<Image
				src="/logo-horizontal-no-bg-with-text-dark.png"
				alt="Recursive Solutions"
				width={width}
				height={height}
				priority
				className="dark:hidden"
				style={{ height, width: "auto" }}
			/>
			<Image
				src="/logo-horizontal-no-bg-with-text-light.png"
				alt="Recursive Solutions"
				width={width}
				height={height}
				priority
				className="hidden dark:block"
				style={{ height, width: "auto" }}
			/>
		</span>
	)
}
