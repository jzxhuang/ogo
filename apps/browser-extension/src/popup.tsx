import { useState } from 'react'

import { Input } from '@repo/ui'

import '@repo/ui/global.css'
import './global.css'

function IndexPopup() {
  const [data, setData] = useState('')

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <h2>
        Welcome to your{' '}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <Input />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
