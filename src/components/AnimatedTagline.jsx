import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedTagline() {
  const taglines = [
    'ENTER THE ARENA',
    'CHALLENGE THE ARENA',
    'COMPETE THE ARENA',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const lines = taglines[currentIndex].split(' ')

  return (
    <motion.div
      className="font-hero text-center"
      style={{
        fontSize: 'clamp(56px, 10vw, 130px)',
        lineHeight: 0.9,
        letterSpacing: '0.02em',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {lines[0]}
          <br />
          {lines[1]} <span className="text-accent" style={{ textShadow: '0 0 40px rgba(0,255,135,0.35)' }}>{lines[2]}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
