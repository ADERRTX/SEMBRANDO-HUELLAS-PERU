import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { VIDEOS_DATA } from '../../constants';
import { Link } from 'react-router-dom';

export default function VideosDestacados() {
  const { t } = useLanguage();
  const [modalVideo, setModalVideo] = useState(null);

  const mainVideo = VIDEOS_DATA[0];
  const sideVideos = VIDEOS_DATA.slice(1);

  return (
    <>
      <section className="news-section video-section" id="videos">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-icon"><i className="fas fa-video" /></div>
            <h2 className="section-title">{t('videos.title') || 'Videos Destacados'}</h2>
          </div>
          <Link to="/videos" className="section-more">Ver todos <i className="fas fa-arrow-right" /></Link>
        </div>
        <div className="video-grid">
          {mainVideo && (
            <div className="video-card main-video" onClick={() => setModalVideo(mainVideo)}>
              <div className="video-thumbnail">
                <div className="video-placeholder" style={{
                  backgroundImage: mainVideo.image ? `url(${mainVideo.image})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <div className="video-play-btn"><i className="fas fa-play" /></div>
                <span className="video-duration">{mainVideo.duration}</span>
                {mainVideo.isLive && <span className="video-live-badge">EN VIVO</span>}
              </div>
              <div className="video-info">
                <h3>{mainVideo.title}</h3>
                <p>{mainVideo.excerpt}</p>
                <div className="video-meta">
                  <span><i className="fas fa-eye" /> {mainVideo.views} vistas</span>
                  <span><i className="fas fa-clock" /> {mainVideo.time}</span>
                </div>
              </div>
            </div>
          )}
          {sideVideos.map((video) => (
            <div key={video.id} className="video-card" onClick={() => setModalVideo(video)}>
              <div className="video-thumbnail">
                <div className="video-placeholder" style={{
                  backgroundImage: video.image ? `url(${video.image})` : 'linear-gradient(135deg, #0f3460 0%, #533483 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <div className="video-play-btn small"><i className="fas fa-play" /></div>
                <span className="video-duration">{video.duration}</span>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <div className="video-meta">
                  <span><i className="fas fa-eye" /> {video.views} vistas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalVideo && (
        <div className="video-modal active" onClick={() => setModalVideo(null)}>
          <div className="modal-overlay" />
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalVideo(null)}><i className="fas fa-times" /></button>
            <div className="video-player">
              <div className="video-placeholder modal-vid" style={{
                backgroundImage: modalVideo.image ? `url(${modalVideo.image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 400,
              }}>
                <div className="video-play-btn large"><i className="fas fa-play" /></div>
              </div>
            </div>
            <div className="modal-info">
              <h3>{modalVideo.title}</h3>
              <p>{modalVideo.excerpt || ''}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
