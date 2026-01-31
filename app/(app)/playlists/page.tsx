/* 

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
 import { mockPlaylists } from '@/lib/mockData';
import type { Playlist } from '@/lib/mockData';
import { 
  getTrackArtist, 
  formatDuration, 
  getPlaylistTracks,
  getPlaylistImage 
} from '@/lib/spotify-helpers';
import BottomNav from '@/components/navigation/BottomNav';

export default function PlaylistsPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
         setPlaylists(mockPlaylists)
         setLoading(false)
         return
        
        // REAL SPOTIFY DATA
        //const response = await fetch('/api/spotify/playlists');
        //if (!response.ok) {
        //  throw new Error('Failed to fetch playlists');
        //}
        //const data = await response.json();
        //setPlaylists(data.items || []);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading playlists...</p>
        </div>
      </div>
    );
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
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
        <header className="page-header flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white font-semibold tracking-wider">PLAYLISTS</h2>
          <button 
            onClick={() => router.push('/search')}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Search size={24} />
          </button>
        </header>
        <div className="flex items-center justify-center mt-20">
          <p className="text-gray-600 dark:text-gray-400">No playlists found</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Get first playlist (or you can use a specific ID)
  const playlist = playlists[0];
  
  // Get tracks from playlist
  const tracks = getPlaylistTracks(playlist);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      {/* Header }
      <header className="page-header flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-semibold tracking-wider">PLAYLISTS</h2>
        <button 
          onClick={() => router.push('/search')}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <Search size={24} />
        </button>
      </header>

      <div className="px-4 -mt-16">
        {/* Title }
        <h1 className="text-display font-extrabold text-white mb-8">
          Playlists
        </h1>

        {/* Playlist Cover }
        <div className="flex justify-center mb-8">
          <div className="text-center">
            {/* Album Art or Initial }
            {getPlaylistImage(playlist) ? (
              <div className="w-64 h-64 rounded-lg mb-4 overflow-hidden shadow-2xl">
                <img 
                  src={getPlaylistImage(playlist)} 
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-linear-to-br from-purple-600 to-purple-900 rounded-lg mb-4 overflow-hidden flex items-center justify-center shadow-2xl">
                <span className="text-6xl text-white font-bold">
                  {playlist.name[0]}
                </span>
              </div>
            )}
            
            {/* Playlist Name (split into lines if long) }
            <h2 className="text-heading-1 font-bold mb-1 dark:text-white">
              {playlist.name.split(' ')[0]} {playlist.name.split(' ')[1]}
            </h2>
            {playlist.name.split(' ').length > 2 && (
              <p className="text-heading-1 font-bold dark:text-white">
                {playlist.name.split(' ').slice(2).join(' ')}
              </p>
            )}
            
            {/* Track count }
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {playlist.tracks.total} songs
            </p>
          </div>
        </div>

        {/* Track List }
        <div className="space-y-1 mb-8">
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="track-item" 
                onClick={() => router.push('/player')}
              >
                {/* Track Number }
                <span className="text-gray-500 dark:text-gray-400 w-8 text-center shrink-0">
                  {index + 1}
                </span>
                
                {/* Play Button }
                <button className="btn-play shrink-0">
                  <Play size={20} fill="currentColor" />
                </button>
                
                {/* Track Info }
                <div className="flex-1 min-w-0">
                  <h3 className="text-body font-medium truncate dark:text-white">
                    {track.name}
                  </h3>
                  <p className="text-body text-text-secondary-light dark:text-text-secondary-dark truncate">
                    {getTrackArtist(track)}
                  </p>
                </div>
                
                {/* Duration }
                <span className="text-caption text-text-muted-light dark:text-text-muted-dark shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No tracks in this playlist
            </p>
          )}
        </div>

        {/* Listen All Button }
        <div className="flex justify-center pb-8">
          <button 
            className="btn-secondary w-full max-w-md"
            onClick={() => router.push('/player')}
          >
            LISTEN ALL
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
} */

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockPlaylists } from '@/lib/mockData';
import type { Playlist } from '@/lib/mockData';
import { 
  getTrackArtist, 
  formatDuration, 
  getPlaylistTracks,
  getPlaylistImage 
} from '@/lib/spotify-helpers';
import BottomNav from '@/components/navigation/BottomNav';

export default function PlaylistsPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        // UNCOMMENT FOR MOCK DATA (DEVELOPMENT)
        setPlaylists(mockPlaylists)
        setLoading(false)
        return
        
        // REAL SPOTIFY DATA
        //const response = await fetch('/api/spotify/playlists');
        //if (!response.ok) {
        //  throw new Error('Failed to fetch playlists');
        //}
        //const data = await response.json();
        //setPlaylists(data.items || []);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading playlists...</p>
        </div>
      </div>
    );
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
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
        <div className="flex items-center justify-center mt-20">
          <p className="text-gray-600 dark:text-gray-400">No playlists found</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Get first playlist (or you can use a specific ID)
  const playlist = playlists[0];
  
  // Get tracks from playlist
  const tracks = getPlaylistTracks(playlist);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pb-32">
      {/* Wave Pattern Header */}
      <div className="relative h-80 overflow-hidden">
        {/* Wave Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/sound-wave.png"
            alt="Sound wave pattern"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Header Navigation */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <button 
            onClick={() => router.back()} 
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white font-semibold tracking-wider text-sm uppercase">
            {playlist.name}
          </h2>
          <button 
            onClick={() => router.push('/search')}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Search size={24} />
          </button>
        </div>

        {/* Playlists Title */}
        <div className="relative z-10 px-6 mt-12">
          <h1 className="text-5xl font-bold text-white">
            Playlists
          </h1>
        </div>

        {/* Small Preview Albums at bottom of wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-4 px-4">
          {playlists.slice(0, 3).map((pl, index) => (
            <div 
              key={pl.id} 
              className="w-20 h-20 rounded-lg overflow-hidden shadow-lg"
              style={{ transform: 'translateY(50%)' }}
            >
              {getPlaylistImage(pl) ? (
                <img 
                  src={getPlaylistImage(pl)} 
                  alt={pl.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-xl text-gray-600 dark:text-gray-300 font-bold">
                    {pl.name[0]}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-20">
        {/* Main Playlist Cover */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            {/* Album Art */}
            {getPlaylistImage(playlist) ? (
              <div className="w-64 h-64 rounded-xl mb-6 overflow-hidden shadow-2xl">
                <img 
                  src={getPlaylistImage(playlist)} 
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-gray-300 dark:bg-gray-600 rounded-xl mb-6 overflow-hidden flex items-center justify-center shadow-2xl">
                <span className="text-6xl text-gray-600 dark:text-gray-300 font-bold">
                  {playlist.name[0]}
                </span>
              </div>
            )}
            
            {/* Playlist Name */}
            <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
              {playlist.name.split(' ')[0]} {playlist.name.split(' ')[1]}
            </h2>
            {playlist.name.split(' ').length > 2 && (
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {playlist.name.split(' ').slice(2).join(' ')}
              </p>
            )}
          </div>
        </div>

        {/* Track List */}
        <div className="space-y-4 mb-8">
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="flex items-center gap-4 py-2" 
                onClick={() => router.push('/player')}
              >
                {/* Play Button */}
                <button className="btn-play shrink-0">
                  <Play size={20} fill="currentColor" />
                </button>
                
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold truncate text-gray-900 dark:text-white">
                    {track.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {getTrackArtist(track)}
                  </p>
                </div>
                
                {/* Duration */}
                <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No tracks in this playlist
            </p>
          )}
        </div>

        {/* Listen All Button */}
        <div className="flex justify-center pb-6 mt-8 pt-12">
          <button 
            className="w-full max-w-md py-4 border-2 border-primary-pink rounded-full text-primary-pink font-bold text-lg hover:bg-primary-pink hover:text-white transition-all"
            onClick={() => router.push('/player')}
          >
            LISTEN ALL
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}