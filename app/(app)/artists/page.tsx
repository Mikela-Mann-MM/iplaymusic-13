

'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockArtists } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

export default function ArtistsPage() {
  const router = useRouter()
  const artistOfMonth = {
    name: 'Jonas Brothers',
    month: 'September'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-800 dark:text-white">
          MUSIC
        </h2>
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          All Artists
        </h1>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-white">Artist Of The Month</h2>
            <button className="text-primary-pink text-sm font-semibold">View All</button>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden bg-linear-to-br from-purple-900 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-lg mb-2">{artistOfMonth.month}</p>
              <h3 className="text-white text-2xl font-bold">{artistOfMonth.name}</h3>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-white">Featured Artists</h2>
            <button className="text-primary-pink text-sm font-semibold">View All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {mockArtists.map((artist) => (
              <div key={artist.id} className="shrink-0 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-2 bg-linear-to-br from-primary-pink to-primary-orange">
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    {artist.name[0]}
                  </div>
                </div>
                <p className="text-sm font-medium dark:text-white truncate w-32">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Top Artists By Country</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl bg-linear-to-br from-green-500 to-green-700 flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-4xl font-bold mb-2">TOP 50</h3>
              <p className="text-xl">US</p>
            </div>
            <div className="aspect-square rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-4xl font-bold mb-2">TOP 50</h3>
              <p className="text-xl">GLOBAL</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}