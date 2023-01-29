import { memo } from 'react'

import { type RouterOutputs } from '../../../utils/api'

type SearchResultsProps = {
  maxItems?: number
  results: RouterOutputs['goLink']['search']['results']
}

export const SearchResults = memo(function SearchResults(props: SearchResultsProps) {
  const { maxItems = 5, results } = props

  return (
    <div className="grid  w-full grid-flow-row overflow-hidden rounded-lg bg-white shadow-lg">
      {results.slice(0, maxItems).map((result) => {
        return (
          <a href={result.goLink.url} key={result.goLink.key} className="px-4 py-4 hover:bg-purple-200">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">
                go<span className="text-gray-500">/</span>
                {result.goLink.key}
              </div>

              <div className="text-xs text-gray-600">{result.goLink.url}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
})
