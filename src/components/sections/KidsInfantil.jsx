import { useState, useEffect } from 'react';
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
  { q: '¿Cuántas toneladas de basura llegan al mar cada año?', options: ['1 millón', '8 millones', '20 millones'], answer: 1, explanation: 'Se estima que 8 millones de toneladas de plástico llegan a los océanos cada año, dañando la vida marina.' },
  { q: '¿Qué es el efecto invernadero?', options: ['Un invernadero real', 'Calentamiento del planeta', 'Un tipo de planta'], answer: 1, explanation: 'Sin él, la Tierra estaría a -18°C, pero demasiado causa calentamiento global.' },
  { q: '¿Cuántas especies de animales hay en el Amazonas?', options: ['100,000', '500,000', '1,000,000'], answer: 1, explanation: 'La Amazonía alberga más de 500,000 especies, incluyendo peces, aves, mamíferos, reptiles e insectos.' },
  { q: '¿Qué animal puede regenerar sus extremidades?', options: ['La lagartija', 'El perro', 'El gato'], answer: 0, explanation: 'Las lagartijas pueden regenerar la cola, y algunos anfibios incluso órganos enteros.' },
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
  <button onClick={onClick} className={`kids-tab-btn${active ? ' active' : ''}`}>
    <span>{icon}</span> {label}
    {badge && <span className="kids-tab-badge">{badge}</span>}
  </button>
);

const videoCategories = [
  {
    id: 'amazonia',
    title: '🌿 Amazonía y Selva',
    color: '#2e7d32',
    videos: [
      { id: 'KJXhkU8BGB4', title: 'La Amazonía: El Pulmón del Mundo', desc: 'Descubre por qué la selva amazónica es vital para todo el planeta.' },
      { id: 'qE3fB0B0mQ4', title: 'Animales de la Amazonía', desc: 'Conoce los Increíbles animales que habitan en la selva tropical.' },
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
  {
    id: 'fauna',
    title: '🦁 Animales del Mundo',
    color: '#795548',
    videos: [
      { id: 'hE7CQwFV5mM', title: 'Los 5 Felinos Más Grandes del Mundo', desc: 'Jaguares, leones, tigres, leopardos y guepardos.' },
      { id: 'TQ3nW5pFH20', title: 'Migraciones Increíbles', desc: 'Los animales que viajan miles de kilómetros cada año.' },
      { id: '9Ax7mRwXQxg', title: 'Vida Marina: Descenso a las Profundidades', desc: 'Los misterios del fondo del océano.' },
    ],
  },
  {
    id: 'energia',
    title: '⚡ Energías Limpias',
    color: '#9c27b0',
    videos: [
      { id: 'G4H1N2Xoo5o', title: 'Energía Solar para Niños', desc: 'Cómo funciona la energía del sol.' },
      { id: 'L5XMGsYbNmI', title: 'Energía Eólica: Los Molinos de Viento', desc: '¿Cómo el viento se convierte en electricidad?' },
      { id: 'nzgHp1xKmVc', title: 'Futuro Verde: Ciudades Sostenibles', desc: 'Cómo serán las ciudades del futuro.' },
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
    <div className="kids-panel">
      <div className="kids-section-header">
        <h3 className="kids-section-title" style={{ color: '#e91e63' }}>📺 Videos Educativos</h3>
        <p className="kids-section-subtitle">Aprende sobre el medio ambiente con estos videos divertidos</p>
      </div>

      <div className="kids-category-bar">
        {videoCategories.map((c) => (
          <button key={c.id} onClick={() => { setActiveCat(c.id); setPlayingId(null); }}
            className={`kids-category-btn${activeCat === c.id ? ' active' : ''}`}
            style={activeCat === c.id ? { borderColor: c.color, background: c.color } : {}}>
            {c.title}
          </button>
        ))}
      </div>

      <div className="kids-video-grid">
        {cat.videos.map((v) => (
          <div key={v.id} className="kids-video-card">
            {playingId === v.id ? (
              <div className="kids-iframe-wrapper">
                <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title={v.title} />
              </div>
            ) : (
              <div onClick={() => setPlayingId(v.id)} className="kids-video-thumb">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} />
                <div className="kids-video-play">
                  <button className="kids-video-play-btn">▶</button>
                </div>
              </div>
            )}
            <div className="kids-video-info">
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BooksSection() {
  const [activeBook, setActiveBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pageFlip, setPageFlip] = useState(null);

  const book = activeBook ? interactiveBooks.find((b) => b.id === activeBook) : null;

  const openBook = (id) => {
    setIsOpening(true);
    setActiveBook(id);
    setTimeout(() => setIsOpening(false), 800);
  };

  const closeBook = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveBook(null);
      setIsClosing(false);
      setCurrentPage(0);
      setShowQuiz(false);
      setQuizAnswers({});
      setQuizScore(0);
    }, 600);
  };

  const goToPage = (pageNum) => {
    if (pageNum === currentPage) return;
    setPageFlip(pageNum > currentPage ? 'next' : 'prev');
    setTimeout(() => {
      setCurrentPage(pageNum);
      setPageFlip(null);
    }, 300);
  };

  const nextPage = () => {
    if (currentPage < book.pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  const handleQuizAnswer = (qIdx, aIdx) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const newAnswers = { ...quizAnswers, [qIdx]: aIdx };
    setQuizAnswers(newAnswers);
    if (aIdx === book.questions[qIdx].answer) setQuizScore((s) => s + 1);
  };

  // Show bookshelf
  if (!activeBook) {
    return (
      <div className="kids-panel">
        <div className="kids-section-header">
          <h3 className="kids-section-title" style={{ color: '#2196f3' }}>📚 Biblioteca Amazónica</h3>
          <p className="kids-section-subtitle">Elige un libro y haz clic para abrirlo</p>
        </div>

        <div className="kids-bookshelf">
          <div className="kids-bookshelf-board" />
          <div className="kids-bookshelf-row">
            {interactiveBooks.map((b, i) => (
              <button
                key={b.id}
                className={`kids-book-3d ${isOpening ? 'opening' : ''}`}
                onClick={() => openBook(b.id)}
                style={{ '--book-color': b.color, '--book-delay': `${i * 0.1}s` }}
              >
                <div className="kids-book-3d-spine">
                  <span>{b.icon}</span>
                </div>
                <div className="kids-book-3d-cover">
                  <div className="kids-book-3d-cover-front">
                    <span className="kids-book-3d-icon">{b.icon}</span>
                    <span className="kids-book-3d-title">{b.title}</span>
                    <span className="kids-book-3d-pages-count">{b.pages.length} páginas</span>
                  </div>
                  <div className="kids-book-3d-cover-back" />
                </div>
                <div className="kids-book-3d-pages">
                  <div className="kids-book-3d-page" />
                  <div className="kids-book-3d-page" />
                  <div className="kids-book-3d-page" />
                </div>
                <div className="kids-book-3d-shadow" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show open book
  return (
    <div className="kids-panel">
      <div className={`kids-open-book-wrapper ${isClosing ? 'closing' : ''}`}>
        <div className="kids-open-book-header">
          <button onClick={closeBook} className="kids-book-back-btn">
            ← Volver a la Biblioteca
          </button>
          <h3 style={{ fontWeight: 700, color: book.color, fontSize: '1.1rem' }}>
            {book.icon} {book.title}
          </h3>
        </div>

        {!showQuiz ? (
          <div className="kids-open-book">
            <div className="kids-book-spread">
              <div className={`kids-book-page-left ${pageFlip === 'prev' ? 'flipping' : ''}`}>
                <div className="kids-book-page-content">
                  {currentPage > 0 ? (
                    <>
                      <div className="kids-book-page-header-real">
                        <span className="kids-book-page-emoji-real">{book.pages[currentPage - 1].img}</span>
                        <h4 className="kids-book-page-heading-real" style={{ color: book.color }}>
                          {book.pages[currentPage - 1].heading}
                        </h4>
                      </div>
                      <p className="kids-book-page-text-real">{book.pages[currentPage - 1].text}</p>
                      <div className="kids-book-page-number">{currentPage}</div>
                    </>
                  ) : (
                    <div className="kids-book-page-blank">
                      <span className="kids-book-closed-icon">{book.icon}</span>
                    </div>
                  )}
                </div>
                <div className="kids-book-page-fold" />
              </div>

              <div className="kids-book-spine-center" />

              <div className={`kids-book-page-right ${pageFlip === 'next' ? 'flipping' : ''}`}>
                <div className="kids-book-page-content">
                  <div className="kids-book-page-header-real">
                    <span className="kids-book-page-emoji-real">{book.pages[currentPage].img}</span>
                    <h4 className="kids-book-page-heading-real" style={{ color: book.color }}>
                      {book.pages[currentPage].heading}
                    </h4>
                  </div>
                  <p className="kids-book-page-text-real">{book.pages[currentPage].text}</p>
                  <div className="kids-book-page-number">{currentPage + 1}</div>
                </div>
                <div className="kids-book-page-fold left" />
              </div>
            </div>

            <div className="kids-book-nav-real">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="kids-book-nav-btn"
                style={{
                  opacity: currentPage === 0 ? 0.3 : 1,
                  color: currentPage === 0 ? '#999' : book.color,
                }}
              >
                ← Anterior
              </button>

              <div className="kids-book-dots">
                {book.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`kids-book-dot ${currentPage === i ? 'active' : ''}`}
                    style={{ background: currentPage === i ? book.color : '#ddd' }}
                  />
                ))}
              </div>

              {currentPage < book.pages.length - 1 ? (
                <button onClick={nextPage} className="kids-book-nav-btn" style={{ color: book.color }}>
                  Siguiente →
                </button>
              ) : (
                <button onClick={() => setShowQuiz(true)} className="kids-book-quiz-btn" style={{ background: book.color }}>
                  🧠 ¡Quiz!
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="kids-book-quiz-mode">
            <div className="kids-book-quiz-header">
              <span style={{ fontSize: '2.5rem' }}>🧠</span>
              <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: book.color }}>Quiz del Libro</h4>
            </div>

            <div className="kids-book-quiz-list">
              {book.questions.map((q, qIdx) => (
                <div key={qIdx} className="kids-quiz-card">
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {qIdx + 1}. {q.q}
                  </p>
                  <div className="kids-quiz-options">
                    {q.options.map((opt, aIdx) => {
                      const answered = quizAnswers[qIdx] !== undefined;
                      const isCorrect = aIdx === q.answer;
                      const isSelected = quizAnswers[qIdx] === aIdx;
                      return (
                        <button key={aIdx} onClick={() => handleQuizAnswer(qIdx, aIdx)} disabled={answered}
                          className={`kids-quiz-option-btn${answered ? (isCorrect ? ' correct' : isSelected ? ' incorrect' : '') : ''}`}
                          style={answered ? {
                            borderColor: isCorrect ? '#4caf50' : isSelected ? '#f44336' : '#e0e0e0',
                            background: isCorrect ? '#e8f5e9' : isSelected ? '#ffebee' : 'white',
                            color: isCorrect ? '#2e7d32' : isSelected ? '#c62828' : '#999',
                            cursor: 'default',
                          } : {}}>
                          {String.fromCharCode(65 + aIdx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(quizAnswers).length === book.questions.length && (
              <div className="kids-book-score-box" style={{ background: `linear-gradient(135deg, ${book.color}10, ${book.color}20)`, borderColor: `${book.color}40` }}>
                <div className="kids-book-score-icon">{quizScore === book.questions.length ? '🏆' : quizScore >= 2 ? '⭐' : '💪'}</div>
                <p className="kids-book-score-value" style={{ color: book.color }}>{quizScore} / {book.questions.length}</p>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  {quizScore === book.questions.length ? '¡Excelente! Dominaste el libro' : '¡Sigue leyendo y aprendiendo!'}
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                  <button onClick={() => { setShowQuiz(false); setQuizAnswers({}); setQuizScore(0); }}
                    className="kids-book-btn" style={{ background: book.color, color: 'white' }}>
                    📖 Leer de Nuevo
                  </button>
                  <button onClick={closeBook} className="kids-book-btn" style={{ background: '#e0e0e0', color: '#666' }}>
                    📚 Otro Libro
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KidsInfantil() {
  const t = useT();
  const [activeSection, setActiveSection] = useState('games');

  return (
    <section id="ninos" className="news-section">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon"><i className="fas fa-child" /></div>
          <h2 className="section-title">🌈 {t('kids.title')}</h2>
        </div>
      </div>

      <div className="kids-tab-bar">
        <TabButton active={activeSection === 'games'} onClick={() => setActiveSection('games')} icon="🎮" label="Juegos" />
        <TabButton active={activeSection === 'videos'} onClick={() => setActiveSection('videos')} icon="📺" label="Videos" />
        <TabButton active={activeSection === 'books'} onClick={() => setActiveSection('books')} icon="📚" label="Libros" />
        <TabButton active={activeSection === 'discover'} onClick={() => setActiveSection('discover')} icon="🌍" label="Descubre" />
        <TabButton active={activeSection === 'quiz'} onClick={() => setActiveSection('quiz')} icon="🧠" label="Quiz" badge="12" />
        <TabButton active={activeSection === 'facts'} onClick={() => setActiveSection('facts')} icon="🌟" label="Curiosidades" />
      </div>

      {activeSection === 'games' && <GamesHub />}
      {activeSection === 'videos' && <VideosSection />}
      {activeSection === 'books' && <BooksSection />}
      {activeSection === 'discover' && <DiscoverSection />}
      {activeSection === 'quiz' && <QuizSection />}
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
    <div className="kids-game-grid-2">
      <div className="kids-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="kids-section-title" style={{ color: '#e91e63', marginBottom: 0 }}>🧠 Quiz Ambiental</h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>{quizIndex + 1} / {allQuizQuestions.length}</span>
        </div>

        <div className="kids-progress-bar">
          <div className="kids-progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #e91e63, #9c27b0)' }} />
        </div>

        {quizIndex < allQuizQuestions.length ? (
          <>
            <p className="kids-question-text">{q.q}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult}
                  className={`kids-option-btn${showResult ? (idx === q.answer ? ' correct' : idx === selectedAnswer ? ' incorrect' : ' disabled') : ''}`}>
                  <span style={{ marginRight: '10px', opacity: 0.5 }}>{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`kids-result-box${selectedAnswer === q.answer ? ' correct' : ' incorrect'}`}>
                <p className="kids-result-label" style={{ color: selectedAnswer === q.answer ? '#2e7d32' : '#e65100' }}>
                  {selectedAnswer === q.answer ? '✅ ¡Correcto!' : '💡 ¡Aprende algo nuevo!'}
                </p>
                <p className="kids-result-text">{q.explanation}</p>
                {quizIndex < allQuizQuestions.length - 1 && (
                  <button onClick={nextQuestion} className="kids-next-btn">
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
            <button onClick={restart} className="kids-play-btn" style={{ marginTop: '20px' }}>
              🔄 Jugar de Nuevo
            </button>
          </div>
        )}
      </div>

      <div className="kids-stat-sidebar">
        <h4>📊 Progreso</h4>
        <div className="kids-stat-rows">
          <div className="kids-stat-row">
            <span className="kids-stat-label">Correctas</span>
            <span className="kids-stat-value" style={{ color: '#4caf50' }}>{quizScore}</span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Incorrectas</span>
            <span className="kids-stat-value" style={{ color: '#f44336' }}>{answered.filter((a) => !a.correct).length}</span>
          </div>
          <div className="kids-stat-row">
            <span className="kids-stat-label">Restantes</span>
            <span className="kids-stat-value">{allQuizQuestions.length - quizIndex - (showResult ? 1 : 0)}</span>
          </div>
        </div>
        <div className="kids-accuracy-box">
          <p className="kids-accuracy-value">{allQuizQuestions.length > 0 ? Math.round((quizScore / Math.max(1, answered.length)) * 100) : 0}%</p>
          <p className="kids-accuracy-label">Precisión</p>
        </div>
        {answered.length > 0 && (
          <div className="kids-stat-dots">
            {answered.map((a, i) => (
              <div key={i} className="kids-stat-dot" style={{ background: a.correct ? '#4caf50' : '#f44336' }} />
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
    <div className="kids-game-grid-3">
      <div className="kids-panel">
        <h3 className="kids-section-title" style={{ color: '#00bcd4', marginBottom: '4px' }}>🃏 Juego de Memoria</h3>
        <p className="kids-section-subtitle" style={{ marginBottom: '20px' }}>Encuentra todos los pares de animales</p>

        <div className="kids-memory-grid">
          {cards.map((card, idx) => {
            const isFlipped = flipped[idx] || matched[card.pairId];
            return (
              <button key={card.uniqueId} onClick={() => handleCardClick(card, idx)}
                className={`kids-memory-card${isFlipped ? (matched[card.pairId] ? ' matched' : ' flipped') : ' face-down'}`}>
                {isFlipped ? card.emoji : '?'}
              </button>
            );
          })}
        </div>

        {won && (
          <div className="kids-win-box">
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
            <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2e7d32' }}>¡Felicidades!</p>
            <p style={{ color: '#4caf50', fontWeight: 600 }}>Completado en {formatTime(timer)} con {moves} movimientos</p>
            <button onClick={reset} className="kids-next-btn" style={{ marginTop: '12px', background: '#00bcd4' }}>🔄 Jugar de Nuevo</button>
          </div>
        )}
      </div>

      <div className="kids-stat-sidebar">
        <h4>📊 Estadísticas</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kids-stat-card" style={{ background: '#e0f7fa' }}>
            <p className="kids-stat-card-value" style={{ color: '#00bcd4' }}>{formatTime(timer)}</p>
            <p className="kids-stat-card-label">Tiempo</p>
          </div>
          <div className="kids-stat-card" style={{ background: '#fff3e0' }}>
            <p className="kids-stat-card-value" style={{ color: '#ff9800' }}>{moves}</p>
            <p className="kids-stat-card-label">Movimientos</p>
          </div>
          <div className="kids-stat-card" style={{ background: '#e8f5e9' }}>
            <p className="kids-stat-card-value" style={{ color: '#4caf50' }}>{Object.keys(matched).length}/{memoryPairs.length}</p>
            <p className="kids-stat-card-label">Pares encontrados</p>
          </div>
          <button onClick={reset} className="kids-restart-btn">🔄 Reiniciar</button>
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
      <div className="kids-panel" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{score === triviaQuestions.length ? '🏆' : score >= 4 ? '⭐' : '💪'}</div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>¡Trivia Completada!</h3>
        <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#e91e63' }}>{score} / {triviaQuestions.length} correctas</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Mejor racha: {bestStreak} 🔥</p>
        <button onClick={reset} className="kids-play-btn" style={{ marginTop: '20px' }}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="kids-game-grid-2" style={{ gridTemplateColumns: '1fr 220px' }}>
      <div className="kids-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 className="kids-section-title" style={{ color: '#ff5722', marginBottom: 0 }}>⏱️ Trivia Rápida</h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>{currentQ + 1} / {triviaQuestions.length}</span>
        </div>

        <div className="kids-progress-bar">
          <div className="kids-progress-fill" style={{ width: `${((currentQ + 1) / triviaQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #ff5722, #ff9800)' }} />
        </div>

        <p className="kids-question-text">{q.q}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={selected !== null}
              className={`kids-option-btn${selected !== null ? (idx === q.answer ? ' correct' : idx === selected ? ' incorrect' : ' disabled') : ''}`}>
              {opt}
            </button>
          ))}
        </div>

        {showFun && (
          <div className={`kids-result-box${selected === q.answer ? ' correct' : ' incorrect'}`} style={{ marginTop: '16px' }}>
            <p className="kids-result-label" style={{ color: selected === q.answer ? '#2e7d32' : '#e65100', marginBottom: '4px' }}>
              {selected === q.answer ? '✅ ¡Correcto!' : '💡 ¡Dato interesante!'}
            </p>
            <p className="kids-result-text">{q.fun}</p>
            <button onClick={next} className="kids-next-btn" style={{ background: '#ff5722' }}>
              Siguiente →
            </button>
          </div>
        )}
      </div>

      <div className="kids-stat-sidebar">
        <h4 style={{ marginBottom: '16px' }}>📊 Marcador</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kids-stat-card" style={{ background: '#e8f5e9' }}>
            <p className="kids-stat-card-value" style={{ color: '#4caf50' }}>{score}</p>
            <p className="kids-stat-card-label">Correctas</p>
          </div>
          <div className="kids-stat-card" style={{ background: '#fff3e0' }}>
            <p className="kids-stat-card-value" style={{ color: '#ff9800' }}>{streak} 🔥</p>
            <p className="kids-stat-card-label">Racha actual</p>
          </div>
          <div className="kids-stat-card" style={{ background: '#fce4ec' }}>
            <p className="kids-stat-card-value" style={{ color: '#e91e63' }}>{bestStreak}</p>
            <p className="kids-stat-card-label">Mejor racha</p>
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
    <div className="kids-panel" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="kids-section-header">
        <h3 className="kids-section-title" style={{ color: '#ff9800' }}>🔤 Sopa de Letras Ambiental</h3>
        <p className="kids-section-subtitle">Haz clic en las letras para formar las palabras ({foundWords.length}/{wordSearchWords.length})</p>
      </div>

      <div className="kids-word-grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
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
                className={`kids-word-cell${isSelected ? ' selected' : ''}${isFound ? ' found' : ''}${isHint ? ' hint' : ''}`}>
                {cell}
              </button>
            );
          })
        )}
      </div>

      <div className="kids-word-tags">
        {wordSearchWords.map((ws) => (
          <div key={ws.word} className={`kids-word-tag${foundWords.includes(ws.word) ? ' found' : ''}`}>
            <span>{ws.word}</span>
            <span className="kids-word-tag-hint">({ws.hint})</span>
            {!foundWords.includes(ws.word) && (
              <button onClick={(e) => { e.stopPropagation(); showHint(ws.word); }} className="kids-hint-btn">?</button>
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
    <div className="kids-game-grid-2" style={{ gridTemplateColumns: '1fr 200px', maxWidth: '700px', margin: '0 auto' }}>
      <div className="kids-panel">
        <div className="kids-section-header">
          <h3 className="kids-section-title" style={{ color: '#9c27b0' }}>🎨 Zona de Colorear</h3>
          <p className="kids-section-subtitle">Selecciona un color y haz clic en las formas para colorearlas</p>
        </div>

        <div className="kids-category-bar">
          {colorBookPages.map((p, i) => (
            <button key={i} onClick={() => setCurrentPage(i)}
              className={`kids-category-btn${currentPage === i ? ' active' : ''}`}
              style={currentPage === i ? { borderColor: '#9c27b0', background: '#9c27b0' } : {}}>
              {p.title}
            </button>
          ))}
        </div>

        <div className="kids-coloring-canvas">
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
          <button onClick={resetPage} className="kids-restart-btn">
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="kids-stat-sidebar">
        <h4 style={{ marginBottom: '12px' }}>🎨 Colores</h4>
        <div className="kids-color-palette">
          {page.colors.map((color) => (
            <button key={color} onClick={() => setSelectedColor(color)}
              className={`kids-color-swatch${selectedColor === color ? ' selected' : ''}`}
              style={{ background: color }} />
          ))}
        </div>
        <div className="kids-color-preview">
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Color seleccionado</p>
          <div className="kids-color-preview-dot" style={{ background: selectedColor }} />
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
      <div className="kids-facts-grid-4">
        {funFacts.map((fact, i) => (
          <div key={i} className="kids-fact-card">
            <div className="kids-fact-emoji">{fact.emoji}</div>
            <h4>{t(fact.titleKey)}</h4>
            <p>{t(fact.descKey)}</p>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', color: '#9c27b0', marginBottom: '24px' }}>
        🧪 Datos Curiosos Extra
      </h3>
      <div className="kids-facts-grid-3">
        {displayedFacts.map((fact, i) => (
          <div key={i} className="kids-extra-fact-card">
            <div className="kids-fact-emoji">{fact.emoji}</div>
            <h4>{fact.title}</h4>
            <p>{fact.desc}</p>
          </div>
        ))}
      </div>
      {!showAll && extraFacts.length > 6 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setShowAll(true)} className="kids-show-more-btn">
            Ver más datos curiosos 🧪
          </button>
        </div>
      )}
    </>
  );
}

const discoverTopics = [
  {
    id: 'animales',
    title: 'Animales de la Amazonía',
    emoji: '🦜',
    color: '#4caf50',
    description: 'Conoce los animales más increíbles de la selva amazónica.',
    facts: [
      { emoji: '🐆', title: 'El Jaguar', text: 'Es el felino más grande de América. Puede nadar y cazará en el agua. Su mordida es la más fuerte de todos los felinos.', img: '🐆' },
      { emoji: '🦜', title: 'Guacamayo', text: 'Ave de colores brillantes que puede vivir hasta 80 años. Habita en las copas de los árboles de la selva.', img: '🦜' },
      { emoji: '🦥', title: 'Perezoso', text: 'Duerme hasta 20 horas al día. Se mueve tan lento que crece musgo en su pelaje. Es un excelente nadador.', img: '🦥' },
      { emoji: '🐒', title: 'Mono Araña', text: 'Salta entre árboles usando sus largos brazos. Puede saltar hasta 9 metros de distancia en un solo brinco.', img: '🐒' },
      { emoji: '🦦', title: 'Nutria Gigante', text: 'La nutria más grande del mundo. Es social y vive en grupos familiares en los ríos amazónicos.', img: '🦦' },
      { emoji: '🐢', title: 'Tortuga Charapa', text: 'Reptil que puede vivir más de 100 años. Pone sus huevos en la arena de las playas del río.', img: '🐢' },
    ],
  },
  {
    id: 'plantas',
    title: 'Plantas Increíbles',
    emoji: '🌺',
    color: '#e91e63',
    description: 'Descubre las plantas más sorprendentes de la naturaleza.',
    facts: [
      { emoji: '🌸', title: 'Victoria Regia', text: 'La water lily más grande del mundo. Sus hojas pueden medir hasta 3 metros y soportar el peso de un niño.', img: '🌸' },
      { emoji: '🌿', title: 'Cacao', text: 'El chocolate viene de esta planta. Los antiguos incas lo usaban como bebida sagrada y moneda.', img: '🍫' },
      { emoji: '🌳', title: 'Ceiba', text: 'El árbol sagrado de la Amazonía. Puede alcanzar 70 metros de altura y vivir más de 500 años.', img: '🌳' },
      { emoji: '🌺', title: 'Heliconia', text: 'Planta tropical con flores coloridas que parecen picos de loro. Atrae colibríes y mariposas.', img: '🌺' },
      { emoji: '🍃', title: 'Yagé (Ayahuasca)', text: 'Planta medicinal usada por pueblos indígenas durante miles de años para sanación y ceremonias.', img: '🍃' },
      { emoji: '🌱', title: 'Camu Camu', text: 'Fruta amazónica con más vitamina C que cualquier otra. Crece en las orillas de los ríos.', img: '🍋' },
    ],
  },
  {
    id: 'agua',
    title: 'El Mundo del Agua',
    emoji: '💧',
    color: '#2196f3',
    description: 'Aprende sobre el agua y su importancia para la vida.',
    facts: [
      { emoji: '💧', title: 'El Agua es Vida', text: 'El cuerpo humano es 60% agua. Sin agua no habría vida en la Tierra. Solo el 3% es agua dulce.', img: '💧' },
      { emoji: '🌊', title: 'El Ciclo del Agua', text: 'El agua nunca para: evaporación → nubes → lluvia → ríos → mar → evaporación. Es un ciclo infinito.', img: '🌊' },
      { emoji: '🧊', title: 'Glaciares', text: 'El 70% del agua dulce está congelada en glaciares. Si todos se derritieran, el nivel del mar subiría 60 metros.', img: '🧊' },
      { emoji: '🐟', title: 'Vida Marina', text: 'Los océanos albergan más del 80% de toda la vida en la Tierra. Hay más especies en el mar que en la tierra.', img: '🐟' },
      { emoji: '🚿', title: 'Ahorra Agua', text: 'Cerrar el grifo mientras te cepillas ahorra 20 litros al día. ¡Pequeñas acciones hacen grandes cambios!', img: '🚿' },
      { emoji: '🐠', title: 'Arrecifes de Coral', text: 'Los corales son animales vivos que forman ciudades submarinas. Sostienen el 25% de la vida marina.', img: '🐠' },
    ],
  },
  {
    id: 'planeta',
    title: 'Cuidemos el Planeta',
    emoji: '🌍',
    color: '#ff9800',
    description: 'Descubre cómo proteger nuestro planeta Tierra.',
    facts: [
      { emoji: '♻️', title: 'Reciclar es Genial', text: 'Reciclar una lata de aluminio ahorra energía suficiente para encender una TV por 3 horas.', img: '♻️' },
      { emoji: '🌳', title: 'Plantar Árboles', text: 'Un árbol absorbe 22 kg de CO₂ al año y produce oxígeno para 2 personas. ¡Plantar árboles salva vidas!', img: '🌳' },
      { emoji: '🛍️', title: 'Bolsas de Tela', text: 'Una bolsa de plástico se usa solo 15 minutos pero tarda 500 años en desaparecer. Usa bolsas reutilizables.', img: '👜' },
      { emoji: '💡', title: 'Energía Limpia', text: 'El sol produce suficiente energía en 1 hora para abastecer al mundo entero por un año.', img: '☀️' },
      { emoji: '🐘', title: 'Proteger Animales', text: 'Muchos animales están en peligro por la deforestación. Cada especie que desaparece es una pérdida irreparable.', img: '🐘' },
      { emoji: '🌱', title: 'Compostaje', text: 'Los restos de comida se convierten en abono para las plantas. Es como devolver la comida a la naturaleza.', img: '🌱' },
    ],
  },
]

function DiscoverSection() {
  const [activeTopic, setActiveTopic] = useState('animales')
  const topic = discoverTopics.find((t) => t.id === activeTopic)

  return (
    <div className="kids-panel">
      <div className="kids-section-header">
        <h3 className="kids-section-title" style={{ color: '#4caf50' }}>🌍 Descubre el Mundo Natural</h3>
        <p className="kids-section-subtitle">Explora la naturaleza y aprende cosas increíbles</p>
      </div>

      <div className="kids-category-bar">
        {discoverTopics.map((t) => (
          <button key={t.id} onClick={() => setActiveTopic(t.id)}
            className={`kids-category-btn${activeTopic === t.id ? ' active' : ''}`}
            style={activeTopic === t.id ? { borderColor: t.color, background: t.color } : {}}>
            {t.emoji} {t.title}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '3rem' }}>{topic.emoji}</span>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>{topic.description}</p>
      </div>

      <div className="kids-discover-grid">
        {topic.facts.map((fact, i) => (
          <motion.div
            key={i}
            className="kids-discover-card"
            style={{ borderColor: `${topic.color}30` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="kids-discover-card-emoji" style={{ background: `${topic.color}15` }}>
              {fact.emoji}
            </div>
            <h4 className="kids-discover-card-title" style={{ color: topic.color }}>{fact.title}</h4>
            <p className="kids-discover-card-text">{fact.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
