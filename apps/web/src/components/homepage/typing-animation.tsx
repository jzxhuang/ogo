'use client'

import { TypeAnimation } from 'react-type-animation'

export function TypingAnimation() {
  return (
    <TypeAnimation
      cursor
      deletionSpeed={40}
      repeat={Infinity}
      sequence={['issue/23', 2500, 'twitter', 2500, 'contracts', 2500, 'yt/trending', 3000, 'branch/main', 3000]}
      speed={10}
      wrapper="span"
    />
  )
}
