

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio, Heart, Music } from 'lucide-react'

const slides = [
  {
    icon: Radio,
    title: "Where Words Fail,",
    title2: "Music Speaks",
    bg: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    title: "No Music",
    title2: "No Life",
    bg: "from-pink-500 to-orange-500"
  },
  {
    icon: Music,
    title: "Peace.Love",
    title2: "Music",
    bg: "from-orange-500 to-yellow-500"
  }
]

export default function Onboarding() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push('/player')
    }
  }

  const handleSkip = () => {
    router.push('/player')
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className={`min-h-screen bg-linear-to-br ${slide.bg} dark:bg-linear-to-br dark:${slide.bg} flex flex-col items-center justify-between p-8 transition-all duration-500`}>
      {/* Skip Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSkip}
          className="text-white font-semibold text-lg hover:underline"
        >
          SKIP
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-slide-up">
        {/* Icon */}
        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-12">
          <Icon className="text-white" size={64} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          {slide.title}
          <br />
          {slide.title2}
        </h1>
      </div>

      {/* Indicators & Next */}
      <div className="w-full">
        {/* Indicators */}
        <div className="flex justify-center gap-3 mb-8">
          {slides.map((_, index) => {
            const IconComponent = slides[index].icon
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  index === currentSlide
                    ? 'bg-white text-gray-900 scale-110'
                    : 'bg-white/30 text-white'
                }`}
              >
                <IconComponent size={24} />
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
        >
          {currentSlide < slides.length - 1 ? 'NEXT' : 'GET STARTED'}
        </button>
      </div>
    </div>
  )
}