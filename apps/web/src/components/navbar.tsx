import { LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import GithubIcon from '../assets/github.png'

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#0a000f]/70 backdrop-blur">
      <div className="container flex w-full justify-between py-3">
        <Link className="inline-flex items-center" href="/">
          <LinkIcon />
          <span className="pl-3 text-lg font-semibold">ogo</span>
        </Link>

        <div>
          <a
            className="flex rounded p-1 transition-colors hover:bg-violet-900"
            href="https://github.com/jzxhuang/ogo"
            rel="noreferrer"
            target="_blank"
          >
            <Image alt="Github" height={16} src={GithubIcon} width={16} />
          </a>
        </div>
      </div>
    </header>
  )
}
