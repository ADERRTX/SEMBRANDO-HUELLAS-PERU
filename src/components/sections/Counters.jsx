import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineScale, HiTrendingUp, HiGlobe, HiSun } from 'react-icons/hi'
import { globalStats } from '../../data/news'
import { useT, useLanguage } from '../../contexts/LanguageContext'

const icons = {
  plastic: HiOutlineScale,
  co2: HiTrendingUp,
  trees: HiGlobe,
  energy: HiSun
}

export default function Counters() {
  const t = useT()
  const { lang } = useLanguage()
  const [stats, setStats] = useState(globalStats)
  const animFrameId = useRef(null)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const updateStats = () => {
      const now = Date.now()
      const deltaSeconds = (now - lastTime.current) / 1000
      lastTime.current = now

      setStats((prevStats) =>
        prevStats.map((stat) => {
          let increment = stat.rate * deltaSeconds
          return {
            ...stat,
            value: stat.value + increment
          }
        })
      )

      animFrameId.current = requestAnimationFrame(updateStats)
    }

    animFrameId.current = requestAnimationFrame(updateStats)

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current)
      }
    }
  }, [])

  const formatValue = (val, decimals) => {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  return (
    <section id="estadisticas" className="py-20 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2 block">
            {t('nav.estadisticas')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('stats.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            {t('stats.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mt-6" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = icons[stat.id] || HiGlobe
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden group"
              >
                {/* Decorative glow */}
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-green-500/5 group-hover:bg-green-500/10 blur-xl transition-all" />

                {/* Icon wrapper */}
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center mb-6 text-green-600 dark:text-green-400 border border-green-100/50 dark:border-green-900/30">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Value */}
                <span className={`text-3xl md:text-4xl font-extrabold font-mono tracking-tight select-all ${stat.color} mb-3`}>
                  {stat.prefix}
                  {formatValue(stat.value, stat.decimals)}
                  {stat.suffix}
                </span>

                {/* Title */}
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  {lang !== 'es' ? stat.titleEn || stat.title : stat.title}
                </h3>

                {/* Incremental Speed Badge */}
                <span className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-3xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {stat.rate > 0 ? `+${stat.rate}/s` : 'Real-time'}
                </span>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
