import { useState } from 'react'
import { motion } from 'framer-motion'

const ADMIN_PASSWORD = 'admin123' // Change this to your desired password

export default function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate auth delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // No localStorage - auth state maintained in-memory only
        console.log('✅ Admin authenticated (in-memory session)')
        onLoginSuccess()
      } else {
        setError('Invalid password')
        setPassword('')
      }
      setIsLoading(false)
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]"
      style={{ background: 'rgba(8,12,16,0.95)' }}
    >
      <motion.div
        className="w-full max-w-md px-6 py-8 rounded-lg"
        style={{
          background: 'rgba(13,19,24,0.9)',
          border: '1px solid rgba(0,255,135,0.2)',
          boxShadow: '0 0 40px rgba(0,255,135,0.1)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">
            // ADMIN ACCESS
          </div>
          <h1 className="font-hero text-3xl tracking-[0.05em] text-accent">
            SECURED
          </h1>
          <p className="font-mono text-xs tracking-[0.1em] text-muted mt-2">
            Enter password to proceed
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Password Input */}
          <div>
            <label className="block font-mono text-xs tracking-[0.2em] text-text mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded font-mono text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #FF6B6B' : '1px solid rgba(0,255,135,0.3)',
                color: '#F0F4F8',
              }}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="p-3 rounded text-xs font-mono tracking-[0.1em]"
              style={{
                background: 'rgba(255,107,107,0.1)',
                border: '1px solid rgba(255,107,107,0.3)',
                color: '#FF6B6B',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3 rounded font-mono text-sm tracking-[0.2em] uppercase transition-all mt-6"
            style={{
              background: isLoading || !password ? 'rgba(0,255,135,0.1)' : 'rgba(0,255,135,0.12)',
              border: '1px solid rgba(0,255,135,0.3)',
              color: isLoading || !password ? 'rgba(0,255,135,0.5)' : '#00FF87',
              boxShadow: isLoading || !password ? 'none' : '0 0 20px rgba(0,255,135,0.1)',
              cursor: isLoading || !password ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && password) {
                e.currentTarget.style.background = 'rgba(0,255,135,0.2)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,135,0.2)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && password) {
                e.currentTarget.style.background = 'rgba(0,255,135,0.12)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,135,0.1)'
              }
            }}
          >
            {isLoading ? 'Verifying...' : 'Access Admin'}
          </button>
        </form>

        {/* Info Text */}
        <p className="text-center font-mono text-xs tracking-[0.1em] text-muted mt-6">
          Admin panel is password protected
        </p>
      </motion.div>
    </div>
  )
}
