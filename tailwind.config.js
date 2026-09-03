/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: '#0a0a12',
          card: '#151526',
          neonPink: '#ff007f',
          neonCyan: '#00f0ff',
          neonYellow: '#ffe600',
          neonGreen: '#00ff66',
        }
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'monospace'],
        display: ['"Chakra Petch"', 'sans-serif'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'pixel-neon': '0 0 10px rgba(0, 240, 255, 0.5), 4px 4px 0px 0px #000',
      }
    },
  },
  plugins: [],
}
