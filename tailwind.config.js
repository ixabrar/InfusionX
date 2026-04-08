/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080C10',
        'bg-2': '#0D1318',
        'bg-3': '#111820',
        accent: '#00FF87',
        'accent-dim': 'rgba(0,255,135,0.12)',
        'accent-glow': 'rgba(0,255,135,0.35)',
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        text: '#F0F4F8',
        muted: '#6B7280',
        border: 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        hero: ['Bebas Neue', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease both',
        float: 'float 8s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        podFloat: 'podFloat 4s ease-in-out infinite',
        slideUp: 'slideUp 0.3s ease',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        scan: {
          from: { top: '-2px' },
          to: { top: '100%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        podFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
