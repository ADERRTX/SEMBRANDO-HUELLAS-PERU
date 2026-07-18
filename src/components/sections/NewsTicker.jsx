import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { initialNews } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'

export default function NewsTicker() {
  const t = useT()
  const { lang } = useLanguage()
  const [tickerItems, setTickerItems] = useState([])

  useEffect(() => {
    const loadTickerNews = () => {
      try {
        const stored = localStorage.getItem('eco-news')
        let newsList = initialNews
        if (stored) {
          newsList = [...JSON.parse(stored), ...initialNews]
        }
        setTickerItems(newsList.slice(0, 8))
      } catch (e) {
        setTickerItems(initialNews.slice(0, 8))
      }
    }

    loadTickerNews()
    window.addEventListener('eco-news-published', loadTickerNews)
    return () => window.removeEventListener('eco-news-published', loadTickerNews)
  }, [])

  if (tickerItems.length === 0) return null

  return (
    <div className="bg-accent-red-dark dark:bg-gray-950 text-white text-xs md:text-sm font-semibold flex items-center h-10 overflow-hidden relative z-40 shadow-inner mt-16 lg:mt-20">
      {/* EN VIVO Badge */}
      <div className="bg-accent-red px-4 py-2 uppercase tracking-wider flex items-center shrink-0 z-10 shadow-md">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        {t('ticker.breaking')}
      </div>

      {/* Marquee Content */}
      <div className="flex w-full overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
          className="flex space-x-12 whitespace-nowrap pl-4"
        >
          {tickerItems.map((item, idx) => (
            <span key={`${item.id}-${idx}`} className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">●</span>
              <span className="font-medium">
                {lang === 'en' ? item.titleEn || item.title : item.title}
              </span>
              <span className="text-white/50 font-normal">
                ({item.location})
              </span>
            </span>
          ))}
          {tickerItems.map((item, idx) => (
            <span key={`${item.id}-dup-${idx}`} className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">●</span>
              <span className="font-medium">
                {lang === 'en' ? item.titleEn || item.title : item.title}
              </span>
              <span className="text-white/50 font-normal">
                ({item.location})
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
