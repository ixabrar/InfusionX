import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CollaborationBadge from '../components/CollaborationBadge'

export default function NewEntriesPage({ onAddParticipant }) {
  const [blindcodingName, setBlindcodingName] = useState('')
  const [promptverseName, setPromptverseName] = useState('')
  const [successBlindc, setSuccessBlindc] = useState(false)
  const [successPrompt, setSuccessPrompt] = useState(false)
  const navigate = useNavigate()

  const handleAddBlindcoding = () => {
    if (blindcodingName.trim()) {
      // Call Firebase add function for blindcoding
      onAddParticipant('blindcoding', blindcodingName)
      setBlindcodingName('')
      setSuccessBlindc(true)
      setTimeout(() => setSuccessBlindc(false), 2000)
    }
  }

  const handleAddPromptverse = () => {
    if (promptverseName.trim()) {
      // Call Firebase add function for promptverse
      onAddParticipant('promptverse', promptverseName)
      setPromptverseName('')
      setSuccessPrompt(true)
      setTimeout(() => setSuccessPrompt(false), 2000)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#080C10', color: '#F0F4F8' }}>
      {/* Header with Collaboration Badge */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'rgba(0,255,135,0.2)', background: 'rgba(8,12,16,0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-hero text-2xl tracking-[0.1em] text-accent hover:text-accent/80 transition-colors"
          >
            ← BACK
          </button>
          
          <div className="flex-1 flex justify-center">
            <CollaborationBadge />
          </div>

          <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            ON-SPOT REGISTRATION
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-hero text-5xl tracking-[0.1em] mb-4">
            NEW <span className="text-accent">ENTRIES</span>
          </h1>
          <p className="font-mono text-sm tracking-[0.15em] text-muted uppercase">
            Register participants for both events
          </p>
        </motion.div>

        {/* Two Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blind Coding Panel */}
          <motion.div
            className="rounded-xl p-8 border"
            style={{
              background: 'rgba(13,19,24,0.6)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
              boxShadow: '0 0 30px rgba(147, 112, 219, 0.15)',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ boxShadow: '0 0 40px rgba(147, 112, 219, 0.25)' }}
          >
            {/* Panel Header */}
            <div className="mb-8 pb-6 border-b" style={{ borderColor: 'rgba(147, 112, 219, 0.3)' }}>
              <div className="text-4xl mb-2">👨‍💻</div>
              <h2 className="font-hero text-3xl tracking-[0.1em]" style={{ color: '#9370DB' }}>
                BLIND CODING
              </h2>
              <p className="font-mono text-xs tracking-[0.15em] text-muted mt-2 uppercase">
                Code without seeing output
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              <label className="font-mono text-xs tracking-[0.2em] text-muted uppercase block">
                Participant Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter name..."
                  value={blindcodingName}
                  onChange={(e) => setBlindcodingName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddBlindcoding()}
                  className="w-full font-mono text-sm px-4 py-3 rounded-lg outline-none text-text transition-all"
                  style={{
                    background: 'rgba(147, 112, 219, 0.1)',
                    border: '2px solid rgba(147, 112, 219, 0.3)',
                    borderColor: blindcodingName ? 'rgba(147, 112, 219, 0.6)' : 'rgba(147, 112, 219, 0.3)',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleAddBlindcoding}
              disabled={!blindcodingName.trim()}
              className="w-full font-mono text-sm tracking-[0.1em] py-3 px-4 rounded-lg transition-all font-bold uppercase disabled:opacity-50"
              style={{
                background: successBlindc ? 'rgba(76, 175, 80, 0.3)' : 'rgba(147, 112, 219, 0.2)',
                border: successBlindc ? '2px solid #4CAF50' : '2px solid rgba(147, 112, 219, 0.5)',
                color: successBlindc ? '#4CAF50' : '#9370DB',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {successBlindc ? '✓ ADDED' : '+ ADD PARTICIPANT'}
            </motion.button>

            {/* Info Section */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(147, 112, 219, 0.2)' }}>
              <div className="font-mono text-xs text-muted space-y-2">
                <div>• Starting Score: 0 points</div>
                <div>• Score can be updated in admin</div>
                <div>• Instant registration</div>
              </div>
            </div>
          </motion.div>

          {/* Prompt Verse Panel */}
          <motion.div
            className="rounded-xl p-8 border"
            style={{
              background: 'rgba(13,19,24,0.6)',
              borderColor: 'rgba(0, 188, 212, 0.4)',
              boxShadow: '0 0 30px rgba(0, 188, 212, 0.15)',
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ boxShadow: '0 0 40px rgba(0, 188, 212, 0.25)' }}
          >
            {/* Panel Header */}
            <div className="mb-8 pb-6 border-b" style={{ borderColor: 'rgba(0, 188, 212, 0.3)' }}>
              <div className="text-4xl mb-2">🤖</div>
              <h2 className="font-hero text-3xl tracking-[0.1em]" style={{ color: '#00BCD4' }}>
                PROMPT VERSE
              </h2>
              <p className="font-mono text-xs tracking-[0.15em] text-muted mt-2 uppercase">
                Master the art of prompting
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              <label className="font-mono text-xs tracking-[0.2em] text-muted uppercase block">
                Participant Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter name..."
                  value={promptverseName}
                  onChange={(e) => setPromptverseName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPromptverse()}
                  className="w-full font-mono text-sm px-4 py-3 rounded-lg outline-none text-text transition-all"
                  style={{
                    background: 'rgba(0, 188, 212, 0.1)',
                    border: '2px solid rgba(0, 188, 212, 0.3)',
                    borderColor: promptverseName ? 'rgba(0, 188, 212, 0.6)' : 'rgba(0, 188, 212, 0.3)',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleAddPromptverse}
              disabled={!promptverseName.trim()}
              className="w-full font-mono text-sm tracking-[0.1em] py-3 px-4 rounded-lg transition-all font-bold uppercase disabled:opacity-50"
              style={{
                background: successPrompt ? 'rgba(76, 175, 80, 0.3)' : 'rgba(0, 188, 212, 0.2)',
                border: successPrompt ? '2px solid #4CAF50' : '2px solid rgba(0, 188, 212, 0.5)',
                color: successPrompt ? '#4CAF50' : '#00BCD4',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {successPrompt ? '✓ ADDED' : '+ ADD PARTICIPANT'}
            </motion.button>

            {/* Info Section */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(0, 188, 212, 0.2)' }}>
              <div className="font-mono text-xs text-muted space-y-2">
                <div>• Starting Score: 0 points</div>
                <div>• Score can be updated in admin</div>
                <div>• Instant registration</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => navigate('/')}
            className="font-mono text-xs tracking-[0.2em] px-8 py-3 rounded-lg transition-all uppercase"
            style={{
              background: 'rgba(0,255,135,0.1)',
              border: '1px solid rgba(0,255,135,0.3)',
              color: '#00FF87',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,255,135,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,255,135,0.1)'
            }}
          >
            ← BACK TO LEADERBOARD
          </button>
        </motion.div>
      </main>
    </div>
  )
}
