

'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Music } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('hasCompletedOnboarding')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Music className="text-primary-pink" size={32} />
            <h1 className="text-2xl font-bold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
              iPlayMusic
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to iPlayMusic! 🎵
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your music streaming app is ready to go
          </p>
        </div>
      </main>
    </div>
  )
}