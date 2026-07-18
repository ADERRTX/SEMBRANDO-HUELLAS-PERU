import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowRight, HiArrowLeft, HiCalendar, HiLocationMarker, HiSparkles } from 'react-icons/hi'
import { initialNews } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'

const getCategoryColor = (category) => {
  switch (category) {
    case 'liderazgo':
      return 'from-purple-500 to-indigo-500 text-white'
    case 'conservacion':
      return 'from-emerald-500 to-green-400 text-white'
    case 'ecologico':
      return 'from-teal-500 to-cyan-400 text-white'
    case 'medioambiente':
      return 'from-blue-500 to-cyan-400 text-white'
    case 'tecnologia':
      return 'from-amber-500 to-orange-400 text-white'
    default:
      return 'from-gray-500 to-gray-400 text-white'
  }
}

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count.toLocaleString()}</span>
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
        setFeaturedNews(newsList.slice(0, 5))
      } catch (e) {
        setFeaturedNews(initialNews.slice(0, 5))
      }
    }

    loadFeatured()
    window.addEventListener('eco-news-published', loadFeatured)
    return () => window.removeEventListener('eco-news-published', loadFeatured)
  }, [])

  useEffect(() => {
    if (featuredNews.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredNews.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [featuredNews])

  if (featuredNews.length === 0) return null

  const current = featuredNews[currentIndex]
  const sidebarArticles = featuredNews.filter((_, idx) => idx !== currentIndex).slice(0, 3)

  const handleReadArticle = (id) => {
    const el = document.getElementById('noticias')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      const event = new CustomEvent('eco-news-read', { detail: id })
      window.dispatchEvent(event)
    }, 500)
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-navy dark:bg-gray-950 text-white">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Featured Article - Large (Left 7/12) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-pointer"
                onClick={() => handleReadArticle(current.id)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* Image */}
                  <div className="relative h-72 sm:h-80 lg:h-[480px] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={current.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent-red text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-lg">
                        {t('hero.featured')}
                      </span>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 space-y-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getCategoryColor(current.category)}`}>
                        {t(`feed.${current.category}`)}
                      </span>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                        {lang === 'en' ? current.titleEn || current.title : current.title}
                      </h1>
                      <p className="text-sm sm:text-base text-gray-300 line-clamp-2">
                        {lang === 'en' ? current.summaryEn || current.summary : current.summary}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                        <span className="flex items-center gap-1">
                          <HiCalendar className="w-3.5 h-3.5 text-green-400" />
                          {current.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiLocationMarker className="w-3.5 h-3.5 text-green-400" />
                          {current.location}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className="font-semibold text-gray-300">{current.author}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel controls */}
                {featuredNews.length > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      {featuredNews.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx) }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentIndex === idx ? 'w-8 bg-green-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length) }}
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                        aria-label="Previous"
                      >
                        <HiArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % featuredNews.length) }}
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                        aria-label="Next"
                      >
                        <HiArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Grid of smaller articles (Right 5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-green-400" />
                {t('hero.latest_news')}
              </h2>
              <button
                onClick={() => handleReadArticle(null)}
                className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                {t('hero.view_all')} →
              </button>
            </div>

            {sidebarArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => handleReadArticle(article.id)}
              >
                <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <span className={`inline-block self-start px-2 py-0.5 rounded text-2xs font-bold uppercase tracking-wider bg-gradient-to-r ${getCategoryColor(article.category)} mb-1`}>
                      {t(`feed.${article.category}`)}
                    </span>
                    <h3 className="text-sm font-bold leading-snug line-clamp-2 text-white group-hover:text-green-400 transition-colors">
                      {lang === 'en' ? article.titleEn || article.title : article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-2xs text-gray-400">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span className="text-green-400/70">{article.author}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/10 pt-8"
        >
          {[
            { value: 500000, label: lang === 'en' ? 'Trees Planted' : 'Árboles Sembrados', suffix: '+' },
            { value: 120, label: lang === 'en' ? 'Schools Reached' : 'Escuelas Alcanzadas', suffix: '+' },
            { value: 300, label: lang === 'en' ? 'Communities' : 'Comunidades', suffix: '+' },
            { value: 15, label: lang === 'en' ? 'Years of Impact' : 'Años de Impacto', suffix: '' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-green-400">
                <AnimatedCounter target={stat.value} duration={2} />{stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
