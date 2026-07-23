import { useNavigate } from 'react-router-dom';

export default function Newsletter() {
  const navigate = useNavigate();

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-icon"><i className="fas fa-heart" /></div>
        <h2>Apoya Nuestra Causa</h2>
        <p>Tu donación nos ayuda a seguir protegiendo el medio ambiente y difundiendo noticias importantes</p>
        <button
          className="donate-btn"
          onClick={() => navigate('/donar')}
        >
          Donar Ahora <i className="fas fa-hand-holding-heart" />
        </button>
      </div>
    </section>
  );
}
