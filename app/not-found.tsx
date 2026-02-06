'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#2d1f3d] to-[#1a1621] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated glitch effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#ff006e] rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 */}
        <motion.div
          
          className="mb-8"
        >
          <div className="font-display text-9xl md:text-10xl font-bold bg-gradient-to-r from-[#ff006e] to-[#8338ec] bg-clip-text text-transparent">
            404
          </div>
        </motion.div>

        {/* Main text */}
        <motion.h1
          
          className="font-display text-5xl md:text-6xl font-bold text-[#f5f1ed] mb-4 leading-tight"
        >
          Question Not Found
        </motion.h1>

        <motion.p
          
          className="text-[#f5f1ed]/70 text-xl md:text-2xl mb-8"
        >
          Either this link is broken, or the question was already answered.
        </motion.p>

        <motion.p
          
          className="text-[#ff006e] text-lg mb-12 uppercase tracking-wider font-medium"
        >
          The button got away!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#ff006e] text-[#0a0a0f] font-bold text-lg uppercase tracking-widest rounded-sm border-3 border-[#ff006e] hover:bg-transparent hover:text-[#ff006e] transition-all"
          >
            Start Over
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
