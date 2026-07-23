import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CountryContext = createContext()

export function CountryProvider({ children }) {
  const [country, setCountryState] = useState(() => {
    try { return localStorage.getItem('shp-country') || null } catch { return null }
  })

  const setCountry = useCallback((c) => {
    setCountryState(c)
    try { localStorage.setItem('shp-country', c || '') } catch {}
  }, [])

  const clearCountry = useCallback(() => {
    setCountryState(null)
    try { localStorage.removeItem('shp-country') } catch {}
  }, [])

  const value = useMemo(() => ({ country, setCountry, clearCountry }), [country, setCountry, clearCountry])

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const ctx = useContext(CountryContext)
  if (!ctx) throw new Error('useCountry must be used within CountryProvider')
  return ctx
}
