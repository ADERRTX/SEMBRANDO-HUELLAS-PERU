import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowRight, HiArrowLeft, HiCalendar, HiLocationMarker } from 'react-icons/hi'
import { initialNews } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'

const getCategoryColor = (category) => {
  switch (category) {
    case 'liderazgo':
      return 'from-purple-600 to-indigo-500 text-white'
    case 'conservacion':
      return 'from-emerald-600 to-green-500 text-white'
    case 'ecologico':
      return 'from-teal-600 to-green-400 text-white'
    case 'medioambiente':
      return 'from-blue-600 to-cyan-500 text-white'
    default:
      return 'from-gray-600 to-gray-500 text-white'
  }
}

export default function Hero() {
  const t = useT()
  const { lang } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loadFeatured = () => {
      try {
        const stored = localStorage.getItem('eco-news')
        let newsList = initialNews
        if (stored) {
          newsList = [...JSON.parse(stored), ...initialNews]
        }
        // Take top 3 articles
        setFeaturedNews(newsList.slice(0, 3))
      } catch (e) {
        setFeaturedNews(initialNews.slice(0, 3))
      }
    }

    loadFeatured()
    window.addEventListener('eco-news-published', loadFeatured)
    return () => window.removeEventListener('eco-news-published', loadFeatured)
  }, [])

  // Auto-play
  useEffect(() => {
    if (featuredNews.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredNews.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [featuredNews])

  if (featuredNews.length === 0) return null

  const current = featuredNews[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredNews.length)
  }

  const handleReadArticle = (id) => {
    const el = document.getElementById('noticias')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      const event = new CustomEvent('eco-news-read', { detail: id })
      window.dispatchEvent(event)
    }, 500)
  }

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white pt-10">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-900/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-transparent z-10" />
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center opacity-40 dark:opacity-30"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32 flex flex-col justify-end min-h-[75vh]">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <div className="inline-flex">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getCategoryColor(current.category)} shadow-lg shadow-black/35`}>
                  {t(`feed.${current.category}`)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-white drop-shadow-md">
                {lang === 'en' ? current.titleEn || current.title : current.title}
              </h1>

              {/* Summary */}
              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl drop-shadow-sm">
                {lang === 'en' ? current.summaryEn || current.summary : current.summary}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <HiCalendar className="w-4 h-4 text-green-400" />
                  {current.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiLocationMarker className="w-4 h-4 text-green-400" />
                  {current.location}
                </span>
                <span className="text-gray-500">|</span>
                <span>
                  {t('feed.published_by')}: <strong className="text-gray-300 font-semibold">{current.author}</strong>
                </span>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleReadArticle(current.id)}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-base shadow-lg shadow-green-900/30 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
                >
                  <span>{t('hero.cta_news')}</span>
                  <HiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#mapa"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50 text-white font-medium text-base transition-all duration-300"
                >
                  <span>{t('hero.cta_ticker')}</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        {featuredNews.length > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              {featuredNews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-green-500' : 'w-2.5 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-white/10 bg-gray-900/40 hover:bg-gray-800 text-white transition-colors duration-200"
                aria-label="Previous slide"
              >
                <HiArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-white/10 bg-gray-900/40 hover:bg-gray-800 text-white transition-colors duration-200"
                aria-label="Next slide"
              >
                <HiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
