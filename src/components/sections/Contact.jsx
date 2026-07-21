import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SITE_CONFIG } from '../../constants';

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nombre requerido';
    if (!form.email.trim()) newErrors.email = 'Email requerido';
    else if (!validateEmail(form.email)) newErrors.email = 'Email inválido';
    if (!form.message.trim()) newErrors.message = 'Mensaje requerido';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSending(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@sembrandohuellas.pe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setErrors({ message: 'Error al enviar' });
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: 'var(--radius-sm)',
    border: `2px solid ${errors[field] ? '#dc3545' : 'var(--border-color)'}`,
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'var(--transition)',
  });

  return (
    <section id="contacto" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-envelope" /></div>
          <h2 className="section-title">{t('contact.title') || 'Contacto'}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Contact Form */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '30px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>{t('contact.subtitle')}</p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', fontWeight: 700, marginTop: '16px' }}>{t('contact.success_title')}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{t('contact.success_message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input type="text" name="name" placeholder={t('contact.name_placeholder')} value={form.name} onChange={handleChange} style={inputStyle('name')} />
                {errors.name && <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</span>}
              </div>
              <div>
                <input type="email" name="email" placeholder={t('contact.email_placeholder')} value={form.email} onChange={handleChange} style={inputStyle('email')} />
                {errors.email && <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</span>}
              </div>
              <div>
                <textarea name="message" placeholder={t('contact.message_placeholder')} value={form.message} onChange={handleChange} rows={5} style={{ ...inputStyle('message'), resize: 'vertical' }} />
                {errors.message && <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>{errors.message}</span>}
              </div>
              <button type="submit" disabled={sending} style={{
                padding: '14px 32px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-primary)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                {sending ? t('contact.sending') : t('contact.send')} <i className="fas fa-paper-plane" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '30px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, marginBottom: '20px', fontSize: '1.1rem' }}>{t('contact.title') || 'Contacto'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t('contact.location_label')}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{SITE_CONFIG.location}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t('contact.email_label')}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{SITE_CONFIG.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-phone" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t('contact.phone_label')}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{SITE_CONFIG.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '30px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, marginBottom: '16px', fontSize: '1.1rem' }}>{t('contact.social_label') || 'Redes Sociales'}</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: 'fab fa-facebook-f', href: SITE_CONFIG.social.facebook },
                { icon: 'fab fa-instagram', href: SITE_CONFIG.social.instagram },
                { icon: 'fab fa-youtube', href: SITE_CONFIG.social.youtube },
                { icon: 'fab fa-tiktok', href: SITE_CONFIG.social.tiktok },
                { icon: 'fab fa-twitter', href: SITE_CONFIG.social.twitter },
                { icon: 'fab fa-whatsapp', href: SITE_CONFIG.social.whatsapp },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '44px', height: '44px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'var(--transition)', color: 'var(--text-primary)', fontSize: '1.1rem',
                }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
