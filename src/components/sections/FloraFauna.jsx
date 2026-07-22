import { useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FLORA_FAUNA_NEWS } from '../../constants';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function FloraFauna() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState(null);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="flora-fauna">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-paw" /></div>
          <h2 className="section-title">{t('flora_fauna.title') || 'Flora y Fauna'}</h2>
        </div>
        <Link to="/flora-fauna" className="section-more">Ver todas <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid fauna-grid">
        {FLORA_FAUNA_NEWS.slice(0, 2).map((news) => (
          <article key={news.id} className="news-card horizontal-card" onClick={() => openNews(news)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
            </div>
            <div className="card-content">
              <span className="card-category">{news.category}</span>
              <h3>{news.title}</h3>
              <p>{news.excerpt}</p>
              <div className="card-meta">
                <span><i className="fas fa-user" /> {news.author}</span>
                <span><i className="fas fa-clock" /> {news.time}</span>
              </div>
            </div>
          </article>
        ))}
        <div className="side-cards">
          {FLORA_FAUNA_NEWS.slice(2, 6).map((news) => (
            <article key={news.id} className="news-card mini-card" onClick={() => openNews(news)}>
              <span className="card-category">{news.category}</span>
              <h4>{news.title}</h4>
              <span className="card-time"><i className="fas fa-clock" /> {news.time}</span>
            </article>
          ))}
        </div>
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
