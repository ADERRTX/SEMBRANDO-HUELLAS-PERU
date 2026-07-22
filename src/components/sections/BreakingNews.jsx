import { useState, useCallback, useMemo } from 'react';
import { useCountry } from '../../contexts/CountryContext';
import { PAISES_DATA } from '../../data/countries';
import NewsModal from '../ui/NewsModal';

const DEFAULT_BREAKING = {
  title: 'Congreso aprueba Ley de Proteccion de Bosques Amazonicos con 105 votos a favor',
  excerpt: 'La nueva ley establece sanciones mas severas para la tala ilegal y crea un fondo de reforestacion de 500 millones de soles para la conservacion de la Amazonia peruana.',
  category: 'ULTIMO MINUTO',
  author: 'Redaccion SHP',
  time: 'En vivo',
  views: '32,500',
  image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
};

export default function BreakingNews() {
  const { country } = useCountry();
  const [selectedNews, setSelectedNews] = useState(null);

  const news = useMemo(() => {
    if (country && PAISES_DATA[country]?.breakingNews) return PAISES_DATA[country].breakingNews;
    return DEFAULT_BREAKING;
  }, [country]);

  const handleOpen = useCallback(() => setSelectedNews(news), [news]);

  return (
    <>
      <section className="breaking-news-banner" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <div className="container">
          <div className="breaking-content">
            <div className="breaking-icon">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="breaking-text">
              <h3>NOTICIA DE ULTIMO MINUTO</h3>
              <p>{news.title}</p>
            </div>
            <span className="breaking-btn">Ver Detalles</span>
          </div>
        </div>
      </section>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </>
  );
}
