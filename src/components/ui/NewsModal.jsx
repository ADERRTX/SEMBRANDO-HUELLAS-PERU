import { useEffect } from 'react';

export default function NewsModal({ news, onClose }) {
  useEffect(() => {
    if (!news) return;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [news, onClose]);

  if (!news) return null;

  const fallbackBg = 'linear-gradient(135deg, #1a5c1a 0%, #2d8a2d 50%, #0a3d0a 100%)';

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal" onClick={(e) => e.stopPropagation()}>
        <button className="news-modal-close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>

        {news.image && (
          <div className="news-modal-image">
            <img src={news.image} alt={news.title} />
            {news.category && <span className="news-modal-category">{news.category}</span>}
          </div>
        )}

        <div className="news-modal-body">
          {!news.image && news.category && (
            <span className="news-modal-category inline">{news.category}</span>
          )}
          <h2 className="news-modal-title">{news.title}</h2>
          {news.excerpt && <p className="news-modal-excerpt">{news.excerpt}</p>}

          <div className="news-modal-meta">
            {news.author && (
              <span><i className="fas fa-user" /> {news.author}</span>
            )}
            {news.time && (
              <span><i className="fas fa-clock" /> {news.time}</span>
            )}
            {news.views && (
              <span><i className="fas fa-eye" /> {news.views} lecturas</span>
            )}
            {news.duration && (
              <span><i className="fas fa-play-circle" /> {news.duration}</span>
            )}
          </div>

          <div className="news-modal-content">
            <p>
              {news.excerpt
                ? `${news.excerpt} Este reporte ha sido elaborado por nuestro equipo de periodistas ambientales, quienes trabajan incansablemente para traer la información más relevante sobre la conservación y el medio ambiente. Nuestro compromiso es mantener a nuestra audiencia informada sobre los desarrollos más importantes que afectan nuestro planeta.`
                : 'Próximamente tendremos más detalles sobre esta noticia. Nuestro equipo de periodistas está trabajando para traer la información más completa y actualizada para nuestros lectores.'}
            </p>
            <p>
              Los expertos en la materia coinciden en que este tema tiene un impacto significativo en la región y a nivel mundial. La comunidad científica ha expresado su preocupación y ha llamado a la acción inmediata por parte de los gobiernos y las organizaciones internacionales.
            </p>
            <p>
              Te invitamos a seguir explorando nuestras secciones para descubrir más noticias exclusivas sobre medio ambiente, ciencia, economía verde y conservación en Sembrando Huellas Perú.
            </p>
          </div>

          <div className="news-modal-share">
            <span className="news-modal-share-label"><i className="fas fa-share-alt" /> Compartir:</span>
            <button className="share-btn facebook" aria-label="Facebook"><i className="fab fa-facebook-f" /></button>
            <button className="share-btn twitter" aria-label="Twitter"><i className="fab fa-twitter" /></button>
            <button className="share-btn whatsapp" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></button>
            <button className="share-btn link" aria-label="Copiar enlace"><i className="fas fa-link" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
