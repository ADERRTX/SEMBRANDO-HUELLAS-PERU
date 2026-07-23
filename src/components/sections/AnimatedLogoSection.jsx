import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../constants';

const LOGOS = [SITE_CONFIG.logo, SITE_CONFIG.logoFull];

export default function AnimatedLogoSection() {
  const [logoIdx, setLogoIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setLogoIdx((prev) => (prev + 1) % LOGOS.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="logo-reveal" id="logoReveal">
      <div className="logo-animation-container">
        <div className="floating-leaves">
          <div className="leaf leaf-1">&#127807;</div>
          <div className="leaf leaf-2">&#127808;</div>
          <div className="leaf leaf-3">&#127793;</div>
          <div className="leaf leaf-4">&#127811;</div>
          <div className="leaf leaf-5">&#127806;</div>
        </div>
        <div className="center-logo-wrapper">
          <div className="glow-effect" />
          <img src={LOGOS[logoIdx]} alt="Sembrando Huellas" className="animated-logo" />
        </div>
        <div className="logo-text-reveal">
          <h2>Sembrando Huellas</h2>
          <p>Protegiendo nuestro planeta, una noticia a la vez</p>
        </div>
      </div>
    </section>
  );
}
