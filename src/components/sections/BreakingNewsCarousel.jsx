import { useState, useEffect, useRef } from 'react';
import { MEDIO_AMBIENTE_NEWS, FLORA_FAUNA_NEWS, CIENCIA_NEWS, ECONOMIA_NEWS } from '../../constants';
import NewsModal from '../ui/NewsModal';

const ALL_NEWS = [
  ...MEDIO_AMBIENTE_NEWS.map((n) => ({ ...n, section: 'Medio Ambiente' })),
  ...FLORA_FAUNA_NEWS.map((n) => ({ ...n, section: 'Flora y Fauna' })),
  ...CIENCIA_NEWS.map((n) => ({ ...n, section: 'Ciencia' })),
  ...ECONOMIA_NEWS.map((n) => ({ ...n, section: 'Economía Verde' })),
];

const IMPORTANT_NEWS = ALL_NEWS.filter((n) => parseInt(n.views?.replace(/,/g, '') || '0') > 7000).slice(0, 8);

export default function BreakingNewsCarousel() {
  const [selectedNews, setSelectedNews] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  if (IMPORTANT_NEWS.length === 0) return null;

  return (
    <section className="news-section breaking-carousel-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-icon"><i className="fas fa-fire" /></div>
            <h2 className="section-title">Noticias Importantes</h2>
          </div>
          <div className="carousel-nav-btns">
            <button
              className={`carousel-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className={`carousel-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="breaking-carousel-wrapper">
        <div className="breaking-carousel-track" ref={scrollRef}>
          {IMPORTANT_NEWS.map((news) => (
            <article key={news.id} className="breaking-carousel-card" onClick={() => setSelectedNews(news)}>
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
