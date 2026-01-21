

'use client'

import { ArrowLeft, Search, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/navigation/BottomNav'

const trendingTopics = [
  {
    id: '1',
    title: 'EDM',
    hashtags: 45,
    engagement: 3123,
    featured: true
  },
  {
    id: '2',
    title: 'Metal'
  },
  {
    id: '3',
    title: 'Classical'
  },
  {
    id: '4',
    title: 'Indie Rock',
    hashtags: 45,
    engagement: 2567,
    featured: true
  }
]

export default function TrendsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <div className="w-10" />
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-8">
          Latest Trends
        </h1>

        {trendingTopics.filter(t => t.featured).map((trend) => (
          <div key={trend.id} className="mb-8">
            <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
              <div className="w-full h-full bg-linear-to-br from-green-600 to-blue-600" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center shadow-xl">
                <Zap size={32} fill="currentColor" className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-5xl font-bold text-white mb-2">{trend.title}</h2>
                {trend.hashtags && (
                  <p className="text-white text-lg mb-3">{trend.hashtags} #hashtags</p>
                )}
                {trend.engagement && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm">
                      <strong>{trend.engagement.toLocaleString()}</strong> are talking about this
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 gap-4">
            {trendingTopics.filter(t => !t.featured).map((trend) => (
              <div
                key={trend.id}
                className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-full bg-linear-to-br from-purple-600 to-pink-600" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {trend.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}