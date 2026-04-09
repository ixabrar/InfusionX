import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AdminLogout({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin-auth')
    localStorage.removeItem('admin-login-time')
    // Dispatch storage event for other components to sync
    window.dispatchEvent(new Event('storage'))
    if (onLogout) onLogout()
    navigate('/')
  }

  return (
    <motion.button
      onClick={handleLogout}
      className="fixed top-6 right-6 z-50 font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 rounded transition-all"
      style={{
        border: '1px solid rgba(255, 107, 107, 0.3)',
        background: 'rgba(255, 107, 107, 0.12)',
        color: '#FF6B6B',
        boxShadow: '0 0 20px rgba(255, 107, 107, 0.1)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)'
        e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 107, 107, 0.12)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.1)'
      }}
    >
      🔒 Logout
    </motion.button>
  )
}
