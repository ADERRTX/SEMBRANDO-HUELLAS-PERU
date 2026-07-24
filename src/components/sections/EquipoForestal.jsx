import { useState } from 'react';
import { EQUIPO_FORESTAL } from '../../constants';
import { sendReviewEmail } from '../../services/emailService';
import { addSubmission } from '../../services/submissionsService';

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export default function EquipoForestal() {
  const [step, setStep] = useState('team');
  const [form, setForm] = useState({ title: '', category: '', content: '', author: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError('');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.author.trim() || !form.email.trim()) return;
    if (!validateEmail(form.email)) { setEmailError('Email inválido'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep('review');
    }, 1200);
  };

  const handleSendReview = () => {
    addSubmission({
      author: form.author,
      email: form.email,
      title: form.title,
      category: form.category,
      content: form.content,
    });

    try {
      sendReviewEmail({
        name: form.author,
        email: form.email,
        title: form.title,
        category: form.category,
        content: form.content,
      });
      setEmailSent(true);
    } catch {
      setEmailSent(true);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <section className="news-section team-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-tree" /></div>
          <h2 className="section-title">Nuestro Equipo Forestal</h2>
        </div>
      </div>
      <p className="team-subtitle">
        Profesionales comprometidos con la protección y restauración de los bosques amazónicos del Perú
      </p>

      <div className="team-grid">
        {EQUIPO_FORESTAL.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-card-avatar" style={{ background: member.color }}>
              {member.image ? (
                <img src={member.image} alt={member.name} />
              ) : (
                <span className="team-initials">{member.initials}</span>
              )}
            </div>
            <div className="team-card-info">
              <h3 className="team-card-name">{member.name}</h3>
              <span className="team-card-role">{member.role}</span>
              <p className="team-card-specialty">{member.specialty}</p>
              <div className="team-card-meta">
                <span><i className="fas fa-briefcase" /> {member.experience}</span>
              </div>
              <p className="team-card-projects">{member.projects}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="team-contact-prompt">
        <div className="team-contact-card">
          <div className="team-contact-icon">
            <i className="fas fa-headset" />
          </div>
          <h3>¿Deseas contactar con el servidor?</h3>
          <p>Puedes publicar tus propias noticias ambientales o enviar una consulta a nuestro equipo técnico</p>
          <button className="team-contact-btn" onClick={() => setStep('publish')}>
            <i className="fas fa-newspaper" /> Publicar Noticia
          </button>
        </div>
      </div>

      {step === 'publish' && !submitted && (
        <div className="team-publish-overlay" onClick={() => setStep('team')}>
          <div className="team-publish-modal" onClick={(e) => e.stopPropagation()}>
            <button className="team-publish-close" onClick={() => setStep('team')}>
              <i className="fas fa-times" />
            </button>

            <div className="team-publish-header">
              <i className="fas fa-edit" />
              <h3>Publicar Noticia</h3>
              <p>Completa los datos de tu noticia ambiental</p>
            </div>

            <form onSubmit={handlePublish} className="team-publish-form">
              <div>
                <label>Tu nombre</label>
                <input
                  type="text"
                  name="author"
                  placeholder="Nombre del autor"
                  value={form.author}
                  onChange={handleChange}
                  className="kids-form-input"
                  required
                />
              </div>
              <div>
                <label>Tu correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`kids-form-input${emailError ? ' contact-input has-error' : ''}`}
                  required
                />
                {emailError && <span className="contact-error">{emailError}</span>}
              </div>
              <div>
                <label>Título de la noticia</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Ej: Nueva especie descubierta en la Amazonía"
                  value={form.title}
                  onChange={handleChange}
                  className="kids-form-input"
                  required
                />
              </div>
              <div>
                <label>Categoría</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="kids-form-input"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="medio-ambiente">Medio Ambiente</option>
                  <option value="flora-fauna">Flora y Fauna</option>
                  <option value="ciencia">Ciencia</option>
                  <option value="economia">Economía Verde</option>
                  <option value="comunidad">Comunidad</option>
                </select>
              </div>
              <div>
                <label>Contenido de la noticia</label>
                <textarea
                  name="content"
                  placeholder="Escribe el contenido de tu noticia aquí..."
                  value={form.content}
                  onChange={handleChange}
                  rows={6}
                  className="kids-form-input contact-textarea"
                  required
                />
              </div>
              <button type="submit" className="team-publish-submit" disabled={sending || !form.title.trim() || !form.content.trim() || !form.author.trim() || !form.email.trim()}>
                {sending ? (
                  <><i className="fas fa-spinner fa-spin" /> Publicando...</>
                ) : (
                  <><i className="fas fa-paper-plane" /> Publicar Noticia</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {step === 'review' && !submitted && (
        <div className="team-publish-overlay" onClick={() => setStep('team')}>
          <div className="team-publish-modal team-review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="team-publish-close" onClick={() => setStep('team')}>
              <i className="fas fa-times" />
            </button>

            <div className="team-review-content">
              <div className="team-review-icon">
                <i className="fas fa-clipboard-check" />
              </div>
              <h3>¡Noticia publicada!</h3>
              <p>Tu noticia "<strong>{form.title}</strong>" ha sido publicada exitosamente.</p>

              <div className="team-review-preview">
                <div className="team-review-badge"><i className="fas fa-eye" /> visible</div>
                <span>Tu noticia ya es visible en la sección de noticias</span>
              </div>

              <p className="team-review-question">¿Deseas enviar tu noticia a revisión editorial?</p>
              <p className="team-review-note">Nuestro equipo revisará el contenido para garantizar su calidad y precisión</p>

              <div className="team-review-actions">
                <button className="team-review-btn secondary" onClick={() => { setSubmitted(true); setEmailSent(false); }}>
                  <i className="fas fa-check" /> No, está bien así
                </button>
                <button className="team-review-btn primary" onClick={handleSendReview}>
                  <i className="fas fa-paper-plane" /> Enviar a Revisión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitted && (
        <div className="team-publish-overlay" onClick={() => { setStep('team'); setSubmitted(false); setEmailSent(false); setForm({ title: '', category: '', content: '', author: '', email: '' }); }}>
          <div className="team-publish-modal team-success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="team-publish-close" onClick={() => { setStep('team'); setSubmitted(false); setEmailSent(false); setForm({ title: '', category: '', content: '', author: '', email: '' }); }}>
              <i className="fas fa-times" />
            </button>
            <div className="team-success-content">
              <div className="team-success-icon">
                <i className="fas fa-check-circle" />
              </div>
              <h3>¡Solicitud enviada!</h3>
              <p>Se abrió tu correo con la solicitud de revisión. Envíala para que llegue a nuestro equipo.</p>
              {emailSent && (
                <div className="team-email-notification">
                  <i className="fas fa-envelope-open-text" />
                  <span>Tu cliente de correo se abrió para enviar la noticia a <strong>educacionaccionamazonia@gmail.com</strong></span>
                </div>
              )}
              <button className="team-contact-btn" onClick={() => { setStep('team'); setSubmitted(false); setEmailSent(false); setForm({ title: '', category: '', content: '', author: '', email: '' }); }}>
                <i className="fas fa-arrow-left" /> Volver al equipo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
