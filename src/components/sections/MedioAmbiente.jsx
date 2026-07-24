import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCountry } from '../../contexts/CountryContext';
import { MEDIO_AMBIENTE_NEWS } from '../../constants';
import { PAISES_DATA } from '../../data/countries';
import { Link } from 'react-router-dom';
import NewsModal from '../ui/NewsModal';

export default function MedioAmbiente() {
  const { t } = useLanguage();
  const { country } = useCountry();
  const [selectedNews, setSelectedNews] = useState(null);

  const newsList = useMemo(() => {
    if (country && PAISES_DATA[country]?.medioAmbiente) return PAISES_DATA[country].medioAmbiente;
    return MEDIO_AMBIENTE_NEWS;
  }, [country]);

  const openNews = useCallback((news) => setSelectedNews(news), []);

  return (
    <section className="news-section" id="medioambiente">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-leaf" /></div>
          <h2 className="section-title">{t('medioambiente.title') || 'Medio Ambiente'}</h2>
        </div>
        <Link to="/medioambiente" className="section-more">{t('common.view_all')} <i className="fas fa-arrow-right" /></Link>
      </div>
      <div className="news-grid env-grid">
        {newsList.map((news) => (
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
                <span><i className="fas fa-user" /> {news.author}</span>
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
