

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-pink': 'rgb(255,17,104)',
        'primary-orange': 'rgb(229,64,40)',
        
        // Background Colors
        'background-light': 'rgb(255,255,255)',
        'background-dark': 'rgb(17,22,37)',
        
        // Text Colors
        'text-primary-light': 'rgb(17,22,37)',
        'text-primary-dark': 'rgb(255,255,255)',
        'text-secondary-light': 'rgb(52,25,49)',
        'text-secondary-dark': 'rgb(255,255,255)',
        'text-muted-light': 'rgb(58,118,52)',
        'text-muted-dark': 'rgb(94,177,28)',
        
        // Category Colors
        'category-alternative': 'rgb(215,0,96)',
        'category-blues': 'rgb(229,64,40)',
        'category-classical': 'rgb(241,141,5)',
        'category-country': 'rgb(242,188,6)',
        'category-dance': 'rgb(94,177,28)',
        'category-electronic': 'rgb(58,118,52)',
        'category-fitness': 'rgb(10,190,190)',
        'category-hiphop': 'rgb(0,161,203)',
        'category-industrial': 'rgb(17,87,147)',
      },
      
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        },

        fontSize: {
        // DISPLAY / HEADINGS (Poppins Bold)
        'display': ['3rem', { lineHeight: '1.1' }],        // 48px
        'h1': ['2.25rem', { lineHeight: '1.2' }],          // 36px
        'h2': ['2rem', { lineHeight: '1.25' }],            // 32px
        'h3': ['1.5rem', { lineHeight: '1.3' }],            // 24px
        'h4': ['1.25rem', { lineHeight: '1.35' }],          // 20px

        // BODY
        'body': ['0.9375rem', { lineHeight: '1.6' }],       // 15px
        'body-bold': ['0.9375rem', { lineHeight: '1.6' }],  // 15px bold

        // SMALL TEXT
        'caption': ['0.75rem', { lineHeight: '1.4' }],      // 12px
        'micro': ['0.625rem', { lineHeight: '1.4' }],       // 10px
        },

      
      borderRadius: {
        'album': '1.5rem',
      },
      
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;