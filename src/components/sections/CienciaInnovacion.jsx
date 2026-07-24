import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCountry } from '../../contexts/CountryContext';
import { CIENCIA_NEWS } from '../../constants';
import { PAISES_DATA } from '../../data/countries';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function CienciaInnovacion() {
  const { t } = useLanguage();
  const { country } = useCountry();
  const [selectedNews, setSelectedNews] = useState(null);

  const newsList = useMemo(() => {
    if (country && PAISES_DATA[country]?.ciencia) return PAISES_DATA[country].ciencia;
    return CIENCIA_NEWS;
  }, [country]);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="ciencia">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-flask" /></div>
          <h2 className="section-title">{t('ciencia.title') || 'Ciencia e Innovación'}</h2>
        </div>
        <Link to="/ciencia" className="section-more">{t('common.view_all')} <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid science-grid">
        {newsList.map((news) => (
          <article key={news.id} className="news-card" onClick={() => openNews(news)}>
            <div className="card-image">
              <div className="image-placeholder" style={{
                backgroundImage: news.image ? `url(${news.image})` : 'linear-gradient(135deg, #4169e1 0%, #6495ed 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <span className="card-category">{news.category}</span>
            </div>
            <div className="card-content">
              <h3>{news.title}</h3>
              <p>{news.excerpt}</p>
              <div className="card-meta">
                <span><i className="fas fa-user" /> {news.author}</span>
                <span><i className="fas fa-clock" /> {news.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}
