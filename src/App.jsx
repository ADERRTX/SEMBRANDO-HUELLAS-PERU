import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MetaTags from './components/layout/MetaTags';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTopBtn from './components/layout/ScrollToTop';
import { CountryProvider } from './contexts/CountryContext';

const Home = lazy(() => import('./pages/Home'));
const MedioAmbientePage = lazy(() => import('./pages/MedioAmbientePage'));
const FloraFaunaPage = lazy(() => import('./pages/FloraFaunaPage'));
const EconomiaPage = lazy(() => import('./pages/EconomiaPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const CienciaPage = lazy(() => import('./pages/CienciaPage'));
const KidsPage = lazy(() => import('./pages/KidsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));

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
          <Route path="/donar" element={<DonatePage />} />
          <Route path="/admin" element={<AdminPage />} />
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

const SPLASH_IMAGES = [
  'https://scontent.fhuu1-1.fna.fbcdn.net/v/t39.30808-6/486066411_654905987143172_8099298023845151870_n.jpg?stp=dst-jpg_tt6&cstp=mx1634x619&ctp=s1634x619&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHwt9tWmXYaLSgdvwt_-CgcbV-75y_po_htX7vnL-mj-DLs7bZ2Zk9tCfUahm-ow4Dna45ILVWZSU42mpW0W59_&_nc_ohc=qXcpzyIbXKIQ7kNvwGsamjw&_nc_oc=Adq57eoSj6JQG__I_rpv6neoodVNPNSfktxSUiP-YASStDa0z54TAQmbNPfhII4oopPkBTGJjlqujopgsfPZI6aO&_nc_zt=23&_nc_ht=scontent.fhuu1-1.fna&_nc_gid=s0cvMseeEtn9ZHPMfkhPuQ&_nc_ss=7d2a8&oh=00_AQCFIYkcqZENebYYxb5c7jotGFuVbV4C6wg02LxaPk4kDA&oe=6A648078',
  'https://scontent.fhuu1-1.fna.fbcdn.net/v/t39.30808-6/480348818_629016476398790_2581453088780682508_n.jpg?stp=dst-jpg_tt6&cstp=mx2000x741&ctp=s2000x741&_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeGeYCizSMHUZ-TcNvm2k9SKawbEbspvUtRrBsRuym9S1I6SpCQikkmd2cHInsl1EmJhG2qkTB42A9iJW5R_ELQQ&_nc_ohc=sciv7pcD-PwQ7kNvwH6pP0-&_nc_oc=Adr70C3OY_hnsDt7p_0a0Fh2UVeYUv_IEhTeKVvOVHeQiZkNhR3BqbiNLlFFG6whQBlCTV8JjYHML4Lj_Me29h2B&_nc_zt=23&_nc_ht=scontent.fhuu1-1.fna&_nc_gid=V8tQe-SJb0gE01Q7USa-Ww&_nc_ss=7d2a8&oh=00_AQBmUDMOVap_GBBBBS9AzhvutSgXHTfIgDuqFK8-Gj9eKg&oe=6A647251',
  'https://scontent.fhuu1-1.fna.fbcdn.net/v/t39.99422-6/748746057_1784175795956648_8241147108804401739_n.png?stp=dst-jpg_tt6&cstp=mx1924x1097&ctp=s1924x1097&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGo9Kv4wMtkNMp_PgdEgQ2ztILpNVXIFK20guk1VcgUrTShMz6gwVDsyxY8ni6sD8z5HKRvuZn5VdaDONd4M2Aa&_nc_ohc=ZYtawRKlJLcQ7kNvwEZFkr4&_nc_oc=Adp0D6zkZ08q1NQx_oH3A67MIl0CVI83ec_zMtm72bjuxK7VknT9hpLYJ1nOXMJ_WdjvEaK-d0w62JOG2A3G2pDl&_nc_zt=14&_nc_ht=scontent.fhuu1-1.fna&_nc_gid=d5Hv0wouo9z1Q4TTzxY3A&_nc_ss=7d2a8&oh=00_AQDeQ6I99PclVmdGZsgMFxNKTFdZMJ0gS4322gH0WZdnWQ&oe=6A646BDE',
];

function ScrollLogo() {
  const logoRef = useRef(null);
  const rafRef = useRef(null);
  const lastY = useRef(-1);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = logoRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastY.current) < 1) return;
      lastY.current = scrollY;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.min(1, scrollY / docHeight);

      const scale = 0.4 + progress * 2.5;
      const opacity = 0.03 + Math.sin(progress * Math.PI) * 0.07;
      const blur = 1 + progress * 6;

      el.style.transform = `scale(${scale})`;
      el.style.opacity = opacity;
      el.style.filter = `blur(${blur}px)`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return (
    <div className="global-scroll-logo" ref={logoRef}>
      <img src="/logo-sh.png" alt="" />
    </div>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [splashLogoIdx, setSplashLogoIdx] = useState(0);
  const [bgImageIdx, setBgImageIdx] = useState(0);
  const splashLogos = ['/logo-sh.png', '/logo-full.png'];

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 600);
    const t2 = setTimeout(() => setSplashPhase(2), 1800);
    const t3 = setTimeout(() => setSplashPhase(3), 3300);
    const t4 = setTimeout(() => { setSplash(false); }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    if (!splash) return;
    const iv = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % SPLASH_NEWS.length);
    }, 900);
    return () => clearInterval(iv);
  }, [splash]);

  useEffect(() => {
    if (!splash) return;
    const iv = setInterval(() => {
      setSplashLogoIdx((prev) => (prev + 1) % splashLogos.length);
    }, 2000);
    return () => clearInterval(iv);
  }, [splash]);

  useEffect(() => {
    if (!splash) return;
    const iv = setInterval(() => {
      setBgImageIdx((prev) => (prev + 1) % SPLASH_IMAGES.length);
    }, 800);
    return () => clearInterval(iv);
  }, [splash]);

  if (splash) {
    return (
      <div className={`logo-splash phase-${splashPhase}`}>
        <div className="splash-bg-images">
          {SPLASH_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`splash-bg-img ${i === bgImageIdx ? 'active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="splash-bg-overlay" />
        </div>
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
      <CountryProvider>
        <div className="app">
          <ScrollLogo />
          <MetaTags />
          <Navbar />
          <AppRoutes />
          <Footer />
          <ScrollToTopBtn />
        </div>
      </CountryProvider>
    </BrowserRouter>
  );
}
