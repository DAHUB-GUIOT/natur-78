import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Leaf, Bird, Fish, Bug, TreePine, Mountain, Waves, Sun } from 'lucide-react';

interface BiodiversityItem {
  id: string;
  title: string;
  description: string;
  species: string;
  habitat: string;
  conservation: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered';
  image: string;
  icon: React.ComponentType<any>;
  color: string;
  facts: string[];
}

const biodiversityData: BiodiversityItem[] = [
  {
    id: 'jaguar',
    title: 'Jaguar',
    description: 'El felino más grande de América, símbolo de la biodiversidad amazónica',
    species: 'Panthera onca',
    habitat: 'Selva Tropical',
    conservation: 'Near Threatened',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#f59e0b',
    facts: [
      'Tienen la mordida más poderosa de todos los felinos',
      'Son excelentes nadadores',
      'Cada jaguar tiene un patrón único de manchas'
    ]
  },
  {
    id: 'quetzal',
    title: 'Quetzal Resplandeciente',
    description: 'Ave sagrada de las culturas precolombinas, habitante de los bosques nublados',
    species: 'Pharomachrus mocinno',
    habitat: 'Bosque Nublado',
    conservation: 'Near Threatened',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bird,
    color: '#10b981',
    facts: [
      'Los machos tienen colas que pueden medir hasta 65 cm',
      'Se alimentan principalmente de aguacates silvestres',
      'Símbolo nacional de Guatemala'
    ]
  },
  {
    id: 'frailejones',
    title: 'Frailejones',
    description: 'Plantas endémicas de los páramos andinos, guardianes del agua',
    species: 'Espeletia spp.',
    habitat: 'Páramo',
    conservation: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: TreePine,
    color: '#8b5cf6',
    facts: [
      'Pueden vivir más de 100 años',
      'Sus hojas peludas capturan agua de las nubes',
      'Regulan el ciclo hídrico de las montañas'
    ]
  },
  {
    id: 'delfin-rosado',
    title: 'Delfín Rosado',
    description: 'Mamífero acuático único del Amazonas, navegante de ríos sagrados',
    species: 'Inia geoffrensis',
    habitat: 'Ríos Amazónicos',
    conservation: 'Endangered',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Fish,
    color: '#ec4899',
    facts: [
      'Su color rosado se intensifica con la edad',
      'Tienen el cerebro más grande entre los delfines',
      'Pueden girar su cabeza 90 grados'
    ]
  },
  {
    id: 'mariposa-morpho',
    title: 'Mariposa Morpho',
    description: 'Joya voladora de la selva, con alas que reflejan el cielo tropical',
    species: 'Morpho peleides',
    habitat: 'Selva Tropical',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bug,
    color: '#3b82f6',
    facts: [
      'Sus alas pueden medir hasta 20 cm de envergadura',
      'El azul proviene de la estructura microscópica, no de pigmentos',
      'Pueden vivir hasta 137 días'
    ]
  },
  {
    id: 'condor-andino',
    title: 'Cóndor Andino',
    description: 'Ave nacional de Colombia, planea majestuosamente por los Andes',
    species: 'Vultur gryphus',
    habitat: 'Montañas Andinas',
    conservation: 'Near Threatened',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bird,
    color: '#374151',
    facts: [
      'Puede volar hasta 300 km sin batir las alas',
      'Vive hasta 100 años en cautiverio',
      'Es símbolo de libertad en los Andes'
    ]
  },
  {
    id: 'oso-andino',
    title: 'Oso Andino',
    description: 'Único oso sudamericano, guardián de los bosques de niebla',
    species: 'Tremarctos ornatus',
    habitat: 'Bosque Andino',
    conservation: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#92400e',
    facts: [
      'Construye nidos en los árboles para dormir',
      'Dispersa semillas ayudando a regenerar bosques',
      'Puede trepar árboles de más de 30 metros'
    ]
  },
  {
    id: 'gallito-de-roca',
    title: 'Gallito de Roca',
    description: 'Ave nacional del Perú, también presente en Colombia',
    species: 'Rupicola peruvianus',
    habitat: 'Selva Nublada',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bird,
    color: '#dc2626',
    facts: [
      'Los machos tienen una cresta semicircular distintiva',
      'Realizan danzas elaboradas para cortejar',
      'Construyen nidos en acantilados rocosos'
    ]
  },
  {
    id: 'tapir-amazonico',
    title: 'Tapir Amazónico',
    description: 'Mamífero herbívoro, jardinero de la selva amazónica',
    species: 'Tapirus terrestris',
    habitat: 'Selva Amazónica',
    conservation: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#6b7280',
    facts: [
      'Puede pesar hasta 320 kg',
      'Su trompa flexible les ayuda a alimentarse',
      'Son excelentes nadadores y buceadores'
    ]
  },
  {
    id: 'guacamaya-azul',
    title: 'Guacamaya Azul y Amarilla',
    description: 'Loro gigante de colores vibrantes, embajador de la Amazonía',
    species: 'Ara ararauna',
    habitat: 'Selva Tropical',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bird,
    color: '#2563eb',
    facts: [
      'Pueden vivir más de 80 años',
      'Su pico puede romper nueces muy duras',
      'Forman parejas de por vida'
    ]
  },
  {
    id: 'perezoso-tridactilo',
    title: 'Perezoso Tridáctilo',
    description: 'Mamífero de movimientos lentos, símbolo de tranquilidad',
    species: 'Bradypus variegatus',
    habitat: 'Selva Tropical',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: TreePine,
    color: '#059669',
    facts: [
      'Solo bajan del árbol una vez por semana',
      'Pueden girar su cabeza 270 grados',
      'Las algas crecen en su pelaje dándole camuflaje'
    ]
  },
  {
    id: 'mono-aullador',
    title: 'Mono Aullador Rojo',
    description: 'Primate de voz potente, despertador natural de la selva',
    species: 'Alouatta seniculus',
    habitat: 'Selva Tropical',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#dc2626',
    facts: [
      'Su grito se escucha a 5 km de distancia',
      'Pasan 80% del tiempo descansando',
      'Su cola prensil actúa como quinta extremidad'
    ]
  },
  {
    id: 'cocodrilo-orinoco',
    title: 'Cocodrilo del Orinoco',
    description: 'Reptil gigante, depredador apex de los llanos orientales',
    species: 'Crocodylus intermedius',
    habitat: 'Ríos y Llanos',
    conservation: 'Critically Endangered',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Waves,
    color: '#065f46',
    facts: [
      'Puede medir hasta 7 metros de longitud',
      'Es el cocodrilo más grande de Sudamérica',
      'Las hembras cuidan sus crías por 2 años'
    ]
  },
  {
    id: 'rana-dorada',
    title: 'Rana Dorada Venenosa',
    description: 'Anfibio pequeño pero letal, joya tóxica de la selva',
    species: 'Phyllobates aurotaenia',
    habitat: 'Selva Húmeda',
    conservation: 'Endangered',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Leaf,
    color: '#f59e0b',
    facts: [
      'Su veneno era usado por indígenas en flechas',
      'Una sola rana tiene veneno para 10 personas',
      'Solo mide 5 cm pero es extremadamente peligrosa'
    ]
  },
  {
    id: 'iguana-verde',
    title: 'Iguana Verde',
    description: 'Reptil herbívoro, dragón moderno de las costas tropicales',
    species: 'Iguana iguana',
    habitat: 'Bosque Seco Tropical',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Sun,
    color: '#16a34a',
    facts: [
      'Pueden medir hasta 2 metros de longitud',
      'Son excelentes nadadores',
      'Pueden quedarse inmóviles por horas tomando sol'
    ]
  },
  {
    id: 'anaconda',
    title: 'Anaconda Verde',
    description: 'Serpiente gigante, constrictora poderosa de los humedales',
    species: 'Eunectes murinus',
    habitat: 'Humedales',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Waves,
    color: '#166534',
    facts: [
      'Es la serpiente más pesada del mundo',
      'Puede medir hasta 9 metros de longitud',
      'Da a luz crías vivas, no pone huevos'
    ]
  },
  {
    id: 'nutria-gigante',
    title: 'Nutria Gigante',
    description: 'Mamífero acuático social, pescador experto del Amazonas',
    species: 'Pteronura brasiliensis',
    habitat: 'Ríos Amazónicos',
    conservation: 'Endangered',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Fish,
    color: '#92400e',
    facts: [
      'Puede medir hasta 1.8 metros de longitud',
      'Viven en grupos familiares de hasta 15 individuos',
      'Cada individuo tiene un patrón único en el cuello'
    ]
  },
  {
    id: 'tortuga-carey',
    title: 'Tortuga Carey',
    description: 'Reptil marino milenario, navegante de los océanos tropicales',
    species: 'Eretmochelys imbricata',
    habitat: 'Océano y Arrecifes',
    conservation: 'Critically Endangered',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Waves,
    color: '#0891b2',
    facts: [
      'Pueden vivir más de 100 años',
      'Navegan miles de kilómetros usando campos magnéticos',
      'Sus caparazones eran muy valorados históricamente'
    ]
  },
  {
    id: 'colibri-chupasavia',
    title: 'Colibrí Chupasavia',
    description: 'Ave diminuta de vuelo único, joya voladora de los Andes',
    species: 'Trochilidae',
    habitat: 'Bosque Andino',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Bird,
    color: '#22c55e',
    facts: [
      'Baten sus alas hasta 80 veces por segundo',
      'Son los únicos pájaros que pueden volar hacia atrás',
      'Su corazón late 1,200 veces por minuto'
    ]
  },
  {
    id: 'armadillo-gigante',
    title: 'Armadillo Gigante',
    description: 'Mamífero acorazado, excavador experto de la sabana',
    species: 'Priodontes maximus',
    habitat: 'Sabana y Selva',
    conservation: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#78716c',
    facts: [
      'Puede pesar hasta 54 kg',
      'Excava madrigueras de hasta 6 metros',
      'Sus garras pueden ser de 20 cm de largo'
    ]
  },
  {
    id: 'tiburon-ballena',
    title: 'Tiburón Ballena',
    description: 'Pez más grande del mundo, gigante gentil del Caribe colombiano',
    species: 'Rhincodon typus',
    habitat: 'Océano Caribe',
    conservation: 'Endangered',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Fish,
    color: '#1e40af',
    facts: [
      'Puede medir hasta 18 metros de longitud',
      'Se alimenta únicamente de plancton',
      'Cada individuo tiene un patrón único de manchas'
    ]
  },
  {
    id: 'manta-raya',
    title: 'Manta Raya Gigante',
    description: 'Pez cartilaginoso elegante, bailarina de las aguas caribeñas',
    species: 'Mobula birostris',
    habitat: 'Aguas Oceánicas',
    conservation: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Waves,
    color: '#6366f1',
    facts: [
      'Su envergadura puede superar los 7 metros',
      'Pueden saltar completamente fuera del agua',
      'Poseen el cerebro más grande entre los peces'
    ]
  },
  {
    id: 'boa-constrictora',
    title: 'Boa Constrictora',
    description: 'Serpiente poderosa, cazadora silenciosa de múltiples hábitats',
    species: 'Boa constrictor',
    habitat: 'Diversos Ecosistemas',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#a16207',
    facts: [
      'No es venenosa, mata por constricción',
      'Puede vivir hasta 30 años',
      'Detecta presas por su calor corporal'
    ]
  },
  {
    id: 'capibara',
    title: 'Capibara',
    description: 'Roedor más grande del mundo, mamífero sociable de humedales',
    species: 'Hydrochoerus hydrochaeris',
    habitat: 'Humedales y Ríos',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Waves,
    color: '#a3a3a3',
    facts: [
      'Puede pesar hasta 66 kg',
      'Viven en grupos de hasta 30 individuos',
      'Son excelentes nadadores y pueden bucear'
    ]
  },
  {
    id: 'ocelote',
    title: 'Ocelote',
    description: 'Felino manchado, cazador nocturno de múltiples ecosistemas',
    species: 'Leopardus pardalis',
    habitat: 'Selva y Bosque Seco',
    conservation: 'Least Concern',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    icon: Mountain,
    color: '#f97316',
    facts: [
      'Cada ocelote tiene un patrón único de manchas',
      'Son excelentes trepadores y nadadores',
      'Tienen visión nocturna 6 veces mejor que los humanos'
    ]
  }
];

const getConservationColor = (status: string) => {
  switch (status) {
    case 'Least Concern': return '#10b981';
    case 'Near Threatened': return '#f59e0b';
    case 'Vulnerable': return '#f97316';
    case 'Endangered': return '#ef4444';
    case 'Critically Endangered': return '#dc2626';
    default: return '#6b7280';
  }
};

export const BiodiversityReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);

  // Track scroll position to reveal items
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.floor(latest * biodiversityData.length);
      setActiveIndex(Math.min(index, biodiversityData.length - 1));
      setIsVisible(latest > 0.1 && latest < 0.9);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentItem = biodiversityData[activeIndex];

  return (
    <div ref={containerRef} className="min-h-[500vh] relative">
      {/* Fixed Content Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden relative">
        
        {/* Background Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900"
          style={{ opacity }}
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 h-full flex items-center justify-center p-8"
          style={{ y, opacity }}
        >
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Title Section */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-6xl md:text-8xl font-unbounded font-light mb-6 text-white tracking-wider">
                BIODIVERSIDAD
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-6"></div>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
                Descubre la riqueza natural que hace de Colombia un país megadiverso
              </p>
            </motion.div>

            {/* Species Showcase */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Species Image */}
              <motion.div 
                key={currentItem.id}
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Species Icon */}
                  <div 
                    className="absolute top-6 right-6 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
                    style={{ 
                      backgroundColor: `${currentItem.color}20`,
                      borderColor: currentItem.color
                    }}
                  >
                    <currentItem.icon size={28} style={{ color: currentItem.color }} />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
                  style={{ backgroundColor: currentItem.color }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full"
                  style={{ backgroundColor: currentItem.color }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>

              {/* Species Information */}
              <motion.div 
                key={`info-${currentItem.id}`}
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div>
                  <h3 className="text-2xl md:text-4xl font-unbounded font-light text-white mb-4">
                    {currentItem.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>

                {/* Species Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Especie</p>
                    <p className="text-sm md:text-base text-white font-light italic">{currentItem.species}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Hábitat</p>
                    <p className="text-sm md:text-base text-white font-light">{currentItem.habitat}</p>
                  </div>
                </div>

                {/* Conservation Status */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Estado:</span>
                  <span 
                    className="px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium text-white border-2 w-fit"
                    style={{ 
                      borderColor: getConservationColor(currentItem.conservation),
                      backgroundColor: `${getConservationColor(currentItem.conservation)}20`
                    }}
                  >
                    {currentItem.conservation}
                  </span>
                </div>

                {/* Fun Facts */}
                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Datos Curiosos</p>
                  <div className="space-y-3">
                    {currentItem.facts.map((fact, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentItem.color }}
                        />
                        <p className="text-white/80 text-xs md:text-sm leading-relaxed">{fact}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Progress Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              {biodiversityData.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};