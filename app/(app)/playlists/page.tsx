

'use client'

import { ArrowLeft, Search, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockData } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

export default function PlaylistsPage() {
  const router = useRouter()
  const tracks = mockData.getPlaylistTracks('p1')
  const playlist = mockData.playlists[0]

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="page-header flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-semibold">PLAYLISTS</h2>
        <button className="p-2 text-white">
          <Search size={24} />
        </button>
      </header>

      <div className="px-4 -mt-16">
        <h1 className="text-display font-extrabold text-white mb-8">
          Playlists
        </h1>

        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="w-64 h-64 bg-linear-to-br from-purple-600 to-purple-900 rounded-album mb-4 overflow-hidden flex items-center justify-center">
              <span className="text-6xl text-white font-bold">
                {playlist.name[0]}
              </span>
            </div>
            <h2 className="text-heading-1 font-bold mb-1 dark:text-white">
              {playlist.name.split(' ')[0]} {playlist.name.split(' ')[1]}
            </h2>
            <p className="text-heading-1 font-bold dark:text-white">
              {playlist.name.split(' ').slice(2).join(' ')}
            </p>
          </div>
        </div>

        <div className="space-y-1 mb-8">
          {tracks.map((track) => (
            <div key={track.id} className="track-item" onClick={() => router.push('/player')}>
              <button className="btn-play shrink-0">
                <Play size={20} fill="currentColor" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-body font-medium truncate dark:text-white">
                  {track.name}
                </h3>
                <p className="text-body text-text-secondary-light dark:text-text-secondary-dark truncate">
                  {track.artists[0].name}
                </p>
              </div>
              <span className="text-caption text-text-muted-light dark:text-text-muted-dark shrink-0">
                {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <button className="btn-secondary w-full max-w-md">
            LISTEN ALL
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}