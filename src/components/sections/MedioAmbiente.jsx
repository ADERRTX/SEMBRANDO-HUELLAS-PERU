import { useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MEDIO_AMBIENTE_NEWS } from '../../constants';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function MedioAmbiente() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState(null);
  const featured = MEDIO_AMBIENTE_NEWS[0];
  const others = MEDIO_AMBIENTE_NEWS.slice(1);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="medioambiente">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-leaf" /></div>
          <h2 className="section-title">{t('medioambiente.title') || 'Medio Ambiente'}</h2>
        </div>
        <Link to="/medioambiente" className="section-more">Ver todas <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid env-grid">
        {featured && (
          <article className="news-card featured-card" onClick={() => openNews(featured)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: featured.image ? `url(${featured.image})` : 'linear-gradient(135deg, #1a5c1a 0%, #2d8a2d 50%, #0a3d0a 100%)',
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
                <span><i className="fas fa-eye" /> {featured.views}</span>
              </div>
            </div>
          </article>
        )}
        {others.map((news) => (
          <article key={news.id} className="news-card" onClick={() => openNews(news)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #006994 0%, #00a8cc 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <span className="card-category">{news.category}</span>
            </div>
            <div className="card-content">
              <h3>{news.title}</h3>
              <p>{news.excerpt}</p>
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
