

'use client'

import { Home, Mic2, Radio, Moon, Sun, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { icon: Home, href: '/player', label: 'Home' },
    { icon: Mic2, href: '/artists', label: 'Artists' },
    { icon: Radio, href: '/feed', label: 'Feed', isCenter: true },
    { icon: darkMode ? Sun : Moon, onClick: toggleDarkMode, label: 'Theme' },
    { icon: Settings, href: '/categories', label: 'Settings' }
  ]

  // Don't show on splash, login, onboarding
  if (['/login', '/onboarding', '/'].includes(pathname)) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around py-4 px-6">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          if (item.isCenter) {
            return (
              <button
                key={index}
                onClick={() => item.href && router.push(item.href)}
                className="w-16 h-16 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="text-white" size={28} />
              </button>
            )
          }

          return (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) item.onClick()
                else if (item.href) router.push(item.href)
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive 
                  ? 'text-primary-pink' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}