import { useState } from 'react';
import { playCollect, playVictory } from '../../utils/sounds';

const GAMES = [
  { id: 'catch', icon: '🌍', title: 'Catch the Trash', desc: '¡Atrapa la basura antes de que caiga al río!', color: '#4caf50' },
  { id: 'tree', icon: '🌳', title: 'Plant a Tree', desc: 'Toca para plantar árboles y llenar la selva.', color: '#2e7d32' },
  { id: 'sort', icon: '♻️', title: 'Sort the Waste', desc: 'Arrastra la basura al contenedor correcto.', color: '#ff9800' },
  { id: 'maze', icon: '🦎', title: 'Save the Animal', desc: 'Ayuda al animal a llegar a su hábitat.', color: '#0066cc' },
];

function CatchGame() {
  const [score, setScore] = useState(0);
  const [falling, setFalling] = useState(null);
  const [running, setRunning] = useState(false);

  const trash = ['🥤', '🛍️', '🔋', '🪣'];
  const good = ['🌱', '🍎', '🦜'];

  const startGame = () => {
    setScore(0);
    setRunning(true);
    spawnItem();
  };

  const spawnItem = () => {
    const isTrash = Math.random() > 0.3;
    const items = isTrash ? trash : good;
    const emoji = items[Math.floor(Math.random() * items.length)];
    const left = 10 + Math.random() * 80;
    setFalling({ emoji, left, isTrash, top: 0 });
  };

  const catchItem = () => {
    if (!falling) return;
    if (falling.isTrash) {
      setScore((s) => s + 10);
      playCollect();
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
    setFalling(null);
    setTimeout(spawnItem, 600);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Puntos: {score}</p>
      {!running ? (
        <button onClick={startGame} style={{ padding: '12px 32px', borderRadius: '25px', background: '#4caf50', color: 'white', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
          ▶ Jugar
        </button>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '200px', background: '#e8f5e9', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }} onClick={catchItem}>
          {falling && (
            <span style={{ position: 'absolute', left: `${falling.left}%`, top: `${falling.top}%`, fontSize: '2rem', transition: 'top 0.5s linear' }}>
              {falling.emoji}
            </span>
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px', background: '#1565c0', borderRadius: '0 0 12px 12px' }} />
        </div>
      )}
      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>Toca para atrapar la basura 🗑️</p>
    </div>
  );
}

function TreeGame() {
  const [trees, setTrees] = useState([]);

  const plantTree = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTrees((prev) => [...prev, { x, y, id: Date.now() }]);
    playCollect();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Árboles: {trees.length}</p>
      <div onClick={plantTree} style={{ position: 'relative', width: '100%', height: '250px', background: 'linear-gradient(to bottom, #87ceeb 0%, #87ceeb 60%, #8B4513 60%, #8B4513 100%)', borderRadius: '12px', cursor: 'crosshair', overflow: 'hidden' }}>
        {trees.map((t) => (
          <span key={t.id} style={{ position: 'absolute', left: t.x - 12, top: t.y - 12, fontSize: '1.5rem' }}>🌳</span>
        ))}
        {trees.length >= 10 && <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, color: '#2e7d32' }}>🎉 ¡Selva restaurada!</div>}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>Toca para plantar árboles 🌱</p>
    </div>
  );
}

function SortGame() {
  const [item, setItem] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const bins = [
    { label: '♻️ Papel', type: 'paper', color: '#1565c0' },
    { label: '🟡 Plástico', type: 'plastic', color: '#f9a825' },
    { label: '🟢 Vidrio', type: 'glass', color: '#2e7d32' },
    { label: '🔴 Metal', type: 'metal', color: '#c62828' },
  ];

  const items = [
    { emoji: '📰', type: 'paper' }, { emoji: '📦', type: 'paper' },
    { emoji: '🧴', type: 'plastic' }, { emoji: '🥤', type: 'plastic' },
    { emoji: '🍾', type: 'glass' }, { emoji: '🫙', type: 'glass' },
    { emoji: '🥫', type: 'metal' }, { emoji: '🔩', type: 'metal' },
  ];

  const newItem = () => {
    setItem(items[Math.floor(Math.random() * items.length)]);
    setFeedback('');
  };

  const sort = (binType) => {
    if (!item) return;
    if (item.type === binType) {
      setScore((s) => s + 10);
      setFeedback('✅ ¡Correcto!');
      playCollect();
    } else {
      setFeedback('❌ ¡Incorrecto!');
    }
    setTimeout(newItem, 800);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Puntos: {score}</p>
      {!item ? (
        <button onClick={newItem} style={{ padding: '12px 32px', borderRadius: '25px', background: '#ff9800', color: 'white', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
          ▶ Jugar
        </button>
      ) : (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{item.emoji}</div>
          {feedback && <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>{feedback}</p>}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {bins.map((b) => (
              <button key={b.type} onClick={() => sort(b.type)}
                style={{ padding: '10px 18px', borderRadius: '12px', background: b.color, color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                {b.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MazeGame() {
  const [path, setPath] = useState([]);
  const steps = ['🌿', '🌊', '🌺', '🦎', '🌴', '🐟', '🦜', '🌻', '🐢'];

  const move = (idx) => {
    if (idx !== path.length) return;
    const newPath = [...path, idx];
    setPath(newPath);
    playCollect();
    if (newPath.length === steps.length) {
      playVictory();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Pasos: {path.length} / {steps.length}</p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '400px', margin: '0 auto' }}>
        {steps.map((emoji, i) => (
          <button key={i} onClick={() => move(i)}
            style={{
              width: '60px', height: '60px', borderRadius: '12px', fontSize: '1.5rem',
              border: '2px solid', cursor: i === path.length ? 'pointer' : 'default',
              borderColor: path.includes(i) ? '#4caf50' : '#ddd',
              background: path.includes(i) ? '#e8f5e9' : '#f5f5f5',
              opacity: path.includes(i) || i === path.length ? 1 : 0.4,
              transition: 'all 0.2s ease',
            }}>
            {path.includes(i) || i === path.length ? emoji : '❓'}
          </button>
        ))}
      </div>
      {path.length === steps.length && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#e8f5e9', borderRadius: '12px', fontWeight: 700, color: '#2e7d32' }}>
          🎉 ¡El animal llegó a casa!
        </div>
      )}
    </div>
  );
}

export default function GamesHub() {
  const [activeGame, setActiveGame] = useState(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'catch': return <CatchGame />;
      case 'tree': return <TreeGame />;
      case 'sort': return <SortGame />;
      case 'maze': return <MazeGame />;
      default: return null;
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#4caf50' }}>🎮 Minijuegos Ecológicos</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>Diviértete y aprende a cuidar el medio ambiente</p>
      </div>

      {activeGame && (
        <button onClick={() => setActiveGame(null)} style={{ marginBottom: '16px', padding: '8px 16px', borderRadius: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
          ← Volver
        </button>
      )}

      {activeGame ? renderGame() : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {GAMES.map((g) => (
            <div key={g.id} onClick={() => setActiveGame(g.id)}
              style={{
                padding: '24px', borderRadius: '16px', cursor: 'pointer',
                background: `${g.color}10`, border: `2px solid ${g.color}30`,
                textAlign: 'center', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${g.color}30`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{g.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: g.color, marginBottom: '4px' }}>{g.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{g.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
