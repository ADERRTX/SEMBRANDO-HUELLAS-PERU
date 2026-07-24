import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { galleryImages as allGalleryData } from '../../data/index';

const photos = allGalleryData.filter((item) => !item.video).map((item, index) => ({
  id: index + 1,
  src: item.src,
  title: item.alt,
  desc: item.desc,
  date: item.date,
  category: item.category,
}));

const videos = allGalleryData.filter((item) => item.video).map((item, index) => ({
  id: `v${index + 1}`,
  src: item.video,
  poster: item.poster || null,
  title: item.title,
  desc: item.desc,
  date: item.date,
  category: item.category,
}));

const categories = ['all', ...new Set(photos.map((img) => img.category))];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('photos');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const filteredImages = activeCategory === 'all' ? photos : photos.filter((img) => img.category === activeCategory);

  const filteredVideos = activeCategory === 'all' ? videos : videos.filter((vid) => vid.category === activeCategory);

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
                {cat === 'all' ? t('gallery.all') : cat}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredImages.map((img) => (
              <div key={img.id} onClick={() => setSelectedImage(img)} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', background: 'var(--bg-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '14px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{img.title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>{img.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{img.date}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'videos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredVideos.map((vid) => (
            <div key={vid.id} onClick={() => setSelectedVideo(vid)} className="video-card" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'var(--bg-primary)', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="video-thumbnail" style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                <img src={vid.poster} alt={vid.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(220,53,69,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,53,69,0.4)' }}>
                    <i className="fas fa-play" style={{ color: 'white', fontSize: '1.1rem', marginLeft: '3px' }} />
                  </div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{vid.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>{vid.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{vid.date}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>{vid.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '20px' }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img src={selectedImage.src} alt={selectedImage.title} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', color: 'white', textAlign: 'center', maxWidth: '80vw' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{selectedImage.title}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '4px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div onClick={() => { setSelectedVideo(null); if (videoRef.current) { videoRef.current.pause(); } }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ maxWidth: '800px', width: '90%', background: 'var(--bg-primary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
              <video ref={videoRef} src={selectedVideo.src} poster={selectedVideo.poster} controls autoPlay style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '1.15rem' }}>{selectedVideo.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '0.9rem' }}>{selectedVideo.desc}</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.8rem' }}>{selectedVideo.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
