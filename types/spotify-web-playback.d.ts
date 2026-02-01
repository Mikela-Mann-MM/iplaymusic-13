

interface Window {
  onSpotifyWebPlaybackSDKReady: () => void
  Spotify: typeof Spotify
}

declare namespace Spotify {
  interface Player {
    connect(): Promise<boolean>
    disconnect(): void
    addListener(event: string, callback: (data: any) => void): void
    removeListener(event: string): void
    getCurrentState(): Promise<PlaybackState | null>
    setName(name: string): Promise<void>
    getVolume(): Promise<number>
    setVolume(volume: number): Promise<void>
    pause(): Promise<void>
    resume(): Promise<void>
    togglePlay(): Promise<void>
    seek(position_ms: number): Promise<void>
    previousTrack(): Promise<void>
    nextTrack(): Promise<void>
  }

  interface PlayerConstructor {
    new (options: PlayerOptions): Player
  }

  interface PlayerOptions {
    name: string
    getOAuthToken: (callback: (token: string) => void) => void
    volume?: number
  }

  interface PlaybackState {
    context: {
      uri: string
      metadata: any
    }
    disallows: {
      pausing: boolean
      peeking_next: boolean
      peeking_prev: boolean
      resuming: boolean
      seeking: boolean
      skipping_next: boolean
      skipping_prev: boolean
    }
    paused: boolean
    position: number
    repeat_mode: number
    shuffle: boolean
    track_window: {
      current_track: Track
      previous_tracks: Track[]
      next_tracks: Track[]
    }
  }

  interface Track {
    uri: string
    id: string
    type: string
    media_type: string
    name: string
    is_playable: boolean
    album: {
      uri: string
      name: string
      images: Array<{ url: string; height: number; width: number }>
    }
    artists: Array<{
      uri: string
      name: string
    }>
  }

  interface Error {
    message: string
  }

  interface ReadyEvent {
    device_id: string
  }

  interface NotReadyEvent {
    device_id: string
  }

  const Player: PlayerConstructor
}