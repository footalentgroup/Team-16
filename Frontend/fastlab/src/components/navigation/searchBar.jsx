import { useState } from 'react'
import { SearchIcon } from './icons'

export default function SearchBar({onSearch}) {
    const [query, setQuery] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSearch(query)
    }

    const handleClear = () => {
        setQuery('')
        onSearch('')
    }

    return (
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="análisis de sangre"
          className="w-full px-4 py-2 border rounded-lg pr-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-teal-600 rounded-lg text-white"
        >
          <SearchIcon />
        </button>
      </form>
    )
}
