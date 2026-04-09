export default function EventSwitcher({ currentEvent, onSwitchEvent }) {
  return (
    <section id="events" className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-[60px] max-w-[1200px] mx-auto">
      <div className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
        // SELECT EVENT
      </div>
      
      <h2 className="font-hero text-[clamp(40px,6vw,72px)] tracking-[0.03em] leading-none mb-8">
        CHOOSE
        <br />
        YOUR <span className="text-accent">ARENA</span>
      </h2>

      <div
        className="flex gap-1 rounded-[8px] p-1 w-fit flex-wrap sm:flex-nowrap"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          onClick={() => onSwitchEvent('promptverse')}
          className="font-mono text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3 rounded transition-all duration-300 flex-1 sm:flex-none whitespace-nowrap"
          style={{
            background: currentEvent === 'promptverse' ? 'rgba(0,255,135,0.12)' : 'transparent',
            color: currentEvent === 'promptverse' ? '#00FF87' : '#6B7280',
            border: currentEvent === 'promptverse' ? '1px solid rgba(0,255,135,0.3)' : 'none',
            boxShadow: currentEvent === 'promptverse' ? '0 0 20px rgba(0,255,135,0.1)' : 'none',
            fontSize: 'clamp(11px, 1.5vw, 13px)',
          }}
        >
          PromptVerse
        </button>
        <button
          onClick={() => onSwitchEvent('blindcoding')}
          className="font-mono text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3 rounded transition-all duration-300 flex-1 sm:flex-none whitespace-nowrap"
          style={{
            background: currentEvent === 'blindcoding' ? 'rgba(0,255,135,0.12)' : 'transparent',
            color: currentEvent === 'blindcoding' ? '#00FF87' : '#6B7280',
            border: currentEvent === 'blindcoding' ? '1px solid rgba(0,255,135,0.3)' : 'none',
            boxShadow: currentEvent === 'blindcoding' ? '0 0 20px rgba(0,255,135,0.1)' : 'none',
            fontSize: 'clamp(11px, 1.5vw, 13px)',
          }}
        >
          Blind Coding
        </button>
      </div>
    </section>
  )
}
