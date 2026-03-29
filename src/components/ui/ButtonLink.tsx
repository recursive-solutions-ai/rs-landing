import { type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function ButtonLink({ className, href, children, ...props }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn('btn', className)}
      {...props}
    >
      {children}
    </a>
  )
}
