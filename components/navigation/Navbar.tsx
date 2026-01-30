

'use client';

import { useState } from 'react';
import { Search, Bell, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NavbarProps } from '@/types/spotify';

export default function Navbar({ 
  mobileTitle = 'Music',
  showMobileSearch = true 
}: NavbarProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleMobileSearch = () => {
    // Toggle search or navigate to search page
    setShowSearch(!showSearch);
  };

  return (
    <>
      {/* Desktop Version - Hidden on mobile */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-linear-to-br from-primary-pink to-primary-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">iP</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
                iPlayMusic
              </span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search songs, artists, albums..."
                    className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-pink text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <Search 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button 
                onClick={() => router.push('/notifications')}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <Bell size={24} className="text-gray-700 dark:text-gray-300" />
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-pink rounded-full"></span>
              </button>

              {/* Profile */}
              <button 
                onClick={() => router.push('/profile')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <User size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Version */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-900 dark:text-white"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Dynamic Title */}
          <h2 className="text-gray-900 dark:text-white font-light text-[15px] uppercase tracking-wide">
            {mobileTitle}
          </h2>

          {/* Search Button */}
          {showMobileSearch ? (
            <button
              onClick={handleMobileSearch}
              className="p-2 -mr-2 text-gray-900 dark:text-white"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          ) : (
            <div className="w-10" /> /* Placeholder for alignment */
          )}
        </div>

        {/* Mobile Search Bar (Expanded) */}
        {showSearch && (
          <div className="bg-white dark:bg-background-dark pb-4 px-6 border-b border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search songs, artists, albums..."
                  className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-pink text-gray-900 dark:text-white placeholder-gray-500"
                  autoFocus
                />
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                />
              </div>
            </form>
          </div>
        )}
      </header>
    </>
  );
}