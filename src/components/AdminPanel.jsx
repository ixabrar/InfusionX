import { motion } from 'framer-motion'

export default function AdminPanel({ onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      title="Admin Dashboard"
      className="fixed bottom-6 right-6 z-200 w-12 h-12 rounded-full flex items-center justify-center transition-all font-mono text-lg"
      style={{
        background: 'rgba(8,12,16,0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: '#6B7280',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#00FF87'
        e.currentTarget.style.color = '#00FF87'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,135,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.color = '#6B7280'
        e.currentTarget.style.boxShadow = 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      ⚙
    </motion.button>
  )
}
