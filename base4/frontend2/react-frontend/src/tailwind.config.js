/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/EditProfile.jsx/', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'orangish-pink': '#FFE4E1',
        'dark-blue': '#1E3A8A',
        'light-pink': '#FFF0F0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};