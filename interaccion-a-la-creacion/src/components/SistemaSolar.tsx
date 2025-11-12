import { useState } from 'react';

interface Planet {
  id: number;
  name: string;
  color: string;
  accentColor: string;
  size: number;
  distance: string;
  orbitDuration: string;
  info: string;
  temperature: string;
  curiosity: string;
  icon: string;
}

const planets: Planet[] = [
  {
    id: 1,
    name: 'Mercurio',
    icon: '🪨',
    color: 'bg-gradient-to-br from-gray-300 to-gray-500',
    accentColor: 'from-gray-400 to-gray-600',
    size: 28,
    distance: '57.9 millones km',
    orbitDuration: '88 días',
    info: 'El planeta más cercano al Sol y el más pequeño del sistema solar.',
    temperature: '430°C (día) / -180°C (noche)',
    curiosity: '¡Un año en Mercurio es más corto que un día! Tarda 88 días en orbitar el Sol, pero 59 días en rotar.'
  },
  {
    id: 2,
    name: 'Venus',
    icon: '☁️',
    color: 'bg-gradient-to-br from-yellow-200 to-orange-300',
    accentColor: 'from-yellow-400 to-orange-500',
    size: 42,
    distance: '108.2 millones km',
    orbitDuration: '225 días',
    info: 'El planeta más caliente del sistema solar por su atmósfera densa.',
    temperature: '462°C',
    curiosity: '¡Venus gira al revés! Es el único planeta que gira en sentido contrario a los demás.'
  },
  {
    id: 3,
    name: 'Tierra',
    icon: '🌍',
    color: 'bg-gradient-to-br from-blue-400 to-green-500',
    accentColor: 'from-blue-500 to-green-600',
    size: 45,
    distance: '149.6 millones km',
    orbitDuration: '365 días',
    info: '¡Nuestro hogar! El único planeta conocido con vida.',
    temperature: '15°C (promedio)',
    curiosity: '¡La Tierra es el único planeta con agua líquida! El 71% está cubierto de océanos.'
  },
  {
    id: 4,
    name: 'Marte',
    icon: '🔴',
    color: 'bg-gradient-to-br from-red-400 to-red-700',
    accentColor: 'from-red-500 to-red-800',
    size: 38,
    distance: '227.9 millones km',
    orbitDuration: '687 días',
    info: 'Conocido como el planeta rojo por su color característico.',
    temperature: '-63°C (promedio)',
    curiosity: '¡Marte tiene el volcán más grande del sistema solar! El Monte Olimpo es 3 veces más alto que el Everest.'
  },
  {
    id: 5,
    name: 'Júpiter',
    icon: '🌪️',
    color: 'bg-gradient-to-br from-orange-300 to-orange-600',
    accentColor: 'from-orange-400 to-orange-700',
    size: 75,
    distance: '778.5 millones km',
    orbitDuration: '12 años',
    info: 'El planeta más grande del sistema solar, gigante gaseoso.',
    temperature: '-110°C',
    curiosity: '¡La Gran Mancha Roja es una tormenta que lleva más de 300 años! Cabrían 3 Tierras dentro.'
  },
  {
    id: 6,
    name: 'Saturno',
    icon: '💍',
    color: 'bg-gradient-to-br from-yellow-100 to-yellow-400',
    accentColor: 'from-yellow-300 to-yellow-600',
    size: 68,
    distance: '1.434 mil millones km',
    orbitDuration: '29 años',
    info: 'Famoso por sus hermosos anillos de hielo y roca.',
    temperature: '-140°C',
    curiosity: '¡Saturno es tan ligero que podría flotar en el agua! Sus anillos tienen miles de millones de pedazos de hielo.'
  },
  {
    id: 7,
    name: 'Urano',
    icon: '❄️',
    color: 'bg-gradient-to-br from-cyan-200 to-cyan-500',
    accentColor: 'from-cyan-300 to-cyan-600',
    size: 52,
    distance: '2.871 mil millones km',
    orbitDuration: '84 años',
    info: 'Tiene una inclinación única que lo hace rodar como una bola.',
    temperature: '-195°C',
    curiosity: '¡Urano está inclinado de lado! Rueda como una pelota en lugar de girar como un trompo.'
  },
  {
    id: 8,
    name: 'Neptuno',
    icon: '💨',
    color: 'bg-gradient-to-br from-blue-500 to-blue-900',
    accentColor: 'from-blue-600 to-blue-950',
    size: 50,
    distance: '4.495 mil millones km',
    orbitDuration: '165 años',
    info: 'El planeta más lejano del Sol, con vientos muy fuertes.',
    temperature: '-200°C',
    curiosity: '¡Los vientos en Neptuno son los más rápidos del sistema solar! Alcanzan 2,000 km/h.'
  }
];

export default function SistemaSolar() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black p-2 md:p-4 overflow-hidden relative">
      {/* Estrellas titilantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's',
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Header con botón de regreso */}
      <div className="relative z-10 mb-4 md:mb-6">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900 font-bold py-2 px-5 md:py-3 md:px-6 rounded-full hover:scale-105 transition-all shadow-xl text-sm md:text-base flex items-center gap-2 border-2 border-yellow-200"
        >
          <span className="text-lg">←</span>
          <span>Volver al Inicio</span>
        </button>
        
        <div className="text-center mt-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl mb-2">
            🌌 Sistema Solar Interactivo 🚀
          </h1>
          <p className="text-sm md:text-lg text-blue-200 font-medium drop-shadow-lg max-w-2xl mx-auto px-4">
            ✨ Observa los planetas girar alrededor del Sol, haz clic en cualquiera y descubre datos curiosos fascinantes ✨
          </p>
        </div>
      </div>

      {/* Sistema Solar con órbitas */}
      <div className="relative z-10 h-[350px] md:h-[500px] flex items-center justify-center">
        {/* Órbitas */}
        {planets.map((planet, index) => {
          const orbitRadius = 60 + index * 40;
          return (
            <div
              key={`orbit-${planet.id}`}
              className={`absolute rounded-full border-2 transition-all duration-500 border-white/20`}
              style={{
                width: `${orbitRadius * 2}px`,
                height: `${orbitRadius * 2}px`,
              }}
            />
          );
        })}

        {/* Sol */}
        <div className="absolute w-16 h-16 md:w-24 md:h-24 flex items-center justify-center z-20">
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 md:w-1 h-16 md:h-24 bg-gradient-to-t from-yellow-400/50 to-transparent"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  transformOrigin: 'center',
                  animation: 'rotate 20s linear infinite'
                }}
              />
            ))}
          </div>
          
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-30"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-300 blur-xl opacity-60"></div>
            <span className="text-xl md:text-4xl relative z-10">☀️</span>
          </div>
        </div>

        {/* Planetas girando con nombres SIEMPRE visibles */}
        {planets.map((planet, index) => {
          const orbitRadius = 60 + index * 40;
          const speed = 20 + index * 5;

          return (
            <div
              key={planet.id}
              className="absolute pointer-events-none"
              style={{
                width: `${orbitRadius * 2}px`,
                height: `${orbitRadius * 2}px`,
                animation: `orbit ${speed}s linear infinite`,
                animationDelay: `${-index * 2}s`
              }}
            >
              <div
                className="absolute"
                style={{
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <button
                  onClick={() => setSelectedPlanet(planet)}
                  className={`${planet.color} rounded-full shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer flex items-center justify-center font-bold hover:shadow-2xl hover:z-30 group pointer-events-auto relative`}
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                  }}
                  aria-label={`Ver información de ${planet.name}`}
                >
                  <div className={`absolute inset-0 rounded-full ${planet.color} opacity-50 blur-md group-hover:opacity-100 transition-opacity`}></div>
                </button>

                {/* Etiqueta del nombre SIEMPRE VISIBLE */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${planet.accentColor} text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full whitespace-nowrap font-bold shadow-lg border border-white/40 opacity-100 text-[10px] md:text-xs`}
                  style={{
                    animation: 'float 2s ease-in-out infinite',
                    bottom: `-${planet.size / 2 + 16}px`,
                    pointerEvents: 'none'
                  }}
                >
                  {planet.icon} {planet.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS para animaciones */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-3px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.3s ease-out;
        }

        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>

      {/* Modal compacto de información */}
      {selectedPlanet && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 md:p-4 backdrop-blur-sm animate-slide-in-up"
          onClick={() => setSelectedPlanet(null)}
        >
          <div 
            className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-4 md:p-6 border-4 border-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar en la esquina */}
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg font-bold text-xl hover:scale-110 transition-all z-10"
            >
              ✕
            </button>

            {/* Header con planeta */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`${selectedPlanet.color} rounded-full shadow-lg flex-shrink-0`}
                style={{
                  width: `${selectedPlanet.size * 1.5}px`,
                  height: `${selectedPlanet.size * 1.5}px`,
                }}
              ></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  {selectedPlanet.icon} {selectedPlanet.name}
                </h2>
                <p className="text-xs text-gray-600">Haz clic en los datos para explorar</p>
              </div>
            </div>

            {/* Grid compacto de información */}
            <div className="space-y-2 mb-3">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-2 border border-blue-300">
                <p className="text-xs font-semibold text-blue-900 mb-0.5">📏 Distancia del Sol</p>
                <p className="text-sm font-bold text-blue-800">{selectedPlanet.distance}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-2 border border-purple-300">
                <p className="text-xs font-semibold text-purple-900 mb-0.5">⏰ Tiempo de Órbita</p>
                <p className="text-sm font-bold text-purple-800">{selectedPlanet.orbitDuration}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-red-200 rounded-lg p-2 border border-orange-300">
                <p className="text-xs font-semibold text-red-900 mb-0.5">🌡️ Temperatura</p>
                <p className="text-sm font-bold text-red-800">{selectedPlanet.temperature}</p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-200 rounded-lg p-2 border border-green-300">
                <p className="text-xs font-semibold text-green-900 mb-0.5">📖 Información</p>
                <p className="text-xs text-green-800">{selectedPlanet.info}</p>
              </div>
            </div>

            {/* Dato curioso compacto */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-3 border-2 border-yellow-400">
              <p className="text-xs font-bold text-orange-900 mb-1 flex items-center gap-1">
                <span className="text-base">💡</span> ¡Dato Curioso!
              </p>
              <p className="text-xs text-orange-900 leading-relaxed">{selectedPlanet.curiosity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}