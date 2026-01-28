// app/auth-success/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const expiresIn = searchParams.get('expires_in')

    if (accessToken && refreshToken) {
      // Store in localStorage
      localStorage.setItem('spotify_access_token', accessToken)
      localStorage.setItem('spotify_refresh_token', refreshToken)
      localStorage.setItem('spotify_token_expiry', 
        (Date.now() + parseInt(expiresIn || '3600') * 1000).toString()
      )
      localStorage.setItem('isLoggedIn', 'true')

      console.log('✅ Tokens saved to localStorage')
      
      // Redirect to home
      setTimeout(() => {
        router.push('/home')
      }, 500)
    } else {
      console.error('❌ No tokens received')
      router.push('/login?error=no_tokens')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Authentication Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Saving your session...
        </p>
      </div>
    </div>
  )
}