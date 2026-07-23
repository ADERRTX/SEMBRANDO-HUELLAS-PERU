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

  const t = useCallback((key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) { val = null; break }
      val = val[k]
    }
    if (val != null) return val
    let fallback = translations['es']
    for (const k of keys) {
      if (fallback == null) return key
      fallback = fallback[k]
    }
    return fallback ?? key
  }, [lang])

  const value = useMemo(() => ({ lang, language: lang, changeLang, setLanguage: changeLang, t, translations }), [lang, changeLang, t])

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
      if (val == null) { val = null; break }
      val = val[k]
    }
    if (val != null) return val
    let fallback = translations['es']
    for (const k of keys) {
      if (fallback == null) return key
      fallback = fallback[k]
    }
    return fallback ?? key
  }, [lang])
  return t
}

export function useData() {
  const t = useT()
  return useCallback((key) => t(`data.${key}`), [t])
}
