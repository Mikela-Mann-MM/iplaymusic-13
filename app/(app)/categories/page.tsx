

'use client';

import { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockCategories } from '@/lib/mockData';
import BottomNav from '@/components/navigation/BottomNav';

// Define type for subcategories
interface Subcategories {
  [key: string]: string[];
}

const subcategories: Subcategories = {
  'pop': ['Dance Pop', 'Indie Pop', 'Pop Rock', 'Synth Pop'],
  'hip-hop': ['Trap', 'Conscious Hip Hop', 'Gangsta Rap', 'Old School'],
  'rock': ['Classic Rock', 'Alternative Rock', 'Hard Rock', 'Indie Rock'],
  'latin': ['Reggaeton', 'Latin Pop', 'Salsa', 'Bachata'],
  'indie': ['Indie Rock', 'Indie Pop', 'Indie Folk', 'Dream Pop'],
  'electronic': ['House', 'Techno', 'Trance', 'Dubstep']
};

const categoryColors: { [key: string]: string } = {
  'pop': 'bg-category-hiphop',
  'hip-hop': 'bg-category-hiphop',
  'rock': 'bg-category-blues',
  'latin': 'bg-category-country',
  'indie': 'bg-category-alternative',
  'electronic': 'bg-category-electronic',
};

export default function CategoriesPage() {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
          {mockCategories.map((category) => {
            const colorClass = categoryColors[category.id] || 'bg-category-alternative';
            const hasSubs = subcategories[category.id] && subcategories[category.id].length > 0;
            
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
                    {subcategories[category.id].map((sub, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      >
                        <span className="dark:text-white">{sub}</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}