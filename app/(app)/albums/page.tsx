/* 

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockAlbums } from '@/lib/mockData'
import type { Album } from '@/lib/mockData'
import { getAlbumImage, getAlbumArtist } from '@/lib/spotify-helpers'
import Navbar from '@/components/navigation/Navbar'
import BottomNav from '@/components/navigation/BottomNav'

export default function AlbumsPage() {
  const router = useRouter()
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbums() {
      try {
        // MOCK DATA FOR DEVELOPMENT
        setAlbums(mockAlbums)
        setLoading(false)
        return

        // REAL SPOTIFY DATA 
        // const response = await fetch('/api/spotify/albums')
        // if (!response.ok) {
        //   throw new Error('Failed to fetch albums')
        // }
        // const data = await response.json()
        // setAlbums(data.albums?.items || [])
      } catch (err) {
        console.error('Error fetching albums:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading albums...</p>
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
      <Navbar mobileTitle="Albums" />

      {/* Responsive padding: px-6 mobile (24px), px-8 tablet+ (32px) }
      <div className="px-6 sm:px-8 pt-20 pb-8">
        {/* Page title }
        <h1 className="text-display font-extrabold text-gray-900 dark:text-white mb-8">
          Albums
        </h1>

 {/* Page title }
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="cursor-pointer group"
              onClick={() => {
                const albumUrl = '/albums/' + album.id;
                router.push(albumUrl);
              }}
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                {getAlbumImage(album) ? (
                  <img
                    src={getAlbumImage(album)}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-5xl text-white font-bold">
                      {album.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold truncate dark:text-white mb-1">
                {album.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {getAlbumArtist(album)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {album.release_date?.split('-')[0] || 'N/A'} • {album.total_tracks} songs
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
} */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockAlbums } from '@/lib/mockData'
import type { Album } from '@/lib/mockData'
import { getAlbumImage, getAlbumArtist } from '@/lib/spotify-helpers'
import Navbar from '@/components/navigation/Navbar'
import BottomNav from '@/components/navigation/BottomNav'

export default function AlbumsPage() {
  const router = useRouter()
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbums() {
      try {
        // MOCK DATA FOR DEVELOPMENT
        setAlbums(mockAlbums)
        setLoading(false)
        return

        // REAL SPOTIFY DATA 
        // const response = await fetch('/api/spotify/albums')
        // if (!response.ok) {
        //   throw new Error('Failed to fetch albums')
        // }
        // const data = await response.json()
        // setAlbums(data.albums?.items || [])
      } catch (err) {
        console.error('Error fetching albums:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading albums...</p>
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
      <Navbar mobileTitle="Albums" />

      {/* Responsive padding: px-6 mobile (24px), px-8 tablet+ (32px) */}
      <div className="px-6 sm:px-8 pt-20 pb-8">
        {/* Page title */}
        <h1 className="text-5xl font-extrabold text-primary-pink mb-8">
          All Albums
        </h1>

        {/* Featured Albums Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Albums
            </h2>
            <button className="text-primary-pink font-semibold hover:opacity-80 transition-opacity">
              View All
            </button>
          </div>
          
          {/* Horizontal scroll container */}
          <div className="overflow-x-auto scrollbar-hide -mx-6 sm:-mx-8 px-6 sm:px-8">
            <div className="flex gap-4 pb-4">
              {albums.slice(0, 5).map((album) => (
                <div
                  key={album.id}
                  className="flex-shrink-0 w-48 cursor-pointer group"
                  onClick={() => router.push('/albums/' + album.id)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                    {getAlbumImage(album) ? (
                      <img
                        src={getAlbumImage(album)}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-5xl text-white font-bold">
                          {album.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New Releases Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              New Releases
            </h2>
            <button className="text-primary-pink font-semibold hover:opacity-80 transition-opacity">
              View All
            </button>
          </div>
          
          {/* Vertical list */}
          <div className="space-y-4">
            {albums.map((album) => (
              <div
                key={album.id}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-colors"
                onClick={() => router.push('/albums/' + album.id)}
              >
                {/* Album artwork */}
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  {getAlbumImage(album) ? (
                    <img
                      src={getAlbumImage(album)}
                      alt={album.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">
                        {album.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Album info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">
                    {album.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {getAlbumArtist(album)}
                  </p>
                </div>
                
                {/* Song count */}
                <div className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {album.total_tracks} Songs
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}  