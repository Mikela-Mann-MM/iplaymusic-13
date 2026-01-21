'use client';

import { useState, useEffect } from 'react';

interface SoundWaveProps {
  isPlaying: boolean;
}

interface Bar {
  height: number;
  duration: number;
}

export default function SoundWave({ isPlaying }: SoundWaveProps) {
  const [leftBars, setLeftBars] = useState<Bar[]>([]);
  const [rightBars, setRightBars] = useState<Bar[]>([]);

  useEffect(() => {
    // Generer random værdier kun på klienten efter mount
    setLeftBars(
      [...Array(8)].map(() => ({
        height: 20 + Math.random() * 60,
        duration: 0.5 + Math.random() * 0.5,
      }))
    );
    setRightBars(
      [...Array(8)].map(() => ({
        height: 20 + Math.random() * 60,
        duration: 0.5 + Math.random() * 0.5,
      }))
    );
  }, []);

  // Vis placeholder under SSR
  if (leftBars.length === 0) {
    return <div className="absolute inset-0" />;
  }

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {/* Left waves */}
        <div className="absolute left-0 flex gap-1 items-center h-full">
          {leftBars.map((bar, i) => (
            <div
              key={`left-${i}`}
              className="w-1 bg-linear-to-b from-primary-pink to-primary-orange"
              style={{
                height: `${bar.height}%`,
                animation: isPlaying
                  ? `wave ${bar.duration}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </div>

        {/* Right waves */}
        <div className="absolute right-0 flex gap-1 items-center h-full">
          {rightBars.map((bar, i) => (
            <div
              key={`right-${i}`}
              className="w-1 bg-linear-to-b from-primary-pink to-primary-orange"
              style={{
                height: `${bar.height}%`,
                animation: isPlaying
                  ? `wave ${bar.duration}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scaleY(0.3);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </>
  );
}