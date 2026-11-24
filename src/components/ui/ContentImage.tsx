import Image, { type ImageProps } from 'next/image'
import { isOptimizableImage, warnUnoptimizedImage } from '@/lib/remote-images'

type ContentImageProps = Omit<ImageProps, 'src'> & { src: string }

/**
 * next/image for CMS-provided URLs. Optimized when the source is a local path
 * or matches the remote-image allow-list; otherwise rendered `unoptimized`
 * (the optimizer would answer 400 and the image would break) with a named
 * `[image] unoptimized_remote_host` warning so the gap is never silent.
 *
 * No hooks and no "use client": usable from server and client components.
 */
export function ContentImage({ src, unoptimized, ...props }: ContentImageProps) {
	const optimizable = isOptimizableImage(src)
	if (!optimizable) warnUnoptimizedImage(src)
	return <Image src={src} unoptimized={unoptimized || !optimizable} {...props} />
}
