import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ScrollToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-top visible"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.back_to_top')}
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
