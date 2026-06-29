'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toTitleCase, formatEur } from '@/lib/format'

type ComuneResult = {
  nome: string
  province: string | null
  region: string | null
  total_projects: number
  total_funding: number
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? 'h-5 w-5'}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export default function ComuneSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ComuneResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [navigating, setNavigating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/comuni/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.comuni ?? [])
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(query), 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, search])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function navigate(nome: string) {
    setOpen(false)
    setQuery(toTitleCase(nome))
    setNavigating(true)
    router.push(`/${encodeURIComponent(nome)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault()
      navigate(results[0].nome)
    }
  }

  return (
    <>
      {navigating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Spinner className="h-10 w-10 text-emerald-600 mb-4" />
          <p className="text-sm font-medium text-emerald-700">Caricamento in corso…</p>
        </div>
      )}

    <div ref={containerRef} className="relative w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (results.length > 0) navigate(results[0].nome)
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Cerca il tuo Comune..."
          autoComplete="off"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <button
          type="submit"
          disabled={loading || results.length === 0}
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <><Spinner className="h-4 w-4" /> Cerca</> : 'Cerca'}
        </button>
      </form>

      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 z-10 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          {results.map((c) => (
            <li key={c.nome}>
              <button
                onClick={() => navigate(c.nome)}
                className="w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 flex items-center justify-between gap-4 border-b border-gray-100 last:border-0"
              >
                <span>
                  <span className="font-medium text-gray-900">
                    {toTitleCase(c.nome)}
                  </span>
                  {c.province && (
                    <span className="ml-2 text-gray-400 text-xs">({c.province})</span>
                  )}
                  {c.region && (
                    <span className="ml-1 text-gray-300 text-xs">{c.region}</span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-emerald-600 font-medium">
                  {c.total_projects} prog. · {formatEur(c.total_funding)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && query.length >= 2 && !loading && (
        <div className="absolute left-0 right-0 top-full mt-1 z-10 rounded-lg border border-gray-200 bg-white shadow-lg px-4 py-3 text-sm text-gray-400">
          Nessun Comune trovato per &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
    </>
  )
}
