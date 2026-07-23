import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const MONTOS = [10, 25, 50, 100, 250];
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function DonatePage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    monto: 25,
  });
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [culqiReady, setCulqiReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;
    script.onload = () => {
      if (window.Culqi) {
        window.Culqi.publicKey = '';
        fetch(`${API_URL}/api/config`)
          .then((r) => r.json())
          .then((config) => {
            window.Culqi.publicKey = config.publicKey;
            setCulqiReady(true);
          })
          .catch(() => console.warn('No se pudo cargar la configuración de Culqi'));
      }
    };
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const processPayment = useCallback(async (token) => {
    setProcessing(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/create-charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token_id: token.id,
          amount: form.monto * 100,
          email: form.email,
          name: form.nombre,
          description: `Donación de S/. ${form.monto} - ${form.nombre}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar el pago');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setProcessing(false);
    }
  }, [form.monto, form.email, form.nombre]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nombre.trim() || !form.email.trim()) {
      setError('Completa nombre y correo electrónico.');
      return;
    }

    if (!culqiReady || !window.Culqi) {
      setError('El sistema de pago no está listo. Recarga la página e intenta de nuevo.');
      return;
    }

    window.Culqi.settings({
      title: 'Sembrando Huellas Perú',
      currency: 'PEN',
      amount: form.monto * 100,
    });

    window.Culqi.options({
      lang: 'es',
      installments: false,
      paymentMethods: {
        creditCard: true,
        debitCard: true,
        yape: false,
      },
      style: {
        theme: 'default',
      },
    });

    window.Culqi.closableCallback = (token) => {
      if (token) {
        processPayment(token);
      }
      window.Culqi.close();
    };

    window.Culqi.open();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data && e.data.culqi) {
        const payload = JSON.parse(e.data.culqi);
        if (payload.error) {
          setError(payload.error.user_message || 'Error con los datos de la tarjeta.');
          setProcessing(false);
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (submitted) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="donate-success">
            <div className="donate-success-icon"><i className="fas fa-check-circle" /></div>
            <h2>¡Gracias por tu donación!</h2>
            <p>Hemos recibido tu donación de <strong>S/. {form.monto}</strong>. Recibirás un correo de confirmación a <strong>{form.email}</strong>.</p>
            <p>Tu apoyo es fundamental para seguir protegiendo nuestro medio ambiente.</p>
            <Link to="/" className="donate-btn" style={{ marginTop: 24, display: 'inline-block', textDecoration: 'none' }}>
              <i className="fas fa-home" /> Volver al Inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="container">
        <div className="donate-page">
          <div className="donate-header">
            <h1><i className="fas fa-hand-holding-heart" /> Realizar una Donación</h1>
            <p>Tu contribución ayuda a proteger el medio ambiente y a mantener nuestro medio de noticias ambientales.</p>
          </div>

          <div className="donate-grid">
            <form className="donate-form" onSubmit={handleSubmit}>
              <h3><i className="fas fa-user" /> Datos Personales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Juan Pérez" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+51 999 888 777" />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Dirección</label>
                  <input type="text" id="direccion" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Av. Example 123, Lima" />
                </div>
              </div>

              <h3><i className="fas fa-credit-card" /> Datos de Pago</h3>
              <p className="donate-secure" style={{ textAlign: 'left', marginTop: 0, marginBottom: 16 }}>
                <i className="fas fa-lock" /> Al presionar "Donar" se abrirá el formulario seguro de Culqi para ingresar los datos de tu tarjeta.
              </p>

              {error && (
                <div className="donate-error">
                  <i className="fas fa-exclamation-circle" /> {error}
                </div>
              )}

              <button
                type="submit"
                className="donate-btn donate-submit"
                disabled={processing}
              >
                {processing ? (
                  <><i className="fas fa-spinner fa-spin" /> Procesando...</>
                ) : (
                  <><i className="fas fa-lock" /> Donar S/. {form.monto}</>
                )}
              </button>
              <p className="donate-secure"><i className="fas fa-shield-alt" /> Pago procesado de forma segura por Culqi</p>
            </form>

            <div className="donate-sidebar">
              <h3>Selecciona el monto</h3>
              <div className="donate-amounts">
                {MONTOS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`donate-amount ${form.monto === m ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, monto: m })}
                  >
                    S/. {m}
                  </button>
                ))}
              </div>

              <div className="donate-summary">
                <h4>Resumen</h4>
                <div className="donate-summary-row">
                  <span>Donación</span>
                  <span>S/. {form.monto}</span>
                </div>
                <div className="donate-summary-row total">
                  <span>Total</span>
                  <span>S/. {form.monto}</span>
                </div>
              </div>

              <div className="donate-info">
                <div className="donate-info-item">
                  <i className="fas fa-leaf" />
                  <div>
                    <strong>Impacto Ambiental</strong>
                    <p>Tu donación apoya proyectos de reforestación y conservación.</p>
                  </div>
                </div>
                <div className="donate-info-item">
                  <i className="fas fa-shield-alt" />
                  <div>
                    <strong>Pago Seguro</strong>
                    <p>Los datos de tu tarjeta los maneja Culqi directamente, nunca los tocamos.</p>
                  </div>
                </div>
                <div className="donate-info-item">
                  <i className="fas fa-receipt" />
                  <div>
                    <strong>Constancia</strong>
                    <p>Recibirás un comprobante por correo electrónico.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
