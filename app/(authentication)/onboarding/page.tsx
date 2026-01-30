

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio, Heart, Music2 } from 'lucide-react'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Where Words Fail,\nMusic Speaks",
      description: "Experience the emotional power of music that transcends language. Let every note tell your story."
    },
    {
      title: "Discover New\nMusic",
      description: "Explore millions of songs tailored to your taste. Find your next favorite artist today."
    },
    {
      title: "Save Your\nFavorites",
      description: "Build your library and never lose track of songs you love. Your music, your way."
    }
  ]

  const handleIconClick = (index: number) => {
    if (index < steps.length) {
      setCurrentStep(index)
    }
  }

  const handleSkip = () => {
    Cookies.set('hasCompletedOnboarding', 'true', { expires: 365 })
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Bølge baggrund */}
      <div className="absolute top-0 left-0 right-0 h-[55vh]">
        <Image
          src="/images/wave-pattern.png"
          alt="Background pattern"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-8 py-12">
        {/* Tom spacer for bølgemønster */}
        <div className="h-[53vh]" />

        {/* Hovedindhold */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md px-4" style={{ marginBottom: '2rem' }}>
          <h1 className="text-[1.5rem] md:text-5xl font-bold text-gray-900 whitespace-pre-line leading-tight" style={{ marginBottom: '1rem' }}>
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Navigations ikoner */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={() => handleIconClick(0)}
            className={`w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center transition-all ${
              currentStep === 0
                ? 'bg-pink-600'
                : 'bg-white border-[3px] border-gray-900'
            }`}
            aria-label="Step 1"
          >
            <Radio
              size={32}
              className={currentStep === 0 ? 'text-white' : 'text-gray-900'}
              strokeWidth={2.5}
            />
          </button>

          <button
            onClick={() => handleIconClick(1)}
            className={`w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center transition-all ${
              currentStep === 1
                ? 'bg-pink-600'
                : 'bg-white border-[3px] border-gray-900'
            }`}
            aria-label="Step 2"
          >
            <Heart
              size={30}
              className={currentStep === 1 ? 'text-white' : 'text-gray-900'}
              strokeWidth={0}
              fill="currentColor"
            />
          </button>

          <button
            onClick={() => handleIconClick(2)}
            className={`w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center transition-all ${
              currentStep === 2
                ? 'bg-pink-600'
                : 'bg-white border-[3px] border-gray-900'
            }`}
            aria-label="Step 3"
          >
            <Music2
              size={32}
              className={currentStep === 2 ? 'text-white' : 'text-gray-900'}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Skip knap */}
        <button
          onClick={handleSkip}
          className="text-gray-900 font-medium text-sm tracking-[0.15em] hover:text-gray-600 transition-colors pb-4 pt-12"
        >
          SKIP
        </button>
      </div>
    </div>
  )
}