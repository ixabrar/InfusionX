import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const fullText = 'ARENA LOADING'
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let charIndex = 0
    const textInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(textInterval)
        // Show complete text for remaining time before fading out
        setTimeout(() => {
          setIsComplete(true)
          onComplete()
        }, 1000) // 1 second buffer after text completes
      }
    }, 120) // Adjust speed of character appearance

    return () => clearInterval(textInterval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#080C10',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      pointerEvents={isComplete ? 'none' : 'auto'}
    >
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,255,135,0.05) 25%, rgba(0,255,135,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,135,0.05) 75%, rgba(0,255,135,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,255,135,0.05) 25%, rgba(0,255,135,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,135,0.05) 75%, rgba(0,255,135,0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Scan Line Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, transparent 0%, rgba(0,255,135,0.1) 50%, transparent 100%)',
          height: '4px',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Loading Text with Character Animation */}
        <motion.div
          className="text-6xl font-black tracking-[0.1em] mb-12"
          style={{
            color: '#00FF87',
            textShadow: '0 0 30px rgba(0,255,135,0.6), 0 0 60px rgba(0,255,135,0.3)',
            fontFamily: 'monospace',
            minHeight: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {displayedText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              style={{
                display: 'inline-block',
                textShadow: `0 0 ${10 + index * 2}px rgba(0,255,135,0.8)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          {displayedText.length < fullText.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                display: 'inline-block',
                marginLeft: '4px',
              }}
            >
              _
            </motion.span>
          )}
        </motion.div>

        {/* Loading Bar */}
        <div
          style={{
            width: '300px',
            height: '3px',
            background: 'rgba(0,255,135,0.2)',
            borderRadius: '2px',
            margin: '0 auto 20px',
            overflow: 'hidden',
            border: '1px solid rgba(0,255,135,0.3)',
            boxShadow: '0 0 15px rgba(0,255,135,0.2)',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, transparent, #00FF87, transparent)',
              backgroundSize: '200% 100%',
              boxShadow: '0 0 10px rgba(0,255,135,0.8)',
            }}
            animate={{
              backgroundPosition: ['200% center', '-200% center'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Status Text */}
        <motion.p
          className="font-mono text-xs tracking-[0.15em]"
          style={{
            color: 'rgba(0,255,135,0.6)',
            textShadow: '0 0 10px rgba(0,255,135,0.4)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INITIALIZING SYSTEM...
        </motion.p>
      </div>

      {/* Floating Glitch Effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,135,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  )
}
