import { type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ className, label, id, ...props }: TextareaProps) {
  if (label) {
    return (
      <div className="form-control w-full">
        <label className="label" htmlFor={id}>
          <span className="label-text">{label}</span>
        </label>
        <textarea
          id={id}
          className={cn('textarea textarea-bordered w-full', className)}
          {...props}
        />
      </div>
    )
  }

  return (
    <textarea
      id={id}
      className={cn('textarea textarea-bordered w-full', className)}
      {...props}
    />
  )
}
