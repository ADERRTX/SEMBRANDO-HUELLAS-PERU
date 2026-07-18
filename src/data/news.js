// Base de datos inicial para EcoAcción Global
// Categorías: 'ecologico', 'medioambiente', 'conservacion', 'liderazgo'

export const initialNews = [
  {
    id: 1,
    category: 'liderazgo',
    title: 'Líderes Mundiales Firman Tratado Histórico para Proteger el 30% de los Océanos',
    titleEn: 'Global Leaders Sign Historic Treaty to Protect 30% of Oceans',
    summary: 'La ONU adopta un marco vinculante para la conservación de la biodiversidad en aguas internacionales para el año 2030.',
    summaryEn: 'The UN adopts a binding framework for biodiversity conservation in international waters by 2030.',
    content: `En una cumbre histórica en Nueva York, delegados de más de 190 países firmaron el Tratado Global de los Océanos bajo el auspicio de la ONU. Este acuerdo establece un marco legal y vinculante para declarar áreas marítimas protegidas en alta mar, una vasta zona que cubre casi la mitad de la superficie terrestre pero que hasta ahora carecía de una gobernanza ambiental sólida.

La meta principal, conocida como "30x30", busca proteger al menos el 30% de las aguas internacionales y las tierras del planeta para finales de esta década. Activistas y líderes de opinión como Greta Thunberg y Txai Suruí celebraron el acuerdo como una victoria definitiva para el multilateralismo ecológico.

"Es el logro de conservación marina más importante de nuestra generación", declaró la presidenta de la cumbre. El tratado no solo limitará la pesca industrial descontrolada y la minería en aguas profundas, sino que implementará estudios de impacto ambiental estrictos para cualquier actividad económica en aguas internacionales.`,
    contentEn: `In a historic summit in New York, delegates from over 190 countries signed the Global Ocean Treaty under UN auspices. This agreement establishes a binding legal framework to declare marine protected areas in the high seas, a vast zone covering nearly half of the Earth's surface that previously lacked robust environmental governance.

The main target, known as "30x30", aims to protect at least 30% of international waters and land by the end of this decade. Activists and opinion leaders like Greta Thunberg and Txai Suruí celebrated the agreement as a definitive victory for ecological multilateralism.

"It is the most important marine conservation achievement of our generation," declared the summit president. The treaty will limit uncontrolled industrial fishing and deep-sea mining, and mandate strict environmental impact studies for any economic activity in international waters.`,
    author: 'Elena Rostova',
    date: '2026-07-18',
    location: 'Nueva York, EE.UU.',
    coordinates: [40.7128, -74.0060],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    views: 12450,
    likes: 852
  },
  {
    id: 2,
    category: 'conservacion',
    title: 'Iniciativa Indígena Logra Reforestar 500,000 Hectáreas en la Amazonía Peruana',
    titleEn: 'Indigenous Initiative Successfully Reforests 500,000 Hectares in Peruvian Amazon',
    summary: 'Comunidades Shipibo-Konibo y Asháninka combinan sabiduría ancestral y tecnología de drones para restaurar bosques nativos.',
    summaryEn: 'Shipibo-Konibo and Asháninka communities combine ancestral wisdom and drone technology to restore native forests.',
    content: `En la región de Ucayali, Perú, una alianza sin precedentes liderada por federaciones indígenas ha logrado una hazaña ecológica sin igual: la reforestación y restauración de medio millón de hectáreas de bosque tropical degradado por la tala ilegal y la agricultura migratoria.

El proyecto, denominado "Sankori" (fuerza de la tierra), combina el conocimiento milenario sobre semillas nativas y ecología forestal de los ancianos comunales con herramientas modernas de mapeo satelital y drones de dispersión de semillas. Utilizando cápsulas biodegradables de arcilla y nutrientes (técnica Nendo Dango enriquecida), se han sembrado millones de árboles de especies endémicas como caoba, cedro y tornillo en áreas de difícil acceso.

"El bosque no es solo madera; es nuestra farmacia, nuestro hogar y el pulmón del mundo", explicó un líder Asháninka. El éxito del proyecto ha atraído financiamiento internacional del Fondo Verde para el Clima y se ha convertido en el modelo de referencia mundial para la reforestación comunitaria guiada por pueblos originarios.`,
    contentEn: `In the Ucayali region of Peru, an unprecedented alliance led by indigenous federations has achieved a massive ecological feat: the reforestation and restoration of half a million hectares of rainforest degraded by illegal logging and migratory agriculture.

The project, named "Sankori" (strength of the earth), combines the ancient knowledge of native seeds and forest ecology from community elders with modern satellite mapping and seed-dispersing drones. Using biodegradable clay and nutrient capsules (an enriched Nendo Dango technique), millions of native species like mahogany, cedar, and tornillo have been planted in hard-to-reach areas.

"The forest is not just wood; it is our pharmacy, our home, and the lungs of the world," explained an Asháninka leader. The project's success has attracted international funding from the Green Climate Fund and is now a global reference model for indigenous-led community reforestation.`,
    author: 'Adriano Espinoza',
    date: '2026-07-17',
    location: 'Ucayali, Perú',
    coordinates: [-8.3791, -74.5539],
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    views: 9810,
    likes: 745
  },
  {
    id: 3,
    category: 'ecologico',
    title: 'Científicos Reportan Sorprendente Adaptación Térmica en la Gran Barrera de Coral',
    titleEn: 'Scientists Report Surprising Thermal Adaptation in the Great Barrier Reef',
    summary: 'Descubren corales en el norte de Australia que desarrollan mayor tolerancia al blanqueamiento por olas de calor marinas.',
    summaryEn: 'Corals in northern Australia discovered to develop higher tolerance to bleaching caused by marine heatwaves.',
    content: `Un equipo internacional de biólogos marinos ha publicado un estudio esperanzador en la revista Nature. Tras monitorear las secciones más cálidas del norte de la Gran Barrera de Coral en Australia, descubrieron que varias especies de coral duro han comenzado a asociarse con algas simbióticas (zooxantelas) mucho más resistentes al estrés térmico.

Esta adaptación evolutiva acelerada ocurre en respuesta a los eventos de blanqueamiento masivo sufridos en los últimos años debido al calentamiento global. Si bien los corales siguen bajo una amenaza crítica, este "escudo térmico" natural brinda una valiosa ventana de tiempo para implementar medidas drásticas de reducción de emisiones globales.

"La naturaleza está luchando por adaptarse", comentó el Dr. Mark Harrison, líder del estudio. La investigación subraya la necesidad de acelerar los proyectos de santuarios marinos y técnicas de siembra asistida de coral (micro-fragmentación) desarrolladas en laboratorios australianos para asegurar la supervivencia de estos megadiversos biomas.`,
    contentEn: `An international team of marine biologists has published a hopeful study in Nature. After monitoring the warmest northern sections of the Great Barrier Reef in Australia, they discovered that several hard coral species have begun hosting symbiotic algae (zooxanthellae) that are significantly more resilient to thermal stress.

This accelerated evolutionary adaptation is occurring in response to massive bleaching events suffered in recent years due to global warming. While corals remain under critical threat, this natural "thermal shield" provides a valuable window of time to implement drastic global emission reductions.

"Nature is fighting to adapt," said Dr. Mark Harrison, lead study author. The research highlights the need to speed up marine sanctuary projects and assisted coral planting techniques (micro-fragmentation) developed in Australian laboratories to secure the survival of these megadiverse biomes.`,
    author: 'Sarah Jenkins',
    date: '2026-07-16',
    location: 'Gran Barrera de Coral, Australia',
    coordinates: [-18.2871, 147.6992],
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
    views: 15420,
    likes: 912
  },
  {
    id: 4,
    category: 'medioambiente',
    title: 'La Unión Europea Acelera la Red de Carga Solar para Autos Eléctricos',
    titleEn: 'European Union Accelerates Solar Charging Network for Electric Vehicles',
    summary: 'Bruselas financia un megaproyecto de autopistas equipadas con paneles solares capaces de cargar camiones en movimiento.',
    summaryEn: 'Brussels funds a mega-project of highways equipped with solar panels capable of charging moving trucks.',
    content: `La Comisión Europea ha anunciado un paquete de financiación especial para expandir las "Autopistas Solares Inteligentes" en los corredores de carga clave de Alemania, Francia y Bélgica. El proyecto integra tecnología de inducción dinámica en la carpeta asfáltica, permitiendo que vehículos pesados y turismos eléctricos recarguen sus baterías de forma inalámbrica mientras transitan.

Toda la energía consumida provendrá de barreras acústicas y techados solares instalados a lo largo de las autopistas. Esta medida apoya la legislación europea que prohibirá la comercialización de coches de gasolina y diésel para el año 2035.

Con este proyecto, la UE planea recortar las emisiones de gases de efecto invernadero del sector transporte en un 60% para 2030, demostrando un liderazgo técnico sin precedentes en la transición hacia la movilidad sostenible.`,
    contentEn: `The European Commission has announced a special funding package to expand "Smart Solar Highways" along key freight corridors in Germany, France, and Belgium. The project integrates dynamic induction technology into the asphalt, allowing heavy trucks and electric passenger cars to recharge wirelessly while driving.

All energy consumed will come from acoustic barriers and solar roofs installed along the highways. This measure supports the European legislation banning the commercialization of petrol and diesel cars by 2035.

With this project, the EU plans to cut transport greenhouse gas emissions by 60% by 2030, showing unprecedented technical leadership in the transition to sustainable mobility.`,
    author: 'Jean-Luc Dubois',
    date: '2026-07-15',
    location: 'Bruselas, Bélgica',
    coordinates: [50.8503, 4.3517],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    views: 8900,
    likes: 540
  },
  {
    id: 5,
    category: 'liderazgo',
    title: 'Boyan Slat y "The Ocean Cleanup" Despliegan el Sistema 03 en el Gran Parche de Basura del Pacífico',
    titleEn: 'Boyan Slat and "The Ocean Cleanup" Deploy System 03 in the Great Pacific Garbage Patch',
    summary: 'La nueva barrera de extracción de plástico de 2.2 kilómetros triplica la eficiencia de recolección sin dañar la fauna marina.',
    summaryEn: 'The new 2.2-kilometer plastic extraction barrier triples collection efficiency without harming marine life.',
    content: `El joven inventor e ingeniero ambiental Boyan Slat anunció el exitoso despliegue del Sistema 03 de "The Ocean Cleanup" en la gigantesca acumulación de plásticos del Océano Pacífico. El sistema es una barrera flotante de 2.2 kilómetros de longitud que actúa como una costa artificial, concentrando los residuos plásticos arrastrados por las corrientes.

El Sistema 03 incorpora tecnologías mejoradas para evitar la captura accidental de vida marina, incluyendo salidas de escape activas y cámaras con inteligencia artificial que monitorean el comportamiento de peces y tortugas en tiempo real. 

"Nuestra meta es limpiar el 90% del plástico flotante para 2040. Con el Sistema 03, estamos un paso gigante más cerca de lograrlo", afirmó Slat. Los residuos plásticos recuperados son transportados a puertos seguros para ser reciclados y transformados en productos duraderos, financiando parcialmente la operación continua.`,
    contentEn: `Young inventor and environmental engineer Boyan Slat announced the successful deployment of "The Ocean Cleanup" System 03 in the massive Great Pacific Garbage Patch. The system is a 2.2-kilometer floating barrier acting as an artificial coastline, concentrating plastic waste driven by currents.

System 03 incorporates improved technologies to prevent accidental marine life capture, including active escape routes and AI cameras monitoring fish and turtle behavior in real-time.

"Our goal is to clean up 90% of floating ocean plastic by 2040. With System 03, we are one giant step closer," said Slat. The recovered plastic waste is transported to ports for recycling into durable products, partially funding the continuous operation.`,
    author: 'Klaas van der Meer',
    date: '2026-07-14',
    location: 'Pacífico Norte',
    coordinates: [35.0000, -140.0000],
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1200&q=80',
    views: 18700,
    likes: 1250
  },
  {
    id: 6,
    category: 'conservacion',
    title: 'El Retorno del Tigre de Bengala: Histórico Incremento de Población en Reservas de India y Nepal',
    titleEn: 'The Return of the Bengal Tiger: Historic Population Increase in India and Nepal Reserves',
    summary: 'Esfuerzos conjuntos de patrullaje comunitario y restauración de corredores ecológicos salvan al felino de la extinción.',
    summaryEn: 'Joint efforts of community patrols and ecological corridor restoration rescue the feline from extinction.',
    content: `El censo transfronterizo de vida silvestre coordinado por India, Nepal y el Fondo Mundial para la Naturaleza (WWF) reveló datos espectaculares: la población silvestre del Tigre de Bengala ha registrado un incremento del 40% en los últimos cinco años, alcanzando cifras récord no vistas en medio siglo.

Este renacimiento ecológico se debe al establecimiento de "Corredores Bioculturales" que permiten a los felinos transitar libremente entre reservas nacionales sin entrar en conflicto con asentamientos humanos. Comunidades locales desempeñan un papel central al operar patrullas anti-caza furtiva y recibir compensaciones por la conservación de bosques adyacentes.

"Este triunfo demuestra que cuando el desarrollo humano se planifica integrando la vida silvestre, la naturaleza se recupera de manera asombrosa", declaró el portavoz regional de la WWF.`,
    contentEn: `A cross-border wildlife census coordinated by India, Nepal, and the World Wide Fund for Nature (WWF) revealed spectacular data: the wild Bengal Tiger population registered a 40% increase over the last five years, reaching record numbers unseen in half a century.

This ecological rebirth is due to "Biocultural Corridors" allowing felines to roam freely between national reserves without conflicting with human settlements. Local communities play a central role by running anti-poaching patrols and receiving compensation for conserving adjacent forests.

"This triumph shows that when human development is planned with wildlife integration, nature recovers astonishingly," declared the WWF regional spokesperson.`,
    author: 'Rajesh Sharma',
    date: '2026-07-13',
    location: 'Sundarbans, India',
    coordinates: [21.9497, 89.1833],
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=1200&q=80',
    views: 11200,
    likes: 689
  },
  {
    id: 7,
    category: 'ecologico',
    title: 'Científicos del Ártico Descubren Bacterias que Degradan Plásticos en Temperaturas Extremas',
    titleEn: 'Arctic Scientists Discover Plastic-Degrading Bacteria in Extreme Temperatures',
    summary: 'Microorganismos nativos de Svalbard abren la puerta al reciclaje de baja energía sin necesidad de calor industrial.',
    summaryEn: 'Svalbard native microorganisms open the door to low-energy recycling without industrial heat.',
    content: `Durante una expedición científica en el archipiélago de Svalbard, Noruega, microbiólogos descubrieron cepas bacterianas adaptadas al frío capaces de digerir plásticos del tipo poliuretano y polietileno a temperaturas de tan solo 15 °C. 

A diferencia de las bacterias degradadoras de plástico descubiertas anteriormente, que requieren temperaturas superiores a los 30 °C para activarse (lo que implica un elevado consumo energético), estos microbios árticos funcionan de manera óptima en climas fríos. 

Este descubrimiento biotecnológico promete revolucionar el tratamiento de residuos y los procesos de biorremediación en vertederos de todo el mundo, ofreciendo una ruta limpia y de baja emisión para combatir la plaga mundial del plástico.`,
    contentEn: `During a scientific expedition in the Svalbard archipelago, Norway, microbiologists discovered cold-adapted bacterial strains capable of digesting polyurethane and polyethylene plastics at temperatures as low as 15°C.

Unlike previously discovered plastic-degrading bacteria that require temperatures above 30°C to activate (implying high energy consumption), these Arctic microbes function optimally in cold climates.

This biotechnological discovery promises to revolutionize waste treatment and bioremediation processes in landfills worldwide, offering a clean, low-emission route to fight the global plastic plague.`,
    author: 'Astrid Lindgren',
    date: '2026-07-12',
    location: 'Svalbard, Noruega',
    coordinates: [78.9273, 11.9416],
    image: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=1200&q=80',
    views: 14300,
    likes: 802
  },
  {
    id: 8,
    category: 'medioambiente',
    title: 'Costa Rica Establece Hito Mundial con 300 Días de Electricidad 100% Renovable',
    titleEn: 'Costa Rica Sets Global Milestone with 300 Days of 100% Renewable Electricity',
    summary: 'El país centroamericano prescinde de combustibles fósiles gracias a un sistema integrado de agua, viento, sol y calor terrestre.',
    summaryEn: 'The Central American country dispenses with fossil fuels thanks to an integrated system of water, wind, sun, and geothermal heat.',
    content: `Costa Rica ha vuelto a dar cátedra ambiental al mundo al registrar 300 días consecutivos alimentando todo su territorio exclusivamente con fuentes de energía limpias y renovables. La matriz eléctrica del país se basó principalmente en energía hidroeléctrica, complementada por generación geotérmica de sus volcanes, parques eólicos y campos solares.

El Instituto Costarricense de Electricidad destacó que este logro demuestra que la descarbonización total del sector eléctrico no solo es viable, sino económicamente estable y beneficiosa a largo plazo. 

"Es un mensaje de esperanza y liderazgo para todo el planeta", comentó el ministro de Energía. El país avanza ahora en la descarbonización de su parque automotor público y de carga pesada.`,
    contentEn: `Costa Rica has once again delivered an environmental lesson to the world by recording 300 consecutive days powering its entire territory exclusively with clean, renewable energy sources. The country's power grid relied mainly on hydroelectric power, complemented by geothermal generation from its volcanoes, wind farms, and solar arrays.

The Costa Rican Institute of Electricity highlighted that this achievement proves that the total decarbonization of the electricity sector is not only viable but economically stable and beneficial in the long term.

"It is a message of hope and leadership for the entire planet," commented the Minister of Energy. The country is now moving forward with decarbonizing its public and heavy transport fleets.`,
    author: 'Mateo Alvarado',
    date: '2026-07-11',
    location: 'San José, Costa Rica',
    coordinates: [9.9281, -84.0907],
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1200&q=80',
    views: 16500,
    likes: 1105
  }
];

export const ecoLeaders = [
  {
    id: 'greta',
    name: 'Greta Thunberg',
    role: 'Activista Climática y Fundadora de Fridays for Future',
    roleEn: 'Climate Activist & Founder of Fridays for Future',
    bio: 'Inició una huelga escolar solitaria en Suecia en 2018 que se convirtió en un movimiento de millones de jóvenes a nivel mundial exigiendo acciones científicas y legales urgentes a los líderes globales frente al cambio climático.',
    bioEn: 'Started a solitary school strike in Sweden in 2018 that grew into a movement of millions of youth worldwide demanding urgent scientific and legal climate action from global leaders.',
    country: 'Suecia',
    keyAchievement: 'Movilización masiva de jóvenes y confrontación directa con líderes de la ONU y foros económicos.',
    keyAchievementEn: 'Mass mobilization of youth and direct confrontation with leaders at the UN and economic forums.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'boyan',
    name: 'Boyan Slat',
    role: 'Fundador y Director de The Ocean Cleanup',
    roleEn: 'Founder & CEO of The Ocean Cleanup',
    bio: 'Emprendedor e inventor holandés que a los 18 años diseñó un sistema pasivo de recolección de plástico marino aprovechando las corrientes oceánicas. Lidera el mayor esfuerzo técnico de limpieza de plásticos en ríos y océanos.',
    bioEn: 'Dutch entrepreneur and inventor who at 18 designed a passive marine plastic collection system using ocean currents. He leads the largest technical effort to clean plastics from rivers and oceans.',
    country: 'Países Bajos',
    keyAchievement: 'Despliegue de barreras avanzadas de extracción plástica y limpieza de ríos críticos en el mundo.',
    keyAchievementEn: 'Deployment of advanced plastic extraction barriers and clean-up of critical rivers globally.',
    image: 'https://images.unsplash.com/photo-1484821547838-fc522518fc51?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'vandana',
    name: 'Dra. Vandana Shiva',
    role: 'Científica, Ecofeminista y Defensora de la Soberanía Alimentaria',
    roleEn: 'Scientist, Ecofeminist & Food Sovereignty Advocate',
    bio: 'Física y escritora india que fundó Navdanya, un movimiento para proteger la diversidad biológica y de semillas nativas. Es una de las voces líderes mundiales en la lucha contra la agricultura química y la biopiratería.',
    bioEn: 'Indian physicist and author who founded Navdanya, a movement to protect biological diversity and native seeds. She is a leading global voice against chemical agriculture and biopiracy.',
    country: 'India',
    keyAchievement: 'Conservación de más de 120 bancos de semillas comunitarios y empoderamiento de agricultoras tradicionales.',
    keyAchievementEn: 'Conservation of over 120 community seed banks and empowerment of traditional women farmers.',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'txai',
    name: 'Txai Suruí',
    role: 'Líder Indígena, Comunicadora y Activista Amazónica',
    roleEn: 'Indigenous Leader, Communicator & Amazon Activist',
    bio: 'Joven líder del pueblo Paiter Suruí de la Amazonía. Conmocionó al mundo en la COP26 con su discurso de apertura exigiendo que los pueblos originarios lideren la protección de sus territorios frente a la deforestación.',
    bioEn: 'Young leader of the Paiter Suruí people of the Amazon. She shocked the world at COP26 with her opening speech demanding that indigenous peoples lead the protection of their territories against deforestation.',
    country: 'Brasil',
    keyAchievement: 'Fusión de la defensa de los derechos territoriales indígenas y la justicia climática global en foros internacionales.',
    keyAchievementEn: 'Merging indigenous land rights defense with global climate justice in international forums.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=300&q=80'
  }
];

export const initialPoll = {
  question: '¿Deberían prohibirse totalmente los plásticos de un solo uso a nivel global para el año 2028?',
  questionEn: 'Should single-use plastics be completely banned globally by 2028?',
  options: [
    { id: 'si_inmediato', text: 'Sí, es urgente y la industria debe adaptarse de inmediato', textEn: 'Yes, it is urgent and the industry must adapt immediately', votes: 1420 },
    { id: 'si_gradual', text: 'Sí, de manera gradual para permitir alternativas viables', textEn: 'Yes, gradually to allow viable alternatives', votes: 948 },
    { id: 'no_regulacion', text: 'No, es mejor regular el reciclaje e incentivar la biodegradabilidad', textEn: 'No, it is better to regulate recycling and incentivize biodegradability', votes: 412 },
    { id: 'no_necesario', text: 'No, causaría un impacto económico excesivo en pymes', textEn: 'No, it would cause excessive economic impact on small businesses', votes: 115 }
  ]
};

export const globalStats = [
  {
    id: 'plastic',
    title: 'Plástico Retirado de Océanos (Ton)',
    titleEn: 'Plastic Removed from Oceans (Tons)',
    value: 12450,
    prefix: '',
    suffix: ' t',
    rate: 0.15, // Aumento de toneladas por segundo en la simulación
    decimals: 2,
    color: 'text-blue-500'
  },
  {
    id: 'co2',
    title: 'Concentración de CO2 en la Atmósfera',
    titleEn: 'Atmospheric CO2 Concentration',
    value: 423.85,
    prefix: '',
    suffix: ' ppm',
    rate: 0.0000001,
    decimals: 6,
    color: 'text-rose-500'
  },
  {
    id: 'trees',
    title: 'Árboles Sembrados en el Mundo (2026)',
    titleEn: 'Trees Planted Globally (2026)',
    value: 4562890,
    prefix: '',
    suffix: '',
    rate: 3.2, // Árboles por segundo
    decimals: 0,
    color: 'text-emerald-500'
  },
  {
    id: 'energy',
    title: 'Matriz Eléctrica Mundial Renovable',
    titleEn: 'Global Renewable Electricity Share',
    value: 38.64,
    prefix: '',
    suffix: '%',
    rate: 0.00001,
    decimals: 4,
    color: 'text-yellow-500'
  }
];
