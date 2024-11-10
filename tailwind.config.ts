import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Slower spin
        'spin-fast': 'spin 1s linear infinite', // Faster spin
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navyDark: '#132240',
        navy: '#132D62',
        neonPink: 'var(--neonPink)',
        neonBlue: 'var(--neonBlue)',
        neonYellow: 'var(--neonYellow)',
        lightGray: '#DEDEDE',
      },
      boxShadow: {
        'card-shadow': '0px 0px 14.4px 0px #FFE60640',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
