import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MetaTags from './components/layout/MetaTags';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTopBtn from './components/layout/ScrollToTop';
const Home = lazy(() => import('./pages/Home'));
const MedioAmbientePage = lazy(() => import('./pages/MedioAmbientePage'));
const FloraFaunaPage = lazy(() => import('./pages/FloraFaunaPage'));
const EconomiaPage = lazy(() => import('./pages/EconomiaPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const CienciaPage = lazy(() => import('./pages/CienciaPage'));
const KidsPage = lazy(() => import('./pages/KidsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function SectionFallback() {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader-logo" style={{ width: 80, height: 80 }}>
        <div className="pulse-ring" />
        <img src="/logo-sh.png" alt="" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', zIndex: 2 }} />
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<SectionFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medioambiente" element={<MedioAmbientePage />} />
          <Route path="/flora-fauna" element={<FloraFaunaPage />} />
          <Route path="/economia" element={<EconomiaPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/ciencia" element={<CienciaPage />} />
          <Route path="/ninos" element={<KidsPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

const SPLASH_NEWS = [
  { icon: '🌳', text: 'Deforestación amazónica alcanza niveles históricos' },
  { icon: '🧊', text: 'Hielo ártico en mínimo récord' },
  { icon: '🦁', text: 'Sequías amenazan vida salvaje del Serengeti' },
  { icon: '🌊', text: 'Blanqueamiento masivo de coral en Australia' },
  { icon: '🏔️', text: 'Iceberg gigante se desprende en Antártida' },
];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [splashLogoIdx, setSplashLogoIdx] = useState(0);
  const splashLogos = ['/logo-sh.png', '/logo-full.png'];

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 400);
    const t2 = setTimeout(() => setSplashPhase(2), 1200);
    const t3 = setTimeout(() => setSplashPhase(3), 2200);
    const t4 = setTimeout(() => { setSplash(false); }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    if (!splash) return;
    const iv = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % SPLASH_NEWS.length);
    }, 600);
    return () => clearInterval(iv);
  }, [splash]);

  useEffect(() => {
    if (!splash) return;
    const iv = setInterval(() => {
      setSplashLogoIdx((prev) => (prev + 1) % splashLogos.length);
    }, 1500);
    return () => clearInterval(iv);
  }, [splash]);

  if (splash) {
    return (
      <div className={`logo-splash phase-${splashPhase}`}>
        <div className="splash-bg-particles">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="splash-particle" style={{ '--i': i }} />
          ))}
        </div>
        <div className="splash-inner">
          <div className="splash-logo-wrapper">
            <div className="splash-rings">
              <div className="splash-ring r1" />
              <div className="splash-ring r2" />
              <div className="splash-ring r3" />
            </div>
            <img src={splashLogos[splashLogoIdx]} alt="Sembrando Huellas" className="splash-logo" />
          </div>
          <h2 className="splash-title">Sembrando Huellas Perú</h2>
          <p className="splash-subtitle">Innovación Ambiental y Tecnología Verde</p>

          <div className="splash-news-ticker">
            <div className="splash-news-label"><i className="fas fa-bolt" /> EN VIVO</div>
            <div className="splash-news-items">
              {SPLASH_NEWS.map((item, i) => (
                <div key={i} className={`splash-news-item ${i === newsIndex ? 'active' : ''}`}>
                  <span className="splash-news-icon">{item.icon}</span>
                  <span className="splash-news-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="splash-stats">
            <div className="splash-stat">
              <i className="fas fa-newspaper" />
              <span className="splash-stat-val">2,400+</span>
              <span className="splash-stat-lbl">Noticias</span>
            </div>
            <div className="splash-stat-divider" />
            <div className="splash-stat">
              <i className="fas fa-users" />
              <span className="splash-stat-val">1.2M</span>
              <span className="splash-stat-lbl">Lectores</span>
            </div>
            <div className="splash-stat-divider" />
            <div className="splash-stat">
              <i className="fas fa-globe-americas" />
              <span className="splash-stat-val">15+</span>
              <span className="splash-stat-lbl">Países</span>
            </div>
          </div>

          <div className="splash-loading-bar">
            <div className="splash-loading-fill" />
          </div>
          <p className="splash-loading-text">Cargando noticias ambientales...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <MetaTags />
        <Navbar />
        <AppRoutes />
        <Footer />
        <ScrollToTopBtn />
      </div>
    </BrowserRouter>
  );
}
