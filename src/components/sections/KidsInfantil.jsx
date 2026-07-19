import { useState } from 'react';
import { useT, useLanguage } from '../../contexts/LanguageContext';

const funFacts = [
  { emoji: '🌳', titleKey: 'fact1_title', descKey: 'fact1' },
  { emoji: '🦅', titleKey: 'fact2_title', descKey: 'fact2' },
  { emoji: '🌊', titleKey: 'fact3_title', descKey: 'fact3' },
  { emoji: '🌸', titleKey: 'fact4_title', descKey: 'fact4' },
];

const quizQuestions = [
  { qKey: 'quiz_q1', options: ['quiz_q1_a', 'quiz_q1_b', 'quiz_q1_c'], answer: 1, answerKey: 'quiz_q1_answer' },
  { qKey: 'quiz_q2', options: ['quiz_q2_a', 'quiz_q2_b', 'quiz_q2_c'], answer: 1, answerKey: 'quiz_q2_answer' },
  { qKey: 'quiz_q3', options: ['quiz_q3_a', 'quiz_q3_b', 'quiz_q3_c'], answer: 1, answerKey: 'quiz_q3_answer' },
];

const memoryPairs = [
  { id: 1, emoji: '🦁', name: 'Lion' },
  { id: 2, emoji: '🐘', name: 'Elephant' },
  { id: 3, emoji: '🦜', name: 'Parrot' },
  { id: 4, emoji: '🐬', name: 'Dolphin' },
  { id: 5, emoji: '🦋', name: 'Butterfly' },
  { id: 6, emoji: '🐢', name: 'Turtle' },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KidsInfantil() {
  const t = useT();
  const { lang } = useLanguage();
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [memoryCards] = useState(() => {
    const pairs = memoryPairs.flatMap((p) => [
      { ...p, pairId: p.id, uniqueId: p.id + '_a' },
      { ...p, pairId: p.id, uniqueId: p.id + '_b' },
    ]);
    return shuffleArray(pairs);
  });
  const [flipped, setFlipped] = useState({});
  const [matched, setMatched] = useState({});
  const [firstPick, setFirstPick] = useState(null);

  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === quizQuestions[quizIndex].answer) setQuizScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleCardClick = (card, idx) => {
    if (flipped[idx] || matched[card.pairId] || Object.keys(flipped).length >= 2) return;
    const newFlipped = { ...flipped, [idx]: true };
    setFlipped(newFlipped);
    if (firstPick === null) {
      setFirstPick({ card, idx });
    } else {
      if (firstPick.card.pairId === card.pairId && firstPick.idx !== idx) {
        setMatched((m) => ({ ...m, [card.pairId]: true }));
        setFlipped({});
        setFirstPick(null);
      } else {
        setTimeout(() => { setFlipped({}); setFirstPick(null); }, 800);
      }
    }
  };

  return (
    <section id="ninos" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-child" /></div>
          <h2 className="section-title">🌈 {t('kids.title')}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        {/* QUIZ */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', fontWeight: 800, color: '#e91e63', marginBottom: '4px' }}>🧠 {t('kids.quiz_title')}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{t('kids.quiz_subtitle')}</p>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {Array.from({ length: quizQuestions.length }).map((_, i) => (
              <div key={i} style={{
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 700,
                background: i < quizIndex ? (i < quizScore ? '#4caf50' : '#f44336') : i === quizIndex ? '#e91e63' : '#e0e0e0',
                color: i <= quizIndex ? 'white' : '#9e9e9e',
              }}>{i + 1}</div>
            ))}
          </div>

          {quizIndex < quizQuestions.length ? (
            <>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>{t(quizQuestions[quizIndex].qKey)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quizQuestions[quizIndex].options.map((optKey, idx) => (
                  <button key={idx} onClick={() => !showResult && handleQuizAnswer(idx)} disabled={showResult}
                    style={{
                      width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                      fontWeight: 500, border: '2px solid',
                      borderColor: showResult
                        ? idx === quizQuestions[quizIndex].answer ? '#4caf50' : idx === selectedAnswer ? '#f44336' : '#e0e0e0'
                        : '#e0e0e0',
                      background: showResult
                        ? idx === quizQuestions[quizIndex].answer ? '#e8f5e9' : idx === selectedAnswer ? '#ffebee' : '#fafafa'
                        : 'white',
                      color: showResult
                        ? idx === quizQuestions[quizIndex].answer ? '#2e7d32' : idx === selectedAnswer ? '#c62828' : '#9e9e9e'
                        : 'var(--text-primary)',
                      cursor: showResult ? 'default' : 'pointer',
                      transition: 'var(--transition)',
                    }}>
                    {t(optKey)}
                  </button>
                ))}
              </div>
              {showResult && (
                <div style={{ marginTop: '16px', padding: '16px', borderRadius: 'var(--radius-sm)', background: '#fce4ec', border: '1px solid #f48fb1' }}>
                  <p style={{ fontWeight: 700, color: '#e91e63' }}>✨ {t(quizQuestions[quizIndex].answerKey)}</p>
                  {quizIndex < quizQuestions.length - 1 && (
                    <button onClick={nextQuestion} style={{ marginTop: '12px', padding: '8px 20px', borderRadius: '20px', background: '#e91e63', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      Siguiente →
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{quizScore === quizQuestions.length ? '🏆' : quizScore >= 2 ? '⭐' : '💪'}</div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{quizScore}/{quizQuestions.length}</p>
              <button onClick={() => { setQuizIndex(0); setSelectedAnswer(null); setShowResult(false); setQuizScore(0); }}
                style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '20px', background: '#e91e63', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                Jugar de Nuevo 🔄
              </button>
            </div>
          )}
        </div>

        {/* MEMORY GAME */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', fontWeight: 800, color: '#00bcd4', marginBottom: '4px' }}>🃏 {t('kids.memory_game')}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t('kids.memory_desc')}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {memoryCards.map((card, idx) => {
              const isFlipped = flipped[idx] || matched[card.pairId];
              return (
                <button key={card.uniqueId} onClick={() => handleCardClick(card, idx)}
                  style={{
                    aspectRatio: '1', borderRadius: 'var(--radius-sm)', fontSize: '1.5rem', fontWeight: 700,
                    transition: 'all 0.3s ease', border: '2px solid',
                    borderColor: isFlipped ? (matched[card.pairId] ? '#4caf50' : '#00bcd4') : '#00bcd4',
                    background: isFlipped ? (matched[card.pairId] ? '#e8f5e9' : '#e0f7fa') : 'linear-gradient(135deg, #00bcd4, #2196f3)',
                    color: isFlipped ? 'inherit' : 'white',
                    cursor: 'pointer',
                  }}>
                  {isFlipped ? card.emoji : '?'}
                </button>
              );
            })}
          </div>

          {Object.keys(matched).length === memoryPairs.length && (
            <div style={{ textAlign: 'center', marginTop: '16px', padding: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00bcd4' }}>¡Felicidades! Encontraste todos los pares</p>
            </div>
          )}
        </div>
      </div>

      {/* FUN FACTS */}
      <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', color: '#ff5722', marginBottom: '24px' }}>
        🤩 {t('kids.fun_facts')}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {funFacts.map((fact, i) => (
          <div key={i} style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{fact.emoji}</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{t(fact.titleKey)}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(fact.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
