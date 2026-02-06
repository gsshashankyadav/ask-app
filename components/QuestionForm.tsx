'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ShareModal } from './ShareModal'

const BACKGROUND_OPTIONS = [
  { id: 'gradient-1', name: 'Sunset Pulse', bg: 'from-[#ff006e] via-[#8338ec] to-[#3a86ff]' },
  { id: 'gradient-2', name: 'Midnight Oil', bg: 'from-[#0a0a0f] via-[#2d1f3d] to-[#1a1621]' },
  { id: 'gradient-3', name: 'Electric Storm', bg: 'from-[#ffb703] via-[#fb5607] to-[#ff006e]' },
  { id: 'gradient-4', name: 'Deep Space', bg: 'from-[#1a1621] via-[#0a0a0f] to-[#2d1f3d]' },
]

export function QuestionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBg, setSelectedBg] = useState('gradient-1')
  const [showShareModal, setShowShareModal] = useState(false)
  const [slug, setSlug] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    question: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          backgroundImage: selectedBg,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSlug(data.slug)
        setShowShareModal(true)
        // Reset form
        setFormData({ name: '', question: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1621] to-[#0a0a0f] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div  className="mb-12 text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-3 text-[#ff006e] tracking-wider">
            ASK
          </h1>
          <p className="text-[#f5f1ed] text-lg font-light tracking-wide">
            Create a playful question. The no button will run away.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-6" >
          {/* Name */}
          <div>
            <label className="block text-[#f5f1ed] text-sm font-medium mb-2 uppercase tracking-wider">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-[#2d1f3d] border-2 border-[#ff006e] rounded-sm px-4 py-3 text-[#f5f1ed] placeholder-[#9a8fa5] focus:outline-none focus:ring-2 focus:ring-[#ff006e] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
              placeholder="Your name"
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-[#f5f1ed] text-sm font-medium mb-2 uppercase tracking-wider">
              Your Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              rows={3}
              className="w-full bg-[#2d1f3d] border-2 border-[#ff006e] rounded-sm px-4 py-3 text-[#f5f1ed] placeholder-[#9a8fa5] focus:outline-none focus:ring-2 focus:ring-[#ff006e] focus:ring-offset-2 focus:ring-offset-[#0a0a0f] resize-none"
              placeholder="Ask something... (yes/no question)"
            />
          </div>

          {/* Background Selector */}
          <motion.div >
            <label className="block text-[#f5f1ed] text-sm font-medium mb-3 uppercase tracking-wider">
              Background Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {BACKGROUND_OPTIONS.map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedBg(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-20 rounded-sm border-2 transition-all ${
                    selectedBg === option.id
                      ? 'border-[#ff006e] ring-2 ring-[#ff006e]'
                      : 'border-[#2d1f3d]'
                  } overflow-hidden group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.bg}`} />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="relative text-xs font-bold text-white uppercase px-2 h-full flex items-center">
                    {option.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#ff006e] text-[#0a0a0f] font-bold py-4 rounded-sm text-lg uppercase tracking-widest hover:bg-[#ff1493] disabled:opacity-50 transition-all mt-8 border-2 border-[#ff006e]"
          >
            {isLoading ? 'Creating...' : 'Create & Share'}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p  className="text-center text-[#9a8fa5] text-xs mt-8 uppercase tracking-wide">
          Share the link and see if they dare to click YES
        </motion.p>

        {/* Share Modal */}
        <ShareModal slug={slug} isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      </motion.div>
    </motion.div>
  )
}
