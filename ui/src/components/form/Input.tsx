import { clsx } from 'clsx'
import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {

  const className = clsx(
    'bg-background-light',
    'border',
    'border-transparent',
    'rounded',
    'w-full',
    'p-2',
    'focus:outline-none',
    'focus:border-foreground',
  )

  return (
    <input
      {...props}
      className={className}
    />
  )
}
