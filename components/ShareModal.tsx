'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Copy, MessageCircle } from 'lucide-react'

interface ShareModalProps {
  slug: string
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ slug, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/q/${slug}` : `https://askthem.app/q/${slug}`
  const whatsappText = `I have a question for you! Can you answer this? ${shareUrl}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleWhatsApp = () => {
    window.open(whatsappUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1621] border-2 border-[#ff006e] rounded-sm max-w-md w-full p-8"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2 className="font-display text-3xl font-bold text-[#ff006e] mb-2">
                Share Your Question
              </h2>
              <p className="text-[#9a8fa5] text-sm mb-6">
                Send this link to anyone and ask them to answer
              </p>

              {/* URL Display */}
              <div className="bg-[#0a0a0f] border border-[#2d1f3d] rounded-sm p-4 mb-6">
                <p className="text-[#f5f1ed] text-sm font-mono break-all text-xs leading-relaxed">
                  {shareUrl}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {/* Copy Button */}
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all border-2 ${
                    copied
                      ? 'bg-[#00d084] border-[#00d084] text-[#0a0a0f]'
                      : 'bg-[#ff006e] border-[#ff006e] text-[#0a0a0f] hover:bg-[#ff1493]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm font-bold uppercase tracking-widest text-sm border-2 bg-[#25D366] border-[#25D366] text-white hover:bg-[#20ba5a] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send via WhatsApp
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-sm font-bold uppercase tracking-widest text-sm border-2 bg-transparent border-[#2d1f3d] text-[#f5f1ed] hover:border-[#ff006e] transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
