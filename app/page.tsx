

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white dark:bg-[#2D1B3D] flex items-center justify-center">
      <div className="text-center animate-pulse">
        <h1 className="text-6xl font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
          iPlayMusic
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Where music comes alive
        </p>
      </div>
    </div>
  )
}