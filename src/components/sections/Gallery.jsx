import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', title: 'Bosque Tropical', titleEn: 'Tropical Forest', category: 'flora' },
  { id: 2, src: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=800&q=80', title: 'León Africano', titleEn: 'African Lion', category: 'fauna' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', title: 'Coral Reef', titleEn: 'Coral Reef', category: 'marine' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80', title: 'Océano Profundo', titleEn: 'Deep Ocean', category: 'marine' },
  { id: 5, src: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80', title: 'Aves en Vuelo', titleEn: 'Birds in Flight', category: 'fauna' },
  { id: 6, src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80', title: 'Energía Solar', titleEn: 'Solar Energy', category: 'environment' },
  { id: 7, src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', title: 'Flora Medicinal', titleEn: 'Medicinal Plants', category: 'flora' },
  { id: 8, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Montañas Verdes', titleEn: 'Green Mountains', category: 'environment' },
  { id: 9, src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80', title: 'Desierto de Flores', titleEn: 'Desert Flowers', category: 'flora' },
  { id: 10, src: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?auto=format&fit=crop&w=800&q=80', title: 'Reptil Verde', titleEn: 'Green Reptile', category: 'fauna' },
  { id: 11, src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80', title: 'Mariposa Monarca', titleEn: 'Monarch Butterfly', category: 'fauna' },
  { id: 12, src: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=800&q=80', title: 'Bosque Nevado', titleEn: 'Snowy Forest', category: 'flora' },
];

const videoData = [
  { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', title: 'La Vida en la Amazonía', titleEn: 'Life in the Amazon', duration: '12:34' },
  { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80', title: 'Corales del Mundo', titleEn: 'World Corals', duration: '8:21' },
  { id: 'v3', thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=600&q=80', title: 'Grandes Felinos', titleEn: 'Big Cats', duration: '15:47' },
  { id: 'v4', thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80', title: 'Energías Renovables', titleEn: 'Renewable Energy', duration: '10:09' },
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            {filteredImages.map((img) => (
              <div key={img.id} onClick={() => setSelectedImage(img)} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-color)', transition: 'var(--transition)' }}>
                <img src={img.src} alt={lang === 'en' ? img.titleEn : img.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '12px' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lang === 'en' ? img.titleEn : img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'videos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {videoData.map((vid) => (
            <div key={vid.id} onClick={() => setSelectedVideo(vid)} className="video-card">
              <div className="video-thumbnail">
                <img src={vid.thumbnail} alt={lang === 'en' ? vid.titleEn : vid.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} loading="lazy" />
                <div className="video-play-btn small"><i className="fas fa-play" /></div>
                <span className="video-duration">{vid.duration}</span>
              </div>
              <div className="video-info">
                <h4>{lang === 'en' ? vid.titleEn : vid.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image lightbox */}
      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={selectedImage.src} alt={selectedImage.title} style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '8px' }} />
        </div>
      )}

      {/* Video lightbox */}
      {selectedVideo && (
        <div onClick={() => setSelectedVideo(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ maxWidth: '800px', width: '90%', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={selectedVideo.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                <div className="video-play-btn large" style={{ position: 'absolute' }}><i className="fas fa-play" /></div>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 700 }}>{lang === 'en' ? selectedVideo.titleEn : selectedVideo.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
