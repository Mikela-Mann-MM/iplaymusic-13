

'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Heart, MoreHorizontal, SkipBack, SkipForward, Play, Pause, RotateCcw, RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/navigation/BottomNav'
import { mockTracks } from '@/lib/mockData'

export default function Player() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(238) // 3:58 in seconds
  
  const track = mockTracks[0] // Current playing track

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <button onClick={() => router.back()}>
          <ArrowLeft className="text-gray-900 dark:text-white" size={24} />
        </button>
        <h2 className="text-sm font-medium tracking-wider text-gray-900 dark:text-white">
          NOW PLAYING
        </h2>
        <button>
          <MoreHorizontal className="text-gray-900 dark:text-white" size={24} />
        </button>
      </header>

      {/* Vinyl Record */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative w-80 h-80">
          {/* Vinyl */}
          <div className={`w-full h-full rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
            {/* Inner Circle */}
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-900" />
            </div>
          </div>
          
          {/* Grooves */}
          <div className="absolute inset-8 rounded-full border-4 border-gray-800 opacity-30" />
          <div className="absolute inset-16 rounded-full border-4 border-gray-800 opacity-30" />
          <div className="absolute inset-24 rounded-full border-4 border-gray-800 opacity-30" />
        </div>
      </div>

      {/* Sound Wave Visualization */}
      <div className="px-8 mb-8">
        <div className="flex items-center justify-center gap-1 h-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-linear-to-t from-primary-pink to-primary-orange rounded-full transition-all ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Track Info */}
      <div className="px-8 mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          {track.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {track.artists[0].name}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-8 mb-8">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-linear-to-br
          [&::-webkit-slider-thumb]:from-primary-pink
          [&::-webkit-slider-thumb]:to-primary-orange"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 mb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Skip Back */}
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <SkipBack size={32} />
          </button>

          {/* Rewind 10s */}
          <button 
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw size={28} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center hover:shadow-2xl transition-shadow"
          >
            {isPlaying ? (
              <Pause className="text-white" size={36} fill="currentColor" />
            ) : (
              <Play className="text-white ml-1" size={36} fill="currentColor" />
            )}
          </button>

          {/* Forward 10s */}
          <button 
            onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RotateCw size={28} />
          </button>

          {/* Skip Forward */}
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <SkipForward size={32} />
          </button>
        </div>
      </div>

      {/* Favorite */}
      <div className="px-8 flex justify-center">
        <button className="text-gray-400 hover:text-primary-pink transition-colors">
          <Heart size={28} />
        </button>
      </div>

      <BottomNav />
    </div>
  )
}