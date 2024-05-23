import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-inset': 'inset 5px 0px 0px 0px rgba(186, 112, 79, 1)',
      },
      colors: {
        primary: '#BA704F',
        putih: '#FFFCFB',
      },
      backgroundColor: {
        primary: '#BA704F',
        putih: '#FFFCFB',
      },
    },
  },
  // darkMode: 'class',
  plugins: [nextui()],
};
export default config;
