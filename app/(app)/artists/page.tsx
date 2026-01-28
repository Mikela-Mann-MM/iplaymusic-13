'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockArtists } from '@/lib/mockData'
import type { Artist } from '@/lib/mockData'
import { getArtistImage } from '@/lib/spotify-helpers'
import BottomNav from '@/components/navigation/BottomNav'

export default function ArtistsPage() {
  const router = useRouter()
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const artistOfMonth = {
    name: 'Jonas Brothers',
    month: 'September'
  }

  useEffect(() => {
    async function fetchArtists() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setArtists(mockArtists)
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA
        const response = await fetch('/api/spotify/artists')
        if (!response.ok) {
          throw new Error('Failed to fetch artists')
        }
        const data = await response.json()
        setArtists(data.artists?.items || [])
      } catch (err) {
        console.error('Error fetching artists:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArtists()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading artists...</p>
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

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          All Artists
        </h1>

        {/* Artist Of The Month */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-white">Artist Of The Month</h2>
            <button className="text-primary-pink text-sm font-semibold">View All</button>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden bg-linear-to-br from-purple-900 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-lg mb-2">{artistOfMonth.month}</p>
              <h3 className="text-white text-2xl font-bold">{artistOfMonth.name}</h3>
            </div>
          </div>
        </div>

        {/* Featured Artists */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-white">Featured Artists</h2>
            <button className="text-primary-pink text-sm font-semibold">View All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {artists.map((artist) => (
              <div key={artist.id} className="shrink-0 text-center cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                  {getArtistImage(artist) ? (
                    <img 
                      src={getArtistImage(artist)} 
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center text-white text-4xl font-bold">
                      {artist.name[0]}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium dark:text-white truncate w-32">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Artists By Country */}
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Top Artists By Country</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl bg-linear-to-br from-green-500 to-green-700 flex flex-col items-center justify-center text-white p-6 cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-4xl font-bold mb-2">TOP 50</h3>
              <p className="text-xl">US</p>
            </div>
            <div className="aspect-square rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-white p-6 cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-4xl font-bold mb-2">TOP 50</h3>
              <p className="text-xl">GLOBAL</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}