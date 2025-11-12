import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const allCountries = [
  { id: 1, name: 'México', capital: 'Ciudad de México', continent: 'América del Norte', flag: '🇲🇽', funFact: 'México tiene 35 sitios declarados Patrimonio de la Humanidad.', population: '128 millones', color: '#FF6B9D', question: '¿Cuál es la capital de México?', answers: ['Guadalajara', 'Ciudad de México', 'Cancún', 'Monterrey'], correctAnswer: 1 },
  { id: 2, name: 'Estados Unidos', capital: 'Washington D.C.', continent: 'América del Norte', flag: '🇺🇸', funFact: 'Estados Unidos tiene 50 estados.', population: '331 millones', color: '#4A90E2', question: '¿Cuántos estados tiene Estados Unidos?', answers: ['40', '45', '50', '55'], correctAnswer: 2 },
  { id: 7, name: 'Colombia', capital: 'Bogotá', continent: 'América del Sur', flag: '🇨🇴', funFact: 'Colombia tiene más de 1,900 especies de aves.', population: '51 millones', color: '#FFD700', question: '¿En qué es número 1 Colombia?', answers: ['Especies de aves', 'Montañas', 'Lagos', 'Islas'], correctAnswer: 0 },
  { id: 8, name: 'Brasil', capital: 'Brasília', continent: 'América del Sur', flag: '🇧🇷', funFact: 'La selva amazónica produce el 20% del oxígeno del planeta.', population: '215 millones', color: '#00FF00', question: '¿Qué % del oxígeno produce el Amazonas?', answers: ['10%', '15%', '20%', '25%'], correctAnswer: 2 },
  { id: 13, name: 'Francia', capital: 'París', continent: 'Europa', flag: '🇫🇷', funFact: 'Francia es el país más visitado del mundo.', population: '67 millones', color: '#4169E1', question: '¿Cuál es el monumento más famoso de Francia?', answers: ['Big Ben', 'Torre Eiffel', 'Coliseo', 'Estatua'], correctAnswer: 1 },
  { id: 15, name: 'Italia', capital: 'Roma', continent: 'Europa', flag: '🇮🇹', funFact: 'Italia tiene más de 3,000 años de historia.', population: '60 millones', color: '#E91E63', question: '¿Capacidad del Coliseo Romano?', answers: ['20,000', '30,000', '50,000', '70,000'], correctAnswer: 2 },
  { id: 19, name: 'Egipto', capital: 'El Cairo', continent: 'África', flag: '🇪🇬', funFact: 'Las pirámides de Giza tienen más de 4,500 años.', population: '104 millones', color: '#FFA500', question: '¿Edad de las pirámides de Giza?', answers: ['1,000 años', '2,500 años', '4,500 años', '10,000 años'], correctAnswer: 2 },
  { id: 21, name: 'Kenia', capital: 'Nairobi', continent: 'África', flag: '🇰🇪', funFact: 'En Kenia hay millones de ñus que migran cada año.', population: '54 millones', color: '#8BC34A', question: '¿Qué animales migran en Kenia?', answers: ['Elefantes', 'Ñus', 'Jirafas', 'Leones'], correctAnswer: 1 },
  { id: 25, name: 'China', capital: 'Pekín', continent: 'Asia', flag: '🇨🇳', funFact: 'La Gran Muralla China mide 21,000 kilómetros.', population: '1,400 millones', color: '#F44336', question: '¿Longitud de la Gran Muralla?', answers: ['5,000 km', '10,000 km', '21,000 km', '30,000 km'], correctAnswer: 2 },
  { id: 26, name: 'Japón', capital: 'Tokio', continent: 'Asia', flag: '🇯🇵', funFact: 'Japón tiene más de 6,800 islas.', population: '125 millones', color: '#FF1493', question: '¿Velocidad del tren más rápido?', answers: ['300 km/h', '400 km/h', '600 km/h', '800 km/h'], correctAnswer: 2 },
  { id: 31, name: 'Australia', capital: 'Canberra', continent: 'Oceanía', flag: '🇦🇺', funFact: 'Australia tiene animales únicos como canguros y koalas.', population: '26 millones', color: '#FF69B4', question: '¿Qué animales únicos tiene Australia?', answers: ['Leones', 'Canguros y koalas', 'Elefantes', 'Tigres'], correctAnswer: 1 },
  { id: 32, name: 'Nueva Zelanda', capital: 'Wellington', continent: 'Oceanía', flag: '🇳🇿', funFact: 'Nueva Zelanda tiene más ovejas que personas.', population: '5 millones', color: '#00BCD4', question: '¿Ovejas por persona en NZ?', answers: ['2', '4', '6', '10'], correctAnswer: 2 }
];

const continents = [
  { name: 'América del Norte', color: '#3a9d5d', countries: allCountries.filter(c => c.continent === 'América del Norte') },
  { name: 'América del Sur', color: '#2d7a3e', countries: allCountries.filter(c => c.continent === 'América del Sur') },
  { name: 'Europa', color: '#52a86f', countries: allCountries.filter(c => c.continent === 'Europa') },
  { name: 'África', color: '#b8905a', countries: allCountries.filter(c => c.continent === 'África') },
  { name: 'Asia', color: '#4d9463', countries: allCountries.filter(c => c.continent === 'Asia') },
  { name: 'Oceanía', color: '#67b584', countries: allCountries.filter(c => c.continent === 'Oceanía') }
];

export default function GloboTerraqueo() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [points, setPoints] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stars, setStars] = useState([]);
  const [showFunFact, setShowFunFact] = useState(false);
  const [visitedCountries, setVisitedCountries] = useState(new Set());
  const mountRef = useRef(null);

  const handleGoBack = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: 'varying vec2 vUv; varying vec3 vNormal; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform float time; 
        varying vec2 vUv; 
        varying vec3 vNormal; 
        void main() { 
          vec3 oceanBlue = vec3(0.05, 0.35, 0.75); 
          vec3 deepOcean = vec3(0.0, 0.15, 0.45); 
          vec3 landGreen = vec3(0.2, 0.7, 0.25); 
          vec3 forestGreen = vec3(0.1, 0.5, 0.15); 
          vec3 desertBrown = vec3(0.76, 0.7, 0.5); 
          float pattern = sin(vUv.x * 15.0 + time * 0.3) * cos(vUv.y * 10.0 - time * 0.2); 
          float detail = sin(vUv.x * 30.0) * sin(vUv.y * 20.0) * 0.3; 
          pattern = pattern + detail; 
          pattern = smoothstep(-0.4, 0.4, pattern); 
          float latitude = abs(vUv.y - 0.5); 
          vec3 terrain = mix(landGreen, forestGreen, sin(vUv.x * 25.0) * 0.5 + 0.5); 
          terrain = mix(terrain, desertBrown, smoothstep(0.3, 0.45, latitude)); 
          vec3 ocean = mix(deepOcean, oceanBlue, sin(vUv.x * 20.0 + time) * 0.3 + 0.7); 
          vec3 baseColor = mix(ocean, terrain, pattern); 
          vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0)); 
          float diff = max(dot(vNormal, lightDir), 0.0); 
          float spec = pow(max(dot(reflect(-lightDir, vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 32.0); 
          vec3 finalColor = baseColor * (0.4 + diff * 0.8) + vec3(1.0) * spec * 0.3 * (1.0 - pattern); 
          gl_FragColor = vec4(finalColor, 1.0); 
        }`
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const atmoGeom = new THREE.SphereGeometry(1.12, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: 'varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform float time; 
        varying vec3 vNormal; 
        void main() { 
          vec3 glowColor = vec3(0.4, 0.7, 1.0); 
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5); 
          intensity *= (1.0 + sin(time * 2.0) * 0.15); 
          gl_FragColor = vec4(glowColor, intensity * 0.7); 
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const atmo = new THREE.Mesh(atmoGeom, atmoMat);
    scene.add(atmo);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 3, 5);
    scene.add(light);

    let animId;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;
      globe.rotation.y += 0.003;
      atmo.rotation.y += 0.0025;
      material.uniforms.time.value = time;
      atmoMat.uniforms.time.value = time;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      atmoGeom.dispose();
      atmoMat.dispose();
      renderer.dispose();
    };
  }, []);

  const createStars = (x, y) => {
    const newStars = [];
    for (let i = 0; i < 15; i++) {
      newStars.push({ id: Date.now() + i, x: x + (Math.random() - 0.5) * 200, y: y + (Math.random() - 0.5) * 200, size: Math.random() * 30 + 20 });
    }
    setStars(newStars);
    setTimeout(() => setStars([]), 2000);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowQuestion(false);
    setShowResult(false);
    setShowFunFact(true);
    if (!visitedCountries.has(country.id)) {
      setVisitedCountries(new Set(visitedCountries).add(country.id));
      setPoints(prev => prev + 10);
      createStars(window.innerWidth / 2, window.innerHeight / 2);
    }
  };

  const handleAnswer = (idx, e) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    const correct = idx === selectedCountry.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setPoints(prev => prev + 50);
      createStars(e.clientX, e.clientY);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8 relative overflow-hidden">
      {stars.map(s => <div key={s.id} className="absolute pointer-events-none animate-ping" style={{ left: s.x, top: s.y, fontSize: s.size }}>⭐</div>)}

      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl px-8 py-4 shadow-2xl border-4 border-white">
          <div className="flex items-center gap-3">
            <span className="text-5xl">🌟</span>
            <div>
              <p className="text-white text-sm font-bold">PUNTOS</p>
              <p className="text-white text-4xl font-black">{points}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl px-6 py-3 shadow-xl border-4 border-white">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🗺️</span>
            <div>
              <p className="text-white text-xs font-bold">VISITADOS</p>
              <p className="text-white text-2xl font-black">{visitedCountries.size}/{allCountries.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 
                     text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg border-2 border-yellow-200 
                     hover:from-yellow-400 hover:to-yellow-600 hover:scale-110 transition-all duration-300"
        >
          <span className="text-2xl">←</span>
          <span>Volver al Inicio</span>
        </button>
      </div>

      <h1 className="text-5xl font-bold text-white text-center mb-8">🌍 Aventura por el Mundo 🌍</h1>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-white/20">
          <div ref={mountRef} className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl"></div>
          <p className="text-white text-center mt-4 text-lg font-semibold">🌍 Explora el globo terráqueo mejorado con colores vibrantes 🌎</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {continents.map((cont, index) => (
            <button key={cont.name} onClick={() => { setSelectedContinent(cont); }} className="text-center p-6 rounded-3xl shadow-2xl hover:scale-110 transition-all border-4 border-white animate-bounce-slow" style={{ background: 'linear-gradient(135deg, ' + cont.color + ', ' + cont.color + '99)', animationDelay: `${index * 0.2}s` }}>
              <div className="text-6xl mb-3 animate-bounce-icon">
                {cont.name === 'América del Norte' && '🏔️'}
                {cont.name === 'América del Sur' && '🌴'}
                {cont.name === 'Europa' && '🏰'}
                {cont.name === 'África' && '🦁'}
                {cont.name === 'Asia' && '🏯'}
                {cont.name === 'Oceanía' && '🏝️'}
              </div>
              <p className="text-2xl font-black text-white mb-2">{cont.name}</p>
              <p className="text-lg text-white font-bold">{cont.countries.length} países</p>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes bounce-icon {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-icon {
          display: inline-block;
          animation: bounce-icon 2s ease-in-out infinite;
        }
      `}</style>

      {selectedContinent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="rounded-3xl shadow-2xl max-w-4xl w-full p-8 border-4 border-white max-h-[90vh] overflow-y-auto" style={{ background: 'linear-gradient(135deg, ' + selectedContinent.color + ', ' + selectedContinent.color + '99)' }}>
            <h2 className="text-5xl font-black text-white mb-6 text-center">Bienvenido a {selectedContinent.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              {selectedContinent.countries.map(c => (
                <button key={c.id} onClick={() => handleCountryClick(c)} className="bg-white p-6 rounded-3xl hover:scale-110 transition-all shadow-2xl relative">
                  {visitedCountries.has(c.id) && <div className="absolute -top-2 -right-2 text-4xl">✅</div>}
                  <div className="text-7xl mb-3">{c.flag}</div>
                  <p className="text-2xl font-black text-gray-800">{c.name}</p>
                  <p className="text-base text-gray-600">📍 {c.capital}</p>
                </button>
              ))}
            </div>
            <button onClick={() => { setSelectedContinent(null); }} className="bg-gray-800 text-white font-bold text-xl py-4 px-10 rounded-full w-full">🔄 Volver</button>
          </div>
        </div>
      )}

      {selectedCountry && showFunFact && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-4 border-white max-h-[90vh] overflow-y-auto" style={{ background: selectedCountry.color }}>
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedCountry.flag}</div>
              <h2 className="text-4xl font-black text-white mb-6">{selectedCountry.name}</h2>
              <div className="bg-white rounded-3xl p-6 mb-6">
                <p className="text-xl font-bold text-gray-800 mb-3">Capital: {selectedCountry.capital}</p>
                <p className="text-lg text-gray-700 mb-3">Población: {selectedCountry.population}</p>
                <div className="bg-yellow-200 p-4 rounded-2xl">
                  <p className="text-base font-bold text-gray-800">{selectedCountry.funFact}</p>
                </div>
              </div>
              <button onClick={() => { setShowFunFact(false); setShowQuestion(true); }} className="bg-green-500 text-white font-bold text-xl py-4 px-10 rounded-full mb-3 w-full hover:bg-green-600">🎯 Responder Pregunta (+50 pts)</button>
              <button onClick={() => setSelectedCountry(null)} className="bg-purple-500 text-white font-bold text-lg py-3 px-8 rounded-full w-full mb-2 hover:bg-purple-600">🔙 Volver al Continente</button>
              <button onClick={() => { setShowFunFact(false); setSelectedCountry(null); setSelectedContinent(null); }} className="bg-yellow-500 text-gray-800 font-bold text-base py-2 px-6 rounded-full w-full hover:bg-yellow-600">← Volver al Inicio</button>
            </div>
          </div>
        </div>
      )}

      {selectedCountry && showQuestion && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl max-w-2xl w-full p-6 border-4 border-yellow-300 my-4 max-h-[85vh] overflow-y-auto">
            {stars.map(s => <div key={s.id} className="absolute pointer-events-none animate-ping" style={{ left: s.x, top: s.y, fontSize: s.size }}>⭐</div>)}
            <div className="text-center">
              <div className="text-6xl mb-3">{selectedCountry.flag}</div>
              <h3 className="text-2xl font-black text-white mb-4">Pregunta sobre {selectedCountry.name}</h3>
              <div className="bg-white rounded-3xl p-5 mb-5">
                <p className="text-xl font-bold text-gray-800 mb-4">{selectedCountry.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCountry.answers.map((ans, i) => (
                    <button key={i} onClick={(e) => handleAnswer(i, e)} disabled={showResult && isCorrect} className={'p-4 rounded-2xl font-bold text-base ' + (showResult && isCorrect ? (i === selectedCountry.correctAnswer ? 'bg-green-500 text-white' : 'bg-gray-300') : selectedAnswer === i && showResult && !isCorrect ? 'bg-red-500 text-white' : 'bg-blue-400 text-white hover:bg-blue-500')}>
                      {ans} {showResult && isCorrect && i === selectedCountry.correctAnswer && '✅'}
                    </button>
                  ))}
                </div>
              </div>
              {showResult && (
                <div className={'mb-4 p-4 rounded-3xl ' + (isCorrect ? 'bg-green-400' : 'bg-red-400')}>
                  <p className="text-2xl font-black text-white mb-3">{isCorrect ? '🎉 CORRECTO! +50 pts' : '😊 Respuesta incorrecta'}</p>
                  {!isCorrect && (
                    <button onClick={handleRetry} className="bg-white text-red-600 font-bold text-base py-2 px-6 rounded-full hover:bg-gray-100 transition-all">
                      🔄 Intentar de nuevo
                    </button>
                  )}
                </div>
              )}
              <button onClick={() => { setShowQuestion(false); setSelectedCountry(null); }} className="bg-yellow-400 text-gray-800 font-bold text-lg py-3 px-8 rounded-full w-full mb-2 hover:bg-yellow-500">🌟 Explorar otro país</button>
              <button onClick={() => { setShowQuestion(false); setShowFunFact(false); setSelectedCountry(null); setSelectedContinent(null); }} className="bg-purple-600 text-white font-bold text-base py-2 px-6 rounded-full w-full hover:bg-purple-700">← Volver al Inicio</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}