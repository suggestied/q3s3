/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F47B20', // Q3 Orange
          dark: '#D65F00',
          light: '#FF9A4D'
        },
        secondary: {
          DEFAULT: '#1E293B',
          light: '#334155'
        },
        industrial: {
          orange: '#F47B20',
          blue: '#1E293B',
          gray: '#64748B'
        }
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}