import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { translations, LANGUAGES } from '../i18n/translations'

export { LANGUAGES }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('shp-lang') || 'es' } catch { return 'es' }
  })

  const changeLang = useCallback((code) => {
    setLang(code)
    try { localStorage.setItem('shp-lang', code) } catch {}
  }, [])

  const value = useMemo(() => ({ lang, changeLang }), [lang, changeLang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useT() {
  const { lang } = useLanguage()
  const t = useCallback((key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }, [lang])
  return t
}

export function useData() {
  const t = useT()
  return useCallback((key) => t(`data.${key}`), [t])
}
