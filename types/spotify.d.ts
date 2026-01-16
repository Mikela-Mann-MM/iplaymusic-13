// Spotify API Types

export interface SpotifyImage {
  url: string
  width: number
  height: number
}

export interface SpotifyArtist {
  id: string
  name: string
  images?: SpotifyImage[]
  genres?: string[]
  popularity?: number
  followers?: {
    total: number
  }
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: SpotifyImage[]
  artists: SpotifyArtist[]
  release_date: string
  total_tracks: number
  album_type: 'album' | 'single' | 'compilation'
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  duration_ms: number
  explicit: boolean
  popularity?: number
  preview_url?: string | null
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: SpotifyImage[]
  owner: {
    display_name: string
    id: string
  }
  tracks: {
    total: number
  }
  public: boolean
}

export interface SpotifyCategory {
  id: string
  name: string
  icons: SpotifyImage[]
}

