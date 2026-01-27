

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, Fingerprint } from 'lucide-react'
import Cookies from 'js-cookie'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private user-read-email user-read-private`;

  const handleLogin = () => {
    // Når der klikkes på LOG IN knappen, gå til Spotify OAuth
    window.location.href = spotifyAuthUrl;
  }

  const handleBiometricLogin = () => {
    // Simuler biometric login (går også til Spotify)
    window.location.href = spotifyAuthUrl;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Log In Header */}
        <h1 className="text-5xl font-bold text-text-secondary-light dark:text-text-primary-dark mb-16">
          Log In
        </h1>

        {/* Username Field */}
        <div className="mb-8">
          <label className="text-lg font-semibold text-text-secondary-light dark:text-text-primary-dark mb-2 block">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter you username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-text-secondary-light dark:border-text-primary-dark py-3 pr-12 text-text-secondary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:border-primary-pink transition-colors"
            />
            <User 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-primary-dark" 
              size={24} 
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-12">
          <label className="text-lg font-semibold text-text-secondary-light dark:text-text-primary-dark mb-2 block">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-text-secondary-light dark:border-text-primary-dark py-3 pr-12 text-text-secondary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:border-primary-pink transition-colors"
            />
            <Lock 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-primary-dark" 
              size={24} 
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-4 border-2 border-text-secondary-light dark:border-text-primary-dark rounded-full text-text-secondary-light dark:text-text-primary-dark font-bold text-lg hover:bg-text-secondary-light hover:text-white dark:hover:bg-text-primary-dark dark:hover:text-background-dark transition-all mb-16"
        >
          LOG IN
        </button>

        {/* Biometric Login */}
        <div className="text-center">
          <p className="text-text-secondary-light dark:text-text-primary-dark mb-6">
            One-Touch Login
          </p>
          <button
            onClick={handleBiometricLogin}
            className="w-24 h-24 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center mx-auto hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Fingerprint className="text-white" size={48} />
          </button>
        </div>
      </div>
    </div>
  );
}
