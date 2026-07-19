import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-icon"><i className="fas fa-leaf" /></div>
        <h2>Suscríbete a Nuestro Boletín</h2>
        <p>Recibe las últimas noticias del medio ambiente directamente en tu correo</p>
        {submitted ? (
          <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>¡Gracias por suscribirte!</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Suscribirse <i className="fas fa-paper-plane" /></button>
          </form>
        )}
      </div>
    </section>
  );
}
