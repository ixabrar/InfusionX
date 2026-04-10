import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import LeaderboardRow from './LeaderboardRow'

export default function LeaderboardSection({ participants, currentEvent }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    if (!searchQuery) return participants
    return participants.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [participants, searchQuery])

  const maxScore = participants[0]?.score || 1

  return (
    <div
      id="leaderboard-section"
      className="max-w-[1200px] mx-auto px-10 py-20"
      style={{ background: '#080C10' }}
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-10 flex-col sm:flex-row sm:items-end">
        <div>
          <div className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
            // FULL RANKINGS
          </div>
          <h2 className="font-hero leading-none" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            POWER
            <br />
            RANKINGS
          </h2>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* List */}
      <div className="flex flex-col gap-[10px]">
        {filtered.length > 0 ? (
          filtered.map((person, i) => {
            const globalRank = participants.indexOf(person) + 1
            const pct = Math.round((person.score / maxScore) * 100)
            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
              >
                <LeaderboardRow
                  person={person}
                  rank={globalRank}
                  percentage={pct}
                  currentEvent={currentEvent}
                />
              </motion.div>
            )
          })
        ) : (
          <div className="text-center py-[60px] text-muted font-mono text-[13px] tracking-[0.2em]">
            NO COMBATANTS FOUND
          </div>
        )}
      </div>
    </div>
  )
}
