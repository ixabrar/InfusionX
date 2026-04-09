import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminDashboard({
  isOpen,
  onClose,
  participants,
  currentEvent,
  onEventSwitch,
  onUpdateScore,
  onAddParticipant,
  allParticipants,
  state,
  onResetPoints,
}) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [scoreInput, setScoreInput] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleAddParticipant = () => {
    if (newName.trim()) {
      onAddParticipant(newName)
      setNewName('')
    }
  }

  const startEdit = (id, currentScore) => {
    setEditingId(id)
    setScoreInput(String(currentScore))
  }

  const saveEdit = (id) => {
    const newScore = parseInt(scoreInput) || 0
    const currentScore = allParticipants.find(p => p.id === id)?.score || 0
    const delta = newScore - currentScore
    if (delta !== 0) {
      onUpdateScore(id, delta)
    }
    setEditingId(null)
    setScoreInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Panel */}
          <motion.div
            className="absolute top-0 right-0 h-full w-full md:w-[600px] overflow-y-auto"
            style={{
              background: '#080C10',
              borderLeft: '1px solid rgba(0,255,135,0.2)',
            }}
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            exit={{ x: 600 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div
              className="sticky top-0 px-6 py-5 border-b"
              style={{
                background: 'rgba(13,19,24,0.95)',
                borderColor: 'rgba(0,255,135,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-hero text-2xl tracking-[0.1em] text-accent">⚙ ADMIN DASHBOARD</h2>
                <button
                  onClick={onClose}
                  className="text-2xl text-muted hover:text-accent transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Event Switcher */}
              <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4">
                <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
                  SELECT EVENT
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEventSwitch('promptverse')}
                    className="flex-1 font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                    style={{
                      background: currentEvent === 'promptverse' ? 'rgba(0,255,135,0.15)' : 'rgba(255,255,255,0.05)',
                      border: currentEvent === 'promptverse' ? '1px solid #00FF87' : '1px solid rgba(255,255,255,0.1)',
                      color: currentEvent === 'promptverse' ? '#00FF87' : '#6B7280',
                    }}
                  >
                    PromptVerse
                  </button>
                  <button
                    onClick={() => onEventSwitch('blindcoding')}
                    className="flex-1 font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                    style={{
                      background: currentEvent === 'blindcoding' ? 'rgba(0,255,135,0.15)' : 'rgba(255,255,255,0.05)',
                      border: currentEvent === 'blindcoding' ? '1px solid #00FF87' : '1px solid rgba(255,255,255,0.1)',
                      color: currentEvent === 'blindcoding' ? '#00FF87' : '#6B7280',
                    }}
                  >
                    Blind Coding
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4 text-center">
                  <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                    Total Participants
                  </div>
                  <div className="font-hero text-3xl text-accent">
                    {allParticipants.length}
                  </div>
                </div>
                <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4 text-center">
                  <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                    Top Score
                  </div>
                  <div className="font-hero text-3xl text-gold">
                    {participants[0]?.score || 0}
                  </div>
                </div>
              </div>

              {/* Add Participant */}
              <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4">
                <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
                  ADD NEW PARTICIPANT
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                    className="flex-1 font-mono text-xs px-3 py-2 rounded outline-none text-text"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                  <button
                    onClick={handleAddParticipant}
                    className="font-mono text-xs tracking-[0.1em] px-4 py-2 rounded transition-all"
                    style={{
                      background: 'rgba(0,255,135,0.15)',
                      border: '1px solid #00FF87',
                      color: '#00FF87',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(0,255,135,0.25)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(0,255,135,0.15)'
                    }}
                  >
                    + ADD
                  </button>
                </div>
              </div>

              {/* Participants Table */}
              <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4">
                <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
                  PARTICIPANTS ({allParticipants.length})
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {allParticipants.length > 0 ? (
                    allParticipants
                      .sort((a, b) => b.score - a.score)
                      .map((person, idx) => (
                        <motion.div
                          key={person.id}
                          className="flex items-center gap-3 p-3 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          {/* Rank */}
                          <div
                            className="font-hero text-sm min-w-6 text-center"
                            style={{
                              color:
                                idx === 0
                                  ? '#FFD700'
                                  : idx === 1
                                  ? '#C0C0C0'
                                  : idx === 2
                                  ? '#CD7F32'
                                  : 'rgba(255,255,255,0.3)',
                            }}
                          >
                            {idx + 1}
                          </div>

                          {/* Name */}
                          <div className="flex-1">
                            <div className="font-body text-xs text-text">{person.name}</div>
                            <div className="font-mono text-[10px] text-muted">ID: {person.id}</div>
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-2">
                            {editingId === person.id ? (
                              <>
                                <input
                                  type="number"
                                  value={scoreInput}
                                  onChange={(e) => setScoreInput(e.target.value)}
                                  className="w-16 font-mono text-xs px-2 py-1 rounded text-center outline-none text-text"
                                  style={{
                                    background: 'rgba(0,255,135,0.1)',
                                    border: '1px solid #00FF87',
                                  }}
                                  autoFocus
                                />
                                <button
                                  onClick={() => saveEdit(person.id)}
                                  className="px-2 py-1 rounded font-mono text-[10px]"
                                  style={{
                                    background: 'rgba(0,255,135,0.15)',
                                    border: '1px solid #00FF87',
                                    color: '#00FF87',
                                  }}
                                >
                                  ✓
                                </button>
                              </>
                            ) : (
                              <>
                                <div
                                  className="font-mono text-sm font-bold text-accent min-w-12 text-right cursor-pointer hover:text-accent/80 transition-colors"
                                  onClick={() => startEdit(person.id, person.score)}
                                  title="Click to edit"
                                >
                                  {person.score}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => onUpdateScore(person.id, -10)}
                                    className="w-6 h-6 rounded font-mono text-xs flex items-center justify-center transition-all"
                                    style={{
                                      background: 'rgba(255,68,68,0.1)',
                                      border: '1px solid rgba(255,68,68,0.3)',
                                      color: '#ff6b6b',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(255,68,68,0.2)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'rgba(255,68,68,0.1)'
                                    }}
                                  >
                                    −
                                  </button>
                                  <button
                                    onClick={() => onUpdateScore(person.id, 10)}
                                    className="w-6 h-6 rounded font-mono text-xs flex items-center justify-center transition-all"
                                    style={{
                                      background: 'rgba(0,255,135,0.1)',
                                      border: '1px solid rgba(0,255,135,0.3)',
                                      color: '#00FF87',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(0,255,135,0.15)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'rgba(0,255,135,0.1)'
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-muted font-mono text-xs">
                      No participants yet
                    </div>
                  )}
                </div>
              </div>

              {/* Event Stats */}
              <div className="bg-bg-2/50 border border-accent/20 rounded-lg p-4">
                <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
                  EVENT STATS
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Active Event:</span>
                    <span className="text-accent font-bold">
                      {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Participants:</span>
                    <span className="text-text">{allParticipants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Average Score:</span>
                    <span className="text-text">
                      {allParticipants.length > 0
                        ? Math.round(
                            allParticipants.reduce((sum, p) => sum + p.score, 0) /
                              allParticipants.length
                          )
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Total Points:</span>
                    <span className="text-gold">
                      {allParticipants.reduce((sum, p) => sum + p.score, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset Points Section */}
              <div className="bg-bg-2/50 border border-red-500/20 rounded-lg p-4">
                <div className="font-mono text-xs tracking-[0.2em] text-red-500 uppercase mb-4">
                  ⚠ DANGER ZONE
                </div>
                <div className="space-y-3">
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    Reset all participant points to zero for {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'}.This action cannot be undone.
                  </p>
                  {!showResetConfirm ? (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="w-full font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                      style={{
                        background: 'rgba(239,68,68,0.15)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#ef4444',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                      }}
                    >
                      RESET ALL POINTS
                    </button>
                  ) : (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="font-mono text-xs text-red-400">
                        Are you sure? This will reset all points to 0.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onResetPoints()
                            setShowResetConfirm(false)
                          }}
                          className="flex-1 font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                          style={{
                            background: 'rgba(239,68,68,0.25)',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.25)'
                          }}
                        >
                          YES, RESET
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="flex-1 font-mono text-xs tracking-[0.1em] py-2 px-4 rounded transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#6B7280',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                          }}
                        >
                          CANCEL
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
