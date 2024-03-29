import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'graytrans': '#00000030'
    },
    fontSize:{
      'sml': '1.5rem',
      '2xl': '1.75rem',
      'title': '2rem',
      'titlexl': '3rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns:{
        '46': '2fr 3fr',
        '37': '3fr 7fr',
      },
      height:{
        '100': '140px',
        'art': '300px',
      },
      spacing:{
        'svg': 'calc(25vw - 64px)',
        'bbl': 'calc(25vw - 175px)'
      },
      gridTemplateRows:{
        '82': '4fr 1fr',
        '91': '9fr 1fr',
        'headers': 'repeat(2,auto)',
        '7': 'repeat(7,1fr)'
      },
      fontFamily:{
        'crsemibold': 'ClashDisplay-Semibold',
        'crbold': 'ClashDisplay-Bold',
        'crmedium': 'ClashDisplay-Medium',
        'crlight': 'ClashDisplay-Light',
        'crextralight': 'ClashDisplay-Extralight'
      },
      padding:{
        'search': 'calc(10vw + 2rem)',
        'searchright': '4vw'
      }
    },
  },
  plugins: [],
}
export default config
