

'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Music,
  ListMusic,
  Mic2,
  Disc3,
  Radio,
  TrendingUp,
  Newspaper,
  Star,
  Heart,
  Clock,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const mainNavItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Playlists', href: '/playlists', icon: ListMusic },
  { name: 'Artists', href: '/artists', icon: Mic2 },
  { name: 'Albums', href: '/albums', icon: Disc3 },
  { name: 'Songs', href: '/songs', icon: Music },
];

const discoverNavItems: NavItem[] = [
  { name: 'Categories', href: '/categories', icon: Radio },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Feed', href: '/feed', icon: Newspaper },
  { name: 'Featured', href: '/featured', icon: Star },
];

const libraryNavItems: NavItem[] = [
  { name: 'Liked Songs', href: '/liked', icon: Heart },
  { name: 'Recently Played', href: '/recent', icon: Clock },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    // Clear mock mode data
    localStorage.removeItem('iplaymusic_mock_mode');
    localStorage.removeItem('iplaymusic_user');
    // Redirect to login
    router.push('/login');
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-linear-to-r from-primary-pink to-primary-orange text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
        }`}
      >
        <Icon size={20} />
        {!isCollapsed && <span className="font-medium">{item.name}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-background-dark border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-30 hidden lg:block ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-4 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={14} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft size={14} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto scrollbar-hide">
            {/* Main Navigation */}
            <div>
              {!isCollapsed && (
                <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Menu
                </h3>
              )}
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </div>

            {/* Discover */}
            <div>
              {!isCollapsed && (
                <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Discover
                </h3>
              )}
              <div className="space-y-1">
                {discoverNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </div>

            {/* Library */}
            <div>
              {!isCollapsed && (
                <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Library
                </h3>
              )}
              <div className="space-y-1">
                {libraryNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Settings size={20} />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Spacer for content (when sidebar is visible) */}
      <div className={`hidden lg:block ${isCollapsed ? 'w-20' : 'w-64'}`} />
    </>
  );
}