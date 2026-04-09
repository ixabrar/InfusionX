export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-[200px] md:w-[280px]">
      <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-muted text-[15px] pointer-events-none font-mono">
        ⌕
      </span>
      <input
        type="text"
        placeholder="Search combatant..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-[13px] tracking-[0.1em] pl-11 pr-5 py-3 rounded outline-none transition-all w-full"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#F0F4F8',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(0,255,135,0.4)'
          e.target.style.background = 'rgba(0,255,135,0.03)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.07)'
          e.target.style.background = 'rgba(255,255,255,0.03)'
        }}
      />
    </div>
  )
}
