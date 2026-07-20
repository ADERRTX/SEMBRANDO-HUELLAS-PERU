import { useState, useEffect, useCallback } from 'react';
import { useT, useLanguage } from '../../contexts/LanguageContext';
import GamesHub from '../games/GamesHub';

const funFacts = [
  { emoji: '🌳', titleKey: 'fact1_title', descKey: 'fact1' },
  { emoji: '🦅', titleKey: 'fact2_title', descKey: 'fact2' },
  { emoji: '🌊', titleKey: 'fact3_title', descKey: 'fact3' },
  { emoji: '🌸', titleKey: 'fact4_title', descKey: 'fact4' },
];

const extraFacts = [
  { emoji: '🐙', title: 'El pulpo tiene 3 corazones', desc: 'Dos bombean sangre a las branquias y uno al resto del cuerpo. ¡Además, su sangre es azul!' },
  { emoji: '🌍', title: 'La Tierra tiene 4.5 mil millones de años', desc: 'Se formó a partir de polvo y gas que orbitaban el Sol primitivo.' },
  { emoji: '🐝', title: 'Las abejas pueden reconocer caras', desc: 'Estudios demuestran que las abejas distinguen rostros humanos como si fueran fotografías.' },
  { emoji: '🌋', title: 'Hay más volcanes bajo el mar', desc: 'Más del 70% de la actividad volcánica del planeta ocurre en el fondo oceánico.' },
  { emoji: '🐨', title: 'Los koalas duermen 22 horas', desc: 'Su dieta de eucalipto les da poca energía, así que pasan la mayor parte del día durmiendo.' },
  { emoji: '🧬', title: 'Compartimos el 60% del ADN con los plátanos', desc: 'Todos los seres vivos tenemos un origen común, ¡incluso las frutas!' },
  { emoji: '🐋', title: 'El corazón de una ballena es del tamaño de un carro', desc: 'Su corazón late tan lento que solo se escucha 2 veces por minuto.' },
  { emoji: '🦩', title: 'Los flamencos nacen blancos', desc: 'Su color rosa viene de los camarones y algas que comen. Sin esa dieta, serían blancos.' },
  { emoji: '🐢', title: 'Las tortugas pueden vivir más de 150 años', desc: 'Jonathan, una tortuga gigante, vivió 190 años en la isla de Santa Elena.' },
];

const allQuizQuestions = [
  { q: '¿Cuántos pulmones tiene la Tierra?', options: ['2 - Asia y América', '1 - La Amazonía', '3 - Las 3 selvas'], answer: 1, explanation: 'La Amazonía es considerada el pulmón del mundo porque produce el 20% del oxígeno global.' },
  { q: '¿Qué animal puede dormir 3 años?', options: ['El oso perezoso', 'El caracol', 'La tortuga'], answer: 1, explanation: 'El caracol puede permanecer dormido hasta 3 años en periods de sequía, esperando condiciones favorables.' },
  { q: '¿Cuántas especies de insectos existen?', options: ['100,000', '500,000', '1,000,000'], answer: 2, explanation: 'Se estima que existen más de 1 millón de especies de insectos, la mayoría aún no ha sido descubierta.' },
  { q: '¿Qué gas produce el plancton marino?', options: ['Oxígeno (O₂)', 'Nitrógeno (N₂)', 'Metano (CH₄)'], answer: 0, explanation: 'El plancton marino produce más del 50% del oxígeno que respiramos, incluso más que los bosques.' },
  { q: '¿Cuántos años tarda una lata en degradarse?', options: ['50 años', '200 años', '500 años'], answer: 2, explanation: 'Una lata de aluminio tarda entre 200 y 500 años en degradarse completamente en el medio ambiente.' },
  { q: '¿Cuál es el río más largo del mundo?', options: ['Río Amazonas', 'Río Nilo', 'Río Misisipi'], answer: 0, explanation: 'Con más de 6,400 km, el Amazonas es el más largo y caudaloso del mundo, desaguando el 20% del agua dulce del planeta.' },
  { q: '¿Qué porcentaje de la Tierra es agua?', options: ['51%', '71%', '91%'], answer: 1, explanation: 'El 71% de la superficie terrestre está cubierta por agua, pero solo el 2.5% es agua dulce.' },
  { q: '¿Cuál es el animal terrestre más rápido?', options: ['El leopardo', 'El guepardo', 'El león'], answer: 1, explanation: 'El guepardo puede alcanzar 120 km/h en distancias cortas, ¡lo que equivale a un auto en ciudad!' },
  { q: '¿Qué es la deforestación?', options: ['Plantar árboles', 'Cortar bosques masivamente', 'Crear parques'], answer: 1, explanation: 'La deforestación es la destrucción de bosques, principal causa de pérdida de biodiversidad y cambio climático.' },
  { q: '¿Cuántos años tarda una botella de plástico en degradarse?', options: ['50 años', '200 años', '450 años'], answer: 2, explanation: 'Una botella de plástico tarda hasta 450 años en degradarse. ¡Por eso es tan importante reciclar!' },
  { q: '¿Qué es un bioma?', options: ['Un tipo de virus', 'Un ecosistema con clima similar', 'Un mineral'], answer: 1, explanation: 'Un bioma es un conjunto de ecosistemas con clima, flora y fauna similares, como el desierto o la selva.' },
  { q: '¿Cuántas tonelabras de basura llegan al mar cada año?', options: ['1 millón', '8 millones', '20 millones'], answer: 1, explanation: 'Se estima que 8 millones de toneladas de plástico llegan a los océanos cada año, dañando la vida marina.' },
];

const memoryPairs = [
  { id: 1, emoji: '🦁', name: 'Lion' },
  { id: 2, emoji: '🐘', name: 'Elephant' },
  { id: 3, emoji: '🦜', name: 'Parrot' },
  { id: 4, emoji: '🐬', name: 'Dolphin' },
  { id: 5, emoji: '🦋', name: 'Butterfly' },
  { id: 6, emoji: '🐢', name: 'Turtle' },
  { id: 7, emoji: '🦩', name: 'Flamingo' },
  { id: 8, emoji: '🦈', name: 'Shark' },
];

const wordSearchWords = [
  { word: 'AMAZONIA', hint: 'La selva más grande del mundo' },
  { word: 'CONDOR', hint: 'Ave nacional del Perú' },
  { word: 'CORAL', hint: 'Organismo que forma arrecifes' },
  { word: 'TORTUGA', hint: 'Reptil con caparazón' },
  { word: 'SELVA', hint: 'Bosque tropical denso' },
  { word: 'RIO', hint: 'Corriente de agua dulce' },
  { word: 'HOJA', hint: 'Parte verde de la planta' },
  { word: 'MAR', hint: 'Extensa masa de agua salada' },
];

const GRID_SIZE = 10;

const colorBookPages = [
  {
    title: 'Selva Amazónica',
    elements: [
      { type: 'rect', x: 0, y: 80, w: 300, h: 120, fill: '#2d8a2d', label: 'Bosque' },
      { type: 'circle', cx: 150, cy: 60, r: 50, fill: '#8B4513', label: 'Tronco' },
      { type: 'ellipse', cx: 150, cy: 30, rx: 70, ry: 40, fill: '#228B22', label: 'Copas' },
      { type: 'path', d: 'M50,200 L70,120 L90,200 Z', fill: '#006400', label: 'Árbol' },
      { type: 'path', d: 'M180,200 L200,110 L220,200 Z', fill: '#006400', label: 'Árbol' },
    ],
    colors: ['#228B22', '#006400', '#8B4513', '#2d8a2d', '#FFD700', '#FF6347'],
  },
  {
    title: 'Océano Profundo',
    elements: [
      { type: 'rect', x: 0, y: 0, w: 300, h: 200, fill: '#001f3f', label: 'Agua' },
      { type: 'ellipse', cx: 100, cy: 100, rx: 30, ry: 15, fill: '#FF6B6B', label: 'Pez' },
      { type: 'ellipse', cx: 200, cy: 70, rx: 25, ry: 12, fill: '#4ECDC4', label: 'Pez' },
      { type: 'path', d: 'M150,150 Q170,130 190,150 Q170,170 150,150', fill: '#FF8C00', label: 'Pez' },
      { type: 'circle', cx: 50, cy: 180, r: 8, fill: '#9B59B6', label: 'Burbuja' },
    ],
    colors: ['#001f3f', '#003366', '#FF6B6B', '#4ECDC4', '#FF8C00', '#9B59B6'],
  },
];

const triviaQuestions = [
  { q: '¿Cuántos árboles se cortan por minuto en el Amazonas?', options: ['50', '200', '300'], answer: 2, fun: '¡Eso equivale a 4 campos de fútbol por minuto!' },
  { q: '¿Qué animal puede regenerar sus extremidades?', options: ['La lagartija', 'El perro', 'El gato'], answer: 0, fun: 'Las lagartijas pueden regenerar la cola, y algunos anfibios incluso órganos enteros.' },
  { q: '¿Cuántos litros de agua consume una persona al día?', options: ['2 litros', '5 litros', '10 litros'], answer: 1, fun: 'Pero producir un jean consume ¡10,000 litros de agua!' },
  { q: '¿Qué porcentaje del oxígeno produce el Amazonas?', options: ['5%', '10%', '20%'], answer: 2, fun: 'La Amazonía produce el 20% del oxígeno mundial, comparable a los océanos.' },
  { q: '¿Cuántas especies de animales hay en el Amazonas?', options: ['100,000', '500,000', '1,000,000'], answer: 2, fun: 'Incluye peces, aves, mamíferos, reptiles e insectos, muchos aún sin descubrir.' },
  { q: '¿Qué es el efecto invernadero?', options: ['Un invernadero real', 'Calentamiento del planeta', 'Un tipo de planta'], answer: 1, fun: 'Sin él, la Tierra estaría a -18°C, pero demasiado causa calentamiento global.' },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateWordGrid() {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '')
  );
  const placedWords = [];

  for (const { word } of wordSearchWords) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      const dir = Math.floor(Math.random() * 3);
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const canPlace =
        (dir === 0 && col + word.length <= GRID_SIZE) ||
        (dir === 1 && row + word.length <= GRID_SIZE) ||
        (dir === 2 && col + word.length <= GRID_SIZE && row + word.length <= GRID_SIZE);
      if (!canPlace) continue;
      let fits = true;
      const positions = [];
      for (let k = 0; k < word.length; k++) {
        const r = dir === 1 ? row + k : dir === 2 ? row + k : row;
        const c = dir === 0 ? col + k : dir === 2 ? col + k : col;
        if (grid[r][c] !== '' && grid[r][c] !== word[k]) { fits = false; break; }
        positions.push([r, c]);
      }
      if (fits) {
        positions.forEach(([r, c], k) => { grid[r][c] = word[k]; });
        placedWords.push({ word, positions });
        placed = true;
      }
    }
  }
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') grid[r][c] = alphabet[Math.floor(Math.random() * 26)];
    }
  }
  return { grid, placedWords };
}

const TabButton = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: '25px',
      border: '2px solid',
      borderColor: active ? '#e91e63' : 'var(--border-color)',
      background: active ? 'linear-gradient(135deg, #e91e63, #9c27b0)' : 'var(--bg-primary)',
      color: active ? 'white' : 'var(--text-primary)',
      fontWeight: 700,
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      position: 'relative',
    }}
  >
    <span>{icon}</span> {label}
    {badge && (
      <span style={{
        position: 'absolute', top: '-6px', right: '-6px',
        background: '#ff5722', color: 'white', borderRadius: '50%',
        width: '20px', height: '20px', fontSize: '0.7rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
      }}>{badge}</span>
    )}
  </button>
);

const videoCategories = [
  {
    id: 'amazonia',
    title: '🌿 Amazonía y Selva',
    color: '#2e7d32',
    videos: [
      { id: 'KJXhkU8BGB4', title: 'La Amazonía: El Pulmón del Mundo', desc: 'Descubre por qué la selva amazónica es vital para todo el planeta.' },
      { id: 'qE3fB0B0mQ4', title: 'Animales de la Amazonía', desc: 'Conoce losIncreíbles animales que habitan en la selva tropical.' },
      { id: 'TQ3nW5pFH20', title: '¿Por qué es importante el Amazonas?', desc: 'El río más caudaloso y su ecosistema único.' },
    ],
  },
  {
    id: 'reciclaje',
    title: '♻️ Reciclaje y Basura',
    color: '#ff9800',
    videos: [
      { id: 'YIz6xelhSyc', title: '¿Qué es el Reciclaje?', desc: 'Aprende a separar la basura y darle nueva vida a los materiales.' },
      { id: 'vLhD1XyNLOM', title: 'La Historia de la Basura', desc: '¿Qué pasa con la basura que tiramos? Un viaje al vertedero.' },
      { id: '5Jf0sMpZgKg', title: '3R: Reducir, Reutilizar, Reciclar', desc: 'Las tres reglas de oro para cuidar el medio ambiente.' },
    ],
  },
  {
    id: 'agua',
    title: '💧 Agua y Océanos',
    color: '#2196f3',
    videos: [
      { id: '9Ax7mRwXQxg', title: 'El Agua: Fuente de Vida', desc: '¿Por qué el agua dulce es tan valiosa y escasa?' },
      { id: 'UOxkGDfbqUA', title: 'Contaminación del Agua', desc: 'Cómo proteger ríos, lagos y océanos de la contaminación.' },
      { id: 'E98AQa2yQz0', title: 'Los Océanos y su Ecosistema', desc: 'La vida marina y los problemas que enfrenta.' },
    ],
  },
  {
    id: 'cambio-climatico',
    title: '🌍 Cambio Climático',
    color: '#e91e63',
    videos: [
      { id: 'G4H1N2Xoo5o', title: '¿Qué es el Calentamiento Global?', desc: 'Explicado de forma sencilla para entender qué le pasa a nuestro planeta.' },
      { id: 'L5XMGsYbNmI', title: '¿Cómo podemos detener el Cambio Climático?', desc: 'Acciones sencillas que todos podemos hacer desde casa.' },
      { id: 'nzgHp1xKmVc', title: 'El Efecto Invernadero Explicado', desc: 'La ciencia detrás del cambio climático, paso a paso.' },
    ],
  },
];

const interactiveBooks = [
  {
    id: 'biodiversidad',
    title: '🌱 Biodiversidad: Tesoros Vivos',
    color: '#2e7d32',
    icon: '🌿',
    pages: [
      { heading: '¿Qué es la Biodiversidad?', text: 'La biodiversidad es la variedad de todos los seres vivos en la Tierra: plantas, animales, hongos y microorganismos. Cada especie tiene un papel importante en la naturaleza.', img: '🌍' },
      { heading: 'Animales en Peligro', text: 'El oso panda, el jaguar y el delfín del río Amazonas están en peligro. La deforestación y la caza ilegal amenazan sus hogares.', img: '🐼' },
      { heading: 'Plantas Medicinales', text: 'La selva amazónica tiene miles de plantas curiosas. El camu camu tiene más vitamina C que cualquier otra fruta del mundo.', img: '🌺' },
      { heading: '¿Qué podemos hacer?', text: 'No comprar productos de especies protegidas, sembrar árboles y cuidar los ríos son formas de ayudar a la biodiversidad.', img: '🤝' },
    ],
    questions: [
      { q: '¿Qué es la biodiversidad?', options: ['Solo los animales', 'La variedad de seres vivos', 'Los árboles del bosque'], answer: 1 },
      { q: '¿Cuál de estos animales está en peligro?', options: ['El perro', 'El gato', 'El oso panda'], answer: 2 },
      { q: '¿Qué fruta amazónica tiene mucha vitamina C?', options: ['Naranja', 'Camu camu', 'Manzana'], answer: 1 },
    ],
  },
  {
    id: 'reciclaje-book',
    title: '♻️ Guía del Buen Reciclador',
    color: '#ff9800',
    icon: '♻️',
    pages: [
      { heading: '¿Por qué Reciclar?', text: 'Cuando reciclamos, evitamos que la basura llegue a los ríos y mares. Una lata de aluminio tarda 500 años en desaparecer del planeta.', img: '🚯' },
      { heading: 'Los Colores de la Basura', text: 'Azul = Papel y cartón. Amarillo = Plásticos. Verde = Vidrio. Rojo = Metales. Cada color va a su contenedor especial.', img: '🗑️' },
      { heading: 'La Vida de un Plástico', text: 'Una botella de plástico tarda 450 años en destruirse. Pero si la reciclas, puede convertirse en ropa, juguetes o nuevas botellas.', img: '🧴' },
      { heading: 'Reduce y Reutiliza', text: 'Antes de reciclar, intenta reducir lo que compras y reutilizar lo que ya tienes. Una bolsa de tela puede durar años.', img: '👜' },
    ],
    questions: [
      { q: '¿Qué color es el contenedor de papel?', options: ['Verde', 'Azul', 'Amarillo'], answer: 1 },
      { q: '¿Cuántos años tarda una lata en degradarse?', options: ['50 años', '200 años', '500 años'], answer: 2 },
      { q: '¿Qué significa "reducir"?', options: ['Reciclar más', 'Comprar menos cosas innecesarias', 'Tirar la basura'], answer: 1 },
    ],
  },
  {
    id: 'agua-book',
    title: '💧 El Misterio del Agua',
    color: '#2196f3',
    icon: '💧',
    pages: [
      { heading: 'El Agua en la Tierra', text: 'Solo el 3% del agua de la Tierra es dulce y de ese 3%, el 70% está congelada en los glaciares. ¡El agua que bebemos es muy escasa!', img: '🧊' },
      { heading: 'El Viaje del Agua', text: 'El agua nunca para: evaporación → nubes → lluvia → ríos → mar → evaporación. Es un ciclo infinito llamado "ciclo hidrológico".', img: '🌊' },
      { heading: 'Agua y Salud', text: '800 millones de personas no tienen acceso a agua limpia. Contaminar un río afecta a todos los seres vivos que dependen de él.', img: '🏥' },
      { heading: 'Cuida el Agua', text: 'Cerrar el grifo mientras te cepillas los dientes puede ahorrar hasta 20 litros de agua al día. ¡Pequeñas acciones, grandes cambios!', img: '🚿' },
    ],
    questions: [
      { q: '¿Cuánta agua dulce hay en la Tierra?', options: ['El 50%', 'El 3%', 'El 30%'], answer: 1 },
      { q: '¿Qué es el ciclo hidrológico?', options: ['El reciclaje del agua', 'El ciclo del agua en la naturaleza', 'El transporte de agua'], answer: 1 },
      { q: '¿Cuánta agua se ahorra cerrando el grifo al cepillarse?', options: ['5 litros', '10 litros', '20 litros'], answer: 2 },
    ],
  },
  {
    id: 'energia',
    title: '⚡ Energías del Futuro',
    color: '#9c27b0',
    icon: '⚡',
    pages: [
      { heading: '¿Qué es la Energía Renovable?', text: 'Las energías renovables son aquellas que no se agotan: el sol, el viento y el agua pueden producir electricidad para siempre.', img: '☀️' },
      { heading: 'Energía Solar', text: 'Los paneles solares convierten la luz del sol en electricidad. Un solo panel puede iluminar una casa durante todo el día.', img: '🌞' },
      { heading: 'Energía Eólica', text: 'Los molinos de viento (aerogeneradores) usan el viento para generar electricidad. Pueden medir más de 100 metros de alto.', img: '💨' },
      { heading: '¿Por qué no usar solo petróleo?', text: 'El petróleo y el gas contaminan el aire y causan calentamiento global. Las renovables son limpias y no dañan el planeta.', img: '🏭' },
    ],
    questions: [
      { q: '¿Qué fuente de energía viene del sol?', options: ['Energía solar', 'Energía eólica', 'Energía nuclear'], answer: 0 },
      { q: '¿Qué es un aerogenerador?', options: ['Un molino de viento que genera electricidad', 'Un panel solar', 'Una máquina de gas'], answer: 0 },
      { q: '¿Por qué las renovables son mejores?', options: ['Son más baratas', 'No contaminan', 'Son más rápidas'], answer: 1 },
    ],
  },
];

function VideosSection() {
  const [activeCat, setActiveCat] = useState('amazonia');
  const [playingId, setPlayingId] = useState(null);
  const cat = videoCategories.find((c) => c.id === activeCat);

  return (
    <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#e91e63' }}>📺 Videos Educativos</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>Aprende sobre el medio ambiente con estos videos divertidos</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {videoCategories.map((c) => (
          <button key={c.id} onClick={() => { setActiveCat(c.id); setPlayingId(null); }}
            style={{
              padding: '8px 18px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid', cursor: 'pointer',
              borderColor: activeCat === c.id ? c.color : 'var(--border-color)',
              background: activeCat === c.id ? c.color : 'var(--bg-secondary)',
              color: activeCat === c.id ? 'white' : 'var(--text-primary)',
              transition: 'all 0.2s ease',
            }}>{c.title}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {cat.videos.map((v) => (
          <div key={v.id} style={{
            background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
            border: '1px solid var(--border-color)', transition: 'all 0.3s ease',
          }}>
            {playingId === v.id ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title={v.title} />
              </div>
            ) : (
              <div onClick={() => setPlayingId(v.id)} style={{ cursor: 'pointer', position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(233,30,99,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(233,30,99,0.5)' }}>
                    <span style={{ fontSize: '1.5rem', marginLeft: '4px' }}>▶</span>
                  </div>
                </div>
              </div>
            )}
            <div style={{ padding: '14px 16px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{v.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BooksSection() {
  const [activeBook, setActiveBook] = useState('biodiversidad');
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);

  const book = interactiveBooks.find((b) => b.id === activeBook);

  const resetBook = () => {
    setCurrentPage(0);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(0);
  };

  const switchBook = (id) => {
    setActiveBook(id);
    resetBook();
  };

  const handleQuizAnswer = (qIdx, aIdx) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const newAnswers = { ...quizAnswers, [qIdx]: aIdx };
    setQuizAnswers(newAnswers);
    if (aIdx === book.questions[qIdx].answer) setQuizScore((s) => s + 1);
  };

  return (
    <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#2196f3' }}>📚 Libros Interactivos</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>Lee, aprende y responde preguntas sobre el medio ambiente</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {interactiveBooks.map((b) => (
          <button key={b.id} onClick={() => switchBook(b.id)}
            style={{
              padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid', cursor: 'pointer',
              borderColor: activeBook === b.id ? b.color : 'var(--border-color)',
              background: activeBook === b.id ? b.color : 'var(--bg-secondary)',
              color: activeBook === b.id ? 'white' : 'var(--text-primary)',
              transition: 'all 0.2s ease',
            }}>{b.icon} {b.title}</button>
        ))}
      </div>

      {!showQuiz ? (
        <div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: `2px solid ${book.color}20`, marginBottom: '20px', minHeight: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '2rem' }}>{book.pages[currentPage].img}</span>
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: book.color }}>{book.pages[currentPage].heading}</h4>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#444' }}>{book.pages[currentPage].text}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}
              style={{
                padding: '10px 20px', borderRadius: '20px', fontWeight: 700, border: 'none', cursor: currentPage === 0 ? 'default' : 'pointer',
                background: currentPage === 0 ? '#e0e0e0' : book.color, color: currentPage === 0 ? '#999' : 'white',
                opacity: currentPage === 0 ? 0.5 : 1, transition: 'all 0.2s ease',
              }}>← Anterior</button>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {book.pages.map((_, i) => (
                <div key={i} onClick={() => setCurrentPage(i)}
                  style={{
                    width: currentPage === i ? '24px' : '10px', height: '10px', borderRadius: '5px',
                    background: currentPage === i ? book.color : '#ddd', cursor: 'pointer', transition: 'all 0.3s ease',
                  }} />
              ))}
            </div>

            {currentPage < book.pages.length - 1 ? (
              <button onClick={() => setCurrentPage((p) => p + 1)}
                style={{ padding: '10px 20px', borderRadius: '20px', fontWeight: 700, border: 'none', cursor: 'pointer', background: book.color, color: 'white' }}>
                Siguiente →
              </button>
            ) : (
              <button onClick={() => setShowQuiz(true)}
                style={{ padding: '10px 20px', borderRadius: '20px', fontWeight: 700, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #e91e63, #9c27b0)', color: 'white', fontSize: '0.95rem' }}>
                🧠 ¡ responder Quiz!
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h4 style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.2rem', color: book.color, marginBottom: '20px' }}>🧠 Quiz del Libro</h4>
          {book.questions.map((q, qIdx) => (
            <div key={qIdx} style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '10px' }}>{qIdx + 1}. {q.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {q.options.map((opt, aIdx) => {
                  const answered = quizAnswers[qIdx] !== undefined;
                  const isCorrect = aIdx === q.answer;
                  const isSelected = quizAnswers[qIdx] === aIdx;
                  return (
                    <button key={aIdx} onClick={() => handleQuizAnswer(qIdx, aIdx)} disabled={answered}
                      style={{
                        padding: '10px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', border: '2px solid',
                        borderColor: answered ? (isCorrect ? '#4caf50' : isSelected ? '#f44336' : '#e0e0e0') : '#e0e0e0',
                        background: answered ? (isCorrect ? '#e8f5e9' : isSelected ? '#ffebee' : 'white') : 'white',
                        color: answered ? (isCorrect ? '#2e7d32' : isSelected ? '#c62828' : '#999') : 'var(--text-primary)',
                        cursor: answered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                      }}>
                      {String.fromCharCode(65 + aIdx)}. {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {Object.keys(quizAnswers).length === book.questions.length && (
            <div style={{ textAlign: 'center', padding: '24px', background: `linear-gradient(135deg, ${book.color}10, ${book.color}20)`, borderRadius: '12px', border: `2px solid ${book.color}40` }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{quizScore === book.questions.length ? '🏆' : quizScore >= 2 ? '⭐' : '💪'}</div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: book.color }}>{quizScore} / {book.questions.length}</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                {quizScore === book.questions.length ? '¡Excelente! Dominaste el libro' : '¡Sigue leyendo y aprendiendo!'}
              </p>
              <button onClick={resetBook} style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '20px', background: book.color, color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                📖 Leer de Nuevo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function KidsInfantil() {
  const t = useT();
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState('games');

  return (
    <section id="ninos" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-child" /></div>
          <h2 className="section-title">🌈 {t('kids.title')}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <TabButton active={activeSection === 'games'} onClick={() => setActiveSection('games')} icon="🎮" label="Minijuegos" />
        <TabButton active={activeSection === 'videos'} onClick={() => setActiveSection('videos')} icon="📺" label="Videos Educativos" />
        <TabButton active={activeSection === 'books'} onClick={() => setActiveSection('books')} icon="📚" label="Libros Interactivos" />
        <TabButton active={activeSection === 'quiz'} onClick={() => setActiveSection('quiz')} icon="🧠" label="Quiz Ambiental" badge="12" />
        <TabButton active={activeSection === 'memory'} onClick={() => setActiveSection('memory')} icon="🃏" label="Memoria" />
        <TabButton active={activeSection === 'trivia'} onClick={() => setActiveSection('trivia')} icon="⏱️" label="Trivia Rápida" />
        <TabButton active={activeSection === 'words'} onClick={() => setActiveSection('words')} icon="🔤" label="Sopa de Letras" />
        <TabButton active={activeSection === 'color'} onClick={() => setActiveSection('color')} icon="🎨" label="Colorear" />
        <TabButton active={activeSection === 'facts'} onClick={() => setActiveSection('facts')} icon="🌟" label="Datos Curiosos" />
      </div>

      {activeSection === 'games' && <GamesHub />}
      {activeSection === 'videos' && <VideosSection />}
      {activeSection === 'books' && <BooksSection />}
      {activeSection === 'quiz' && <QuizSection />}
      {activeSection === 'memory' && <MemorySection />}
      {activeSection === 'trivia' && <TriviaSection />}
      {activeSection === 'words' && <WordSearchSection />}
      {activeSection === 'color' && <ColoringSection />}
      {activeSection === 'facts' && <FactsSection funFacts={funFacts} extraFacts={extraFacts} t={t} />}
    </section>
  );
}

function QuizSection() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState([]);

  const q = allQuizQuestions[quizIndex];

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    const correct = idx === q.answer;
    if (correct) setQuizScore((s) => s + 1);
    setAnswered((prev) => [...prev, { correct }]);
  };

  const nextQuestion = () => {
    if (quizIndex < allQuizQuestions.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setShowResult(false);
    setAnswered([]);
  };

  const progress = ((quizIndex + (showResult ? 1 : 0)) / allQuizQuestions.length) * 100;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', fontWeight: 800, color: '#e91e63' }}>🧠 Quiz Ambiental</h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>{quizIndex + 1} / {allQuizQuestions.length}</span>
        </div>

        <div style={{ width: '100%', height: '6px', background: '#e0e0e0', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #e91e63, #9c27b0)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
        </div>

        {quizIndex < allQuizQuestions.length ? (
          <>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.5 }}>{q.q}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 18px', borderRadius: 'var(--radius-sm)',
                    fontWeight: 600, fontSize: '0.95rem', border: '2px solid',
                    borderColor: showResult ? (idx === q.answer ? '#4caf50' : idx === selectedAnswer ? '#f44336' : '#e0e0e0') : '#e0e0e0',
                    background: showResult ? (idx === q.answer ? '#e8f5e9' : idx === selectedAnswer ? '#ffebee' : '#fafafa') : 'white',
                    color: showResult ? (idx === q.answer ? '#2e7d32' : idx === selectedAnswer ? '#c62828' : '#9e9e9e') : 'var(--text-primary)',
                    cursor: showResult ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}>
                  <span style={{ marginRight: '10px', opacity: 0.5 }}>{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
            {showResult && (
              <div style={{ marginTop: '20px', padding: '16px', borderRadius: 'var(--radius-sm)', background: selectedAnswer === q.answer ? '#e8f5e9' : '#fff3e0', border: `1px solid ${selectedAnswer === q.answer ? '#4caf50' : '#ff9800'}` }}>
                <p style={{ fontWeight: 700, color: selectedAnswer === q.answer ? '#2e7d32' : '#e65100', marginBottom: '6px' }}>
                  {selectedAnswer === q.answer ? '✅ ¡Correcto!' : '💡 ¡Aprende algo nuevo!'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{q.explanation}</p>
                {quizIndex < allQuizQuestions.length - 1 && (
                  <button onClick={nextQuestion} style={{ marginTop: '12px', padding: '8px 22px', borderRadius: '20px', background: '#e91e63', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                    Siguiente →
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{quizScore === allQuizQuestions.length ? '🏆' : quizScore >= 8 ? '⭐' : quizScore >= 5 ? '💪' : '📚'}</div>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{quizScore} / {allQuizQuestions.length}</p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              {quizScore === allQuizQuestions.length ? '¡Perfecto! Eres un experto ambiental' :
               quizScore >= 8 ? '¡Excelente! Casi perfecto' :
               quizScore >= 5 ? '¡Buen trabajo! Sigue aprendiendo' : '¡Sigue practicando!'}
            </p>
            <button onClick={restart} style={{ marginTop: '20px', padding: '12px 28px', borderRadius: '25px', background: 'linear-gradient(135deg, #e91e63, #9c27b0)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
              🔄 Jugar de Nuevo
            </button>
          </div>
        )}
      </div>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>📊 Progreso</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Correctas</span>
            <span style={{ fontWeight: 700, color: '#4caf50' }}>{quizScore}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Incorrectas</span>
            <span style={{ fontWeight: 700, color: '#f44336' }}>{answered.filter((a) => !a.correct).length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Restantes</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{allQuizQuestions.length - quizIndex - (showResult ? 1 : 0)}</span>
          </div>
        </div>
        <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#e91e63' }}>{allQuizQuestions.length > 0 ? Math.round((quizScore / Math.max(1, answered.length)) * 100) : 0}%</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Precisión</p>
        </div>
        {answered.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {answered.map((a, i) => (
              <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: a.correct ? '#4caf50' : '#f44336' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MemorySection() {
  const [cards] = useState(() => {
    const pairs = memoryPairs.flatMap((p) => [
      { ...p, pairId: p.id, uniqueId: p.id + '_a' },
      { ...p, pairId: p.id, uniqueId: p.id + '_b' },
    ]);
    return shuffleArray(pairs);
  });
  const [flipped, setFlipped] = useState({});
  const [matched, setMatched] = useState({});
  const [firstPick, setFirstPick] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!started || won) return;
    const iv = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [started, won]);

  useEffect(() => {
    if (Object.keys(matched).length === memoryPairs.length) setWon(true);
  }, [matched]);

  const handleCardClick = (card, idx) => {
    if (flipped[idx] || matched[card.pairId] || Object.keys(flipped).length >= 2) return;
    if (!started) setStarted(true);
    const newFlipped = { ...flipped, [idx]: true };
    setFlipped(newFlipped);
    if (firstPick === null) {
      setFirstPick({ card, idx });
    } else {
      setMoves((m) => m + 1);
      if (firstPick.card.pairId === card.pairId && firstPick.idx !== idx) {
        setMatched((m) => ({ ...m, [card.pairId]: true }));
        setFlipped({});
        setFirstPick(null);
      } else {
        setTimeout(() => { setFlipped({}); setFirstPick(null); }, 800);
      }
    }
  };

  const reset = () => {
    setFlipped({}); setMatched({}); setFirstPick(null);
    setMoves(0); setTimer(0); setStarted(false); setWon(false);
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '24px', alignItems: 'start' }}>
      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', fontWeight: 800, color: '#00bcd4', marginBottom: '4px' }}>🃏 Juego de Memoria</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Encuentra todos los pares de animales</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {cards.map((card, idx) => {
            const isFlipped = flipped[idx] || matched[card.pairId];
            return (
              <button key={card.uniqueId} onClick={() => handleCardClick(card, idx)}
                style={{
                  aspectRatio: '1', borderRadius: 'var(--radius-sm)', fontSize: '1.8rem', fontWeight: 700,
                  transition: 'all 0.3s ease', border: '2px solid',
                  borderColor: isFlipped ? (matched[card.pairId] ? '#4caf50' : '#00bcd4') : '#00bcd4',
                  background: isFlipped ? (matched[card.pairId] ? '#e8f5e9' : '#e0f7fa') : 'linear-gradient(135deg, #00bcd4, #2196f3)',
                  color: isFlipped ? 'inherit' : 'white',
                  cursor: 'pointer', transform: isFlipped ? 'scale(1)' : 'scale(1)',
                }}>
                {isFlipped ? card.emoji : '?'}
              </button>
            );
          })}
        </div>

        {won && (
          <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', border: '2px solid #4caf50' }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
            <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2e7d32' }}>¡Felicidades!</p>
            <p style={{ color: '#4caf50', fontWeight: 600 }}>Completado en {formatTime(timer)} con {moves} movimientos</p>
            <button onClick={reset} style={{ marginTop: '12px', padding: '8px 22px', borderRadius: '20px', background: '#00bcd4', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>🔄 Jugar de Nuevo</button>
          </div>
        )}
      </div>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '16px' }}>📊 Estadísticas</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '12px', background: '#e0f7fa', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00bcd4' }}>{formatTime(timer)}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tiempo</p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: '#fff3e0', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff9800' }}>{moves}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Movimientos</p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: '#e8f5e9', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4caf50' }}>{Object.keys(matched).length}/{memoryPairs.length}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pares encontrados</p>
          </div>
          <button onClick={reset} style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>
            🔄 Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}

function TriviaSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFun, setShowFun] = useState(false);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const q = triviaQuestions[currentQ];

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowFun(true);
    if (idx === q.answer) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setBestStreak((b) => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (currentQ < triviaQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowFun(false);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrentQ(0); setScore(0); setSelected(null);
    setShowFun(false); setFinished(false); setStreak(0);
  };

  if (finished) {
    return (
      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '40px', border: '1px solid var(--border-color)', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{score === triviaQuestions.length ? '🏆' : score >= 4 ? '⭐' : '💪'}</div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>¡Trivia Completada!</h3>
        <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#e91e63' }}>{score} / {triviaQuestions.length} correctas</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Mejor racha: {bestStreak} 🔥</p>
        <button onClick={reset} style={{ marginTop: '20px', padding: '12px 28px', borderRadius: '25px', background: 'linear-gradient(135deg, #e91e63, #9c27b0)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '24px', alignItems: 'start' }}>
      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.3rem', fontWeight: 800, color: '#ff5722' }}>⏱️ Trivia Rápida</h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>{currentQ + 1} / {triviaQuestions.length}</span>
        </div>

        <div style={{ width: '100%', height: '6px', background: '#e0e0e0', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((currentQ + 1) / triviaQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #ff5722, #ff9800)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
        </div>

        <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.5 }}>{q.q}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={selected !== null}
              style={{
                padding: '14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, border: '2px solid',
                borderColor: selected !== null ? (idx === q.answer ? '#4caf50' : idx === selected ? '#f44336' : '#e0e0e0') : '#e0e0e0',
                background: selected !== null ? (idx === q.answer ? '#e8f5e9' : idx === selected ? '#ffebee' : 'white') : 'white',
                color: selected !== null ? (idx === q.answer ? '#2e7d32' : idx === selected ? '#c62828' : '#9e9e9e') : 'var(--text-primary)',
                cursor: selected !== null ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
              }}>
              {opt}
            </button>
          ))}
        </div>

        {showFun && (
          <div style={{ marginTop: '16px', padding: '14px', borderRadius: 'var(--radius-sm)', background: selected === q.answer ? '#e8f5e9' : '#fff3e0', border: `1px solid ${selected === q.answer ? '#4caf50' : '#ff9800'}` }}>
            <p style={{ fontWeight: 700, color: selected === q.answer ? '#2e7d32' : '#e65100', marginBottom: '4px' }}>
              {selected === q.answer ? '✅ ¡Correcto!' : '💡 ¡Dato interesante!'}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{q.fun}</p>
            <button onClick={next} style={{ marginTop: '10px', padding: '8px 20px', borderRadius: '20px', background: '#ff5722', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              Siguiente →
            </button>
          </div>
        )}
      </div>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontWeight: 700, marginBottom: '16px' }}>📊 Marcador</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ textAlign: 'center', padding: '10px', background: '#e8f5e9', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4caf50' }}>{score}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Correctas</p>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', background: '#fff3e0', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff9800' }}>{streak} 🔥</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Racha actual</p>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', background: '#fce4ec', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e91e63' }}>{bestStreak}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mejor racha</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WordSearchSection() {
  const [wordGrid] = useState(() => generateWordGrid());
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [hint, setHint] = useState(null);

  const handleCellClick = (r, c) => {
    const cellKey = `${r},${c}`;
    setSelectedCells((prev) => {
      if (prev.includes(cellKey)) return prev.filter((k) => k !== cellKey);
      const newSel = [...prev, cellKey];
      if (newSel.length >= 3) {
        for (const pw of wordGrid.placedWords) {
          if (foundWords.includes(pw.word)) continue;
          const match = pw.positions.every(([pr, pc]) => newSel.includes(`${pr},${pc}`)) && newSel.length === pw.positions.length;
          if (match) {
            setFoundWords((prev) => [...prev, pw.word]);
            return [];
          }
        }
        return [];
      }
      return newSel;
    });
  };

  const showHint = (word) => {
    const pw = wordGrid.placedWords.find((p) => p.word === word);
    if (pw && !foundWords.includes(word)) {
      setHint({ word, pos: pw.positions[0] });
      setTimeout(() => setHint(null), 2000);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', fontWeight: 800, color: '#ff9800' }}>🔤 Sopa de Letras Ambiental</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Haz clic en las letras para formar las palabras ({foundWords.length}/{wordSearchWords.length})</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: '2px', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
        {wordGrid.grid.map((row, r) =>
          row.map((cell, c) => {
            const isSelected = selectedCells.includes(`${r},${c}`);
            const isHint = hint && hint.pos[0] === r && hint.pos[1] === c;
            const isFound = foundWords.some((w) => {
              const pw = wordGrid.placedWords.find((p) => p.word === w);
              return pw && pw.positions.some(([pr, pc]) => pr === r && pc === c);
            });
            return (
              <button key={`${r}-${c}`} onClick={() => handleCellClick(r, c)}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: '4px',
                  border: '2px solid',
                  borderColor: isFound ? '#4caf50' : isHint ? '#ff9800' : isSelected ? '#9c27b0' : 'var(--border-color)',
                  background: isFound ? '#e8f5e9' : isHint ? '#fff3e0' : isSelected ? '#f3e5f5' : 'var(--bg-secondary)',
                  fontWeight: 700, fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                  color: 'var(--text-primary)', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {cell}
              </button>
            );
          })
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {wordSearchWords.map((ws) => (
          <div key={ws.word} style={{
            padding: '8px 16px', borderRadius: '20px', border: '2px solid',
            borderColor: foundWords.includes(ws.word) ? '#4caf50' : 'var(--border-color)',
            background: foundWords.includes(ws.word) ? '#e8f5e9' : 'var(--bg-secondary)',
            fontWeight: 700, fontSize: '0.85rem',
            color: foundWords.includes(ws.word) ? '#2e7d32' : 'var(--text-muted)',
            textDecoration: foundWords.includes(ws.word) ? 'line-through' : 'none',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>{ws.word}</span>
            <span style={{ fontWeight: 400, fontSize: '0.75rem', opacity: 0.7 }}>({ws.hint})</span>
            {!foundWords.includes(ws.word) && (
              <button onClick={(e) => { e.stopPropagation(); showHint(ws.word); }} style={{
                background: '#ff9800', color: 'white', border: 'none', borderRadius: '50%',
                width: '18px', height: '18px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 700,
              }}>?</button>
            )}
          </div>
        ))}
      </div>

      {foundWords.length === wordSearchWords.length && (
        <div style={{ textAlign: 'center', marginTop: '24px', padding: '24px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', border: '2px solid #4caf50' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
          <p style={{ fontWeight: 800, fontSize: '1.2rem', color: '#2e7d32' }}>¡Excelente! Encontraste todas las palabras</p>
        </div>
      )}
    </div>
  );
}

function ColoringSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#228B22');
  const [coloredElements, setColoredElements] = useState({});
  const page = colorBookPages[currentPage];

  const handleElementClick = (idx) => {
    setColoredElements((prev) => ({
      ...prev,
      [`${currentPage}-${idx}`]: selectedColor,
    }));
  };

  const resetPage = () => {
    setColoredElements((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (k.startsWith(`${currentPage}-`)) delete next[k]; });
      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px', alignItems: 'start', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', fontWeight: 800, color: '#9c27b0' }}>🎨 Zona de Colorear</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Selecciona un color y haz clic en las formas para colorearlas</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
          {colorBookPages.map((p, i) => (
            <button key={i} onClick={() => setCurrentPage(i)} style={{
              padding: '6px 16px', borderRadius: '15px', fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid', cursor: 'pointer',
              borderColor: currentPage === i ? '#9c27b0' : 'var(--border-color)',
              background: currentPage === i ? '#9c27b0' : 'var(--bg-secondary)',
              color: currentPage === i ? 'white' : 'var(--text-primary)',
            }}>{p.title}</button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '2px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
            {page.elements.map((el, idx) => {
              const color = coloredElements[`${currentPage}-${idx}`] || el.fill;
              const props = { fill: color, stroke: '#333', strokeWidth: 1.5, style: { cursor: 'pointer', transition: 'fill 0.3s ease' }, onClick: () => handleElementClick(idx) };
              if (el.type === 'rect') return <rect key={idx} x={el.x} y={el.y} width={el.w} height={el.h} {...props} />;
              if (el.type === 'circle') return <circle key={idx} cx={el.cx} cy={el.cy} r={el.r} {...props} />;
              if (el.type === 'ellipse') return <ellipse key={idx} cx={el.cx} cy={el.cy} rx={el.rx} ry={el.ry} {...props} />;
              if (el.type === 'path') return <path key={idx} d={el.d} {...props} />;
              return null;
            })}
          </svg>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button onClick={resetPage} style={{ padding: '8px 20px', borderRadius: '15px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontWeight: 700, marginBottom: '12px' }}>🎨 Colores</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {page.colors.map((color) => (
            <button key={color} onClick={() => setSelectedColor(color)}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: '8px',
                background: color, border: '3px solid',
                borderColor: selectedColor === color ? '#333' : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: selectedColor === color ? '0 0 0 2px white, 0 0 0 4px #333' : 'none',
              }} />
          ))}
        </div>
        <div style={{ marginTop: '12px', textAlign: 'center', padding: '8px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Color seleccionado</p>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: selectedColor, margin: '6px auto', border: '2px solid var(--border-color)' }} />
        </div>
      </div>
    </div>
  );
}

function FactsSection({ funFacts, extraFacts, t }) {
  const [showAll, setShowAll] = useState(false);
  const displayedFacts = showAll ? extraFacts : extraFacts.slice(0, 6);

  return (
    <>
      <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', color: '#ff5722', marginBottom: '24px' }}>
        🤩 {t('kids.fun_facts')}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {funFacts.map((fact, i) => (
          <div key={i} style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{fact.emoji}</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{t(fact.titleKey)}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(fact.descKey)}</p>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', color: '#9c27b0', marginBottom: '24px' }}>
        🧪 Datos Curiosos Extra
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {displayedFacts.map((fact, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, rgba(156,39,176,0.05), rgba(233,30,99,0.05))',
            borderRadius: 'var(--radius-md)', padding: '20px',
            border: '1px solid rgba(156,39,176,0.2)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{fact.emoji}</div>
            <h4 style={{ fontWeight: 700, color: '#9c27b0', marginBottom: '8px', fontSize: '0.95rem' }}>{fact.title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{fact.desc}</p>
          </div>
        ))}
      </div>
      {!showAll && extraFacts.length > 6 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setShowAll(true)} style={{
            padding: '10px 24px', borderRadius: '25px', background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
            color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
          }}>
            Ver más datos curiosos 🧪
          </button>
        </div>
      )}
    </>
  );
}
