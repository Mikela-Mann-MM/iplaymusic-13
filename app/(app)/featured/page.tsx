

'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/navigation/BottomNav'

const featuredContent = [
  {
    id: '1',
    title: 'The Greatest Showman',
    subtitle: 'Soundtrack',
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: '2',
    title: 'Bohemian Rhapsody',
    subtitle: 'Queen',
    gradient: 'from-red-600 to-orange-600'
  },
  {
    id: '3',
    title: 'A Star Is Born',
    subtitle: 'Soundtrack',
    gradient: 'from-pink-600 to-purple-600'
  }
]

export default function FeaturedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-800 dark:text-white">
          FEATURED
        </h2>
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          Featured
        </h1>

        <div className="space-y-6">
          {featuredContent.map((item) => (
            <div
              key={item.id}
              className="relative h-125 rounded-3xl overflow-hidden group cursor-pointer"
              onClick={() => router.push('/player')}
            >
              <div className={`w-full h-full bg-linear-to-br ${item.gradient}`} />
              <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-40`} />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-5xl font-bold text-white mb-2 leading-tight">
                  {item.title}
                </h2>
                <p className="text-white text-xl opacity-90">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}