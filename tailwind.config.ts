import type { Config } from "tailwindcss";
import daisyui from 'daisyui';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			text: '#000000',
  			background: 'hsl(var(--background))',
  			'background-dim': '#ebf2e5',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-darker': '#789960',
  			'primary-darkest': '#647f50',
  			'primary-superdark': '#506640',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontSize: {
  		sm: '0.707rem',
  		base: '1rem',
  		xl: '1.414rem',
  		'2xl': '1.999rem',
  		'3xl': '2.827rem',
  		'4xl': '3.997rem',
  		'5xl': '5.652rem'
  	},
  	fontFamily: {
  		heading: 'Merriweather',
  		body: 'Inter'
  	},
  	fontWeight: {
  		normal: '400',
  		bold: '700'
  	}
  },
  plugins: [
    daisyui,
    tailwindScrollbar,
      require("tailwindcss-animate")
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
