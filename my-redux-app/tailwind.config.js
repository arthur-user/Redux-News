import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#dbeafe',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
      },
      fontFamily: {
        sans: ['Oxygen', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    lineClamp,
  ],
}
