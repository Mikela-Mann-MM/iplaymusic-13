

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockTracks } from '@/lib/mockData';
import { 
  getTrackArtist, 
  getTrackAlbum, 
  getTrackImage 
} from '@/lib/spotify-helpers';
import {
  TrackInfo,
  PlayerControls,
  ProgressBar,
  VinylRecord,
  SoundWave,
} from '@/components/player';
import BottomNav from '@/components/navigation/BottomNav';

export default function PlayerPage() {
  const router = useRouter();
  
  // Use first track from mockData as default, with fallback
  const currentTrack = mockTracks && mockTracks.length > 0 
    ? mockTracks[0] 
    : {
        id: '1',
        name: 'Sample Track',
        artists: [{ id: 'artist-1', name: 'Sample Artist' }],
        album: {
          id: 'album-1',
          name: 'Sample Album',
          images: [{ url: '' }]
        },
        duration_ms: 210000, // 3:30
        uri: 'spotify:track:sample'
      };

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  // Parse duration safely (duration_ms is in milliseconds)
  const durationInSeconds = Math.floor(currentTrack.duration_ms / 1000);

  // Simulate playback
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= durationInSeconds) {
          setIsPlaying(false);
          return durationInSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, durationInSeconds]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (time: number) => {
    setCurrentTime(time);
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleForward = () => {
    setCurrentTime(Math.min(durationInSeconds, currentTime + 10));
  };

  const handleSkipBack = () => {
    // TODO: Implement previous track
    console.log('Skip to previous track');
  };

  const handleSkipForward = () => {
    // TODO: Implement next track
    console.log('Skip to next track');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-medium tracking-wider text-gray-800 dark:text-white">
          NOW PLAYING
        </h2>
        <div className="w-10" /> {/* Spacer for center alignment */}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Album Art / Vinyl with Sound Waves */}
        <div className="relative w-full max-w-sm aspect-square mb-16">
          {/* Sound Wave Visualization */}
          <SoundWave isPlaying={isPlaying} />

          {/* Vinyl Record */}
          <VinylRecord isPlaying={isPlaying} albumArt={getTrackImage(currentTrack)} />
        </div>

        {/* Track Information */}
        <div className="mb-8">
          <TrackInfo
            trackName={currentTrack.name}
            artistName={getTrackArtist(currentTrack)}
            albumName={getTrackAlbum(currentTrack)}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-4 w-full flex justify-center">
          <ProgressBar
            currentTime={currentTime}
            duration={durationInSeconds}
            onChange={handleProgressChange}
          />
        </div>

        {/* Playback Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          onRewind={handleRewind}
          onForward={handleForward}
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}