'use client'

import { useState, useEffect } from 'react'

interface UseSpotifyPlayerReturn {
  player: Spotify.Player | null
  deviceId: string
  isReady: boolean
  isPaused: boolean
  currentTrack: Spotify.Track | null
  position: number
  duration: number
}

export function useSpotifyPlayer(token: string): UseSpotifyPlayerReturn {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [deviceId, setDeviceId] = useState<string>('')
  const [isReady, setIsReady] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!token) {
      console.log('No token available for Spotify Player')
      return
    }

    console.log('Loading Spotify Web Playback SDK...')

    // Load Spotify SDK script
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK Ready!')

      const spotifyPlayer = new window.Spotify.Player({
        name: 'iPlayMusic Web Player',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5
      })

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('Initialization Error:', message)
      })

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Authentication Error:', message)
      })

      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Account Error:', message)
      })

      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('Playback Error:', message)
      })

      // Ready event
      spotifyPlayer.addListener('ready', ({ device_id }: Spotify.ReadyEvent) => {
        console.log('Ready with Device ID', device_id)
        setDeviceId(device_id)
        setIsReady(true)
      })

      // Not Ready event
      spotifyPlayer.addListener('not_ready', ({ device_id }: Spotify.NotReadyEvent) => {
        console.log('Device ID offline', device_id)
        setIsReady(false)
      })

      // Player state changed
      spotifyPlayer.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
        if (!state) {
          console.log('No state available')
          return
        }

        console.log('Player state changed:', state)
        setCurrentTrack(state.track_window.current_track)
        setIsPaused(state.paused)
        setPosition(state.position)
      })

      // Connect to the player
      spotifyPlayer.connect().then((success: boolean) => {
        if (success) {
          console.log('Successfully connected to Spotify!')
        } else {
          console.error('Failed to connect to Spotify')
        }
      })

      setPlayer(spotifyPlayer)
    }

    // Cleanup
    return () => {
      console.log('Disconnecting Spotify Player')
      if (player) {
        player.disconnect()
      }
    }
  }, [token])

  // Fetch track duration from Spotify API when track changes
  useEffect(() => {
    if (!currentTrack || !token) return

    async function fetchTrackDuration() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${currentTrack!.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const trackData = await response.json()
          setDuration(trackData.duration_ms)
        }
      } catch (error) {
        console.error('Error fetching track duration:', error)
        // Fallback to estimate from position updates
        setDuration(0)
      }
    }

    fetchTrackDuration()
  }, [currentTrack?.id, token])

  return {
    player,
    deviceId,
    isReady,
    isPaused,
    currentTrack,
    position,
    duration
  }
}