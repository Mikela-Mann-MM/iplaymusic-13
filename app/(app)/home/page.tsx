'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Play, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockTracks, mockAlbums } from '@/lib/mockData'
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
         setRecentTracks(mockTracks.slice(0, 5))
         setNewReleases(mockAlbums.slice(0, 3))
         setLoading(false)
         return

        // REAL SPOTIFY DATA - Fetch both in parallel
        //const token = getStoredToken()

        //if (!token) {
         // console.error('No token found')
         // router.push('/login')
         // return
        //}

        //const headers = {
        //  'Authorization': `Bearer ${token}`
        //}
        //const [recentResponse, releasesResponse] = await Promise.all([
         // fetch('/api/spotify/recently-played', { headers }),
         // fetch('/api/spotify/albums', { headers })
        //])

        //if (!recentResponse.ok || !releasesResponse.ok) {
        //  throw new Error('Failed to fetch feed data')
        //}

        //const recentData = await recentResponse.json()
        //const releasesData = await releasesResponse.json()

        //setRecentTracks(recentData.items?.map((item: any) => item.track).slice(0, 5) || [])
        //setNewReleases(releasesData.albums?.items?.slice(0, 3) || [])
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

      {/* Main container - Max width 360px på mobil */}
      <div className="px-3 sm:px-6 max-w-[360px] sm:max-w-none mx-auto">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-6 sm:mb-8 pt-6 pb-3">
          Your Feed
        </h1>

        {/* Recently Played Section */}
        <section className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2">
            <Clock size={20} className="text-gray-500 sm:w-6 sm:h-6" />
            <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Recently Played</h2>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-2 sm:gap-4 p-3 sm:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => router.push('/player')}
              >
                {/* Album Art */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0">
                  {getTrackImage(track) ? (
                    <img
                      src={getTrackImage(track)}
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {track.name[0]}
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0 max-w-[180px] sm:max-w-none">
                  <h3 className="text-sm sm:text-base font-semibold truncate dark:text-white">
                    {track.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                    {getTrackArtist(track)}
                  </p>
                </div>

                {/* Play Button */}
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-pink flex items-center justify-center hover:scale-110 transition-transform shrink-0">
                  <Play size={14} fill="white" className="text-white ml-0.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="mb-8 sm:mb-10 pt-3 pb-3">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold dark:text-white pb-3">New Releases</h2>
            <button
              className="text-primary-pink text-xs sm:text-sm font-semibold"
              onClick={() => router.push('/albums')}
            >
              View All
            </button>
          </div>
          {/* Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {newReleases.map((album) => {
              const albumUrl = '/albums/' + album.id;

              return (
                <div
                  key={album.id}
                  className="cursor-pointer group"
                  onClick={() => router.push(albumUrl)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform">
                    {getAlbumImage(album) ? (
                      <img
                        src={getAlbumImage(album)}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                        {album.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold truncate dark:text-white leading-tight">
                    {album.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">
                    {getAlbumArtist(album)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Events Feed Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-3 sm:mb-4 pt-2 pb-4">
            Events & Trending
          </h2>

          {/* Hashtags - Starter ikke helt ved kanten */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 mb-4 sm:mb-6 scrollbar-hide -mx-1 px-1 sm:mx-0 sm:px-0">
            {hashtags.map((tag, index) => (
              <button
                key={index}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-primary-pink rounded-full text-white text-sm sm:text-base font-semibold whitespace-nowrap hover:bg-primary-pink/90 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Events */}
          <div className="space-y-8 sm:space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-background-dark shadow-lg"
              >
                <div className="relative h-48 sm:h-64">
                  <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                      {event.tags.map((tag, i) => (
                        <span key={i} className="text-primary-pink text-xs sm:text-sm font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs sm:text-sm">
                        <strong>{event.engagement.toLocaleString()}</strong> are talking about this
                      </span>
                    </div>
                    <h3 className="text-white text-lg sm:text-2xl font-bold leading-tight">
                      {event.title}
                    </h3>
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