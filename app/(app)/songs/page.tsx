'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockTracks } from '@/lib/mockData'
import type { Track } from '@/lib/mockData'
import { getTrackArtist, formatDuration } from '@/lib/spotify-helpers'
import BottomNav from '@/components/navigation/BottomNav'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')

export default function SongsPage() {
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setTracks(mockTracks)
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA
        const response = await fetch('/api/spotify/songs')
        if (!response.ok) {
          throw new Error('Failed to fetch songs')
        }
        const data = await response.json()
        setTracks(data.items?.map((item: any) => item.track) || [])
      } catch (err) {
        console.error('Error fetching songs:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTracks()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading songs...</p>
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

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-800 dark:text-white">
          MUSIC
        </h2>
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="flex">
        <div className="flex-1 px-6">
          <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-6">
            All Songs
          </h1>

          {tracks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No saved songs found
            </p>
          ) : (
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <div key={track.id}>
                  {/* Featured Track Card (4th track) */}
                  {index === 3 && (
                    <div 
                      className="relative h-32 rounded-2xl overflow-hidden mb-4 cursor-pointer group"
                      onClick={() => router.push('/player')}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-primary-pink to-primary-orange" />
                      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-br from-blue-600 to-purple-600" />
                      <button className="absolute left-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform z-10">
                        <Play size={24} fill="currentColor" />
                      </button>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right text-white">
                        <h3 className="text-xl font-bold mb-1">{track.name}</h3>
                        <p className="text-sm opacity-90">{getTrackArtist(track)}</p>
                      </div>
                      <span className="absolute right-6 bottom-4 text-white text-sm">
                        {formatDuration(track.duration_ms)}
                      </span>
                    </div>
                  )}

                  {/* Regular Track Item */}
                  <div 
                    className="track-item"
                    onClick={() => router.push('/player')}
                  >
                    <button className="btn-play shrink-0">
                      <Play size={20} fill="currentColor" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-medium truncate dark:text-white">
                        {track.name}
                      </h3>
                      <p className="text-body text-text-secondary-light dark:text-text-secondary-dark truncate">
                        {getTrackArtist(track)}
                      </p>
                    </div>
                    <span className="text-caption text-text-muted-light dark:text-text-muted-dark shrink-0">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alphabet Scroll */}
        <div className="flex flex-col items-center justify-center py-4 pr-2 text-xs font-medium">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className="py-0.5 text-gray-500 dark:text-gray-400 hover:text-primary-pink dark:hover:text-primary-pink transition-colors"
              onClick={() => {
                // Find first track starting with this letter
                const trackIndex = tracks.findIndex(t => 
                  t.name.toUpperCase().startsWith(letter)
                )
                if (trackIndex !== -1) {
                  const element = document.querySelectorAll('.track-item')[trackIndex]
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}