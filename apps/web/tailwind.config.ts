// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config'

import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/**/*.tsx',
    //
    '../../packages/ui/src/**/*.tsx',
  ],
  darkMode: ['class'],
  presets: [sharedConfig],
} satisfies Config

export default config
