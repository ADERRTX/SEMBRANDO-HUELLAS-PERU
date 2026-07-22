import { useState, useEffect, useRef } from 'react';
import { MEDIO_AMBIENTE_NEWS, FLORA_FAUNA_NEWS, CIENCIA_NEWS, ECONOMIA_NEWS } from '../../constants';
import NewsModal from '../ui/NewsModal';

const ALL_NEWS = [
  ...MEDIO_AMBIENTE_NEWS.map((n) => ({ ...n, section: 'Medio Ambiente' })),
  ...FLORA_FAUNA_NEWS.map((n) => ({ ...n, section: 'Flora y Fauna' })),
  ...CIENCIA_NEWS.map((n) => ({ ...n, section: 'Ciencia' })),
  ...ECONOMIA_NEWS.map((n) => ({ ...n, section: 'Economía Verde' })),
];

const IMPORTANT_NEWS = ALL_NEWS
  .filter((n) => parseInt(n.views?.replace(/,/g, '') || '0') > 7000)
  .slice(0, 8)
  .map((n, i) => ({ ...n, uniqueId: `${n.section}-${n.id}-${i}` }));

const HEADER_WORDS = ['Noticias', 'Ultima Hora', 'Flash', 'Breaking'];
const HEADER_ICONS = ['fa-fire', 'fa-bolt', 'fa-exclamation-triangle', 'fa-broadcast-tower'];

const SLIDE_INTERVAL = 20000;

export default function BreakingNewsCarousel() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fadeState, setFadeState] = useState('visible');
  const [headerIdx, setHeaderIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setHeaderIdx((prev) => (prev + 1) % HEADER_WORDS.length);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const goTo = (idx) => {
    setFadeState('hidden');
    setTimeout(() => {
      setCurrentIdx(idx);
      setFadeState('visible');
    }, 300);
  };

  const next = () => goTo((currentIdx + 1) % IMPORTANT_NEWS.length);
  const prev = () => goTo((currentIdx - 1 + IMPORTANT_NEWS.length) % IMPORTANT_NEWS.length);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [paused, currentIdx]);

  if (IMPORTANT_NEWS.length === 0) return null;

  const news = IMPORTANT_NEWS[currentIdx];

  return (
    <section
      className="news-section breaking-carousel-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-icon carousel-icon-animated" key={headerIdx}>
              <i className={`fas ${HEADER_ICONS[headerIdx]}`} />
            </div>
            <h2 className="section-title carousel-title-animated">
              <span className="carousel-title-word" key={headerIdx}>{HEADER_WORDS[headerIdx]}</span>
              <span className="carousel-title-static"> Importantes</span>
            </h2>
          </div>
          <div className="carousel-nav-btns">
            <button className="carousel-nav-btn" onClick={prev} aria-label="Anterior">
              <i className="fas fa-chevron-left" />
            </button>
            <button className="carousel-nav-btn" onClick={next} aria-label="Siguiente">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>

      <div className="fade-carousel-container">
        <div className={`fade-carousel-slide ${fadeState}`} onClick={() => setSelectedNews(news)}>
          <div
            className="fade-carousel-image"
            style={{
              backgroundImage: news.image
                ? `url(${news.image})`
                : 'linear-gradient(135deg, #1a5c1a 0%, #2d8a2d 100%)',
            }}
          />
          <div className="fade-carousel-overlay">
            <span className="fade-carousel-category">{news.section}</span>
            <h3 className="fade-carousel-title">{news.title}</h3>
            <p className="fade-carousel-excerpt">{news.excerpt}</p>
            <div className="fade-carousel-meta">
              <span><i className="fas fa-user" /> {news.author}</span>
              <span><i className="fas fa-eye" /> {news.views}</span>
            </div>
          </div>
        </div>

        <div className="fade-carousel-dots">
          {IMPORTANT_NEWS.map((_, i) => (
            <button
              key={i}
              className={`fade-carousel-dot ${i === currentIdx ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
