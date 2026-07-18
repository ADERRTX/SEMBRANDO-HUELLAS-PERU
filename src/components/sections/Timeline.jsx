import { motion } from 'framer-motion'
import { HiOutlineUser, HiGlobeAlt, HiBadgeCheck } from 'react-icons/hi'
import { ecoLeaders } from '../../data/news'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { useT, useLanguage } from '../../contexts/LanguageContext'

export default function Timeline() {
  const t = useT()
  const { lang } = useLanguage()
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section
      id="lideres"
      ref={ref}
      className="relative py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.05)_0%,_transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2 block">
            {t('nav.lideres')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('leaders.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            {t('leaders.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mt-6" />
        </div>

        {/* Leaders Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {ecoLeaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              variants={fadeInUp}
              custom={index * 0.1}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Leader Photo & Country */}
              <div className="relative h-64 w-full overflow-hidden shrink-0">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  <HiGlobeAlt className="w-3.5 h-3.5 text-green-400" />
                  {leader.country}
                </span>
              </div>

              {/* Leader Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase text-green-600 dark:text-green-400 mt-1">
                      {lang === 'en' ? leader.roleEn || leader.role : leader.role}
                    </p>
                  </div>

                  <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
                    {lang === 'en' ? leader.bioEn || leader.bio : leader.bio}
                  </p>
                </div>

                {/* Achievement Highlight */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80 space-y-1 text-xs">
                  <span className="flex items-center gap-1 text-2xs uppercase tracking-wider font-extrabold text-green-600 dark:text-green-400">
                    <HiBadgeCheck className="w-4 h-4" />
                    {t('leaders.achievements')}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium leading-normal italic line-clamp-2">
                    "{lang === 'en' ? leader.keyAchievementEn || leader.keyAchievement : leader.keyAchievement}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
