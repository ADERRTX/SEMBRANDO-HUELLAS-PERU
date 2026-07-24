import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { SITE_CONFIG } from '../../constants';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="main-footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about-col">
            <Link to="/">
              <img src={SITE_CONFIG.logoFull} alt="Sembrando Huellas" className="footer-logo" />
            </Link>
            <p>Somos el medio líder en noticias del medio ambiente, flora y fauna en Perú y América Latina.</p>
            <div className="footer-social">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook" /></a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></a>
              <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Secciones</h3>
            <ul>
              <li><Link to="/medioambiente">Medio Ambiente</Link></li>
              <li><Link to="/flora-fauna">Flora & Fauna</Link></li>
              <li><Link to="/economia">Economía Verde</Link></li>
              <li><Link to="/videos">Videos</Link></li>
              <li><Link to="/ciencia">Ciencia</Link></li>
              <li><Link to="/ninos">Niños</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Multimedia</h3>
            <ul>
              <li><Link to="/videos">Videos</Link></li>
              <li><Link to="/galeria">Galería</Link></li>
              <li><a href="#">Podcasts</a></li>
              <li><a href="#">Documentales</a></li>
              <li><a href="#">Infografías</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contacto</h3>
            <ul className="contact-list">
              <li><i className="fas fa-map-marker-alt" /> {SITE_CONFIG.location}</li>
              <li><i className="fas fa-phone" /> {SITE_CONFIG.phone}</li>
              <li><i className="fas fa-envelope" /> {SITE_CONFIG.email}</li>
              <li><i className="fas fa-clock" /> 24/7</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 {SITE_CONFIG.name}. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Uso</a>
            <a href="#">Código de Ética</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
