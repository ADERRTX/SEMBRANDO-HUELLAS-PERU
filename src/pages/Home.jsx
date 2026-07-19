import Hero from '../components/sections/Hero';
import NewsTicker from '../components/sections/NewsTicker';
import BreakingNews from '../components/sections/BreakingNews';
import BreakingNewsCarousel from '../components/sections/BreakingNewsCarousel';
import AnimatedLogoSection from '../components/sections/AnimatedLogoSection';
import MedioAmbiente from '../components/sections/MedioAmbiente';
import FloraFauna from '../components/sections/FloraFauna';
import EconomiaVerde from '../components/sections/EconomiaVerde';
import CienciaInnovacion from '../components/sections/CienciaInnovacion';
import VideosDestacados from '../components/sections/VideosDestacados';
import Newsletter from '../components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <NewsTicker />
      <BreakingNews />
      <BreakingNewsCarousel />
      <AnimatedLogoSection />
      <main className="main-content">
        <div className="container">
          <MedioAmbiente />
          <FloraFauna />
          <EconomiaVerde />
          <CienciaInnovacion />
          <VideosDestacados />
          <Newsletter />
        </div>
      </main>
    </>
  );
}
