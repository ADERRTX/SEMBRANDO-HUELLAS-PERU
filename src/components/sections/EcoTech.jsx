import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineSun, HiOutlineChip, HiOutlineEye, HiOutlineFire,
  HiOutlinePhone, HiOutlineSparkles, HiX, HiArrowRight
} from 'react-icons/hi'
import { ECO_TECH_SOLUTIONS } from '../../constants'
import { useT } from '../../contexts/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeInUp, staggerContainer } from '../../animations/variants'

const iconMap = {
  HiOutlineSun,
  HiOutlineChip,
  HiOutlineEye,
  HiOutlineFire,
  HiOutlinePhone,
  HiOutlineSparkles,
}

function TechCard({ solution, index, onSelect }) {
  const Icon = iconMap[solution.icon] || HiOutlineSun

  return (
    <motion.div
      variants={fadeInUp}
      custom={index * 0.1}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(solution)}
      className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative z-10 p-6 md:p-8 flex flex-col min-h-[280px] justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            <motion.div
              className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {solution.stats.value}
            </motion.div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            {solution.title}
          </h3>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-3">
            {solution.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-1.5">
            {solution.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-2xs font-medium border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <HiArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>
    </motion.div>
  )
}

function TechDetailModal({ solution, onClose }) {
  const Icon = iconMap[solution.icon] || HiOutlineSun

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl z-10"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
      >
        <div className={`relative h-48 bg-gradient-to-br ${solution.gradient} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
          <motion.div
            className="relative w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{solution.title}</h3>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${solution.gradient} text-white`}>
                {solution.stats.label}: {solution.stats.value}
              </span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{solution.description}</p>

          <div className="flex flex-wrap gap-2">
            {solution.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Impacto Ambiental</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <motion.div
                  className="text-2xl font-bold text-green-600 dark:text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {solution.stats.value}
                </motion.div>
                <div className="text-xs text-gray-500 mt-1">{solution.stats.label}</div>
              </div>
              <div>
                <motion.div
                  className="text-2xl font-bold text-green-600 dark:text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  2024-26
                </motion.div>
                <div className="text-xs text-gray-500 mt-1">Período</div>
              </div>
              <div>
                <motion.div
                  className="text-2xl font-bold text-green-600 dark:text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Ucayali
                </motion.div>
                <div className="text-xs text-gray-500 mt-1">Región</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EcoTech() {
  const t = useT()
  const [selectedSolution, setSelectedSolution] = useState(null)
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section
      id="ecotech"
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-navy via-gray-900 to-navy relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-5xl block mb-3"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ⚡
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {t('ecotech.title')}
          </h2>
          <p className="text-green-200/60 max-w-2xl mx-auto text-lg">
            {t('ecotech.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {ECO_TECH_SOLUTIONS.map((solution, i) => (
            <TechCard
              key={solution.id}
              solution={solution}
              index={i}
              onSelect={setSelectedSolution}
            />
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <TechDetailModal
            solution={selectedSolution}
            onClose={() => setSelectedSolution(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
