import { useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CIENCIA_NEWS } from '../../constants';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function CienciaInnovacion() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState(null);
  const featured = CIENCIA_NEWS[0];
  const others = CIENCIA_NEWS.slice(1);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="ciencia">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-flask" /></div>
          <h2 className="section-title">{t('ciencia.title') || 'Ciencia e Innovación'}</h2>
        </div>
        <Link to="/ciencia" className="section-more">Ver todas <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid science-grid">
        {featured && (
          <article className="news-card large-card" onClick={() => openNews(featured)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: featured.image ? `url(${featured.image})` : 'linear-gradient(135deg, #4169e1 0%, #6495ed 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <span className="card-category">{featured.category}</span>
            </div>
            <div className="card-content">
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="card-meta">
                <span><i className="fas fa-user" /> {featured.author}</span>
                <span><i className="fas fa-clock" /> {featured.time}</span>
              </div>
            </div>
          </article>
        )}
        <div className="science-side">
          {others.map((news) => (
            <article key={news.id} className="news-card horizontal-card" onClick={() => openNews(news)}>
              <div className="card-image">
                <div className="image-placeholder" style={{
                  backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #9370db 0%, #ba55d3 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
              </div>
              <div className="card-content">
                <span className="card-category">{news.category}</span>
                <h4>{news.title}</h4>
                <span className="card-time"><i className="fas fa-clock" /> {news.time}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
