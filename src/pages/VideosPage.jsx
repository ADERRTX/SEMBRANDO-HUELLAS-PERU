import VideosDestacados from '../components/sections/VideosDestacados';

export default function VideosPage() {
  return (
    <main className="main-content">
      <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        <VideosDestacados />
      </div>
    </main>
  );
}
