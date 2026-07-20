import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../../constants';

const LOGOS = [SITE_CONFIG.logo, SITE_CONFIG.logoFull];

export default function AnimatedLogoSection() {
  const [logoIdx, setLogoIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setLogoIdx((prev) => (prev + 1) % LOGOS.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !wrapperRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (sectionTop > viewportHeight) {
        setOpacity(1);
        setScale(1);
        return;
      }

      if (sectionTop + sectionHeight < 0) {
        setOpacity(0);
        setScale(0.6);
        return;
      }

      const progress = Math.max(0, Math.min(1, 1 - (sectionTop + sectionHeight) / (viewportHeight + sectionHeight)));
      const newOpacity = Math.max(0.08, 1 - progress * 1.2);
      const newScale = Math.max(0.5, 1 - progress * 0.5);
      setOpacity(newOpacity);
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="logo-reveal" id="logoReveal" ref={sectionRef}>
      <div className="logo-animation-container" ref={wrapperRef}>
        <div className="orbit-ring ring-1" />
        <div className="orbit-ring ring-2" />
        <div className="orbit-ring ring-3" />
        <div className="floating-leaves">
          <div className="leaf leaf-1">🌿</div>
          <div className="leaf leaf-2">🍀</div>
          <div className="leaf leaf-3">🌱</div>
          <div className="leaf leaf-4">🍃</div>
          <div className="leaf leaf-5">🌾</div>
        </div>
        <div className="center-logo-wrapper" style={{
          opacity,
          transform: `scale(${scale})`,
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
        }}>
          <div className="glow-effect" style={{ opacity: opacity * 0.6 }} />
          <img src={LOGOS[logoIdx]} alt="Sembrando Huellas" className="animated-logo" />
        </div>
        <div className="logo-text-reveal" style={{
          opacity: Math.max(0, opacity * 1.2),
          transform: `translateY(${(1 - opacity) * -20}px)`,
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
        }}>
          <h2>Sembrando Huellas</h2>
          <p>Protegiendo nuestro planeta, una noticia a la vez</p>
        </div>
      </div>
    </section>
  );
}
