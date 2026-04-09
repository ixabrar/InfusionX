import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import LeaderboardRow from './LeaderboardRow'

export default function DualLeaderboardSection({ state }) {
  const [searchPromptverse, setSearchPromptverse] = useState('')
  const [searchBlindcoding, setSearchBlindcoding] = useState('')

  const filteredPromptverse = useMemo(() => {
    const sorted = [...state.promptverse].sort((a, b) => b.score - a.score)
    if (!searchPromptverse) return sorted
    return sorted.filter(p =>
      p.name.toLowerCase().includes(searchPromptverse.toLowerCase())
    )
  }, [state.promptverse, searchPromptverse])

  const filteredBlindcoding = useMemo(() => {
    const sorted = [...state.blindcoding].sort((a, b) => b.score - a.score)
    if (!searchBlindcoding) return sorted
    return sorted.filter(p =>
      p.name.toLowerCase().includes(searchBlindcoding.toLowerCase())
    )
  }, [state.blindcoding, searchBlindcoding])

  const getMaxScore = (participants) => {
    return participants[0]?.score || 1
  }

  const renderLeaderboard = (participants, eventName, searchValue, onSearchChange) => {
    const maxScore = getMaxScore(participants)

    return (
      <div className="w-full lg:w-1/2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-10">
          <div>
            <div className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-2 md:mb-3">
              // {eventName.toUpperCase()} RANKINGS
            </div>
            <h2 className="font-hero leading-none" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              {eventName === 'promptverse' ? 'PROMPT' : 'CODE'}
              <br />
              POWER
            </h2>
          </div>
          <div className="w-full sm:w-auto flex-shrink-0">
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-[10px]">
          {participants.length > 0 ? (
            participants.map((person, i) => {
              const globalRank = [...(eventName === 'promptverse' ? state.promptverse : state.blindcoding)].sort((a, b) => b.score - a.score).indexOf(person) + 1
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
                    currentEvent={eventName}
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

  return (
    <div
      id="dual-leaderboard-section"
      className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
      style={{ background: '#080C10' }}
    >
      {/* Main Header */}
      <div className="mb-12 md:mb-16">
        <div className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
          // ALL RANKINGS
        </div>
        <h2 className="font-hero leading-none" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
          DUAL
          <br />
          <span className="text-accent">ARENAS</span>
        </h2>
      </div>

      {/* Dual Leaderboards Container */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12">
        {renderLeaderboard(filteredPromptverse, 'promptverse', searchPromptverse, setSearchPromptverse)}
        {renderLeaderboard(filteredBlindcoding, 'blindcoding', searchBlindcoding, setSearchBlindcoding)}
      </div>
    </div>
  )
}
