

'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { mockCategories } from '@/lib/mockData'
import BottomNav from '@/components/navigation/BottomNav'

// Category type
interface Category {
  id: string
  name: string
  icons?: { url: string }[]
}

// Define type for subcategories
interface Subcategories {
  [key: string]: string[]
}

const subcategories: Subcategories = {
  'pop': ['Dance Pop', 'Indie Pop', 'Pop Rock', 'Synth Pop'],
  'hip-hop': ['Trap', 'Conscious Hip Hop', 'Gangsta Rap', 'Old School'],
  'rock': ['Classic Rock', 'Alternative Rock', 'Hard Rock', 'Indie Rock'],
  'latin': ['Reggaeton', 'Latin Pop', 'Salsa', 'Bachata'],
  'indie': ['Indie Rock', 'Indie Pop', 'Indie Folk', 'Dream Pop'],
  'electronic': ['House', 'Techno', 'Trance', 'Dubstep']
}

const categoryColors: { [key: string]: string } = {
  'pop': 'bg-category-hiphop',
  'hip-hop': 'bg-category-hiphop',
  'rock': 'bg-category-blues',
  'latin': 'bg-category-country',
  'indie': 'bg-category-alternative',
  'electronic': 'bg-category-electronic',
}

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        // setCategories(mockCategories)
        // setLoading(false)
        // return
        
        // REAL SPOTIFY DATA
        const response = await fetch('/api/spotify/categories')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data.categories?.items || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-primary-pink text-white rounded-full font-semibold hover:bg-primary-pink/90 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-background-dark">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-800 dark:text-white">
          CATEGORIES
        </h2>
        <button>
          <Search size={24} className="text-gray-800 dark:text-white" />
        </button>
      </header>

      <div className="px-6">
        <h1 className="text-display font-extrabold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent mb-6">
          Categories
        </h1>

        <div className="space-y-4">
          {categories.map((category) => {
            const colorClass = categoryColors[category.id] || 'bg-category-alternative'
            const hasSubs = subcategories[category.id] && subcategories[category.id].length > 0
            
            return (
              <div key={category.id}>
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className={`w-full ${colorClass} text-white p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow`}
                >
                  <span className="text-xl font-bold">{category.name}</span>
                  {hasSubs && <MoreHorizontal size={24} />}
                </button>

                {expandedCategory === category.id && hasSubs && (
                  <div className="mt-2 ml-4 space-y-2">
                    {subcategories[category.id].map((sub: string, index: number) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        onClick={() => router.push('/playlists')}
                      >
                        <span className="dark:text-white">{sub}</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}