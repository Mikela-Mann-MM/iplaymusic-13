



'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/navigation/BottomNav'

const hashtags = ['#spotify', '#musicworld', '#jazz', '#billboard', '#grammy', '#coachella']

const events = [
  {
    id: '1',
    title: 'Coachella 2019 Day Three Highlights',
    tags: ['#spotify', '#musicworld', '#grammy2020'],
    engagement: 3123
  },
  {
    id: '2',
    title: 'Color Festival Music Experience',
    tags: ['#musicfestival', '#summer', '#vibes'],
    engagement: 2456
  }
]

export default function FeedPage() {
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
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-6">
          Events Feed
        </h1>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {hashtags.map((tag, index) => (
            <button
              key={index}
              className="px-6 py-3 bg-primary-pink rounded-full text-white font-semibold whitespace-nowrap hover:bg-primary-pink/90 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-background-dark shadow-lg"
            >
              <div className="relative h-64">
                <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="text-primary-pink text-sm font-semibold">
                        {tag}{i < event.tags.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm">
                      <strong>{event.engagement.toLocaleString()}</strong> are talking about this
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-bold">{event.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}