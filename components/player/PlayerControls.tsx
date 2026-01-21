

import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onRewind?: () => void;
  onForward?: () => void;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onRewind,
  onForward,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* Skip Back */}
      <button
        onClick={onSkipBack}
        disabled={!onSkipBack}
        className="p-2 text-primary-pink dark:text-primary-pink hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SkipBack size={32} fill="currentColor" />
      </button>

      {/* Rewind */}
      <button
        onClick={onRewind}
        disabled={!onRewind}
        className="p-2 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Rewind size={32} fill="currentColor" />
      </button>

      {/* Play/Pause - Main control */}
      <button
        onClick={onPlayPause}
        className="w-20 h-20 rounded-full bg-linear-to-br from-primary-pink to-primary-orange
          flex items-center justify-center text-white
          hover:shadow-2xl hover:scale-105 active:scale-95
          transition-all duration-200"
      >
        {isPlaying ? (
          <Pause size={36} fill="currentColor" />
        ) : (
          <Play size={36} fill="currentColor" className="ml-1" />
        )}
      </button>

      {/* Forward */}
      <button
        onClick={onForward}
        disabled={!onForward}
        className="p-2 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FastForward size={32} fill="currentColor" />
      </button>

      {/* Skip Forward */}
      <button
        onClick={onSkipForward}
        disabled={!onSkipForward}
        className="p-2 text-primary-pink dark:text-primary-pink hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SkipForward size={32} fill="currentColor" />
      </button>
    </div>
  );
}