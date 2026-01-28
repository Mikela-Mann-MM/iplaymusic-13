'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockTracks } from '@/lib/mockData'
import type { Track } from '@/lib/mockData'
import { 
  getTrackArtist, 
  getTrackAlbum, 
  getTrackImage 
} from '@/lib/spotify-helpers'
import {
  TrackInfo,
  PlayerControls,
  ProgressBar,
  VinylRecord,
  SoundWave,
} from '@/components/player'
import BottomNav from '@/components/navigation/BottomNav'

export default function PlayerPage() {
  const router = useRouter()
  
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  // Fetch tracks on mount
  useEffect(() => {
    async function fetchTracks() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setTracks(mockTracks)
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA - Get user's saved tracks
        const response = await fetch('/api/spotify/songs')
        if (!response.ok) {
          throw new Error('Failed to fetch tracks')
        }
        const data = await response.json()
        const tracksData = data.items?.map((item: any) => item.track) || []
        setTracks(tracksData)
      } catch (err) {
        console.error('Error fetching tracks:', err)
        // Fallback to empty array
        setTracks([])
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
          <p className="text-gray-600 dark:text-gray-400">Loading player...</p>
        </div>
      </div>
    )
  }

  // Fallback track if no tracks available
  const currentTrack = tracks.length > 0 
    ? tracks[currentTrackIndex]
    : {
        id: '1',
        name: 'No Track Available',
        artists: [{ id: 'artist-1', name: 'Unknown Artist', type: 'artist', uri: '', href: '', external_urls: { spotify: '' } }],
        album: {
          id: 'album-1',
          name: 'Unknown Album',
          images: [{ url: '', height: 640, width: 640 }],
          artists: [{ id: 'artist-1', name: 'Unknown Artist', type: 'artist', uri: '', href: '', external_urls: { spotify: '' } }],
          release_date: '2024-01-01',
          total_tracks: 1,
          type: 'album',
          uri: '',
          href: '',
          external_urls: { spotify: '' }
        },
        duration_ms: 210000,
        uri: 'spotify:track:sample',
        href: '',
        type: 'track',
        external_urls: { spotify: '' },
        explicit: false,
        popularity: 0,
        track_number: 1,
        disc_number: 1,
        is_local: false,
        preview_url: null
      }

  const durationInSeconds = Math.floor(currentTrack.duration_ms / 1000)

  // Reset playback when track changes
  useEffect(() => {
    setCurrentTime(0)
    setIsPlaying(true)
  }, [currentTrackIndex])

  // Simulate playback
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= durationInSeconds) {
          // Auto-skip to next track when current finishes
          if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1)
          } else {
            setIsPlaying(false)
          }
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, durationInSeconds, currentTrackIndex, tracks.length])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (time: number) => {
    setCurrentTime(time)
  }

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 10))
  }

  const handleForward = () => {
    setCurrentTime(Math.min(durationInSeconds, currentTime + 10))
  }

  const handleSkipBack = () => {
    if (currentTime > 3) {
      // If more than 3 seconds into track, restart current track
      setCurrentTime(0)
    } else if (currentTrackIndex > 0) {
      // Otherwise go to previous track
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  }

  const handleSkipForward = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      // If last track, stop playing
      setIsPlaying(false)
      setCurrentTime(durationInSeconds)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-8">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-medium tracking-wider text-gray-800 dark:text-white">
          NOW PLAYING
        </h2>
        <div className="w-10" /> {/* Spacer for center alignment */}
      </header>

      {/* Track Counter */}
      {tracks.length > 0 && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track {currentTrackIndex + 1} of {tracks.length}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Album Art / Vinyl with Sound Waves */}
        <div className="relative w-full max-w-sm aspect-square mb-16">
          {/* Sound Wave Visualization */}
          <SoundWave isPlaying={isPlaying} />

          {/* Vinyl Record */}
          <VinylRecord isPlaying={isPlaying} albumArt={getTrackImage(currentTrack)} />
        </div>

        {/* Track Information */}
        <div className="mb-8">
          <TrackInfo
            trackName={currentTrack.name}
            artistName={getTrackArtist(currentTrack)}
            albumName={getTrackAlbum(currentTrack)}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-4 w-full flex justify-center">
          <ProgressBar
            currentTime={currentTime}
            duration={durationInSeconds}
            onChange={handleProgressChange}
          />
        </div>

        {/* Playback Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          onRewind={handleRewind}
          onForward={handleForward}
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}