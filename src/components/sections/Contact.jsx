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
    if (!form.name.trim()) newErrors.name = t('contact_form.name_required');
    if (!form.email.trim()) newErrors.email = t('contact_form.email_required');
    else if (!validateEmail(form.email)) newErrors.email = t('contact_form.email_invalid');
    if (!form.message.trim()) newErrors.message = t('contact_form.message_required');
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSending(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/educacionaccionamazonia@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setErrors({ message: t('contact_form.error_sending') });
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field) =>
    `contact-input${errors[field] ? ' has-error' : ''}${field === 'message' ? ' contact-textarea' : ''}`;

  return (
    <section id="contacto" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-envelope" /></div>
          <h2 className="section-title">{t('contact.title') || 'Contacto'}</h2>
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <p className="contact-form-subtitle">{t('contact.subtitle')}</p>

          {submitted ? (
            <div className="contact-success">
              <i className="fas fa-check-circle contact-success-icon" />
              <h3>{t('contact.success_title')}</h3>
              <p>{t('contact.success_message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <input type="text" name="name" placeholder={t('contact.name_placeholder')} value={form.name} onChange={handleChange} className={inputClass('name')} />
                {errors.name && <span className="contact-error">{errors.name}</span>}
              </div>
              <div>
                <input type="email" name="email" placeholder={t('contact.email_placeholder')} value={form.email} onChange={handleChange} className={inputClass('email')} />
                {errors.email && <span className="contact-error">{errors.email}</span>}
              </div>
              <div>
                <textarea name="message" placeholder={t('contact.message_placeholder')} value={form.message} onChange={handleChange} rows={5} className={inputClass('message')} />
                {errors.message && <span className="contact-error">{errors.message}</span>}
              </div>
              <button type="submit" disabled={sending} className="contact-submit-btn">
                {sending ? t('contact.sending') : t('contact.send')} <i className="fas fa-paper-plane" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="contact-info-column">
          <div className="contact-info-card">
            <h3>{t('contact.title') || 'Contacto'}</h3>
            <div className="contact-info-rows">
              <div className="contact-info-row">
                <div className="contact-icon-circle">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <p className="contact-info-label">{t('contact.location_label')}</p>
                  <p className="contact-info-value">{SITE_CONFIG.location}</p>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-icon-circle">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <p className="contact-info-label">{t('contact.email_label')}</p>
                  <p className="contact-info-value">{SITE_CONFIG.email}</p>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-icon-circle">
                  <i className="fas fa-phone" />
                </div>
                <div>
                  <p className="contact-info-label">{t('contact.phone_label')}</p>
                  <p className="contact-info-value">{SITE_CONFIG.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-info-card">
            <h3>{t('contact.social_label') || 'Redes Sociales'}</h3>
            <div className="contact-social-icons">
              {[
                { icon: 'fab fa-facebook-f', href: SITE_CONFIG.social.facebook },
                { icon: 'fab fa-instagram', href: SITE_CONFIG.social.instagram },
                { icon: 'fab fa-youtube', href: SITE_CONFIG.social.youtube },
                { icon: 'fab fa-tiktok', href: SITE_CONFIG.social.tiktok },
                { icon: 'fab fa-whatsapp', href: SITE_CONFIG.social.whatsapp },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-social-link">
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
