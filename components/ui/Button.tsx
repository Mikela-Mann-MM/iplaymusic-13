

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'play'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-200'
  
  const variants = {
    primary: 'px-8 py-4 rounded-full bg-linear-to-br from-primary-pink to-primary-orange text-white hover:shadow-xl active:scale-95',
    secondary: 'btn-secondary',
    play: 'btn-play'
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}