/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'acid-bg': '#001220',
        'acid-card': '#001f3f',
        'golden': '#FFD700',
        'acid-green': '#00ff88',
        'lava-orange': '#ff6b35',
        'electric-pink': '#ff00ff',
        'warning-yellow': '#ffff00',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            opacity: 1
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.3)',
            opacity: 0.8
          },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      backgroundImage: {
        'golden-acid': 'linear-gradient(45deg, #FFD700, #00ff88)',
        'acid-lava': 'linear-gradient(45deg, #00ff88, #ff6b35)',
        'electric-gold': 'linear-gradient(45deg, #ff00ff, #FFD700)',
      }
    },
  },
  plugins: [],
}