import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide after hero section (approximately 900px)
  const isHeroVisible = scrollY < 900
  return (
    <header
      className="w-full py-8 fixed top-0 left-0 right-0 z-40 transition-opacity duration-300"
      style={{
        background: 'transparent',
        borderColor: 'transparent',
        backdropFilter: 'none',
        opacity: isHeroVisible ? 1 : 0,
        pointerEvents: isHeroVisible ? 'auto' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-10">
        {/* Main Badge Container - Left Aligned */}
        <div className="space-y-5 w-fit ml-[-75px]">
          {/* Title */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="text-xs font-black tracking-[0.4em] mb-2"
              style={{
                color: '#00FF87',
                textShadow: '0 0 20px rgba(0,255,135,0.7), 2px 2px 0 rgba(0,0,0,0.5)',
                letterSpacing: '0.4em',
                fontStyle: 'italic',
                transform: 'skewX(-10deg)',
              }}
            >
              PARTNERSHIP
            </div>
            
            {/* Decorative line */}
            <motion.div
              className="flex items-center gap-1 mb-1"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div style={{
                width: '10px',
                height: '0.5px',
                background: 'linear-gradient(90deg, rgba(0,255,135,0.8), transparent)',
                boxShadow: '0 0 8px rgba(0,255,135,0.3)',
              }} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '6px' }}>~~~</span>
              <div style={{
                width: '10px',
                height: '0.5px',
                background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.8))',
                boxShadow: '0 0 8px rgba(0,255,135,0.3)',
              }} />
            </motion.div>
          </motion.div>

          {/* Main Collaboration Text */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              {/* AIDS */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
                style={{
                  transform: 'skewX(-8deg)',
                }}
              >
                <div 
                  style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#00FF87',
                    textShadow: '0 0 20px rgba(0,255,135,0.8), -2px -2px 0 rgba(0,255,135,0.3)',
                    letterSpacing: '-0.05em',
                    lineHeight: '1',
                    fontStyle: 'italic',
                  }}
                >
                  AIDS
                </div>
              </motion.div>

              {/* X Symbol - Artistic */}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center justify-center"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              >
                <div 
                  style={{
                    fontSize: '40px',
                    fontWeight: '900',
                    color: '#00FF87',
                    textShadow: '0 0 25px rgba(0,255,135,0.9), inset 0 0 15px rgba(0,255,135,0.3)',
                    transform: 'scaleX(1.2)',
                    lineHeight: '1',
                  }}
                >
                  ✕
                </div>
              </motion.div>

              {/* INFUSION X */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
                style={{
                  transform: 'skewX(-8deg)',
                }}
              >
                <div className="flex items-baseline gap-0.5">
                  <div 
                    style={{
                      fontSize: '24px',
                      fontWeight: '900',
                      color: '#00FF87',
                      textShadow: '0 0 20px rgba(0,255,135,0.8), -2px -2px 0 rgba(0,255,135,0.3)',
                      letterSpacing: '-0.05em',
                      lineHeight: '1',
                      fontStyle: 'italic',
                    }}
                  >
                    INFUSION
                  </div>
                  <div 
                    style={{
                      fontSize: '32px',
                      fontWeight: '900',
                      color: '#00FF87',
                      textShadow: '0 0 25px rgba(0,255,135,0.9)',
                      letterSpacing: '-0.1em',
                      lineHeight: '1',
                    }}
                  >
                    X
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Bottom Line */}
          <motion.div
            className="flex items-center gap-0.5"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div style={{
              width: '20px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(0,255,135,0.6), transparent)',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '8px', letterSpacing: '0.15em' }}>•••</span>
            <div style={{
              width: '20px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.6))',
            }} />
          </motion.div>
        </div>
      </div>

      {/* Glow Background Effect - Left Side */}
      <motion.div
        className="absolute -z-10"
        style={{
          background: 'radial-gradient(circle at left, rgba(0,255,135,0.1) 0%, transparent 60%)',
          height: '250px',
          width: '400px',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </header>
  )
}
