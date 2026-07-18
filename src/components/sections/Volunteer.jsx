import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiQuestionMarkCircle, HiCheckCircle } from 'react-icons/hi'
import { initialPoll } from '../../data/news'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeInUp } from '../../animations/variants'
import { useT, useLanguage } from '../../contexts/LanguageContext'

export default function Volunteer() {
  const t = useT()
  const { lang } = useLanguage()
  const [ref, isVisible] = useScrollReveal(0.1)

  const [poll, setPoll] = useState(initialPoll)
  const [selectedOption, setSelectedOption] = useState('')
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    try {
      const voted = localStorage.getItem('eco-poll-voted')
      const storedPoll = localStorage.getItem('eco-poll-data')
      
      if (voted) {
        setHasVoted(true)
      }
      if (storedPoll) {
        setPoll(JSON.parse(storedPoll))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const handleVote = () => {
    if (!selectedOption) return

    try {
      const updatedOptions = poll.options.map((opt) => {
        if (opt.id === selectedOption) {
          return { ...opt, votes: opt.votes + 1 }
        }
        return opt
      })

      const updatedPoll = { ...poll, options: updatedOptions }
      setPoll(updatedPoll)
      setHasVoted(true)

      localStorage.setItem('eco-poll-voted', selectedOption)
      localStorage.setItem('eco-poll-data', JSON.stringify(updatedPoll))
    } catch (e) {
      console.error(e)
    }
  }

  const getTotalVotes = () => {
    return poll.options.reduce((sum, opt) => sum + opt.votes, 0)
  }

  const getPercentage = (votes) => {
    const total = getTotalVotes()
    if (total === 0) return 0
    return ((votes / total) * 100).toFixed(1)
  }

  return (
    <section
      id="encuesta"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2 block">
            {t('nav.encuesta')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('poll.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-light">
            {t('poll.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mt-6" />
        </div>

        {/* Poll Card */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xl overflow-hidden p-6 md:p-10 relative"
        >
          {/* Decorative tag */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-green-600" />

          {/* Question */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center shrink-0 border border-green-100/50 dark:border-green-900/30 text-green-600 dark:text-green-400">
              <HiQuestionMarkCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white leading-snug">
              {lang === 'en' ? poll.questionEn || poll.question : poll.question}
            </h3>
          </div>

          {/* Poll Options */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!hasVoted ? (
                <motion.div
                  key="poll-voting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {poll.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm md:text-base ${
                        selectedOption === opt.id
                          ? 'border-green-600 bg-green-50/50 dark:border-green-400 dark:bg-green-950/20 font-semibold text-green-800 dark:text-green-300'
                          : 'border-gray-250 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang === 'en' ? opt.textEn || opt.text : opt.text}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedOption === opt.id
                          ? 'border-green-600 dark:border-green-400 bg-green-600 dark:bg-green-400'
                          : 'border-gray-400 dark:border-gray-600'
                      }`}>
                        {selectedOption === opt.id && <span className="w-2 h-2 rounded-full bg-white dark:bg-gray-900" />}
                      </div>
                    </button>
                  ))}

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleVote}
                      disabled={!selectedOption}
                      className={`px-8 py-3.5 rounded-full text-base font-bold tracking-wider shadow-md transition-all ${
                        selectedOption
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-98 cursor-pointer'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {t('poll.vote_button')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="poll-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                    <HiCheckCircle className="w-5 h-5" />
                    {t('poll.voted_label')}
                  </p>

                  {poll.options.map((opt) => {
                    const pct = getPercentage(opt.votes)
                    const isUserVote = localStorage.getItem('eco-poll-voted') === opt.id
                    return (
                      <div key={opt.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                          <span className={isUserVote ? 'text-green-700 dark:text-green-400 font-bold' : ''}>
                            {lang === 'en' ? opt.textEn || opt.text : opt.text} {isUserVote && ' (Tu voto)'}
                          </span>
                          <span className="font-bold">{pct}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative border border-gray-200/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${
                              isUserVote ? 'from-green-500 to-emerald-600' : 'from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700'
                            }`}
                          />
                        </div>
                        <span className="text-2xs text-gray-500 dark:text-gray-500 font-light pl-1">
                          {opt.votes.toLocaleString()} votos
                        </span>
                      </div>
                    )
                  })}

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 flex justify-between items-center text-xs text-gray-500">
                    <span>EcoAcción Poll Network</span>
                    <span>
                      {t('poll.total_votes')}: <strong className="font-bold text-gray-700 dark:text-gray-300">{getTotalVotes().toLocaleString()}</strong>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
