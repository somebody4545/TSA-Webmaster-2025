import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#000000',
        'background': '#f5fcef',
        'background-dim': '#ebf2e5',
        'primary': '#a1cc80',
        'primary-darker': '#789960',
        'primary-darkest': '#647f50',
        'primary-superdark': '#506640',
        'secondary': '#95e8cf',
        'accent': '#e49ae6',
       },       
    },
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Merriweather',
      body: 'Inter',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#a1cc80",
          "secondary": "#95e8cf",
          "accent": "#e49ae6",
          "neutral": "#25400c",
          "base-100": "#f5fcef",
        },
      },
    ],
  },
} satisfies Config;
