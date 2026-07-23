import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playCollect, playVictory, playClick, playError } from '../../utils/sounds'

const PUZZLES = [
  {
    id: 'jaguar',
    title: 'Jaguar Amazónico',
    emoji: '🐆',
    hint: 'El felino más grande de América, con la mordida más fuerte de todos los felinos.',
    difficulty: 'Fácil',
    grid: 3,
  },
  {
    id: 'toucan',
    title: 'Tucán de la Selva',
    emoji: '🦜',
    hint: 'Ave colorida con un pico enorme que habita los bosques tropicales.',
    difficulty: 'Fácil',
    grid: 3,
  },
  {
    id: 'delfin',
    title: 'Delfín del Río',
    emoji: '🐬',
    hint: 'Mamífero acuático que nada en los ríos amazónicos.',
    difficulty: 'Medio',
    grid: 4,
  },
  {
    id: 'morpho',
    title: 'Mariposa Morpho',
    emoji: '🦋',
    hint: 'Mariposa con alas iridiscentes azul brillante.',
    difficulty: 'Medio',
    grid: 4,
  },
  {
    id: 'arbol',
    title: 'Árbol de la Selva',
    emoji: '🌳',
    hint: 'Los árboles de la Amazonía pueden alcanzar 60 metros de altura.',
    difficulty: 'Difícil',
    grid: 4,
  },
  {
    id: 'rana',
    title: 'Rana Venenosa',
    emoji: '🐸',
    hint: 'Anfibio de colores brillantes que advierte con su veneno.',
    difficulty: 'Difícil',
    grid: 4,
  },
]

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateSolvableTiles(gridSize) {
  const total = gridSize * gridSize
  const tiles = Array.from({ length: total - 1 }, (_, i) => i + 1)
  tiles.push(0)

  let shuffled = shuffleArray(tiles)
  let attempts = 0

  while (!isSolvable(shuffled, gridSize) && attempts < 1000) {
    shuffled = shuffleArray(tiles)
    attempts++
  }

  return shuffled
}

function isSolvable(tiles, gridSize) {
  let inversions = 0
  const flat = tiles.filter((t) => t !== 0)
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++
    }
  }
  if (gridSize % 2 === 1) return inversions % 2 === 0
  const blankRow = Math.floor(tiles.indexOf(0) / gridSize)
  return (blankRow % 2 === 0) === (inversions % 2 === 1)
}

function PuzzleTile({ tile, index, gridSize, onClick, solved, puzzle }) {
  if (tile === 0) return <div className="kids-puzzle-tile empty" />

  const row = Math.floor(index / gridSize)
  const col = index % gridSize
  const correctRow = Math.floor((tile - 1) / gridSize)
  const correctCol = (tile - 1) % gridSize

  const size = 100 / gridSize
  const emojiSize = gridSize === 3 ? '2.2rem' : '1.6rem'

  return (
    <motion.button
      className={`kids-puzzle-tile${solved ? ' solved' : ''}`}
      onClick={() => onClick(index)}
      whileHover={!solved ? { scale: 1.05 } : {}}
      whileTap={!solved ? { scale: 0.95 } : {}}
      style={{
        position: 'absolute',
        left: `${col * size}%`,
        top: `${row * size}%`,
        width: `${size}%`,
        height: `${size}%`,
        fontSize: emojiSize,
      }}
    >
      <span className="block">{puzzle.emoji}</span>
      <span className="kids-puzzle-tile-num" style={{ fontSize: gridSize === 3 ? '0.7rem' : '0.55rem' }}>
        {tile}
      </span>
    </motion.button>
  )
}

export default function RompecabezasAmazonia() {
  const [selectedPuzzle, setSelectedPuzzle] = useState(null)
  const [tiles, setTiles] = useState([])
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [started, setStarted] = useState(false)
  const [solved, setSolved] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!started || solved) return
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [started, solved])

  const startPuzzle = useCallback((puzzle) => {
    setSelectedPuzzle(puzzle)
    setTiles(generateSolvableTiles(puzzle.grid))
    setMoves(0)
    setTimer(0)
    setStarted(false)
    setSolved(false)
  }, [])

  const handleTileClick = useCallback(
    (index) => {
      if (solved) return
      if (!started) setStarted(true)

      const emptyIndex = tiles.indexOf(0)
      const gridSize = selectedPuzzle.grid

      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      const emptyRow = Math.floor(emptyIndex / gridSize)
      const emptyCol = emptyIndex % gridSize

      const isAdjacent =
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)

      if (!isAdjacent) {
        playError()
        return
      }

      const newTiles = [...tiles]
      ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
      setTiles(newTiles)
      setMoves((m) => m + 1)
      playClick()

      const total = gridSize * gridSize
      const isNowSolved = newTiles.every((t, i) => {
        if (i === total - 1) return t === 0
        return t === i + 1
      })

      if (isNowSolved) {
        setSolved(true)
        playVictory()
        setHistory((prev) => [
          {
            puzzle: selectedPuzzle,
            moves: moves + 1,
            time: timer,
          },
          ...prev.slice(0, 4),
        ])
      }
    },
    [tiles, solved, started, selectedPuzzle, moves, timer]
  )

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!selectedPuzzle) {
    return (
      <div className="kids-panel">
        <div className="kids-section-header">
          <h3 className="kids-section-title" style={{ color: '#ff9800' }}>🧩 Rompecabezas Amazónico</h3>
          <p className="kids-section-subtitle">Elige una imagen y ordénala para completar el rompecabezas</p>
        </div>

        <div className="kids-puzzle-select-grid">
          {PUZZLES.map((p) => (
            <motion.button
              key={p.id}
              className="kids-puzzle-select-card"
              onClick={() => startPuzzle(p)}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="kids-puzzle-select-emoji">{p.emoji}</span>
              <h4 className="kids-puzzle-select-title">{p.title}</h4>
              <span className="kids-puzzle-select-diff">{p.difficulty}</span>
              <span className="kids-puzzle-select-grid-size">{p.grid}x{p.grid}</span>
            </motion.button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="kids-puzzle-history">
            <h4>🏆 Historial Reciente</h4>
            {history.map((h, i) => (
              <div key={i} className="kids-puzzle-history-row">
                <span>{h.puzzle.emoji} {h.puzzle.title}</span>
                <span>{h.moves} movimientos · {formatTime(h.time)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const total = selectedPuzzle.grid * selectedPuzzle.grid

  return (
    <div className="kids-game-grid-2">
      <div className="kids-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={() => setSelectedPuzzle(null)}
            className="kids-puzzle-back-btn"
          >
            ← Volver
          </button>
          <h3 className="kids-section-title" style={{ color: '#ff9800', marginBottom: 0, fontSize: '1.1rem' }}>
            {selectedPuzzle.emoji} {selectedPuzzle.title}
          </h3>
        </div>

        <div className="kids-puzzle-hint">
          <span>💡</span> {selectedPuzzle.hint}
        </div>

        <div className="kids-puzzle-board-container">
          <div
            className="kids-puzzle-board"
            style={{ gridTemplateColumns: `repeat(${selectedPuzzle.grid}, 1fr)` }}
          >
            {tiles.map((tile, i) => (
              <PuzzleTile
                key={tile}
                tile={tile}
                index={i}
                gridSize={selectedPuzzle.grid}
                onClick={handleTileClick}
                solved={solved}
                puzzle={selectedPuzzle}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {solved && (
            <motion.div
              className="kids-puzzle-win"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="kids-puzzle-win-emoji">🎉</div>
              <h4>¡Completado!</h4>
              <p>{moves} movimientos · {formatTime(timer)}</p>
              <div className="kids-puzzle-win-stars">
                {moves <= total * 2 ? '⭐⭐⭐' : moves <= total * 4 ? '⭐⭐' : '⭐'}
              </div>
              <button onClick={() => startPuzzle(selectedPuzzle)} className="kids-play-btn" style={{ marginTop: '12px' }}>
                🔄 Jugar de Nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!solved && started && (
          <div className="kids-puzzle-stats-bar">
            <span>🔢 {moves} movimientos</span>
            <span>⏱️ {formatTime(timer)}</span>
          </div>
        )}
      </div>

      <div className="kids-stat-sidebar">
        <h4>📊 Estadísticas</h4>
        <div className="kids-stat-rows">
          <div className="kids-stat-row">
            <span className="kids-stat-label">Movimientos</span>
            <span className="kids-stat-value" style={{ color: '#ff9800' }}>{moves}</span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Tiempo</span>
            <span className="kids-stat-value">{formatTime(timer)}</span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Dificultad</span>
            <span className="kids-stat-value">{selectedPuzzle.difficulty}</span>
          </div>
        </div>

        <div className="kids-accuracy-box">
          <p className="kids-accuracy-value" style={{ color: '#ff9800' }}>
            {Math.round(((total - 1 - tiles.filter((t, i) => {
              if (t === 0) return false
              return t !== i + 1
            }).length) / (total - 1)) * 100)}%
          </p>
          <p className="kids-accuracy-label">Progreso</p>
        </div>

        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Objetivo: ordenar del 1 al {total - 1}
          </p>
          <div className="kids-puzzle-reference">
            {Array.from({ length: total - 1 }, (_, i) => (
              <span key={i} className="kids-puzzle-ref-num">{i + 1}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
