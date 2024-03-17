import { clsx } from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}

export default function Button({ primary, ...props }: PropsWithChildren<Props>) {

  const className = clsx(
    primary ?
      'bg-primary' :
      'bg-background-light',
    'border',
    'border-transparent',
    'rounded',
    'px-4',
    'py-2',
    'focus:outline-none',
    'focus:border-foreground',
  )

  return (
    <button
      {...props}
      className={className}
    >
      {props.children}
    </button>
  )
}
