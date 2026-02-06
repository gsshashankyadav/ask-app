'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export default function SuccessPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff006e] via-[#8338ec] to-[#3a86ff] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Celebration emoji */}
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <div className="font-display text-9xl">🎉</div>
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="font-display text-6xl md:text-7xl font-bold text-white mb-4 leading-tight"
        >
          THEY SAID YES!
        </motion.h1>

        <motion.p
          className="text-white/90 text-xl md:text-2xl mb-8 font-light"
        >
          An email has been sent to the question creator. The link has been permanently disabled.
        </motion.p>

        <motion.p
          className="text-white/70 text-lg mb-12 uppercase tracking-wider"
        >
          Thanks for playing!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-[#ff006e] font-bold text-lg uppercase tracking-widest rounded-sm border-3 border-white hover:bg-[#ff006e] hover:text-white transition-all"
          >
            Create Your Own Question
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
