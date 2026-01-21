

import { formatDuration } from '@/lib/utils';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onChange: (time: number) => void;
}

export default function ProgressBar({ currentTime, duration, onChange }: ProgressBarProps) {
  const progress = (currentTime / duration) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-primary-pink
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-primary-pink
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, rgb(255,17,104) 0%, rgb(255,17,104) ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
        }}
      />
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
}