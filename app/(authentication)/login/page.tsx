/* 
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;


export default function LoginPage() {
  return (  
    <a href={`
        https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`}>
        Log in with Spotify
    </a>
  );
}    */

  'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, Fingerprint } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Simulate login
    router.push('/onboarding')
  }

  const handleBiometric = () => {
    // Simulate biometric login
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-primary-pink dark:to-primary-orange flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-2">
            iPlayMusic
          </h1>
          <p className="text-gray-600 dark:text-white/80">
            Sign in to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-0 top-3 text-gray-400 dark:text-white/60" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-underline pl-8"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-0 top-3 text-gray-400 dark:text-white/60" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-underline pl-8"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 border-2 border-gray-900 dark:border-white rounded-full text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
          >
            LOG IN
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 dark:bg-transparent text-gray-500 dark:text-white/60">
                or
              </span>
            </div>
          </div>

          {/* Biometric Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-white/80 mb-4">
              One-Touch Login
            </p>
            <button
              onClick={handleBiometric}
              className="w-20 h-20 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center mx-auto hover:shadow-xl transition-shadow"
            >
              <Fingerprint className="text-white" size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}