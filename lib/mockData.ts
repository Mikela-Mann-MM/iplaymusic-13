

export interface Track {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  uri: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: {
    total: number;
    items: { track: Track }[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
}

export interface Album {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
}

export interface Category {
  id: string;
  name: string;
  icons: { url: string }[];
}

// ==================== MOCK TRACKS ====================

export const mockTracks: Track[] = [
  {
    id: '1',
    name: 'Blinding Lights',
    artists: [{ id: 'artist-1', name: 'The Weeknd' }],
    album: {
      id: 'album-1',
      name: 'After Hours',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273ef8cf61c6f4d71b23b3b8c1c' }]
    },
    duration_ms: 200000, // 3:20
    uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b'
  },
  {
    id: '2',
    name: 'Save Your Tears',
    artists: [{ id: 'artist-1', name: 'The Weeknd' }],
    album: {
      id: 'album-1',
      name: 'After Hours',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273ef8cf61c6f4d71b23b3b8c1c' }]
    },
    duration_ms: 215000, // 3:35
    uri: 'spotify:track:5QO79kh1waicV47BqGRL3g'
  },
  {
    id: '3',
    name: 'Levitating',
    artists: [{ id: 'artist-2', name: 'Dua Lipa' }],
    album: {
      id: 'album-2',
      name: 'Future Nostalgia',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea' }]
    },
    duration_ms: 203000, // 3:23
    uri: 'spotify:track:39LLxExYz6ewLAcYrzQQyP'
  },
  {
    id: '4',
    name: 'Peaches',
    artists: [
      { id: 'artist-4', name: 'Justin Bieber' },
      { id: 'artist-7', name: 'Daniel Caesar' },
      { id: 'artist-8', name: 'Giveon' }
    ],
    album: {
      id: 'album-3',
      name: 'Justice',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2734e0362c225863f6ae2432651' }]
    },
    duration_ms: 198000, // 3:18
    uri: 'spotify:track:4iJyoBOLtHqaGxP12qzhQI'
  },
  {
    id: '5',
    name: 'Good 4 U',
    artists: [{ id: 'artist-5', name: 'Olivia Rodrigo' }],
    album: {
      id: 'album-4',
      name: 'SOUR',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a' }]
    },
    duration_ms: 178000, // 2:58
    uri: 'spotify:track:4ZtFanR9U6ndgddUvNcjcG'
  },
  {
    id: '6',
    name: 'Montero (Call Me By Your Name)',
    artists: [{ id: 'artist-6', name: 'Lil Nas X' }],
    album: {
      id: 'album-5',
      name: 'MONTERO',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd' }]
    },
    duration_ms: 137000, // 2:17
    uri: 'spotify:track:67BtfxlNbhBmCDR2L2l8qd'
  },
  {
    id: '7',
    name: 'Kiss Me More',
    artists: [
      { id: 'artist-9', name: 'Doja Cat' },
      { id: 'artist-10', name: 'SZA' }
    ],
    album: {
      id: 'album-7',
      name: 'Planet Her',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2737acee0b385c34f8ee98d8a1e' }]
    },
    duration_ms: 208000, // 3:28
    uri: 'spotify:track:3DarAbFujv6eYNliUTyqtz'
  },
  {
    id: '8',
    name: 'Stay',
    artists: [
      { id: 'artist-11', name: 'The Kid LAROI' },
      { id: 'artist-4', name: 'Justin Bieber' }
    ],
    album: {
      id: 'album-8',
      name: 'Stay',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342' }]
    },
    duration_ms: 141000, // 2:21
    uri: 'spotify:track:5PjdY0CKGZdEuoNab3yDmX'
  },
  {
    id: '9',
    name: 'Heat Waves',
    artists: [{ id: 'artist-12', name: 'Glass Animals' }],
    album: {
      id: 'album-9',
      name: 'Dreamland',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b27372d335acc8efd3d9098e0e4b' }]
    },
    duration_ms: 238000, // 3:58
    uri: 'spotify:track:02MWAaffLxlfxAUY7c5dvx'
  },
  {
    id: '10',
    name: 'Shivers',
    artists: [{ id: 'artist-3', name: 'Ed Sheeran' }],
    album: {
      id: 'album-6',
      name: '=',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273cd5b9ce26fb4e88e1f71a4db' }]
    },
    duration_ms: 207000, // 3:27
    uri: 'spotify:track:50nfwKoDiSYg8zOCREWAm5'
  },
  {
    id: '11',
    name: 'Industry Baby',
    artists: [
      { id: 'artist-6', name: 'Lil Nas X' },
      { id: 'artist-13', name: 'Jack Harlow' }
    ],
    album: {
      id: 'album-5',
      name: 'MONTERO',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd' }]
    },
    duration_ms: 212000, // 3:32
    uri: 'spotify:track:27NovPIUIRrOZoCHxABJwK'
  },
  {
    id: '12',
    name: 'Bad Habits',
    artists: [{ id: 'artist-3', name: 'Ed Sheeran' }],
    album: {
      id: 'album-6',
      name: '=',
      images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273cd5b9ce26fb4e88e1f71a4db' }]
    },
    duration_ms: 230000, // 3:50
    uri: 'spotify:track:6PQ88X9TkUIAUIZJHW2upE'
  }
];

// ==================== MOCK PLAYLISTS ====================

export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Today\'s Top Hits',
    description: 'Ed Sheeran is on top of the Hottest 50!',
    images: [{ url: 'https://i.scdn.co/image/ab67706f00000002e0b1b2a2d720c440f5bf8b08' }],
    tracks: {
      total: 50,
      items: mockTracks.slice(0, 8).map(track => ({ track }))
    }
  },
  {
    id: 'playlist-2',
    name: 'RapCaviar',
    description: 'New music from Lil Nas X, Drake and more',
    images: [{ url: 'https://i.scdn.co/image/ab67706f00000002768629f8bc5b179d5ec0e4fd' }],
    tracks: {
      total: 50,
      items: [mockTracks[5], mockTracks[10], mockTracks[3], mockTracks[6]].map(track => ({ track }))
    }
  },
  {
    id: 'playlist-3',
    name: 'All Out 2020s',
    description: 'The biggest songs of the 2020s',
    images: [{ url: 'https://i.scdn.co/image/ab67706f000000029c88feb6dcdaf5dc479301e6' }],
    tracks: {
      total: 150,
      items: mockTracks.slice(0, 10).map(track => ({ track }))
    }
  },
  {
    id: 'playlist-4',
    name: 'Rock Classics',
    description: 'Rock legends & epic songs',
    images: [{ url: 'https://i.scdn.co/image/ab67706f00000002fe6d8e053e89c7efbde1e5d6' }],
    tracks: {
      total: 100,
      items: mockTracks.slice(2, 8).map(track => ({ track }))
    }
  },
  {
    id: 'playlist-5',
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    images: [{ url: 'https://i.scdn.co/image/ab67706f000000020a55ba165f0c8c245e97df8d' }],
    tracks: {
      total: 100,
      items: mockTracks.slice(0, 6).map(track => ({ track }))
    }
  },
  {
    id: 'playlist-6',
    name: 'Viva Latino',
    description: "Today's top Latin hits",
    images: [{ url: 'https://i.scdn.co/image/ab67706f00000002ed1d1d24c533d139a31a4b37' }],
    tracks: {
      total: 50,
      items: mockTracks.slice(1, 7).map(track => ({ track }))
    }
  }
];

// ==================== MOCK ARTISTS ====================

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'The Weeknd',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb' }],
    genres: ['pop', 'r&b'],
    followers: { total: 95000000 }
  },
  {
    id: 'artist-2',
    name: 'Dua Lipa',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb0fc24f63dc8e780a60e0c836' }],
    genres: ['pop', 'dance'],
    followers: { total: 85000000 }
  },
  {
    id: 'artist-3',
    name: 'Ed Sheeran',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba' }],
    genres: ['pop', 'folk'],
    followers: { total: 110000000 }
  },
  {
    id: 'artist-4',
    name: 'Justin Bieber',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36' }],
    genres: ['pop', 'r&b'],
    followers: { total: 88000000 }
  },
  {
    id: 'artist-5',
    name: 'Olivia Rodrigo',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5ebe03a98785f3658f0b6461ec4' }],
    genres: ['pop', 'rock'],
    followers: { total: 35000000 }
  },
  {
    id: 'artist-6',
    name: 'Lil Nas X',
    images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb58b2e69a5d1c3b0ef6e4e23d' }],
    genres: ['hip hop', 'pop'],
    followers: { total: 25000000 }
  }
];

// ==================== MOCK ALBUMS ====================

export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    name: 'After Hours',
    artists: [{ id: 'artist-1', name: 'The Weeknd' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273ef8cf61c6f4d71b23b3b8c1c' }],
    release_date: '2020-03-20',
    total_tracks: 14
  },
  {
    id: 'album-2',
    name: 'Future Nostalgia',
    artists: [{ id: 'artist-2', name: 'Dua Lipa' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea' }],
    release_date: '2020-03-27',
    total_tracks: 11
  },
  {
    id: 'album-3',
    name: 'Justice',
    artists: [{ id: 'artist-4', name: 'Justin Bieber' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2734e0362c225863f6ae2432651' }],
    release_date: '2021-03-19',
    total_tracks: 16
  },
  {
    id: 'album-4',
    name: 'SOUR',
    artists: [{ id: 'artist-5', name: 'Olivia Rodrigo' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a' }],
    release_date: '2021-05-21',
    total_tracks: 11
  },
  {
    id: 'album-5',
    name: 'MONTERO',
    artists: [{ id: 'artist-6', name: 'Lil Nas X' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd' }],
    release_date: '2021-09-17',
    total_tracks: 15
  },
  {
    id: 'album-6',
    name: '=',
    artists: [{ id: 'artist-3', name: 'Ed Sheeran' }],
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273cd5b9ce26fb4e88e1f71a4db' }],
    release_date: '2021-10-29',
    total_tracks: 14
  }
];

// ==================== MOCK CATEGORIES ====================

export const mockCategories: Category[] = [
  {
    id: 'pop',
    name: 'Pop',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f00000002768629f8bc5b179d5ec0e4fd' }]
  },
  {
    id: 'hip-hop',
    name: 'Hip-Hop',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f00000002fe6d8e053e89c7efbde1e5d6' }]
  },
  {
    id: 'rock',
    name: 'Rock',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f000000029c88feb6dcdaf5dc479301e6' }]
  },
  {
    id: 'latin',
    name: 'Latin',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f00000002ed1d1d24c533d139a31a4b37' }]
  },
  {
    id: 'indie',
    name: 'Indie',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f000000020a55ba165f0c8c245e97df8d' }]
  },
  {
    id: 'electronic',
    name: 'Electronic',
    icons: [{ url: 'https://i.scdn.co/image/ab67706f00000002e0b1b2a2d720c440f5bf8b08' }]
  }
];

// ==================== MOCK USER DATA ====================

export const mockUser = {
  id: 'user-1',
  display_name: 'Demo User',
  email: 'demo@iplaymusic.com',
  images: [{ url: 'https://i.pravatar.cc/300' }],
  country: 'DK',
  product: 'premium'
};

// ==================== CONVENIENCE EXPORTS ====================

export const mockRecentlyPlayed = mockTracks.slice(0, 6);
export const mockTopTracks = mockTracks.slice(0, 10);
export const mockTopArtists = mockArtists.slice(0, 6);

// ==================== HELPER FUNCTIONS ====================

export function getPlaylistById(id: string): Playlist | undefined {
  return mockPlaylists.find(p => p.id === id);
}

export function getTrackById(id: string): Track | undefined {
  return mockTracks.find(t => t.id === id);
}

export function getArtistById(id: string): Artist | undefined {
  return mockArtists.find(a => a.id === id);
}

export function getAlbumById(id: string): Album | undefined {
  return mockAlbums.find(a => a.id === id);
}

export function searchTracks(query: string): Track[] {
  const lowerQuery = query.toLowerCase();
  return mockTracks.filter(
    t => t.name.toLowerCase().includes(lowerQuery) || 
         t.artists.some(a => a.name.toLowerCase().includes(lowerQuery))
  );
}

export function searchPlaylists(query: string): Playlist[] {
  const lowerQuery = query.toLowerCase();
  return mockPlaylists.filter(
    p => p.name.toLowerCase().includes(lowerQuery) || 
         p.description.toLowerCase().includes(lowerQuery)
  );
}