import Image from 'next/image'
import Link from 'next/link'

import DatadogIcon from '../../assets/datadog.png'
import FigmaIcon from '../../assets/figma.svg'
import GithubIcon from '../../assets/github.png'
import GmailIcon from '../../assets/gmail.svg'
import NotionIcon from '../../assets/notion.png'
import TailwindIcon from '../../assets/tailwind.svg'
import YoutubeIcon from '../../assets/youtube.svg'

const links = [
  { title: 'yt', Icon: <YoutubeIcon className="-mx-0.5 h-4 w-auto" /> },
  { title: 'mail', Icon: <GmailIcon className="w-4" /> },
  {
    title: 'logs',
    Icon: (
      <div className="flex h-4 w-4 items-center justify-center bg-[#632CA6]">
        <Image alt="Datadog" height={12} src={DatadogIcon} width={12} />{' '}
      </div>
    ),
  },
  {
    title: 'mocks',
    Icon: (
      <div className="flex h-4 w-4 items-center justify-center">
        <FigmaIcon className="h-3.5 w-auto" />{' '}
      </div>
    ),
  },
  { title: 'notion', Icon: <Image alt="Notion" height={16} src={NotionIcon} width={16} /> },
  { title: 'gh', Icon: <Image alt="Github" height={16} src={GithubIcon} width={16} /> },
  { title: 'tw', Icon: <TailwindIcon className="w-4" /> },
]

export function HighlightedGolinks() {
  return (
    <div className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-2.5 pt-3 lg:max-w-none">
      {links.map((link) => (
        <Link
          className="flex items-center gap-1 rounded bg-gray-700/70 px-1.5 py-1.5 transition-colors hover:bg-gray-700/90"
          href={`go/${link.title}`}
          key={link.title}
          rel="noreferrer"
          target="_blank"
        >
          {link.Icon}
          <span className="text-xs font-medium">go/{link.title}</span>
        </Link>
      ))}
    </div>
  )
}
