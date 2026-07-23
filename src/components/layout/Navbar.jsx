import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCountry } from '../../contexts/CountryContext';
import { LANGUAGES } from '../../i18n/translations';
import { SITE_CONFIG } from '../../constants';
import { PAISES_DATA, COUNTRY_LIST } from '../../data/countries';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { country, setCountry } = useCountry();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('sh_theme') || 'light');
  const [logoIdx, setLogoIdx] = useState(0);
  const langRef = useRef(null);
  const ddRef = useRef(null);
  const lastScrollY = useRef(0);

  const logos = [SITE_CONFIG.logoFull, SITE_CONFIG.logo];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY.current && currentY > 120);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setLogoIdx((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(iv);
  }, [logos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (ddRef.current && !ddRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sh_theme', theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const currentDate = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const filteredLangs = LANGUAGES.filter(
    (l) => l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
           l.native.toLowerCase().includes(langSearch.toLowerCase()) ||
           l.flag.includes(langSearch)
  );

  const currentLang = LANGUAGES.find((l) => l.label.includes('Perú') && l.code === language)
    || LANGUAGES.find((l) => l.code === language)
    || LANGUAGES[0];

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return COUNTRY_LIST;
    const q = countrySearch.toLowerCase();
    return COUNTRY_LIST.filter((c) => {
      const data = PAISES_DATA[c];
      return c.toLowerCase().includes(q) ||
        (data?.idiomaNombre && data.idiomaNombre.toLowerCase().includes(q)) ||
        (data?.bandera && data.bandera.includes(q));
    });
  }, [countrySearch]);

  const selectCountry = (name) => {
    if (country === name) {
      setCountry(null);
    } else {
      setCountry(name);
      const paisData = PAISES_DATA[name];
      if (paisData?.idioma) {
        setLanguage(paisData.idioma);
      }
    }
    setDropdownOpen(false);
    setCountrySearch('');
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''} ${hidden ? 'header-hidden' : ''}`} id="mainHeader">
      {/* TOP BAR */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-left">
            <span className="live-badge"><i className="fas fa-circle" /> EN VIVO</span>
            <span className="current-date">{currentDate}</span>
          </div>
          <div className="header-top-right">
            <div className="weather-widget">
              <i className="fas fa-cloud-sun" />
              <span>Lima: 22°C</span>
            </div>
            <div className="social-links-header">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
              <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="header-main">
        <div className="container">
          <div className="logo-container">
            <Link to="/">
              <div className="logo-swapper">
                {logos.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={SITE_CONFIG.name}
                    className={`swapper-logo ${i === logoIdx ? 'active' : ''}`}
                  />
                ))}
              </div>
            </Link>
          </div>
          <div className="header-actions">
            {/* Language Selector */}
            <div className="lang-selector" ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
                <span>{currentLang.flag}</span>
                <span className="lang-btn-text">{currentLang.label.split('(')[0].trim()}</span>
                <i className="fas fa-chevron-down" />
              </button>
              <div className={`lang-dropdown ${langOpen ? 'active' : ''}`}>
                <div className="lang-search">
                  <input
                    type="text"
                    placeholder="Buscar idioma..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                  />
                </div>
                <div className="lang-list">
                  {filteredLangs.map((lang, i) => (
                    <div
                      key={`${lang.code}-${lang.label}`}
                      className={`lang-option ${language === lang.code && currentLang.label === lang.label ? 'active' : ''}`}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); setLangSearch(''); }}
                    >
                      <span className="lang-flag">{lang.flag}</span> {lang.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`} />
            </button>

            {/* Mobile Menu */}
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              <i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="main-nav" id="mainNav">
        <div className="container">
          <ul className={`nav-list ${mobileOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className={isActive('/')}>
                <i className="fas fa-home" /> {t('nav.inicio')}
              </Link>
            </li>
            <li className="nav-dropdown" ref={ddRef}>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}
              >
                <i className="fas fa-flag" /> {t('nav.nacionales')} <i className="fas fa-chevron-down" />
              </a>
              <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
                <div className="lang-search">
                  <input
                    type="text"
                    placeholder="Buscar pais..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                  />
                </div>
                <div className="lang-list">
                  {filteredCountries.map((name) => {
                    const data = PAISES_DATA[name];
                    return (
                      <a
                        key={name}
                        href="#"
                        className={`lang-option ${country === name ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); selectCountry(name); }}
                      >
                        <span className="lang-flag">{data?.bandera}</span> {name}
                        <span style={{ fontSize: '0.75em', opacity: 0.6, marginLeft: 6 }}>{data?.idiomaNombre}</span>
                      </a>
                    );
                  })}
                </div>
                {country && (
                  <a href="#" className="lang-option" style={{ color: 'var(--danger)', fontWeight: 600, borderTop: '1px solid var(--border-color)' }} onClick={(e) => { e.preventDefault(); selectCountry(country); }}>
                    <i className="fas fa-times" /> Quitar filtro
                  </a>
                )}
              </div>
            </li>
            <li>
              <Link to="/medioambiente" className={isActive('/medioambiente')}>
                <i className="fas fa-leaf" /> {t('nav.medioambiente')}
              </Link>
            </li>
            <li>
              <Link to="/flora-fauna" className={isActive('/flora-fauna')}>
                <i className="fas fa-paw" /> {t('nav.flora_fauna')}
              </Link>
            </li>
            <li>
              <Link to="/economia" className={isActive('/economia')}>
                <i className="fas fa-chart-line" /> {t('nav.economia')}
              </Link>
            </li>
            <li>
              <Link to="/videos" className={isActive('/videos')}>
                <i className="fas fa-video" /> {t('nav.videos')}
              </Link>
            </li>
            <li>
              <Link to="/ciencia" className={isActive('/ciencia')}>
                <i className="fas fa-flask" /> {t('nav.ciencia')}
              </Link>
            </li>
            <li>
              <Link to="/ninos" className={isActive('/ninos')}>
                <i className="fas fa-child" /> {t('nav.kids')}
              </Link>
            </li>
            <li>
              <Link to="/galeria" className={isActive('/galeria')}>
                <i className="fas fa-images" /> {t('nav.galeria')}
              </Link>
            </li>
            <li>
              <Link to="/contacto" className={isActive('/contacto')}>
                <i className="fas fa-envelope" /> {t('nav.contacto')}
              </Link>
            </li>
            <li>
              <Link to="/donar" className={`nav-link donate-nav-link ${isActive('/donar')}`}>
                <i className="fas fa-hand-holding-heart" /> Donar
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
