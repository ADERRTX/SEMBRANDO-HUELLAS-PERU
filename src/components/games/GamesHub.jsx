import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GuardianesAmazonia from './GuardianesAmazonia'
import CircuitoEcologico from './CircuitoEcologico'
import RompecabezasAmazonia from './RompecabezasAmazonia'
import ClasificadorResiduos from './ClasificadorResiduos'

const GAMES = [
  {
    id: 'guardianes',
    title: 'Guardianes de la Amazonía',
    emoji: '🌳',
    description: 'Atrapa elementos positivos y evita los contaminantes. ¡Protege la selva con tus reflejos!',
    tags: ['Reflejos', 'Puntaje', '60 seg'],
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(76,175,80,0.3) 0%, transparent 50%)',
    difficulty: '⭐⭐',
    players: '1 jugador',
    category: 'Acción',
  },
  {
    id: 'circuito',
    title: 'Circuito Ecológico Amazónico',
    emoji: '🏆',
    description: 'Recorre 5 estaciones educativas: identifica animales, siembra árboles y separa residuos.',
    tags: ['Educativo', 'Estrellas', '5 Estaciones'],
    gradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1e88e5 100%)',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(33,150,243,0.3) 0%, transparent 50%)',
    difficulty: '⭐⭐⭐',
    players: '1 jugador',
    category: 'Educación',
  },
  {
    id: 'puzzle',
    title: 'Rompecabezas Amazónico',
    emoji: '🧩',
    description: 'Ordena las piezas para completar imágenes de la fauna y flora amazónica.',
    tags: ['Lógica', 'Puzzle', '6 Niveles'],
    gradient: 'linear-gradient(135deg, #e65100 0%, #f57c00 50%, #ff9800 100%)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255,152,0,0.3) 0%, transparent 50%)',
    difficulty: '⭐⭐',
    players: '1 jugador',
    category: 'Lógica',
  },
  {
    id: 'clasificador',
    title: 'Clasificador de Residuos',
    emoji: '♻️',
    description: 'Separa los residuos en los contenedores correctos y aprende a reciclar.',
    tags: ['Velocidad', 'Reciclaje', '45 seg'],
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #66bb6a 100%)',
    bgPattern: 'radial-gradient(circle at 70% 30%, rgba(102,187,106,0.3) 0%, transparent 50%)',
    difficulty: '⭐⭐',
    players: '1 jugador',
    category: 'Educación',
  },
]

const CATEGORY_COLORS = {
  'Acción': '#f44336',
  'Educación': '#2196f3',
  'Lógica': '#ff9800',
}

export default function GamesHub() {
  const [activeGame, setActiveGame] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...new Set(GAMES.map((g) => g.category))]
  const filteredGames = filter === 'all' ? GAMES : GAMES.filter((g) => g.category === filter)

  if (activeGame) {
    return (
      <section id="games" className="kids-games-active-section">
        <div className="max-w-6xl mx-auto">
          <div className="kids-games-active-header">
            <button
              onClick={() => setActiveGame(null)}
              className="kids-games-back-btn"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver a juegos
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeGame === 'guardianes' && <GuardianesAmazonia />}
              {activeGame === 'circuito' && <CircuitoEcologico />}
              {activeGame === 'puzzle' && <RompecabezasAmazonia />}
              {activeGame === 'clasificador' && <ClasificadorResiduos />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    )
  }

  return (
    <section id="games" className="kids-games-section">
      <div className="kids-games-container">
        <motion.div
          className="kids-games-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="kids-games-header-emoji"
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎮
          </motion.span>
          <h2 className="kids-games-title">
            Minijuegos Educativos
          </h2>
          <p className="kids-games-subtitle">
            Aprende sobre la Amazonía mientras te diviertes. Elige un juego y comienza la aventura.
          </p>
          <div className="kids-games-title-divider" />
        </motion.div>

        <div className="kids-games-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`kids-games-filter-btn${filter === cat ? ' active' : ''}`}
              style={filter === cat ? { background: cat === 'all' ? 'linear-gradient(135deg, #e91e63, #9c27b0)' : CATEGORY_COLORS[cat] || '#e91e63' } : {}}
            >
              {cat === 'all' ? '🎮 Todos' : cat}
            </button>
          ))}
        </div>

        <div className="kids-games-grid">
          {filteredGames.map((game, i) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveGame(game.id)}
              className="kids-games-card"
            >
              <div className="kids-games-card-bg" style={{ background: game.gradient }} />
              <div className="kids-games-card-pattern" style={{ backgroundImage: game.bgPattern }} />
              <div className="kids-games-card-shine" />

              <div className="kids-games-card-content">
                <div className="kids-games-card-top">
                  <div className="kids-games-card-category" style={{ background: CATEGORY_COLORS[game.category] || '#e91e63' }}>
                    {game.category}
                  </div>
                  <motion.span
                    className="kids-games-card-emoji"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {game.emoji}
                  </motion.span>
                </div>

                <h3 className="kids-games-card-title">{game.title}</h3>
                <p className="kids-games-card-desc">{game.description}</p>

                <div className="kids-games-card-meta">
                  <span className="kids-games-card-difficulty">
                    {'⭐'.repeat(parseInt(game.difficulty?.replace('⭐', '') || '2'))}
                  </span>
                  <span className="kids-games-card-players">{game.players}</span>
                </div>

                <div className="kids-games-card-tags">
                  {game.tags.map((tag) => (
                    <span key={tag} className="kids-games-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="kids-games-card-play">
                  <span>Jugar</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="kids-games-card-glow" />
            </motion.button>
          ))}
        </div>

        <motion.div
          className="kids-games-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>🌍 Juega y aprende a cuidar el planeta</p>
        </motion.div>
      </div>
    </section>
  )
}
