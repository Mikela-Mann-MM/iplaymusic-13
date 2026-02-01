'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Track } from '@/lib/mockData'
// import { mockTracks } from '@/lib/mockData'
import { useSpotifyPlayer } from '@/lib/hooks/useSpotifyPlayer'
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

  // Token state
  const [token, setToken] = useState<string>('')
  const [useSpotifyPlayback, setUseSpotifyPlayback] = useState(false)

  // Track data
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  // Mock playback state (fallback)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  // Hent token (optional - hvis det fejler, bruger vi mock)
  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch('/api/spotify/token')
        if (response.ok) {
          const data = await response.json()
          setToken(data.access_token)
          setUseSpotifyPlayback(true)
          console.log('✅ Token found - using Spotify Web Playback')
        } else {
          console.log('⚠️ No token - using mock playback')
          setUseSpotifyPlayback(false)
        }
      } catch (error) {
        console.log('⚠️ Token fetch failed - using mock playback')
        setUseSpotifyPlayback(false)
      }
    }
    getToken()
  }, [])

  // Initialiser Spotify Player (kun hvis token findes)
  const spotifyPlayer = useSpotifyPlayer(useSpotifyPlayback ? token : '')

  // Fetch tracks on mount
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
          throw new Error('Failed to fetch tracks')
        }
        const data = await response.json()
        const tracksData = data.items?.map((item: any) => item.track) || []
        setTracks(tracksData)
      } catch (err) {
        console.error('Error fetching tracks:', err)
        setTracks([])
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  // Start Spotify playback når player er klar
  useEffect(() => {
    if (!useSpotifyPlayback) return
    if (!spotifyPlayer.isReady || !spotifyPlayer.deviceId || !token || tracks.length === 0) return

    console.log('🎵 Starting Spotify playback on device:', spotifyPlayer.deviceId)

    // Transfer playback til vores Web Player og start afspilning
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${spotifyPlayer.deviceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: tracks.map(t => t.uri)
      })
    }).then(response => {
      if (response.ok) {
        console.log('✅ Spotify playback started!')
      } else {
        console.error('❌ Failed to start Spotify playback:', response.status)
        // Fall back to mock if Spotify fails
        setUseSpotifyPlayback(false)
      }
    }).catch(error => {
      console.error('❌ Error starting Spotify playback:', error)
      setUseSpotifyPlayback(false)
    })
  }, [useSpotifyPlayback, spotifyPlayer.isReady, spotifyPlayer.deviceId, tracks, token])

  // MOCK PLAYBACK - Reset when track changes
  useEffect(() => {
    if (useSpotifyPlayback) return // Skip hvis Spotify playback
    if (loading) return
    setCurrentTime(0)
    setIsPlaying(true)
  }, [currentTrackIndex, loading, useSpotifyPlayback])

  // MOCK PLAYBACK - Simulate playback
  useEffect(() => {
    if (useSpotifyPlayback) return // Skip hvis Spotify playback
    if (loading) return
    if (!isPlaying) return
    
    const currentTrack = tracks[currentTrackIndex]
    if (!currentTrack) return
    
    const durationInSeconds = Math.floor(currentTrack.duration_ms / 1000)
    if (durationInSeconds <= 0) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= durationInSeconds) {
          if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex((i) => i + 1)
          } else {
            setIsPlaying(false)
          }
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [useSpotifyPlayback, loading, isPlaying, currentTrackIndex, tracks])

  // Fallback track if no tracks available
  const fallbackTrack: Track = {
    id: '1',
    name: 'No Track Available',
    artists: [{ 
      id: 'artist-1', 
      name: 'Unknown Artist'
    }],
    album: {
      id: 'album-1',
      name: 'Unknown Album',
      images: [{ url: '' }]
    },
    duration_ms: 210000,
    uri: 'spotify:track:sample'
  } as Track

  // Determine current track based on playback mode
  const currentTrack = useSpotifyPlayback && spotifyPlayer.currentTrack
    ? convertSpotifyTrack(spotifyPlayer.currentTrack)
    : tracks.length > 0
    ? tracks[currentTrackIndex]
    : fallbackTrack

  // Determine playback state based on mode
  const playbackState = useSpotifyPlayback
    ? {
        isPlaying: !spotifyPlayer.isPaused,
        currentTime: Math.floor(spotifyPlayer.position / 1000),
        duration: Math.floor(spotifyPlayer.duration / 1000)
      }
    : {
        isPlaying: isPlaying,
        currentTime: currentTime,
        duration: Math.floor(currentTrack.duration_ms / 1000)
      }

  // Loading state
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

  // Waiting for Spotify Player (hvis vi prøver at bruge det)
  if (useSpotifyPlayback && !spotifyPlayer.isReady) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Connecting to Spotify...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Premium required for playback
          </p>
          <button
            onClick={() => setUseSpotifyPlayback(false)}
            className="mt-4 text-sm text-primary-pink hover:underline"
          >
            Use mock playback instead
          </button>
        </div>
      </div>
    )
  }

  // HANDLERS - delegerer til rigtig mode
  const handlePlayPause = () => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      spotifyPlayer.player.togglePlay()
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkipBack = () => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      spotifyPlayer.player.previousTrack()
    } else {
      if (currentTime > 3) {
        setCurrentTime(0)
      } else if (currentTrackIndex > 0) {
        setCurrentTrackIndex(currentTrackIndex - 1)
      }
    }
  }

  const handleSkipForward = () => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      spotifyPlayer.player.nextTrack()
    } else {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1)
      } else {
        setIsPlaying(false)
        setCurrentTime(playbackState.duration)
      }
    }
  }

  const handleRewind = () => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      const newPosition = Math.max(0, spotifyPlayer.position - 10000)
      spotifyPlayer.player.seek(newPosition)
    } else {
      setCurrentTime(Math.max(0, currentTime - 10))
    }
  }

  const handleForward = () => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      const newPosition = Math.min(spotifyPlayer.duration, spotifyPlayer.position + 10000)
      spotifyPlayer.player.seek(newPosition)
    } else {
      setCurrentTime(Math.min(playbackState.duration, currentTime + 10))
    }
  }

  const handleProgressChange = (time: number) => {
    if (useSpotifyPlayback && spotifyPlayer.player) {
      spotifyPlayer.player.seek(time * 1000)
    } else {
      setCurrentTime(time)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col pb-32">
      {/* Playback mode indicator */}
      <div className="absolute top-4 right-4 z-10">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {useSpotifyPlayback ? '🎵 Spotify Playback' : '🎭 Mock Playback'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative w-full max-w-sm aspect-square mb-16">
          <SoundWave isPlaying={playbackState.isPlaying} />
          <VinylRecord isPlaying={playbackState.isPlaying} albumArt={getTrackImage(currentTrack)} />
        </div>

        <div className="mb-8">
          <TrackInfo
            trackName={currentTrack.name}
            artistName={getTrackArtist(currentTrack)}
            albumName={getTrackAlbum(currentTrack)}
          />
        </div>

        <div className="mb-4 w-full flex justify-center">
          <ProgressBar
            currentTime={playbackState.currentTime}
            duration={playbackState.duration}
            onChange={handleProgressChange}
          />
        </div>

        <PlayerControls
          isPlaying={playbackState.isPlaying}
          onPlayPause={handlePlayPause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          onRewind={handleRewind}
          onForward={handleForward}
        />

        {/* Debug info (optional - kan fjernes i produktion) */}
        {useSpotifyPlayback && spotifyPlayer.isReady && (
          <div className="mt-8 text-xs text-gray-500 text-center">
            <p>Device ID: {spotifyPlayer.deviceId}</p>
            <p>Track {currentTrackIndex + 1} of {tracks.length}</p>
          </div>
        )}

        {!useSpotifyPlayback && tracks.length > 0 && (
          <div className="mt-8 text-xs text-gray-500 text-center">
            <p>Track {currentTrackIndex + 1} of {tracks.length}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

// Helper function to convert Spotify.Track to Track type
function convertSpotifyTrack(spotifyTrack: Spotify.Track): Track {
  return {
    id: spotifyTrack.id,
    name: spotifyTrack.name,
    artists: spotifyTrack.artists?.map(artist => ({
      id: artist.uri?.split(':')[2] || '',
      name: artist.name || 'Unknown Artist'
    })) || [{ 
      id: '', 
      name: 'Unknown Artist'
    }],
    album: {
      id: spotifyTrack.album?.uri?.split(':')[2] || '',
      name: spotifyTrack.album?.name || 'Unknown Album',
      images: spotifyTrack.album?.images?.map(img => ({ url: img.url })) || [{ url: '' }]
    },
    duration_ms: 0, // Vi bruger duration fra playback state
    uri: spotifyTrack.uri
  } as Track
}