import { motion } from 'framer-motion'
import AnimatedTagline from './AnimatedTagline'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-0"
      style={{ background: '#080C10' }}
    >
      {/* Grid Overlay */}
      <div className="grid-overlay"></div>

      {/* Scan Line */}
      <div className="scan-line"></div>

      {/* Background Text */}
      <motion.div
        className="absolute font-hero tracking-[0.05em] select-none pointer-events-none whitespace-nowrap"
        style={{
          top: '5%',
          left: '-2%',
          fontSize: 'clamp(80px, 18vw, 220px)',
          color: 'rgba(0,255,135,0.04)',
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        LEADERBOARD
      </motion.div>

      <motion.div
        className="absolute font-hero tracking-[0.05em] select-none pointer-events-none whitespace-nowrap"
        style={{
          bottom: '8%',
          right: '-3%',
          fontSize: 'clamp(60px, 12vw, 160px)',
          color: 'rgba(0,255,135,0.025)',
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
      >
        DOMINANCE
      </motion.div>

      {/* Content */}
      <motion.div
        className="font-mono text-xs tracking-[0.3em] text-accent rounded mb-6"
        style={{
          border: '1px solid rgba(0,255,135,0.3)',
          padding: '6px 18px',
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        COLLEGE TECH FEST 2026
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
      >
        <AnimatedTagline />
      </motion.h1>

      <motion.p
        className="font-mono text-center uppercase"
        style={{
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: '#6B7280',
          letterSpacing: '0.15em',
          marginTop: '16px',
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        Where rankings feel like power levels
      </motion.p>

      <motion.div
        className="mt-12 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
      >
        <a href="#podium-section" className="btn-primary">
          ENTER ARENA
        </a>
        <a href="#leaderboard-section" className="btn-ghost">
          VIEW RANKINGS
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted">SCROLL</span>
        <motion.div
          className="w-[1px] h-10"
          style={{
            background: 'linear-gradient(to bottom, #00FF87, transparent)',
          }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
      </motion.div>
    </section>
  )
}
