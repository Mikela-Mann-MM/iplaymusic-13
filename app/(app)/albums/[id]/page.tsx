'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Play } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
// import { mockAlbums, mockTracks } from '@/lib/mockData'
import type { Album, Track } from '@/lib/mockData'
import { 
  getTrackArtist, 
  formatDuration, 
  getAlbumImage, 
  getAlbumArtist 
} from '@/lib/spotify-helpers'
import BottomNav from '@/components/navigation/BottomNav'

export default function AlbumDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const albumId = params.id as string
  
  const [album, setAlbum] = useState<Album | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbumDetails() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // const foundAlbum = mockAlbums.find(a => a.id === albumId) || mockAlbums[0]
        // setAlbum(foundAlbum)
        // const albumTracks = mockTracks.filter(track => track.album.id === foundAlbum.id)
        // setTracks(albumTracks)
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch album details')
        }
        
        const data = await response.json()
        setAlbum(data)
        setTracks(data.tracks?.items || [])
      } catch (err) {
        console.error('Error fetching album:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    if (albumId) {
      fetchAlbumDetails()
    }
  }, [albumId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading album...</p>
        </div>
      </div>
    )
  }

  if (error || !album) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-red-500 mb-4">{error || 'Album not found'}</p>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary-pink text-white rounded-full font-semibold hover:bg-primary-pink/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Extract genres from album data (if available)
  const genres = (album as any).genres?.slice(0, 3).map((g: string) => `#${g}`) || ['#music']

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background with album image or gradient */}
        <div className="absolute inset-0">
          {getAlbumImage(album) ? (
            <>
              <img 
                src={getAlbumImage(album)} 
                alt={album.name}
                className="w-full h-full object-cover blur-2xl scale-110"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90" />
        </div>

        {/* Header */}
        <header className="relative flex items-center justify-between px-6 py-4 z-10">
          <button 
            onClick={() => router.back()} 
            className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h2 className="text-sm font-medium tracking-wider text-white">ALBUM</h2>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Album Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h1 className="text-5xl font-bold text-white mb-2">{album.name}</h1>
          <p className="text-white/90 text-lg mb-1">{getAlbumArtist(album)}</p>
          <p className="text-white/80 mb-4">
            {album.release_date?.split('-')[0] || 'N/A'} • {album.total_tracks} Songs
          </p>
          
          {/* Genre Hashtags */}
          {genres.length > 0 && (
            <div>
              <p className="text-white/80 text-sm mb-2">genre hashtags</p>
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-primary-pink rounded-full text-white text-sm font-semibold hover:bg-primary-orange transition-colors cursor-pointer"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 py-6 bg-white dark:bg-background-dark">
        <h2 className="text-h2 font-bold mb-6 dark:text-white">All Songs</h2>
        
        {tracks.length > 0 ? (
          <div className="space-y-1">
            {tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="track-item" 
                onClick={() => router.push('/player')}
              >
                {/* Track Number */}
                <span className="text-gray-500 dark:text-gray-400 w-8 text-center shrink-0">
                  {index + 1}
                </span>
                
                {/* Play Button */}
                <button className="btn-play shrink-0">
                  <Play size={20} fill="currentColor" />
                </button>
                
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-body font-bold truncate dark:text-white">
                    {track.name}
                  </h3>
                  <p className="text-body text-text-secondary-light dark:text-text-secondary-dark truncate">
                    {getTrackArtist(track)}
                  </p>
                </div>
                
                {/* Duration */}
                <span className="text-caption text-text-muted-light dark:text-text-muted-dark shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No tracks found for this album
          </p>
        )}
      </div>

      <BottomNav />
    </div>
  )
}