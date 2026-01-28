

'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockTracks } from '@/lib/mockData'
import type { Track } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

export default function TrendsPage() {
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrends() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setTracks(mockTracks.slice(0, 8))
        // setLoading(false)
        // return
        
        // ✅ REAL SPOTIFY DATA
        const response = await fetch('/api/spotify/trends')
        if (!response.ok) {
          throw new Error('Failed to fetch trends')
        }
        const data = await response.json()
        setTracks(data.items || [])
      } catch (err) {
        console.error('Error fetching trends:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrends()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading trends...</p>
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

  // Split tracks - first 2 are featured, rest are grid items
  const featuredTracks = tracks.slice(0, 2)
  const gridTracks = tracks.slice(2, 6)

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <div className="w-10" />
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          Latest Trends
        </h1>

        {/* Featured Trending Tracks */}
        {featuredTracks.map((track, index) => (
          <div key={track.id} className="mb-8">
            <div 
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => router.push('/player')}
            >
              {/* Background image if available */}
              {track.album?.images?.[0]?.url ? (
                <img 
                  src={track.album.images[0].url} 
                  alt={track.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-linear-to-br ${
                  index === 0 ? 'from-green-600 to-blue-600' : 'from-purple-600 to-pink-600'
                }`} />
              )}
              
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center shadow-xl">
                <Play size={32} fill="currentColor" className="text-white" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-5xl font-bold text-white mb-2">{track.name}</h2>
                <p className="text-white text-lg mb-3">{track.artists[0].name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-white text-sm">
                    {/* Use optional chaining and fallback */}
                    <strong>{((track as any).popularity || 50) * 100}</strong> are talking about this
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Grid of Other Trending Tracks */}
        {gridTracks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Trending Now</h2>
            <div className="grid grid-cols-2 gap-4">
              {gridTracks.map((track) => (
                <div
                  key={track.id}
                  className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => router.push('/player')}
                >
                  {track.album?.images?.[0]?.url ? (
                    <img 
                      src={track.album.images[0].url} 
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-600 to-pink-600" />
                  )}
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold truncate">
                      {track.name}
                    </h3>
                    <p className="text-white/80 text-sm truncate">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}