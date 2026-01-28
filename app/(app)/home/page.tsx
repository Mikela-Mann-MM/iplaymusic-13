'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Play, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockTracks, mockAlbums } from '@/lib/mockData'
import type { Track, Album } from '@/lib/mockData'
import { getTrackImage, getTrackArtist, getAlbumImage, getAlbumArtist } from '@/lib/spotify-helpers'
import BottomNav from '@/components/navigation/BottomNav'

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('spotify_access_token')
}


const hashtags = ['#spotify', '#musicworld', '#jazz', '#billboard', '#grammy', '#coachella']

const events = [
  {
    id: '1',
    title: 'Coachella 2019 Day Three Highlights',
    tags: ['#spotify', '#musicworld', '#grammy2020'],
    engagement: 3123
  },
  {
    id: '2',
    title: 'Color Festival Music Experience',
    tags: ['#musicfestival', '#summer', '#vibes'],
    engagement: 2456
  }
]

export default function HomePage() {
  const router = useRouter()
  const [recentTracks, setRecentTracks] = useState<Track[]>([])
  const [newReleases, setNewReleases] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeedData() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setRecentTracks(mockTracks.slice(0, 5))
        // setNewReleases(mockAlbums.slice(0, 3))
        // setLoading(false)
        // return

        // REAL SPOTIFY DATA - Fetch both in parallel

        const token = getStoredToken()

        if (!token) {
          console.error('No token found')
          router.push('/login')
          return
        }

        const headers = {
          'Authorization': `Bearer ${token}`
        }
        const [recentResponse, releasesResponse] = await Promise.all([
          fetch('/api/spotify/recently-played', { headers }),
          fetch('/api/spotify/albums', { headers })
        ])

        if (!recentResponse.ok || !releasesResponse.ok) {
          throw new Error('Failed to fetch feed data')
        }

        const recentData = await recentResponse.json()
        const releasesData = await releasesResponse.json()

        setRecentTracks(recentData.items?.map((item: any) => item.track).slice(0, 5) || [])
        setNewReleases(releasesData.albums?.items?.slice(0, 3) || [])
      } catch (err) {
        console.error('Error fetching feed:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your feed...</p>
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
        <div className="w-10" />
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          Your Feed
        </h1>

        {/* Recently Played Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={24} className="text-primary-pink" />
            <h2 className="text-2xl font-bold dark:text-white">Recently Played</h2>
          </div>
          <div className="space-y-3">
            {recentTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => router.push('/player')}
              >
                {/* Album Art */}
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  {getTrackImage(track) ? (
                    <img
                      src={getTrackImage(track)}
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                      {track.name[0]}
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate dark:text-white">{track.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {getTrackArtist(track)}
                  </p>
                </div>

                {/* Play Button */}
                <button className="w-10 h-10 rounded-full bg-primary-pink flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={16} fill="white" className="text-white ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold dark:text-white">New Releases</h2>
            <button
              className="text-primary-pink text-sm font-semibold"
              onClick={() => router.push('/albums')}
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {newReleases.map((album) => {
              const albumUrl = '/albums/' + album.id;

              return (
                <div
                  key={album.id}
                  className="cursor-pointer group"
                  onClick={() => router.push(albumUrl)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                    {getAlbumImage(album) ? (
                      <img
                        src={getAlbumImage(album)}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                        {album.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold truncate dark:text-white">
                    {album.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {getAlbumArtist(album)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Events Feed Section (Mock Data) */}
        <section>
          <h2 className="text-2xl font-bold dark:text-white mb-4">Events & Trending</h2>

          {/* Hashtags */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {hashtags.map((tag, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-primary-pink rounded-full text-white font-semibold whitespace-nowrap hover:bg-primary-pink/90 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Events */}
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-background-dark shadow-lg"
              >
                <div className="relative h-64">
                  <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {event.tags.map((tag, i) => (
                        <span key={i} className="text-primary-pink text-sm font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-white text-sm">
                        <strong>{event.engagement.toLocaleString()}</strong> are talking about this
                      </span>
                    </div>
                    <h3 className="text-white text-2xl font-bold">{event.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}