import { motion } from 'framer-motion'

export default function CollaborationBadge() {
  return (
    <motion.div
      className="relative w-full flex justify-center py-6 sm:py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {/* Main Badge Container - Centered */}
      <div className="space-y-3 sm:space-y-4 md:space-y-6 flex flex-col items-center">
        {/* Title */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div 
            className="text-[10px] sm:text-xs md:text-xs font-black tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] mb-2 sm:mb-3"
            style={{
              color: '#00FF87',
              textShadow: '0 0 20px rgba(0,255,135,0.7), 2px 2px 0 rgba(0,0,0,0.5)',
              letterSpacing: '0.3em',
              fontStyle: 'italic',
              transform: 'skewX(-10deg)',
            }}
          >
            PARTNERSHIP
          </div>
          
          {/* Decorative line */}
          <motion.div
            className="flex items-center gap-1 sm:gap-2 md:gap-2 mb-2 sm:mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div style={{
              width: 'clamp(12px, 5vw, 20px)',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(0,255,135,0.8), transparent)',
              boxShadow: '0 0 10px rgba(0,255,135,0.5)',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(8px, 2vw, 10px)' }}>~~~</span>
            <div style={{
              width: 'clamp(12px, 5vw, 20px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.8))',
              boxShadow: '0 0 10px rgba(0,255,135,0.5)',
            }} />
          </motion.div>
        </motion.div>

        {/* Main Collaboration Text */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-baseline gap-1 sm:gap-2 md:gap-3">
            {/* AIDS */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="relative"
              style={{
                transform: 'skewX(-8deg)',
              }}
            >
              <div 
                style={{
                  fontSize: 'clamp(20px, 5vw, 32px)',
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

            {/* X Symbol - Artistic - Continuous Rotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-center justify-center"
              style={{
                width: 'clamp(24px, 6vw, 40px)',
                height: 'clamp(24px, 6vw, 40px)',
              }}
            >
              <motion.div 
                style={{
                  fontSize: 'clamp(28px, 7vw, 48px)',
                  fontWeight: '900',
                  color: '#00FF87',
                  textShadow: '0 0 25px rgba(0,255,135,0.9), inset 0 0 15px rgba(0,255,135,0.3)',
                  transform: 'scaleX(1.2)',
                  lineHeight: '1',
                }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: 1.2 
                }}
              >
                ✕
              </motion.div>
            </motion.div>

            {/* INFUSION X */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="relative"
              style={{
                transform: 'skewX(-8deg)',
              }}
            >
              <div className="flex items-baseline gap-0 sm:gap-1">
                <div 
                  style={{
                    fontSize: 'clamp(18px, 4.5vw, 28px)',
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
                    fontSize: 'clamp(24px, 6vw, 36px)',
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
          className="flex items-center justify-center gap-0.5 sm:gap-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div style={{
            width: 'clamp(20px, 4vw, 30px)',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(0,255,135,0.6), transparent)',
          }} />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(6px, 1vw, 8px)', letterSpacing: '0.15em' }}>•••</span>
          <div style={{
            width: 'clamp(20px, 4vw, 30px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.6))',
          }} />
        </motion.div>
      </div>

      {/* Glow Background Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,135,0.15) 0%, transparent 80%)',
          width: 'clamp(120px, 30vw, 200px)',
          height: 'clamp(120px, 30vw, 200px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}
