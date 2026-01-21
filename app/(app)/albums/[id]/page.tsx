

'use client'

import { ArrowLeft, Play } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { mockAlbums, mockData } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

export default function AlbumDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const albumId = params.id as string
  const album = mockAlbums.find(a => a.id === albumId) || mockAlbums[0]
  const tracks = mockData.getAlbumTracks(album.id)
  const genres = ['#country', '#country road']

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90" />
        </div>

        <header className="relative flex items-center justify-between px-6 py-4 z-10">
          <button onClick={() => router.back()} className="p-2 bg-black/20 backdrop-blur-sm rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h2 className="text-sm font-medium tracking-wider text-white">Album</h2>
          <div className="w-10" />
        </header>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h1 className="text-5xl font-bold text-white mb-2">{album.name}</h1>
          <p className="text-white text-lg mb-4">{album.total_tracks} Songs</p>
          {genres.length > 0 && (
            <div>
              <p className="text-white/80 text-sm mb-2">genres hastags</p>
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre, i) => (
                  <span key={i} className="px-4 py-2 bg-primary-pink rounded-full text-white text-sm font-semibold">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-6 bg-white dark:bg-background-dark">
        <h2 className="text-h2 font-bold mb-6 dark:text-white">All Songs</h2>
        <div className="space-y-1">
          {tracks.map((track) => (
            <div key={track.id} className="track-item" onClick={() => router.push('/player')}>
              <button className="btn-play shrink-0">
                <Play size={20} fill="currentColor" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-body font-bold truncate dark:text-white">{track.name}</h3>
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
      </div>

      <BottomNav />
    </div>
  )
}