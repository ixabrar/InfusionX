import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="mt-20 border-t"
      style={{
        background: '#080C10',
        borderColor: 'rgba(0,255,135,0.15)',
      }}
    >
      {/* Main Footer Content */}
      <div className="px-10 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/">
              <div>
                <div className="font-mono text-xs tracking-[0.3em] text-accent" style={{ textShadow: '0 0 10px rgba(0,255,135,0.35)' }}>
                  AIDS DEPT
                </div>
                <div className="font-hero text-2xl tracking-[0.2em] text-accent mt-2" style={{ textShadow: '0 0 15px rgba(0,255,135,0.3)' }}>
                  ARENA
                </div>
              </div>
            </Link>
            <p className="font-mono text-xs tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Next-Gen Competition Platform
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-accent mb-6" style={{ textShadow: '0 0 10px rgba(0,255,135,0.3)' }}>
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  → Home
                </Link>
              </li>
              <li>
                <a href="#leaderboard-section" className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  → Leaderboard
                </a>
              </li>
              <li>
                <a href="#podium-section" className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  → Rankings
                </a>
              </li>
              <li>
                <Link to="/admin" className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  → Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-accent mb-6" style={{ textShadow: '0 0 10px rgba(0,255,135,0.3)' }}>
              EVENTS
            </h3>
            <ul className="space-y-3">
              <li className="font-mono text-xs tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                🎯 PromptVerse
              </li>
              <li className="font-mono text-xs tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                💻 Blind Coding
              </li>
              <li className="font-mono text-xs tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                🏆 Live Contests
              </li>
              <li className="font-mono text-xs tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                🎯 Challenges
              </li>
            </ul>
          </div>

          {/* Collaboration Info */}
          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-accent mb-4" style={{ textShadow: '0 0 10px rgba(0,255,135,0.3)' }}>
              PARTNERSHIP
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm" style={{ 
                  color: '#00FF87',
                  textShadow: '0 0 15px rgba(0,255,135,0.8)',
                  fontStyle: 'italic',
                }}>
                  AIDS
                </span>
                <span className="font-bold text-lg" style={{ 
                  color: '#00FF87',
                  textShadow: '0 0 15px rgba(0,255,135,0.8)',
                }}>✕</span>
                <span className="font-black text-sm" style={{ 
                  color: '#00FF87',
                  textShadow: '0 0 15px rgba(0,255,135,0.8)',
                  fontStyle: 'italic',
                }}>
                  INFUSION
                </span>
                <span className="font-black text-sm" style={{ 
                  color: '#00FF87',
                  textShadow: '0 0 15px rgba(0,255,135,0.8)',
                  fontSize: '1.1em',
                }}>
                  X
                </span>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,255,135,0.2)', paddingTop: '8px', marginTop: '8px' }}>
                <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Powered by INFUSION X
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(0,255,135,0.15)' }} />

      {/* Bottom Bar */}
      <div className="px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.1em] text-center md:text-left" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ARENA © {currentYear} &mdash; AIDS Department &mdash; Built for Champions
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" 
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              𝕏
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" 
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              GitHub
            </a>
            <a 
              href="mailto:contact@arena.ai" 
              className="font-mono text-xs tracking-[0.1em] transition-colors hover:text-accent" 
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
