import { motion } from 'framer-motion'
import PodiumCard from './PodiumCard'

export default function PodiumSection({ participants, currentEvent }) {
  const top3 = participants.slice(0, 3)
  
  // Reorder to display: rank 2 (left), rank 1 (center), rank 3 (right)
  const displayOrder = top3.length >= 3 
    ? [top3[1], top3[0], top3[2]]
    : top3.length === 2
    ? [top3[1], top3[0]]
    : top3

  const rankClasses = top3.length >= 3 
    ? ['rank-2', 'rank-1', 'rank-3']
    : top3.length === 2
    ? ['rank-2', 'rank-1']
    : ['rank-1']

  const rankNumbers = top3.length >= 3
    ? [2, 1, 3]
    : top3.length === 2
    ? [2, 1]
    : [1]

  return (
    <div
      id="podium-section"
      className="relative overflow-hidden px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-[120px]"
      style={{ background: '#080C10' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 80%, rgba(0,255,135,0.04) 0%, transparent 70%)',
        }}
      ></div>

      {/* Background text */}
      <div
        className="absolute font-hero bottom-[-20px] left-1/2 -translate-x-1/2 whitespace-nowrap tracking-[0.05em] pointer-events-none"
        style={{
          fontSize: 'clamp(100px, 20vw, 260px)',
          color: 'rgba(255,255,255,0.015)',
        }}
      >
        {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'}
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          <div className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
            // HALL OF FAME
          </div>
          <h2 className="font-hero" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '0.03em', lineHeight: 1 }}>
            THE <span className="text-accent">PODIUM</span>
          </h2>
        </div>

        {/* Podium Stage */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap md:flex-nowrap">
          {displayOrder.map((person, i) => (
            <PodiumCard
              key={person.id}
              person={person}
              rank={rankNumbers[i]}
              rankClass={rankClasses[i]}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
