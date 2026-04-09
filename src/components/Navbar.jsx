import { Link } from 'react-router-dom'

export default function Navbar({ scrollY }) {
  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-100 transition-all duration-300"
      style={{
        background: scrollY > 40 ? 'rgba(8,12,16,0.95)' : 'rgba(8,12,16,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,255,135,0.2)',
        boxShadow: scrollY > 40 ? '0 0 40px rgba(0,255,135,0.1)' : 'none',
        opacity: scrollY > 300 ? 1 : 0,
        pointerEvents: scrollY > 300 ? 'auto' : 'none',
      }}
    >
      {/* Top Bar - Simple Navigation */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4 border-b" style={{ borderColor: 'rgba(0,255,135,0.15)' }}>
        {/* Left Side - Empty Space */}
        <div></div>

        {/* Right Side - Admin & Branding */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-2 font-mono text-xs tracking-[0.1em]" style={{ color: '#6B7280' }}>
            <span>INFUSION</span>
            <span style={{ color: '#00FF87' }}>X</span>
          </div>
          <Link to="/admin">
            <button
              className="font-mono text-xs tracking-[0.15em] px-3 sm:px-4 py-2 rounded transition-all text-xs sm:text-sm"
              style={{
                border: '1px solid rgba(0,255,135,0.3)',
                background: 'rgba(0,255,135,0.12)',
                color: '#00FF87',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,255,135,0.2)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,135,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,255,135,0.12)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              ⚙ ADMIN
            </button>
          </Link>
        </div>
      </div>

      
      {/* Tabs Bar - Hidden */}
    </nav>
  )
}
