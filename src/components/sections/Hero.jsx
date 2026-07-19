import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HERO_SLIDES } from '../../constants';
import NewsModal from '../ui/NewsModal';

export default function Hero() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(next, 5000);
    return () => clearInterval(iv);
  }, [next, paused]);

  const slide = HERO_SLIDES[current];

  return (
    <>
      <section
        className="hero-carousel"
        id="inicio"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="carousel-container">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`carousel-slide ${i === current ? 'active' : ''}`}>
              {s.image ? (
                <div className="slide-image" style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }} />
                </div>
              ) : (
                <div className="slide-image" style={{ background: s.gradient }}>
                  <div className="slide-particles" />
                </div>
              )}
            </div>
          ))}
          <div className="slide-content" key={current}>
            <span className="slide-category">{slide.category}</span>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-excerpt">{slide.excerpt}</p>
            <div className="slide-meta">
              <span><i className="fas fa-user" /> {slide.author}</span>
              <span><i className="fas fa-clock" /> {slide.time}</span>
              <span><i className="fas fa-eye" /> {slide.views} lecturas</span>
            </div>
            <button className="slide-btn" onClick={() => setSelectedNews(slide)}>
              {t('hero.read_more') || 'Leer Más'} <i className="fas fa-arrow-right" />
            </button>
          </div>
        </div>

        <button className="carousel-btn prev" onClick={() => { prev(); }}><i className="fas fa-chevron-left" /></button>
        <button className="carousel-btn next" onClick={() => { next(); }}><i className="fas fa-chevron-right" /></button>

        <div className="carousel-indicators">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <div className="carousel-progress">
          <div key={current} className="carousel-progress-bar" />
        </div>

        <div
          className="carousel-touch-zone"
          onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
          onTouchEnd={(e) => {
            const diff = touchStart - e.changedTouches[0].screenX;
            if (diff > 50) next();
            if (diff < -50) prev();
          }}
        />
      </section>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </>
  );
}
