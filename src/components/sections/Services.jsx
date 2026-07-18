import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { initialNews } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../hooks/useTheme'
import 'leaflet/dist/leaflet.css'

// Define custom HTML DivIcon based on category
const createPulsingIcon = (category) => {
  let colorClass = 'bg-emerald-500'
  let ringClass = 'border-emerald-500'
  if (category === 'liderazgo') {
    colorClass = 'bg-purple-500'
    ringClass = 'border-purple-500'
  } else if (category === 'medioambiente') {
    colorClass = 'bg-blue-500'
    ringClass = 'border-blue-500'
  } else if (category === 'ecologico') {
    colorClass = 'bg-teal-500'
    ringClass = 'border-teal-500'
  }

  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-6 h-6">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-40"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 ${colorClass} border-2 border-white dark:border-gray-900 shadow-md"></span>
      </div>
    `,
    className: 'custom-pulsing-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export default function Services() {
  const t = useT()
  const { lang } = useLanguage()
  const { dark } = useTheme()
  const [news, setNews] = useState([])
  const [ref, isVisible] = useScrollReveal(0.1)

  const loadMapNews = () => {
    try {
      const stored = localStorage.getItem('eco-news')
      let newsList = initialNews
      if (stored) {
        newsList = [...JSON.parse(stored), ...initialNews]
      }
      setNews(newsList.filter(n => n.coordinates && n.coordinates.length === 2))
    } catch (e) {
      setNews(initialNews.filter(n => n.coordinates && n.coordinates.length === 2))
    }
  }

  useEffect(() => {
    loadMapNews()
    window.addEventListener('eco-news-published', loadMapNews)
    return () => window.removeEventListener('eco-news-published', loadMapNews)
  }, [])

  const handleMarkerClick = (id) => {
    const el = document.getElementById('noticias')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      const event = new CustomEvent('eco-news-read', { detail: id })
      window.dispatchEvent(event)
    }, 500)
  }

  // Pick tile layers based on dark mode
  const tileUrl = dark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

  return (
    <section
      id="mapa"
      ref={ref}
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2 block">
            {t('nav.mapa')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('map.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            {t('map.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mt-6" />
        </div>

        {/* Map Container */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 h-[500px] w-full z-10"
        >
          <MapContainer
            center={[15, -20]}
            zoom={2.5}
            scrollWheelZoom={false}
            className="h-full w-full z-10"
            style={{ background: dark ? '#1e293b' : '#f1f5f9' }}
          >
            <TileLayer
              url={tileUrl}
              attribution={tileAttribution}
            />

            {news.map((item) => (
              <Marker
                key={item.id}
                position={item.coordinates}
                icon={createPulsingIcon(item.category)}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 space-y-2 text-left min-w-[200px]">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 tracking-wider">
                      {t(`feed.${item.category}`)}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {lang === 'en' ? item.titleEn || item.title : item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      📍 {item.location} • 📅 {item.date}
                    </p>
                    <button
                      onClick={() => handleMarkerClick(item.id)}
                      className="w-full mt-2 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors duration-200 text-center"
                    >
                      {t('map.view_news')}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </div>

      {/* Popup CSS customizations */}
      <style>{`
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          border: 1px solid rgba(229, 231, 235, 0.5);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .dark .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background: rgba(17, 24, 39, 0.95);
          border: 1px solid rgba(75, 85, 99, 0.3);
          color: white;
        }
        .custom-leaflet-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.9);
        }
        .dark .custom-leaflet-popup .leaflet-popup-tip {
          background: rgba(17, 24, 39, 0.95);
        }
      `}</style>
    </section>
  )
}
