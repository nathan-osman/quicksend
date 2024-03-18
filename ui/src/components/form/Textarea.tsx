import { TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export default function Textarea({ className, ...props }: Props) {

  const combinedClassName = clsx(
    'block',
    'bg-background-light',
    'border',
    'border-transparent',
    'rounded',
    'w-full',
    'p-2',
    'focus:outline-none',
    'focus:border-foreground',
    className,
  )

  return (
    <textarea
      rows={10}
      {...props}
      className={combinedClassName}
    />
  )
}
