'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Music, Headphones, Heart, ChevronRight } from 'lucide-react'
import Cookies from 'js-cookie'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: Music,
      title: "Welcome to iPlayMusic",
      description: "Your personal music streaming experience starts here"
    },
    {
      icon: Headphones,
      title: "Discover New Music",
      description: "Explore millions of songs and create your perfect playlist"
    },
    {
      icon: Heart,
      title: "Save Your Favorites",
      description: "Build your library and never lose track of songs you love"
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding færdig
      Cookies.set('hasCompletedOnboarding', 'true', { expires: 365 })
      router.push('/home')
    }
  }

  const handleSkip = () => {
    Cookies.set('hasCompletedOnboarding', 'true', { expires: 365 })
    router.push('/home')
  }

  const CurrentIcon = steps[currentStep].icon

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-pink to-primary-orange flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-8">
          <button
            onClick={handleSkip}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            Skip
          </button>
        </div>

        <div className="text-center text-white space-y-8">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CurrentIcon size={64} className="text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              {steps[currentStep].title}
            </h2>
            <p className="text-white/80 text-lg">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-white text-primary-pink font-semibold text-lg rounded-full hover:bg-white/90 transition-all flex items-center justify-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}