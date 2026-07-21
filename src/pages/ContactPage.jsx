import Contact from '../components/sections/Contact';
import EquipoForestal from '../components/sections/EquipoForestal';

export default function ContactPage() {
  return (
    <main className="main-content">
      <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        <Contact />
        <EquipoForestal />
      </div>
    </main>
  );
}
