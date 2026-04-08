import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminPage({
  state,
  setState,
  currentEvent,
  onEventSwitch,
  onUpdateScore,
  onAddParticipant,
}) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [scoreInput, setScoreInput] = useState('')
  const [filterSearch, setFilterSearch] = useState('')

  const allParticipants = state[currentEvent]
  const participants = [...allParticipants].sort((a, b) => b.score - a.score)
  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(filterSearch.toLowerCase())
  )

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
    <div className="min-h-screen" style={{ background: '#080C10', color: '#F0F4F8' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b px-10 py-5"
        style={{
          background: 'rgba(13,19,24,0.95)',
          borderColor: 'rgba(0,255,135,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="font-hero text-3xl tracking-[0.1em] text-accent hover:text-accent/80 transition-colors"
            style={{ textShadow: '0 0 20px rgba(0,255,135,0.35)' }}
          >
            ⚙ ADMIN
          </Link>
          <Link
            to="/"
            className="font-mono text-xs tracking-[0.2em] px-4 py-2 rounded transition-all"
            style={{
              border: '1px solid rgba(0,255,135,0.3)',
              background: 'rgba(0,255,135,0.12)',
              color: '#00FF87',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,255,135,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,255,135,0.12)'
            }}
          >
            ← BACK TO LEADERBOARD
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-10 py-12">
        {/* Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-hero text-5xl tracking-[0.1em] mb-2">
            ADMIN <span className="text-accent">DASHBOARD</span>
          </h1>
          <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            MANAGE PARTICIPANTS & SCORES
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Event Switcher */}
            <motion.div
              className="rounded-lg p-6 border"
              style={{
                background: 'rgba(13,19,24,0.5)',
                borderColor: 'rgba(0,255,135,0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
                SELECT EVENT
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onEventSwitch('promptverse')}
                  className="font-mono text-xs tracking-[0.1em] py-3 px-4 rounded transition-all w-full"
                  style={{
                    background:
                      currentEvent === 'promptverse'
                        ? 'rgba(0,255,135,0.15)'
                        : 'rgba(255,255,255,0.05)',
                    border:
                      currentEvent === 'promptverse'
                        ? '1px solid #00FF87'
                        : '1px solid rgba(255,255,255,0.1)',
                    color: currentEvent === 'promptverse' ? '#00FF87' : '#6B7280',
                  }}
                  onMouseEnter={(e) => {
                    if (currentEvent !== 'promptverse') {
                      e.target.style.background = 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentEvent !== 'promptverse') {
                      e.target.style.background = 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  🎯 PROMPTVERSE
                </button>
                <button
                  onClick={() => onEventSwitch('blindcoding')}
                  className="font-mono text-xs tracking-[0.1em] py-3 px-4 rounded transition-all w-full"
                  style={{
                    background:
                      currentEvent === 'blindcoding'
                        ? 'rgba(0,255,135,0.15)'
                        : 'rgba(255,255,255,0.05)',
                    border:
                      currentEvent === 'blindcoding'
                        ? '1px solid #00FF87'
                        : '1px solid rgba(255,255,255,0.1)',
                    color: currentEvent === 'blindcoding' ? '#00FF87' : '#6B7280',
                  }}
                  onMouseEnter={(e) => {
                    if (currentEvent !== 'blindcoding') {
                      e.target.style.background = 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentEvent !== 'blindcoding') {
                      e.target.style.background = 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  💻 BLIND CODING
                </button>
              </div>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div
              className="grid grid-cols-1 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div
                className="rounded-lg p-4 border text-center"
                style={{
                  background: 'rgba(13,19,24,0.5)',
                  borderColor: 'rgba(0,255,135,0.2)',
                }}
              >
                <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                  Participants
                </div>
                <div className="font-hero text-4xl text-accent">
                  {allParticipants.length}
                </div>
              </div>

              <div
                className="rounded-lg p-4 border text-center"
                style={{
                  background: 'rgba(13,19,24,0.5)',
                  borderColor: 'rgba(255,215,0,0.2)',
                }}
              >
                <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                  Top Score
                </div>
                <div className="font-hero text-4xl" style={{ color: '#FFD700' }}>
                  {participants[0]?.score || 0}
                </div>
              </div>

              <div
                className="rounded-lg p-4 border text-center"
                style={{
                  background: 'rgba(13,19,24,0.5)',
                  borderColor: 'rgba(0,255,135,0.2)',
                }}
              >
                <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                  Average
                </div>
                <div className="font-hero text-4xl text-accent">
                  {allParticipants.length > 0
                    ? Math.round(
                        allParticipants.reduce((sum, p) => sum + p.score, 0) /
                          allParticipants.length
                      )
                    : 0}
                </div>
              </div>

              <div
                className="rounded-lg p-4 border text-center"
                style={{
                  background: 'rgba(13,19,24,0.5)',
                  borderColor: 'rgba(205,127,50,0.2)',
                }}
              >
                <div className="font-mono text-xs text-muted tracking-[0.15em] uppercase mb-2">
                  Total Points
                </div>
                <div className="font-hero text-4xl" style={{ color: '#CD7F32' }}>
                  {allParticipants.reduce((sum, p) => sum + p.score, 0)}
                </div>
              </div>
            </motion.div>

            {/* Add Participant */}
            <motion.div
              className="rounded-lg p-6 border"
              style={{
                background: 'rgba(13,19,24,0.5)',
                borderColor: 'rgba(0,255,135,0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
                ADD PARTICIPANT
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter participant name..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                  className="font-mono text-xs px-4 py-3 rounded outline-none text-text w-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <button
                  onClick={handleAddParticipant}
                  className="font-mono text-xs tracking-[0.1em] py-3 px-4 rounded transition-all w-full font-bold"
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
                  + ADD PARTICIPANT
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Participants Table */}
          <motion.div
            className="lg:col-span-2 rounded-lg border"
            style={{
              background: 'rgba(13,19,24,0.5)',
              borderColor: 'rgba(0,255,135,0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(0,255,135,0.2)' }}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="font-hero text-2xl tracking-[0.05em] text-accent">
                    PARTICIPANTS
                  </h2>
                  <p className="font-mono text-xs text-muted tracking-[0.1em] mt-1">
                    {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'} TOURNAMENT
                  </p>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search name..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="font-mono text-xs px-4 py-2 rounded outline-none text-text w-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(0,255,135,0.2)',
                      background: 'rgba(0,255,135,0.05)',
                    }}
                  >
                    <th className="font-mono text-xs tracking-[0.15em] text-accent uppercase px-6 py-4 text-left">
                      #
                    </th>
                    <th className="font-mono text-xs tracking-[0.15em] text-accent uppercase px-6 py-4 text-left">
                      Name
                    </th>
                    <th className="font-mono text-xs tracking-[0.15em] text-accent uppercase px-6 py-4 text-center">
                      Score
                    </th>
                    <th className="font-mono text-xs tracking-[0.15em] text-accent uppercase px-6 py-4 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((person, idx) => {
                      const globalRank = participants.indexOf(person) + 1
                      const rankColor =
                        globalRank === 1 ? '#FFD700' : globalRank === 2 ? '#C0C0C0' : globalRank === 3 ? '#CD7F32' : '#6B7280'

                      return (
                        <motion.tr
                          key={person.id}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: globalRank <= 3 ? 'rgba(0,255,135,0.03)' : 'transparent',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <td className="font-hero text-lg px-6 py-4" style={{ color: rankColor }}>
                            {globalRank}
                          </td>
                          <td className="font-body text-sm px-6 py-4">
                            <div>{person.name}</div>
                            <div className="font-mono text-xs text-muted">{person.initials}</div>
                          </td>
                          <td className="font-mono text-sm font-bold px-6 py-4 text-center">
                            {editingId === person.id ? (
                              <input
                                type="number"
                                value={scoreInput}
                                onChange={(e) => setScoreInput(e.target.value)}
                                className="w-20 font-mono text-xs px-2 py-1 rounded text-center outline-none"
                                style={{
                                  background: 'rgba(0,255,135,0.1)',
                                  border: '1px solid #00FF87',
                                  color: '#F0F4F8',
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => startEdit(person.id, person.score)}
                                className="cursor-pointer text-accent hover:text-accent/70 transition-colors"
                                title="Click to edit"
                              >
                                {person.score}
                              </span>
                            )}
                          </td>
                          <td className="font-mono text-sm px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {editingId === person.id ? (
                                <>
                                  <button
                                    onClick={() => saveEdit(person.id)}
                                    className="px-3 py-1 rounded text-xs font-bold transition-all"
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
                                    ✓ SAVE
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingId(null)
                                      setScoreInput('')
                                    }}
                                    className="px-3 py-1 rounded text-xs font-bold transition-all"
                                    style={{
                                      background: 'rgba(255,68,68,0.15)',
                                      border: '1px solid #ff6b6b',
                                      color: '#ff6b6b',
                                    }}
                                  >
                                    ✕ CANCEL
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => onUpdateScore(person.id, -10)}
                                    className="w-8 h-8 rounded font-mono text-xs flex items-center justify-center transition-all"
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
                                    className="w-8 h-8 rounded font-mono text-xs flex items-center justify-center transition-all"
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
                                </>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-muted font-mono text-xs">
                        NO PARTICIPANTS FOUND
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
