/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#141414',
          700: '#1f1f1f',
          600: '#2a2a2a',
        },
        neon: {
          green: '#00ff88',
          yellow: '#ffcc00',
          red: '#ff3333',
          blue: '#33ccff',
        }
      },
      boxShadow: {
        'glow-green': '0 0 10px rgba(0, 255, 136, 0.5)',
        'glow-yellow': '0 0 10px rgba(255, 204, 0, 0.5)',
        'glow-red': '0 0 15px rgba(255, 51, 51, 0.8)',
        'glow-blue': '0 0 10px rgba(51, 204, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
