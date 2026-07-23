import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', title: 'Bosque Tropical', titleEn: 'Tropical Forest', category: 'flora' },
  { id: 2, src: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=800&q=80', title: 'León Africano', titleEn: 'African Lion', category: 'fauna' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', title: 'Arrecife de Coral', titleEn: 'Coral Reef', category: 'marine' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80', title: 'Océano Profundo', titleEn: 'Deep Ocean', category: 'marine' },
  { id: 5, src: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80', title: 'Aves en Vuelo', titleEn: 'Birds in Flight', category: 'fauna' },
  { id: 6, src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80', title: 'Energía Solar', titleEn: 'Solar Energy', category: 'environment' },
  { id: 7, src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', title: 'Flora Medicinal', titleEn: 'Medicinal Plants', category: 'flora' },
  { id: 8, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Montañas Verdes', titleEn: 'Green Mountains', category: 'environment' },
  { id: 9, src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80', title: 'Desierto de Flores', titleEn: 'Desert Flowers', category: 'flora' },
  { id: 10, src: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?auto=format&fit=crop&w=800&q=80', title: 'Reptil Verde', titleEn: 'Green Reptile', category: 'fauna' },
  { id: 11, src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80', title: 'Mariposa Monarca', titleEn: 'Monarch Butterfly', category: 'fauna' },
  { id: 12, src: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=800&q=80', title: 'Bosque Nevado', titleEn: 'Snowy Forest', category: 'flora' },
  { id: 13, src: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80', title: 'Tigre de Bengala', titleEn: 'Bengal Tiger', category: 'fauna' },
  { id: 14, src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80', title: 'Selva Amazónica', titleEn: 'Amazon Rainforest', category: 'environment' },
  { id: 15, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', title: 'Glaciar Andino', titleEn: 'Andean Glacier', category: 'environment' },
  { id: 16, src: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=800&q=80', title: 'Ballena Jorobada', titleEn: 'Humpback Whale', category: 'marine' },
  { id: 17, src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80', title: 'Bosque de Bambú', titleEn: 'Bamboo Forest', category: 'flora' },
  { id: 18, src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', title: 'Aurora Boreal', titleEn: 'Northern Lights', category: 'environment' },
  { id: 19, src: 'https://images.unsplash.com/photo-1559827291-bce885ce7b17?auto=format&fit=crop&w=800&q=80', title: 'Algas Marinas', titleEn: 'Marine Algae', category: 'marine' },
  { id: 20, src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80', title: 'Paisaje Volcánico', titleEn: 'Volcanic Landscape', category: 'environment' },
  { id: 21, src: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80', title: 'Cóndor Andino', titleEn: 'Andean Condor', category: 'fauna' },
  { id: 22, src: 'https://images.unsplash.com/photo-1535338454528-1b5a4b3d4f3d?auto=format&fit=crop&w=800&q=80', title: 'Loros de Colores', titleEn: 'Colorful Parrots', category: 'fauna' },
  { id: 23, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', title: 'Playa Tropical', titleEn: 'Tropical Beach', category: 'environment' },
  { id: 24, src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Campo de Trigo', titleEn: 'Wheat Field', category: 'flora' },
];

const videoData = [
  { id: 'v1', youtubeId: 'KJXhkU8BGB4', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', title: 'La Vida en la Amazonía', titleEn: 'Life in the Amazon', duration: '12:34' },
  { id: 'v2', youtubeId: 'qE3fB0B0mQ4', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80', title: 'Corales del Mundo', titleEn: 'World Corals', duration: '8:21' },
  { id: 'v3', youtubeId: 'TQ3nW5pFH20', thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=600&q=80', title: 'Grandes Felinos', titleEn: 'Big Cats', duration: '15:47' },
  { id: 'v4', youtubeId: 'G4H1N2Xoo5o', thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80', title: 'Energías Renovables', titleEn: 'Renewable Energy', duration: '10:09' },
];

const categories = ['all', 'flora', 'fauna', 'marine', 'environment'];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('photos');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredImages = activeCategory === 'all' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="galeria" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-images" /></div>
          <h2 className="section-title">{t('gallery.title')}</h2>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        <button onClick={() => setActiveTab('photos')} className={`px-7 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'photos' ? 'bg-[var(--primary)] text-white shadow-lg' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)]'}`}>
          📷 {t('gallery.photos')}
        </button>
        <button onClick={() => setActiveTab('videos')} className={`px-7 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'videos' ? 'bg-[var(--primary)] text-white shadow-lg' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)]'}`}>
          🎬 {t('gallery.videos')}
        </button>
      </div>

      {activeTab === 'photos' && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)]'}`}>
                {cat === 'all' ? t('gallery.all') : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredImages.map((img) => (
              <div key={img.id} onClick={() => setSelectedImage(img)} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', background: 'var(--bg-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={img.src} alt={lang === 'en' ? img.titleEn : img.title} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '14px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{lang === 'en' ? img.titleEn : img.title}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'videos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {videoData.map((vid) => (
            <div key={vid.id} onClick={() => setSelectedVideo(vid)} className="video-card" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-primary)', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="video-thumbnail" style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                <img src={vid.thumbnail} alt={lang === 'en' ? vid.titleEn : vid.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(220,53,69,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,53,69,0.4)' }}>
                    <i className="fas fa-play" style={{ color: 'white', fontSize: '1.1rem', marginLeft: '3px' }} />
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{vid.duration}</span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{lang === 'en' ? vid.titleEn : vid.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '20px' }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img src={selectedImage.src} alt={selectedImage.title} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', color: 'white', textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {lang === 'en' ? selectedImage.titleEn : selectedImage.title}
            </div>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div onClick={() => setSelectedVideo(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ maxWidth: '800px', width: '90%', background: 'var(--bg-primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' }} onClick={(e) => e.stopPropagation()}>
            {selectedVideo.youtubeId ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title={selectedVideo.title} />
              </div>
            ) : (
              <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                <img src={selectedVideo.thumbnail} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(220,53,69,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-play" style={{ color: 'white', fontSize: '1.5rem', marginLeft: '4px' }} />
                  </div>
                </div>
              </div>
            )}
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '1.15rem' }}>{lang === 'en' ? selectedVideo.titleEn : selectedVideo.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '0.9rem' }}>{selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
