import { motion } from 'framer-motion'

export default function PodiumCard({ person, rank, rankClass, delay }) {
  const getAvatarClass = () => {
    if (rankClass === 'rank-1') return 'avatar-rank1'
    if (rankClass === 'rank-2') return 'avatar-rank2'
    return 'avatar-rank3'
  }

  const getPlintheClass = () => {
    if (rankClass === 'rank-1') return 'podium-plinth-rank1'
    if (rankClass === 'rank-2') return 'podium-plinth-rank2'
    return 'podium-plinth-rank3'
  }

  const getYTranslate = () => {
    if (rankClass === 'rank-1') return 0
    if (rankClass === 'rank-2') return 40
    return 60
  }

  const getAnimationDelay = () => {
    if (rankClass === 'rank-1') return 0
    if (rankClass === 'rank-2') return -1.5
    return -3
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: getYTranslate() }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {/* Avatar */}
      <motion.div
        className={getAvatarClass()}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: getAnimationDelay(),
        }}
      >
        {person.initials}
        <span
          className={`absolute -top-[10px] -right-[10px] w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
            rankClass === 'rank-1'
              ? 'bg-gold text-black'
              : rankClass === 'rank-2'
              ? 'bg-silver text-black'
              : 'bg-bronze text-black'
          }`}
        >
          {rank}
        </span>
      </motion.div>

      {/* Name */}
      <div
        className={`font-hero tracking-[0.05em] text-center mb-1 ${
          rankClass === 'rank-1' ? 'text-[28px]' : 'text-[22px]'
        }`}
      >
        {person.name.split(' ')[0].toUpperCase()}
      </div>

      {/* Score */}
      <div
        className={`font-mono mb-5 ${
          rankClass === 'rank-1'
            ? 'text-accent text-[15px]'
            : 'text-muted text-[13px]'
        }`}
      >
        {person.score} PTS
      </div>

      {/* Plinth */}
      <div className={getPlintheClass()}>{rank}</div>
    </motion.div>
  )
}
