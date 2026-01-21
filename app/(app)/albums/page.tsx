

'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockAlbums } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

export default function AlbumsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="page-header flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-semibold">ALBUMS</h2>
        <button className="p-2 text-white">
          <Search size={24} />
        </button>
      </header>

      <div className="px-6 -mt-16 pb-8">
        <h1 className="text-display font-extrabold text-white mb-8">
          Albums
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockAlbums.map((album) => (
            <div
              key={album.id}
              className="cursor-pointer group"
              onClick={() => router.push(`/albums/${album.id}`)}
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-5xl text-white font-bold">
                  {album.name[0]}
                </span>
              </div>
              <h3 className="font-semibold truncate dark:text-white mb-1">
                {album.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {album.artists[0].name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {album.release_date.split('-')[0]} • {album.total_tracks} songs
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}