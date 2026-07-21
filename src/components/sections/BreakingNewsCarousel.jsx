import { useState, useEffect, useRef, useCallback } from 'react';
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

export default function BreakingNewsCarousel() {
  const [selectedNews, setSelectedNews] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [headerIdx, setHeaderIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setHeaderIdx((prev) => (prev + 1) % HEADER_WORDS.length);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < maxScroll - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => checkScroll());
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.breaking-carousel-card')?.offsetWidth || 300;
    const gap = 20;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  };

  if (IMPORTANT_NEWS.length === 0) return null;

  return (
    <section className="news-section breaking-carousel-section">
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
            <button
              className={`carousel-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Desplazar a la izquierda"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className={`carousel-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Desplazar a la derecha"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="breaking-carousel-wrapper">
        <div className="breaking-carousel-track" ref={scrollRef}>
          {IMPORTANT_NEWS.map((news) => (
            <article key={news.uniqueId} className="breaking-carousel-card" onClick={() => setSelectedNews(news)}>
              <div className="card-image">
                <div className="image-placeholder" style={{
                  backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #1a5c1a 0%, #2d8a2d 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <span className="card-category">{news.section}</span>
              </div>
              <div className="card-content">
                <h3>{news.title}</h3>
                <p>{news.excerpt}</p>
                <div className="card-meta">
                  <span><i className="fas fa-user" /> {news.author}</span>
                  <span><i className="fas fa-eye" /> {news.views}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
