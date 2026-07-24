import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiCalendar, HiLocationMarker, HiEye, HiThumbUp, HiX, HiShare, HiSortAscending, HiClock } from 'react-icons/hi'
import { initialNews } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'

const getCategoryColor = (category) => {
  switch (category) {
    case 'liderazgo':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    case 'conservacion':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'ecologico':
      return 'bg-teal-500/10 text-teal-400 border-teal-500/20'
    case 'medioambiente':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'tecnologia':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

const getCategoryAccent = (category) => {
  switch (category) {
    case 'liderazgo':
      return 'border-l-purple-500'
    case 'conservacion':
      return 'border-l-emerald-500'
    case 'ecologico':
      return 'border-l-teal-500'
    case 'medioambiente':
      return 'border-l-blue-500'
    case 'tecnologia':
      return 'border-l-amber-500'
    default:
      return 'border-l-gray-500'
  }
}

const CATEGORIES = ['ecologico', 'medioambiente', 'conservacion', 'liderazgo', 'tecnologia']

export default function About() {
  const t = useT()
  const { lang } = useLanguage()

  const [news, setNews] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [activeArticle, setActiveArticle] = useState(null)

  const loadNews = () => {
    try {
      const stored = localStorage.getItem('eco-news')
      let newsList = initialNews
      if (stored) {
        newsList = [...JSON.parse(stored), ...initialNews]
      }
      setNews(newsList)
    } catch (e) {
      setNews(initialNews)
    }
  }

  useEffect(() => {
    loadNews()
    window.addEventListener('eco-news-published', loadNews)

    const handleOpenArticle = (e) => {
      const newsId = e.detail
      try {
        const stored = localStorage.getItem('eco-news')
        let newsList = initialNews
        if (stored) {
          newsList = [...JSON.parse(stored), ...initialNews]
        }
        const found = newsList.find((n) => n.id === newsId)
        if (found) {
          found.views += 1
          setActiveArticle(found)
        }
      } catch (err) {
        const found = initialNews.find((n) => n.id === newsId)
        if (found) {
          found.views += 1
          setActiveArticle(found)
        }
      }
    }

    window.addEventListener('eco-news-read', handleOpenArticle)

    return () => {
      window.removeEventListener('eco-news-published', loadNews)
      window.removeEventListener('eco-news-read', handleOpenArticle)
    }
  }, [])

  const handleLike = (id) => {
    try {
      const stored = localStorage.getItem('eco-news')
      let localNews = []
      if (stored) {
        localNews = JSON.parse(stored)
      }

      const isLocal = localNews.some((n) => n.id === id)
      let updatedNewsList = []

      if (isLocal) {
        updatedNewsList = localNews.map((n) => {
          if (n.id === id) return { ...n, likes: n.likes + 1 }
          return n
        })
        localStorage.setItem('eco-news', JSON.stringify(updatedNewsList))
      } else {
        const mergedNews = [...localNews, ...initialNews]
        const modified = mergedNews.map((n) => {
          if (n.id === id) return { ...n, likes: n.likes + 1 }
          return n
        })
        const localCreatedOnly = modified.filter((n) => !initialNews.some((init) => init.id === n.id))
        const seedOverrides = modified.filter((n) => initialNews.some((init) => init.id === n.id))
        localStorage.setItem('eco-news', JSON.stringify([...localCreatedOnly, ...seedOverrides.filter((s) => s.likes > initialNews.find((i) => i.id === s.id).likes)]))
      }

      loadNews()
      if (activeArticle && activeArticle.id === id) {
        setActiveArticle((prev) => ({ ...prev, likes: prev.likes + 1 }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const filteredNews = news
    .filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
      const text = `${item.title} ${item.titleEn || ''} ${item.summary} ${item.summaryEn || ''} ${item.content} ${item.contentEn || ''} ${item.location}`.toLowerCase()
      const searchMatch = text.includes(search.toLowerCase())
      return categoryMatch && searchMatch
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views
      if (sortBy === 'likes') return b.likes - a.likes
      return new Date(b.date) - new Date(a.date)
    })

  const latestNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  const openModal = (article) => {
    article.views += 1
    setActiveArticle(article)
  }

  const handleShare = (article) => {
    const shareText = `Sembrando Huellas Perú - "${lang === 'en' ? article.titleEn || article.title : article.title}" (${article.location})`
    navigator.clipboard.writeText(`${shareText}\n${t('about.share_text')} ${window.location.href}`)
    alert(t('about.copied'))
  }

  return (
    <section id="noticias" className="py-16 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2 block">
            {t('nav.noticias')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('feed.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('feed.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mt-6" />
        </div>

        {/* Search and Sort */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800/50 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:max-w-md">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('feed.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <HiSortAscending className="text-gray-400 w-5 h-5 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-sm font-medium"
              >
                <option value="date">{t('feed.date')}</option>
                <option value="views">{t('feed.popularity')}</option>
                <option value="likes">Likes</option>
              </select>
            </div>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-4">
            {['all', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? t('feed.all_categories') : t(`feed.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Latest News */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800/50 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiClock className="w-5 h-5 text-green-500" />
                {t('feed.latest_news')}
              </h3>
              <div className="space-y-4">
                {latestNews.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 p-3 rounded-xl cursor-pointer border-l-4 ${getCategoryAccent(item.category)} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                    onClick={() => openModal(item)}
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white">
                        {lang === 'en' ? item.titleEn || item.title : item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-2xs text-gray-500 dark:text-gray-400">
                        <span>{item.date}</span>
                        <span>·</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Category Blocks */}
          <div className="lg:col-span-8 space-y-10">
            {selectedCategory === 'all' ? (
              CATEGORIES.map((cat) => {
                const catNews = filteredNews.filter((n) => n.category === cat)
                if (catNews.length === 0) return null
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 dark:border-gray-800 pb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t(`feed.${cat}`)}
                      </h3>
                      <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors">
                        {t('feed.view_more')} →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {catNews.slice(0, 2).map((item, idx) => (
                        <motion.article
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                          onClick={() => openModal(item)}
                        >
                          <div className="sm:w-48 h-32 sm:h-28 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex flex-col justify-center flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-2xs font-bold uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                                {t(`feed.${item.category}`)}
                              </span>
                              <span className="text-2xs text-gray-400">{item.date}</span>
                            </div>
                            <h4 className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              {lang === 'en' ? item.titleEn || item.title : item.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {lang === 'en' ? item.summaryEn || item.summary : item.summary}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <HiCalendar className="w-3.5 h-3.5 text-green-500" />
                                {item.location}
                              </span>
                              <span className="font-medium text-gray-700 dark:text-gray-300">— {item.author}</span>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((item, idx) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
                    onClick={() => openModal(item)}
                  >
                    <div className="relative h-48 w-full overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-2xs font-extrabold uppercase border tracking-wider backdrop-blur-md shadow-md ${getCategoryColor(item.category)}`}>
                        {t(`feed.${item.category}`)}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-2xs md:text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <HiCalendar className="w-3.5 h-3.5 text-green-500" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiLocationMarker className="w-3.5 h-3.5 text-green-500" />
                            {item.location}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {lang === 'en' ? item.titleEn || item.title : item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 font-light leading-relaxed">
                          {lang === 'en' ? item.summaryEn || item.summary : item.summary}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <HiEye className="w-4 h-4 text-gray-400" />
                            {item.views}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleLike(item.id) }}
                            className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            <HiThumbUp className="w-4 h-4 text-gray-400" />
                            {item.likes}
                          </button>
                        </div>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {t('feed.read_more')} →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {filteredNews.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {t('feed.no_results')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reading Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-4xl max-h-[85vh] flex flex-col z-10"
              >
                <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-colors"
                    aria-label={t('about.close_modal')}
                  >
                    <HiX className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className={`px-3 py-1 rounded-full text-2xs font-extrabold uppercase border tracking-wider backdrop-blur-md inline-block ${getCategoryColor(activeArticle.category)}`}>
                      {t(`feed.${activeArticle.category}`)}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold leading-tight">
                      {lang === 'en' ? activeArticle.titleEn || activeArticle.title : activeArticle.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <HiCalendar className="w-4 h-4 text-green-500" />
                        {activeArticle.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiLocationMarker className="w-4 h-4 text-green-500" />
                        {activeArticle.location}
                      </span>
                      <span>
                        {t('feed.author')}: <strong className="text-gray-700 dark:text-gray-200 font-semibold">{activeArticle.author}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <HiEye className="w-4 h-4" />
                        {activeArticle.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiThumbUp className="w-4 h-4" />
                        {activeArticle.likes}
                      </span>
                    </div>
                  </div>

                  <div className="text-base sm:text-lg leading-relaxed font-light text-gray-700 dark:text-gray-300 space-y-4 whitespace-pre-line select-text selection:bg-green-500/30 selection:text-green-950">
                    {lang === 'en' ? activeArticle.contentEn || activeArticle.content : activeArticle.content}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLike(activeArticle.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 dark:bg-green-950/40 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold text-sm transition-all"
                    >
                      <HiThumbUp className="w-4 h-4" />
                      <span>{t('about.like')} ({activeArticle.likes})</span>
                    </button>
                    <button
                      onClick={() => handleShare(activeArticle)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm transition-all"
                    >
                      <HiShare className="w-4 h-4" />
                      <span>{t('feed.share')}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold text-sm transition-all"
                  >
                    {t('feed.close')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
