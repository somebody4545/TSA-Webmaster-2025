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
        'background': '#FAF3DD',
        'primary': '#0f633c',
        'secondary': '#39b2aa',
        'accent': '#c64d8e',
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
  ],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#0f633c",
          "secondary": "#39b2aa",
          "accent": "#c64d8e",
          "neutral": "#43350a",
          "base-100": "#FAF3DD",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
} satisfies Config;
