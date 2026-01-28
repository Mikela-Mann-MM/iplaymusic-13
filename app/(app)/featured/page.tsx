'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockPlaylists } from '@/lib/mockData'
import type { Playlist } from '@/lib/mockData'
import { getPlaylistImage } from '@/lib/spotify-helpers'
import BottomNav from '@/components/navigation/BottomNav'

export default function FeaturedPage() {
  const router = useRouter()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setPlaylists(mockPlaylists.slice(0, 6))
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA
        const response = await fetch('/api/spotify/featured')
        if (!response.ok) {
          throw new Error('Failed to fetch featured')
        }
        const data = await response.json()
        setPlaylists(data.playlists?.items || [])
      } catch (err) {
        console.error('Error fetching featured:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading featured playlists...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-primary-pink text-white rounded-full font-semibold hover:bg-primary-pink/90 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  // Gradient options for fallback
  const gradients = [
    'from-purple-600 to-blue-600',
    'from-red-600 to-orange-600',
    'from-pink-600 to-purple-600',
    'from-green-600 to-teal-600',
    'from-blue-600 to-indigo-600',
    'from-orange-600 to-red-600'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-800 dark:text-white">
          FEATURED
        </h2>
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          Featured
        </h1>

        <div className="space-y-6">
          {playlists.map((playlist, index) => {
            const gradient = gradients[index % gradients.length]
            const playlistUrl = `/playlists/${playlist.id}`
            
            return (
              <div
                key={playlist.id}
                className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                onClick={() => router.push(playlistUrl)}
              >
                {/* Background Image or Gradient */}
                {getPlaylistImage(playlist) ? (
                  <>
                    <img 
                      src={getPlaylistImage(playlist)} 
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </>
                ) : (
                  <div className={`w-full h-full bg-linear-to-br ${gradient}`} />
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play Button */}
                <button className="absolute top-6 right-6 w-14 h-14 rounded-full bg-primary-pink flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                  <Play size={24} fill="white" className="text-white ml-1" />
                </button>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-5xl font-bold text-white mb-2 leading-tight">
                    {playlist.name}
                  </h2>
                  <p className="text-white text-xl opacity-90">
                    {playlist.description || `${playlist.tracks.total} songs`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}