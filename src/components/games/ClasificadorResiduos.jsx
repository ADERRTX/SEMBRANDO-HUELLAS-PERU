import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playCollect, playHit, playVictory, playLose, playTick, playConfetti } from '../../utils/sounds'

const WASTE_ITEMS = [
  { id: 1, emoji: '📰', label: 'Periódico', type: 'papel', points: 10, fact: 'El papel se recicla hasta 7 veces' },
  { id: 2, emoji: '🧴', label: 'Botella plástica', type: 'plastico', points: 10, fact: 'Tarda 450 años en degradarse' },
  { id: 3, emoji: '🍾', label: 'Botella de vidrio', type: 'vidrio', points: 15, fact: 'El vidrio es 100% reciclable' },
  { id: 4, emoji: '🥫', label: 'Lata de aluminio', type: 'metal', points: 15, fact: 'Una lata tarda 200 años en degradarse' },
  { id: 5, emoji: '🍌', label: 'Cáscara de banana', type: 'organico', points: 10, fact: 'Se decompone en 2-5 semanas' },
  { id: 6, emoji: '📦', label: 'Caja de cartón', type: 'papel', points: 10, fact: 'El cartón es biodegradable' },
  { id: 7, emoji: '🥤', label: 'Vaso plástico', type: 'plastico', points: 10, fact: 'Los plásticos tardan hasta 1000 años' },
  { id: 8, emoji: '🫙', label: 'Frasco de vidrio', type: 'vidrio', points: 15, fact: 'Un frasco puede reciclarse infinitamente' },
  { id: 9, emoji: '🔧', label: 'Llave metálica', type: 'metal', points: 15, fact: 'El metal se recicla sin perder calidad' },
  { id: 10, emoji: '🍂', label: 'Hojas secas', type: 'organico', points: 10, fact: 'Las hojas se convierten en compost' },
  { id: 11, emoji: '📝', label: 'Cuaderno viejo', type: 'papel', points: 10, fact: 'Reciclar 1 tonelada de papel salva 17 árboles' },
  { id: 12, emoji: '🎒', label: 'Mochila vieja', type: 'plastico', points: 10, fact: 'Los textiles también se pueden reciclar' },
  { id: 13, emoji: '⚙️', label: 'Engranaje', type: 'metal', points: 15, fact: 'El hierro se recicla con imanes' },
  { id: 14, emoji: '🥕', label: 'Cáscara de zanahoria', type: 'organico', points: 10, fact: 'Los restos de cocina son excelente abono' },
  { id: 15, emoji: '📕', label: 'Libro viejo', type: 'papel', points: 10, fact: 'Reciclar libros ahorra agua y energía' },
  { id: 16, emoji: '🪟', label: 'Cristal roto', type: 'vidrio', points: 15, fact: 'El cristal tarda 4000 años en degradarse' },
]

const BINS = [
  { type: 'papel', emoji: '📋', label: 'Papel y Cartón', color: '#2196f3', bgLight: '#e3f2fd' },
  { type: 'plastico', emoji: '🥤', label: 'Plásticos', color: '#ff9800', bgLight: '#fff3e0' },
  { type: 'vidrio', emoji: '🍾', label: 'Vidrio', color: '#4caf50', bgLight: '#e8f5e9' },
  { type: 'metal', emoji: '🥫', label: 'Metales', color: '#9e9e9e', bgLight: '#f5f5f5' },
  { type: 'organico', emoji: '🌱', label: 'Orgánico', color: '#795548', bgLight: '#efebe9' },
]

const GAME_DURATION = 45
const ROUND_ITEMS = 12

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ClasificadorResiduos() {
  const [gameState, setGameState] = useState('menu') // menu, playing, finished
  const [currentItem, setCurrentItem] = useState(null)
  const [queue, setQueue] = useState([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [timer, setTimer] = useState(GAME_DURATION)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [recentFacts, setRecentFacts] = useState([])
  const [dragOver, setDragOver] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (gameState !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setGameState('finished')
          playLose()
          return 0
        }
        if (t <= 5) playTick()
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [gameState])

  const startGame = useCallback(() => {
    const items = shuffleArray(WASTE_ITEMS).slice(0, ROUND_ITEMS)
    setQueue(items.slice(1))
    setCurrentItem(items[0])
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setTimer(GAME_DURATION)
    setCorrectCount(0)
    setWrongCount(0)
    setFeedback(null)
    setRecentFacts([])
    setGameState('playing')
  }, [])

  const handleBinClick = useCallback(
    (binType) => {
      if (!currentItem || gameState !== 'playing') return

      const isCorrect = currentItem.type === binType

      if (isCorrect) {
        const bonus = streak >= 3 ? 5 : 0
        setScore((s) => s + currentItem.points + bonus)
        setStreak((s) => {
          const newStreak = s + 1
          setMaxStreak((m) => Math.max(m, newStreak))
          return newStreak
        })
        setCorrectCount((c) => c + 1)
        setFeedback({ type: 'correct', message: `+${currentItem.points}${bonus ? ` +${bonus} racha!` : ''}` })
        playCollect()
        setRecentFacts((prev) => [{ fact: currentItem.fact, emoji: currentItem.emoji }, ...prev.slice(0, 2)])
      } else {
        setStreak(0)
        setWrongCount((c) => c + 1)
        setFeedback({ type: 'wrong', message: `¡Era ${currentItem.type}!` })
        playHit()
      }

      setTimeout(() => {
        if (queue.length > 0) {
          setCurrentItem(queue[0])
          setQueue((q) => q.slice(1))
        } else {
          clearInterval(timerRef.current)
          setGameState('finished')
          playVictory()
        }
        setFeedback(null)
      }, 800)
    },
    [currentItem, queue, streak, gameState]
  )

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (gameState === 'menu') {
    return (
      <div className="kids-panel">
        <div className="kids-section-header">
          <h3 className="kids-section-title" style={{ color: '#4caf50' }}>♻️ Clasificador de Residuos</h3>
          <p className="kids-section-subtitle">Aprende a separar la basura correctamente y gana puntos</p>
        </div>

        <div className="kids-waste-intro">
          <div className="kids-waste-intro-bins">
            {BINS.map((bin) => (
              <div key={bin.type} className="kids-waste-intro-bin" style={{ borderColor: bin.color }}>
                <span className="kids-waste-intro-bin-emoji">{bin.emoji}</span>
                <span className="kids-waste-intro-bin-label">{bin.label}</span>
              </div>
            ))}
          </div>

          <div className="kids-waste-intro-info">
            <div className="kids-waste-intro-stat">
              <span>⏱️</span>
              <span>{GAME_DURATION} segundos</span>
            </div>
            <div className="kids-waste-intro-stat">
              <span>📦</span>
              <span>{ROUND_ITEMS} residuos</span>
            </div>
            <div className="kids-waste-intro-stat">
              <span>⭐</span>
              <span>Bonus por racha</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={startGame} className="kids-play-btn">
            ♻️ ¡Clasificar Residuos!
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const total = correctCount + wrongCount
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0
    const rank =
      accuracy >= 90 ? { emoji: '🏆', title: 'Maestro Reciclador', color: '#ff9800' } :
      accuracy >= 70 ? { emoji: '⭐', title: 'Buen Clasificador', color: '#4caf50' } :
      accuracy >= 50 ? { emoji: '💪', title: 'Aprendiz Verde', color: '#2196f3' } :
      { emoji: '📚', title: 'Principiante', color: '#9e9e9e' }

    return (
      <div className="kids-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
          <div style={{ fontSize: '4rem', marginBottom: '8px' }}>{rank.emoji}</div>
          <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: rank.color, marginBottom: '4px' }}>{rank.title}</h3>
        </motion.div>

        <div className="kids-waste-result-grid">
          <div className="kids-waste-result-card" style={{ background: '#e8f5e9' }}>
            <p className="kids-waste-result-value" style={{ color: '#2e7d32' }}>{score}</p>
            <p className="kids-waste-result-label">Puntos</p>
          </div>
          <div className="kids-waste-result-card" style={{ background: '#e3f2fd' }}>
            <p className="kids-waste-result-value" style={{ color: '#1565c0' }}>{accuracy}%</p>
            <p className="kids-waste-result-label">Precisión</p>
          </div>
          <div className="kids-waste-result-card" style={{ background: '#fff3e0' }}>
            <p className="kids-waste-result-value" style={{ color: '#e65100' }}>{maxStreak}</p>
            <p className="kids-waste-result-label">Mejor Racha</p>
          </div>
        </div>

        <div className="kids-waste-result-details">
          <div className="kids-waste-result-row">
            <span style={{ color: '#4caf50' }}>✅ Correctos: {correctCount}</span>
            <span style={{ color: '#f44336' }}>❌ Incorrectos: {wrongCount}</span>
          </div>
        </div>

        {recentFacts.length > 0 && (
          <div className="kids-waste-facts">
            <h4>💡 Datos que aprendiste</h4>
            {recentFacts.map((f, i) => (
              <div key={i} className="kids-waste-fact-row">
                <span>{f.emoji}</span>
                <span>{f.fact}</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={startGame} className="kids-play-btn" style={{ marginTop: '20px' }}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="kids-game-grid-2">
      <div className="kids-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="kids-section-title" style={{ color: '#4caf50', marginBottom: 0, fontSize: '1.1rem' }}>
            ♻️ Clasificador
          </h3>
          <div className="kids-waste-timer" style={{ color: timer <= 10 ? '#f44336' : 'var(--text-primary)' }}>
            ⏱️ {formatTime(timer)}
          </div>
        </div>

        <div className="kids-waste-progress-bar">
          <div
            className="kids-waste-progress-fill"
            style={{
              width: `${((ROUND_ITEMS - queue.length - 1) / ROUND_ITEMS) * 100}%`,
              background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
            }}
          />
        </div>

        {feedback && (
          <motion.div
            className={`kids-waste-feedback ${feedback.type}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback.message}
          </motion.div>
        )}

        {currentItem && (
          <div className="kids-waste-current">
            <motion.div
              className="kids-waste-current-item"
              key={currentItem.id}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.4 }}
            >
              <span className="kids-waste-current-emoji">{currentItem.emoji}</span>
              <span className="kids-waste-current-label">{currentItem.label}</span>
              <span className="kids-waste-current-points">+{currentItem.points} pts</span>
            </motion.div>
          </div>
        )}

        <div className="kids-waste-bins">
          {BINS.map((bin) => (
            <motion.button
              key={bin.type}
              className={`kids-waste-bin${dragOver === bin.type ? ' hover' : ''}`}
              style={{ '--bin-color': bin.color, '--bin-bg': bin.bgLight }}
              onClick={() => handleBinClick(bin.type)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="kids-waste-bin-emoji">{bin.emoji}</span>
              <span className="kids-waste-bin-label">{bin.label}</span>
            </motion.button>
          ))}
        </div>

        {recentFacts.length > 0 && (
          <motion.div
            className="kids-waste-live-fact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💡 {recentFacts[0].fact}
          </motion.div>
        )}
      </div>

      <div className="kids-stat-sidebar">
        <h4>📊 Progreso</h4>
        <div className="kids-stat-rows">
          <div className="kids-stat-row">
            <span className="kids-stat-label">Puntos</span>
            <span className="kids-stat-value" style={{ color: '#4caf50' }}>{score}</span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Racha</span>
            <span className="kids-stat-value" style={{ color: streak >= 3 ? '#ff9800' : 'inherit' }}>
              {streak} {streak >= 3 ? '🔥' : ''}
            </span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Restantes</span>
            <span className="kids-stat-value">{queue.length + 1}</span>
          </div>
        </div>

        <div className="kids-accuracy-box">
          <p className="kids-accuracy-value" style={{ color: '#4caf50' }}>
            {correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0}%
          </p>
          <p className="kids-accuracy-label">Precisión</p>
        </div>

        <div className="kids-stat-dots">
          {Array.from({ length: correctCount + wrongCount }, (_, i) => (
            <div
              key={i}
              className="kids-stat-dot"
              style={{ background: i < correctCount ? '#4caf50' : '#f44336' }}
            />
          ))}
        </div>

        <div className="kids-waste-tip">
          <p>💡 Tip: Clasifica bien para ganar puntos extra con las rachas</p>
        </div>
      </div>
    </div>
  )
}
