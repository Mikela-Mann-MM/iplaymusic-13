

// lib/mockData.ts
import { SpotifyTrack, SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyCategory } from '@/types/spotify'

// Mock Tracks
export const mockTracks: SpotifyTrack[] = [
  {
    id: '1',
    name: "Old Town Road",
    artists: [{ id: 'a1', name: 'Billy Ray Cyrus' }],
    album: {
      id: 'alb1',
      name: 'Old Town Road',
      images: [{ url: '/images/album1.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a1', name: 'Billy Ray Cyrus' }],
      release_date: '2019-04-05',
      total_tracks: 1,
      album_type: 'single'
    },
    duration_ms: 238000,
    explicit: false,
    popularity: 95,
    preview_url: null
  },
  {
    id: '2',
    name: "Don't Call Me Up",
    artists: [{ id: 'a2', name: 'Mabel' }],
    album: {
      id: 'alb2',
      name: 'High Expectations',
      images: [{ url: '/images/album2.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a2', name: 'Mabel' }],
      release_date: '2019-07-12',
      total_tracks: 14,
      album_type: 'album'
    },
    duration_ms: 166000,
    explicit: false,
    popularity: 87
  },
  {
    id: '3',
    name: "Let Me Down Slowly",
    artists: [{ id: 'a3', name: 'Alec Benjamin' }],
    album: {
      id: 'alb3',
      name: 'Narrated For You',
      images: [{ url: '/images/album3.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a3', name: 'Alec Benjamin' }],
      release_date: '2018-11-16',
      total_tracks: 12,
      album_type: 'album'
    },
    duration_ms: 252000,
    explicit: false,
    popularity: 92
  },
  {
    id: '4',
    name: "Here With Me",
    artists: [{ id: 'a4', name: 'Marshmello' }],
    album: {
      id: 'alb4',
      name: 'Joytime III',
      images: [{ url: '/images/album4.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a4', name: 'Marshmello' }],
      release_date: '2019-07-02',
      total_tracks: 10,
      album_type: 'album'
    },
    duration_ms: 217000,
    explicit: false,
    popularity: 89
  },
  {
    id: '5',
    name: "Paradise",
    artists: [{ id: 'a5', name: 'Bazzi' }],
    album: {
      id: 'alb5',
      name: 'Cosmic',
      images: [{ url: '/images/album5.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a5', name: 'Bazzi' }],
      release_date: '2018-04-12',
      total_tracks: 16,
      album_type: 'album'
    },
    duration_ms: 192000,
    explicit: false,
    popularity: 85
  },
  {
    id: '6',
    name: "Blinding Lights",
    artists: [{ id: 'a6', name: 'The Weeknd' }],
    album: {
      id: 'alb6',
      name: 'After Hours',
      images: [{ url: '/images/album6.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a6', name: 'The Weeknd' }],
      release_date: '2020-03-20',
      total_tracks: 14,
      album_type: 'album'
    },
    duration_ms: 200000,
    explicit: false,
    popularity: 98
  },
  {
    id: '7',
    name: "Levitating",
    artists: [{ id: 'a7', name: 'Dua Lipa' }],
    album: {
      id: 'alb7',
      name: 'Future Nostalgia',
      images: [{ url: '/images/album7.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a7', name: 'Dua Lipa' }],
      release_date: '2020-03-27',
      total_tracks: 11,
      album_type: 'album'
    },
    duration_ms: 203000,
    explicit: false,
    popularity: 94
  },
  {
    id: '8',
    name: "Watermelon Sugar",
    artists: [{ id: 'a8', name: 'Harry Styles' }],
    album: {
      id: 'alb8',
      name: 'Fine Line',
      images: [{ url: '/images/album8.jpg', width: 640, height: 640 }],
      artists: [{ id: 'a8', name: 'Harry Styles' }],
      release_date: '2019-12-13',
      total_tracks: 12,
      album_type: 'album'
    },
    duration_ms: 174000,
    explicit: false,
    popularity: 91
  }
]

// Mock Albums
export const mockAlbums: SpotifyAlbum[] = [
  {
    id: 'alb1',
    name: 'Old Town Road',
    images: [{ url: '/images/album1.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a1', name: 'Billy Ray Cyrus' }],
    release_date: '2019-04-05',
    total_tracks: 1,
    album_type: 'single'
  },
  {
    id: 'alb2',
    name: 'High Expectations',
    images: [{ url: '/images/album2.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a2', name: 'Mabel' }],
    release_date: '2019-07-12',
    total_tracks: 14,
    album_type: 'album'
  },
  {
    id: 'alb3',
    name: 'Narrated For You',
    images: [{ url: '/images/album3.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a3', name: 'Alec Benjamin' }],
    release_date: '2018-11-16',
    total_tracks: 12,
    album_type: 'album'
  },
  {
    id: 'alb6',
    name: 'After Hours',
    images: [{ url: '/images/album6.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a6', name: 'The Weeknd' }],
    release_date: '2020-03-20',
    total_tracks: 14,
    album_type: 'album'
  },
  {
    id: 'alb7',
    name: 'Future Nostalgia',
    images: [{ url: '/images/album7.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a7', name: 'Dua Lipa' }],
    release_date: '2020-03-27',
    total_tracks: 11,
    album_type: 'album'
  },
  {
    id: 'alb8',
    name: 'Fine Line',
    images: [{ url: '/images/album8.jpg', width: 640, height: 640 }],
    artists: [{ id: 'a8', name: 'Harry Styles' }],
    release_date: '2019-12-13',
    total_tracks: 12,
    album_type: 'album'
  }
]

// Mock Artists
export const mockArtists: SpotifyArtist[] = [
  {
    id: 'a1',
    name: 'Billy Ray Cyrus',
    images: [{ url: '/images/artist1.jpg', width: 640, height: 640 }],
    genres: ['country', 'pop'],
    popularity: 85,
    followers: { total: 1234567 }
  },
  {
    id: 'a2',
    name: 'Mabel',
    images: [{ url: '/images/artist2.jpg', width: 640, height: 640 }],
    genres: ['pop', 'r&b'],
    popularity: 78,
    followers: { total: 890123 }
  },
  {
    id: 'a3',
    name: 'Alec Benjamin',
    images: [{ url: '/images/artist3.jpg', width: 640, height: 640 }],
    genres: ['pop', 'indie'],
    popularity: 82,
    followers: { total: 2345678 }
  },
  {
    id: 'a6',
    name: 'The Weeknd',
    images: [{ url: '/images/artist6.jpg', width: 640, height: 640 }],
    genres: ['r&b', 'pop'],
    popularity: 98,
    followers: { total: 45678901 }
  },
  {
    id: 'a7',
    name: 'Dua Lipa',
    images: [{ url: '/images/artist7.jpg', width: 640, height: 640 }],
    genres: ['pop', 'dance'],
    popularity: 95,
    followers: { total: 38901234 }
  }
]

// Mock Playlists
export const mockPlaylists: SpotifyPlaylist[] = [
  {
    id: 'p1',
    name: 'Top 50 Rock Ballads',
    description: 'The best rock ballads from the last decade',
    images: [{ url: '/images/playlist1.jpg', width: 640, height: 640 }],
    owner: { display_name: 'Spotify', id: 'spotify' },
    tracks: { total: 50 },
    public: true
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relaxing music for any time of day',
    images: [{ url: '/images/playlist2.jpg', width: 640, height: 640 }],
    owner: { display_name: 'iPlayMusic', id: 'iplaymusic' },
    tracks: { total: 35 },
    public: true
  },
  {
    id: 'p3',
    name: 'Workout Mix',
    description: 'High energy tracks to power your workout',
    images: [{ url: '/images/playlist3.jpg', width: 640, height: 640 }],
    owner: { display_name: 'Fitness Beats', id: 'fitness' },
    tracks: { total: 42 },
    public: true
  },
  {
    id: 'p4',
    name: 'Evening Jazz',
    description: 'Smooth jazz for relaxing evenings',
    images: [{ url: '/images/playlist4.jpg', width: 640, height: 640 }],
    owner: { display_name: 'Jazz Club', id: 'jazzclub' },
    tracks: { total: 28 },
    public: true
  }
]

// Mock Categories
export const mockCategories: SpotifyCategory[] = [
  { id: 'alternative', name: 'Alternative', icons: [{ url: '/images/cat-alt.jpg', width: 300, height: 300 }] },
  { id: 'blues', name: 'Blues', icons: [{ url: '/images/cat-blues.jpg', width: 300, height: 300 }] },
  { id: 'classical', name: 'Classical', icons: [{ url: '/images/cat-classical.jpg', width: 300, height: 300 }] },
  { id: 'country', name: 'Country', icons: [{ url: '/images/cat-country.jpg', width: 300, height: 300 }] },
  { id: 'dance', name: 'Dance', icons: [{ url: '/images/cat-dance.jpg', width: 300, height: 300 }] },
  { id: 'electronic', name: 'Electronic', icons: [{ url: '/images/cat-electronic.jpg', width: 300, height: 300 }] },
  { id: 'fitness', name: 'Fitness & Workout', icons: [{ url: '/images/cat-fitness.jpg', width: 300, height: 300 }] },
  { id: 'hiphop', name: 'Hip-Hop/Rap', icons: [{ url: '/images/cat-hiphop.jpg', width: 300, height: 300 }] },
  { id: 'industrial', name: 'Industrial', icons: [{ url: '/images/cat-industrial.jpg', width: 300, height: 300 }] },
]

// Helper Functions
export const getPlaylistTracks = (playlistId: string): SpotifyTrack[] => {
  return mockTracks.slice(0, 8)
}

export const getAlbumTracks = (albumId: string): SpotifyTrack[] => {
  return mockTracks.filter(track => track.album.id === albumId)
}

export const getArtistTopTracks = (artistId: string): SpotifyTrack[] => {
  return mockTracks.filter(track => 
    track.artists.some(artist => artist.id === artistId)
  )
}

export const searchMock = (query: string, type: 'track' | 'album' | 'artist' = 'track') => {
  const q = query.toLowerCase()
  
  if (type === 'track') {
    return mockTracks.filter(track => 
      track.name.toLowerCase().includes(q) ||
      track.artists.some(a => a.name.toLowerCase().includes(q))
    )
  }
  
  if (type === 'album') {
    return mockAlbums.filter(album =>
      album.name.toLowerCase().includes(q) ||
      album.artists.some(a => a.name.toLowerCase().includes(q))
    )
  }
  
  if (type === 'artist') {
    return mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(q)
    )
  }
  
  return []
}

export const mockData = {
  tracks: mockTracks,
  albums: mockAlbums,
  artists: mockArtists,
  playlists: mockPlaylists,
  categories: mockCategories,
  getPlaylistTracks,
  getAlbumTracks,
  getArtistTopTracks,
  search: searchMock
}