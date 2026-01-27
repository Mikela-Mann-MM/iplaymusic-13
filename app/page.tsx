//Splash Screen

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function SplashScreen() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModeQuery.matches)

    const handleThemeChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeQuery.addEventListener('change', handleThemeChange)

    // Tjek ØJEBLIKKELIGT om bruger er logget ind
    const checkAuth = () => {
      const isLoggedIn = Cookies.get('isLoggedIn')
      
      // Hvis logget ind, skip splash HELT
      if (isLoggedIn === 'true') {
        const hasCompletedOnboarding = Cookies.get('hasCompletedOnboarding')
        
        // 🔧 UDVIKLINGS FIX - Gå altid til onboarding
        router.replace('/onboarding')
        
        // 🔧 PRODUKTION - Udkommenter linjen ovenfor og brug denne:
        // router.replace(hasCompletedOnboarding === 'true' ? '/home' : '/onboarding')
        return true
      }
      return false
    }

    // Tjek med det samme
    if (checkAuth()) {
      return
    }

    // Hvis ikke logget ind, vis splash i 2.5 sek
    const timer = setTimeout(() => {
      if (!checkAuth()) {
        router.push('/login')
      }
    }, 2500)

    return () => {
      clearTimeout(timer)
      darkModeQuery.removeEventListener('change', handleThemeChange)
    }
  }, [router])

  return (
    <div 
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode ? 'bg-splash-dark' : 'bg-background-light'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-64 h-64">
          <Image
            src={isDarkMode ? '/logo/iplaymusic-outline.png' : '/logo/iplaymusic-filled.png'}
            alt="iPlayMusic Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className={`text-h1 font-heading font-bold ${
          isDarkMode ? 'text-text-primary-dark' : 'text-text-primary-light'
        }`}>
          iPlayMusic
        </h1>
      </div>
    </div>
  )
}
