import { KeyRoundIcon, ZapIcon } from 'lucide-react'
import { Balancer } from 'react-wrap-balancer'

import { HighlightedGolinks } from '../components/homepage/highlighted-golinks'
import { TypingAnimation } from '../components/homepage/typing-animation'
import { Navbar } from '../components/navbar'

export default function Page(): JSX.Element {
  return (
    <>
      <Navbar />
      <main className="gradient grid min-h-screen content-start justify-center py-4">
        <section>
          <div className="container grid content-start items-start justify-center justify-items-center px-2 pt-14 text-center sm:px-4 sm:pt-16 md:pt-24 xl:pt-28">
            <h1 className="mb-1 text-center text-[3.5rem] font-extrabold leading-snug tracking-tight text-white lg:text-[5rem] lg:tracking-normal xl:text-[5.5rem] xl:tracking-tight">
              <Balancer>
                Open-source <span className="text-violet-500">Go Links</span>
              </Balancer>
            </h1>
            <p className="mb-4 max-w-[50rem] px-0.5 text-center text-base leading-7 tracking-tight text-gray-200 sm:text-xl sm:tracking-normal lg:text-2xl">
              <Balancer>
                The intuitive short links that you know and love, built with modern technologies and 100% free.
              </Balancer>
            </p>
          </div>
        </section>

        <section className="h-fit w-full py-4 sm:py-8">
          <div className="container">
            <div className="grid items-start justify-center gap-6 md:grid-cols-[repeat(2,_minmax(0,380px))] lg:gap-11 xl:gap-12">
              <div className="flex h-full flex-col gap-2 rounded-md bg-violet-300/30 p-5 backdrop-blur md:p-8">
                <ZapIcon className="mx-auto h-10 w-10" />
                <h2 className="text-center text-2xl font-bold tracking-tighter text-white lg:text-3xl">
                  As Easy as Installed
                </h2>
                <p className="mx-auto text-center leading-relaxed text-gray-500 lg:text-base dark:text-gray-400">
                  Free for individuals and teams of any size. Just install the extension and go. Get started without an
                  account!
                </p>
              </div>
              <div className="flex h-full flex-col gap-2 rounded-md bg-violet-300/30 p-5 backdrop-blur md:p-8">
                <KeyRoundIcon className="mx-auto h-10 w-10" />
                <h2 className="text-center text-2xl font-bold tracking-tighter text-white lg:text-3xl">
                  Own Your Data
                </h2>
                <p className="mx-auto text-center leading-relaxed text-gray-500 lg:text-base dark:text-gray-400">
                  Designed to be self-hosted with ease. Deploy your own ogo instance in minutes and control your data.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container flex flex-col justify-center text-center">
            <h2 className="pb-1 text-3xl font-semibold tracking-tight">Less Typing, More Doing</h2>
            <p className="text-lg text-gray-200">Create memorable, shareable links for any purpose.</p>
            <HighlightedGolinks />

            <div className="mx-auto my-4 h-[300px] w-full max-w-[720px] overflow-hidden rounded-md bg-violet-300/20 backdrop-blur">
              <div className="flex h-10 w-full items-center gap-3 bg-violet-400/20 px-2 py-2">
                <div className="flex items-center justify-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <p className="inline-flex w-full items-center rounded-full bg-violet-400/20 px-2.5 py-0.5 text-left text-sm font-semibold">
                  go/
                  <TypingAnimation />
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
