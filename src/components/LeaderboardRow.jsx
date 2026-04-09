export default function LeaderboardRow({ person, rank, percentage, currentEvent }) {
  const isTop3 = rank <= 3

  const getRankColor = () => {
    if (rank === 1) return 'text-gold'
    if (rank === 2) return 'text-silver'
    if (rank === 3) return 'text-bronze'
    return ''
  }

  return (
    <div
      className="flex items-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-5 md:px-6 py-3 md:py-[18px] rounded-[10px] cursor-pointer transition-all duration-300 relative overflow-hidden group hover-glow flex-wrap sm:flex-nowrap"
      style={{
        background: isTop3 ? 'rgba(0,255,135,0.06)' : 'rgba(255,255,255,0.02)',
        border: isTop3 ? '1px solid rgba(0,255,135,0.3)' : '1px solid rgba(255,255,255,0.07)',
        borderLeft: isTop3 ? '1px solid rgba(0,255,135,0.3)' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>

      {/* Rank Number */}
      <div
        className={`font-hero text-[clamp(24px,5vw,36px)] tracking-[0.02em] min-w-fit leading-none ${
          rank === 1 ? 'text-gold' : rank === 2 ? 'text-silver' : rank === 3 ? 'text-bronze' : 'text-white/15'
        }`}
      >
        {String(rank).padStart(2, '0')}
      </div>

      {/* Avatar */}
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-hero text-xs sm:text-base flex-shrink-0"
        style={{
          background: 'rgba(0,255,135,0.08)',
          border: '1px solid rgba(0,255,135,0.2)',
        }}
      >
        {person.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 order-4 sm:order-none basis-full sm:basis-auto">
        <div className="font-body text-[13px] sm:text-[15px] font-medium tracking-[0.02em] text-text truncate">
          {person.name}
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] text-muted tracking-[0.1em] mt-0.5">
          {currentEvent === 'promptverse' ? 'PROMPTVERSE' : 'BLIND CODING'} &middot; PARTICIPANT
        </div>
      </div>

      {/* Progress bar - hidden on mobile */}
      <div className="hidden md:flex w-[100px] h-[3px] rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded transition-all duration-800"
          style={{
            background: 'linear-gradient(90deg, #00FF87, rgba(0,255,135,0.4))',
            width: `${percentage}%`,
          }}
        ></div>
      </div>

      {/* Score */}
      <div className="flex flex-col items-end order-3 sm:order-none">
        <div className="font-mono text-[16px] sm:text-[20px] font-bold text-accent min-w-[60px] sm:min-w-[80px] text-right">
          {person.score}
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-muted text-right tracking-[0.15em]">
          POINTS
        </div>
      </div>
    </div>
  )
}
