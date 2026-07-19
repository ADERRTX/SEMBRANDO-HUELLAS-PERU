import { useState, useCallback } from 'react';
import NewsModal from '../ui/NewsModal';

const BREAKING_NEWS = {
  title: 'Congreso aprueba Ley de Protección de Bosques Amazónicos con 105 votos a favor',
  excerpt: 'La nueva ley establece sanciones más severas para la tala ilegal y crea un fondo de reforestación de 500 millones de soles para la conservación de la Amazonía peruana. Esta norma considera a los bosques amazónicos como patrimonio natural de la nación.',
  category: 'ULTIMO MINUTO',
  author: 'Redacción SHP',
  time: 'En vivo',
  views: '32,500',
  image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
};

export default function BreakingNews() {
  const [selectedNews, setSelectedNews] = useState(null);

  const handleOpen = useCallback(() => setSelectedNews(BREAKING_NEWS), []);

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
              <p>Congreso aprueba Ley de Proteccion de Bosques Amazonicos con 105 votos a favor</p>
            </div>
            <span className="breaking-btn">Ver Detalles</span>
          </div>
        </div>
      </section>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </>
  );
}
