'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

interface QuestionData {
  name: string
  question: string
  backgroundImage: string
}

const GRADIENT_BACKGROUNDS: Record<string, string> = {
  'gradient-1': 'from-[#ff006e] via-[#8338ec] to-[#3a86ff]',
  'gradient-2': 'from-[#0a0a0f] via-[#2d1f3d] to-[#1a1621]',
  'gradient-3': 'from-[#ffb703] via-[#fb5607] to-[#ff006e]',
  'gradient-4': 'from-[#1a1621] via-[#0a0a0f] to-[#2d1f3d]',
}

export function QuestionDisplay({ initialData }: { initialData: QuestionData }) {
  const router = useRouter()
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const slug = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHovering(window.innerWidth < 768)
    }
  }, [])

  const getRandomPosition = () => {
    if (!noButtonRef.current) return { x: 0, y: 0 }
    
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const buttonWidth = buttonRect.width
    const buttonHeight = buttonRect.height
    
    const maxX = Math.max(0, window.innerWidth - buttonWidth - 20) // 20px padding
    const maxY = Math.max(0, window.innerHeight - buttonHeight - 20) // 20px padding
    
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    }
  }

  const handleNoMouseEnter = () => {
    if (window.innerWidth > 768) {
      setPosition(getRandomPosition())
      setIsHovering(true)
    }
  }

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition(getRandomPosition())
    // const attempts = Math.random() < 0.2 ? 1 : 0
    // if (attempts > 0) {
    //   handleNo()
    // }
  }

  // const handleNo = async () => {
  //   setIsAnswering(true)
  //   try {
  //     await fetch(`/api/questions/${slug}`, { method: 'POST' })
  //     router.push('/404')
  //   } catch (error) {
  //     console.error('Error:', error)
  //     setIsAnswering(false)
  //   }
  // }

  const handleYes = async () => {
    setIsAnswering(true)
    try {
      const response = await fetch(`/api/questions/${slug}`, { method: 'POST' })
      if (response.ok) {
        setShowSuccessModal(true)
        setIsAnswering(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setIsAnswering(false)
    }
  }

  const gradientClass = GRADIENT_BACKGROUNDS[initialData.backgroundImage] || GRADIENT_BACKGROUNDS['gradient-1']

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center p-6 relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.p
          className="text-white/70 text-lg mb-6 uppercase tracking-wider font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Question from <span className="text-white font-bold">{initialData.name}</span>
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold text-white mb-12 leading-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {initialData.question}
        </motion.h1>

        {/* Buttons Container */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* YES Button - Always clickable */}
          <motion.button
            onClick={handleYes}
            disabled={isAnswering}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-white text-[#ff006e] font-bold text-xl uppercase tracking-widest rounded-sm border-3 border-white hover:bg-[#ff006e] hover:text-white transition-all disabled:opacity-50"
          >
            {isAnswering ? 'Responce Sent...' : 'YES'}
          </motion.button>

          {/* NO Button - Escapes on hover/click */}
          <motion.button
            ref={noButtonRef}
            onMouseEnter={handleNoMouseEnter}
            onClick={handleNoClick}
            animate={isHovering ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            disabled={isAnswering}
            style={isHovering ? { position: 'fixed', left: 0, top: 0 } : {}}
            className="px-12 py-4 bg-transparent text-white font-bold text-xl uppercase tracking-widest rounded-sm border-3 border-white hover:border-white/50 disabled:opacity-50"
          >
            NO
          </motion.button>
        </motion.div>

        {/* Mobile hint */}
        {/* <motion.p
          className="text-white/50 text-sm mt-8 uppercase tracking-wider sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          The NO button is feeling shy...
        </motion.p> */}
      </motion.div>

      {/* Success Modal */}
      {showSuccessModal && (
       <motion.div
  className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${gradientClass} backdrop-blur-md p-6`}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>
  <motion.div
    className="relative w-full max-w-md rounded-sm bg-white p-10 md:p-14 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
    initial={{ y: 20, scale: 0.92, opacity: 0 }}
    animate={{ y: 0, scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
  >
    {/* Accent ring */}
    <div className="absolute -inset-[1px] rounded-sm bg-gradient-to-br from-[#ff006e] to-transparent opacity-40 pointer-events-none" />

    {/* Success Icon */}
    <motion.div
      className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff006e]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 260 }}
    >
      <svg
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>

    {/* Heading */}
    <motion.h2
      className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      Success
    </motion.h2>

    {/* Subtext */}
    <motion.p
      className="mx-auto mb-8 max-w-xs text-sm leading-relaxed text-gray-500"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      Thank you for your answer! I always knew you would say yes.
    </motion.p>

    {/* Action */}
    <motion.button
      onClick={() => router.push('/')}
      className="inline-flex items-center justify-center rounded-sm bg-[#ff006e] px-10 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#d4005c]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      Close
    </motion.button>
  </motion.div>
</motion.div>

        
      )}
    </motion.div>
  )
}
