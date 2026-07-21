import { useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ECONOMIA_NEWS } from '../../constants';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function EconomiaVerde() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState(null);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="economia">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-chart-line" /></div>
          <h2 className="section-title">{t('economia.title') || 'Economía Verde'}</h2>
        </div>
        <Link to="/economia" className="section-more">Ver todas <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid eco-grid">
        {ECONOMIA_NEWS.map((news) => (
          <article key={news.id} className="news-card" onClick={() => openNews(news)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <span className="card-category">{news.category}</span>
            </div>
            <div className="card-content">
              <h3>{news.title}</h3>
              <div className="card-meta">
                <span><i className="fas fa-clock" /> {news.time}</span>
                <span><i className="fas fa-eye" /> {news.views}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
