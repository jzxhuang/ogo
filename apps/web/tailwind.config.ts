// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config'

import type { Config } from 'tailwindcss'

const config = {
  content: ['./src/**/*.tsx', '../../packages/ui/src/**/*.tsx'],
  darkMode: ['class'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        // From https://uicolors.app, base #CB42F5 (500)
        violet: {
          '50': 'hsl(282, 100%, 98%)',
          '100': 'hsl(284, 100%, 95%)',
          '200': 'hsl(284, 100%, 90%)',
          '300': 'hsl(285, 100%, 83%)',
          '400': 'hsl(286, 99%, 73%)',
          '500': 'hsl(286, 90%, 61%)',
          '600': 'hsl(287, 74%, 49%)',
          '700': 'hsl(289, 77%, 40%)',
          '800': 'hsl(290, 75%, 33%)',
          '900': 'hsl(291, 68%, 28%)',
          '950': 'hsl(290, 98%, 16%)',
        },
      },
    },
  },
} satisfies Config

export default config
