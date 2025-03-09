import type { Config } from "tailwindcss";
import daisyui from 'daisyui';
import tailwindScrollbar from 'tailwind-scrollbar';

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
        'background-dimmer': '#d6e5cb',
        'primary': '#a1cc80',
        'primary-darker': '#789960',
        'primary-darkest': '#647f50',
        'primary-superdark': '#506640',
        'secondary': '#95e8cf',
        'accent': '#f29450',
       },       
    },
    fontSize: {
      sm: '0.707rem',
      base: '1rem',
      xl: '1.414rem',
      '2xl': '1.999rem',
      '3xl': '2.827rem',
      '4xl': '3.997rem',
      '5xl': '5.652rem',
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
    daisyui,
    tailwindScrollbar,
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
