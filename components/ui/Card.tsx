

import { ReactNode } from 'react'

interface CardProps {
  variant?: 'default' | 'album' | 'gradient'
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ 
  variant = 'default',
  children,
  className = '',
  onClick
}: CardProps) {
  const baseStyles = 'rounded-lg transition-all'
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-card p-4',
    album: 'cursor-pointer hover:scale-105',
    gradient: 'bg-linear-to-br from-primary-pink to-primary-orange p-4 text-white'
  }
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}