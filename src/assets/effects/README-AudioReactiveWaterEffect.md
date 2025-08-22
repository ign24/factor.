# 🌊 Efectos de Agua Reactivos al Audio - Factor AI Landing Page

## 📖 Descripción General

El sistema de efectos de agua reactivos al audio es una característica única de la landing page de Factor AI que crea una experiencia visual inmersiva. Utiliza Three.js para renderizar efectos de agua 3D que responden en tiempo real a la música de fondo, creando una sinergia entre audio y visuales.

## 🎯 Características Principales

### ✨ Efectos Visuales
- **Agua 3D realista** con física de fluidos
- **Ondas reactivas** que responden a la música
- **Efectos de luz** y sombras dinámicas
- **Transiciones suaves** entre estados de audio

### 🎵 Reactividad al Audio
- **Análisis de frecuencia** en tiempo real
- **Separación de bandas** (bass, mid, treble)
- **Mapeo visual** de frecuencias a efectos de agua
- **Sincronización perfecta** entre audio y visuales

### 📱 Optimización de Rendimiento
- **Renderizado eficiente** para dispositivos móviles
- **LOD (Level of Detail)** adaptativo
- **Compresión de texturas** optimizada
- **Gestión de memoria** inteligente

## 🏗️ Arquitectura Técnica

### Tecnologías Utilizadas
- **Three.js 0.178.0**: Motor 3D principal
- **Web Audio API**: Análisis de audio en tiempo real
- **WebGL**: Renderizado acelerado por hardware
- **Shaders personalizados**: Efectos de agua realistas

### Estructura del Sistema
```
AudioReactiveWaterEffect/
├── audio-analysis/          # Análisis de frecuencia
├── water-simulation/        # Simulación de fluidos
├── visual-effects/          # Efectos visuales
├── performance/             # Optimización de rendimiento
└── controls/                # Controles de usuario
```

## 🎵 Sistema de Audio

### Inicialización del Audio
```javascript
function initAudioAnalysis() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      
      source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }
  } catch (e) {
    console.warn("Web Audio API failed to initialize:", e);
  }
}
```

### Análisis de Frecuencia
```javascript
function updateAudioLevels() {
  if (!analyser || !dataArray) return;
  
  analyser.getByteFrequencyData(dataArray);
  
  // Separación en bandas de frecuencia
  const bassLevel = getAverageLevel(dataArray, 0, 8);
  const midLevel = getAverageLevel(dataArray, 8, 32);
  const trebleLevel = getAverageLevel(dataArray, 32, 128);
  const overallLevel = getAverageLevel(dataArray, 0, 128);
  
  audioLevels = { bassLevel, midLevel, trebleLevel, overallLevel };
}
```

### Separación de Bandas
- **Bass (0-8)**: Frecuencias bajas (20-200 Hz)
- **Mid (8-32)**: Frecuencias medias (200-2000 Hz)
- **Treble (32-128)**: Frecuencias altas (2000-20000 Hz)

## 🌊 Simulación de Agua

### Configuración de Agua
```javascript
const waterSettings = {
  resolution: 256,           // Resolución de la malla de agua
  damping: 0.913,           // Amortiguación de las ondas
  tension: 0.02,            // Tensión de la superficie
  rippleStrength: 0.2,      // Fuerza de las ondas
  mouseIntensity: 1.2,      // Intensidad del mouse
  clickIntensity: 3.0,      // Intensidad de clicks
  rippleRadius: 5,          // Radio de las ondas
  splatForce: 50000,        // Fuerza de salpicaduras
  splatThickness: 0.1,      // Grosor de salpicaduras
  vorticityInfluence: 0.2,  // Influencia de la vorticidad
  swirlIntensity: 0.2,      // Intensidad del remolino
  pressure: 0.3,            // Presión del fluido
  velocityDissipation: 0.08, // Disipación de velocidad
  densityDissipation: 1.0   // Disipación de densidad
};
```

### Buffers de Agua
```javascript
const waterBuffers = {
  current: new Float32Array(resolution * resolution),      // Estado actual
  previous: new Float32Array(resolution * resolution),     // Estado anterior
  velocity: new Float32Array(resolution * resolution * 2), // Velocidad X,Y
  vorticity: new Float32Array(resolution * resolution),   // Vorticidad
  pressure: new Float32Array(resolution * resolution)      // Presión
};
```

### Algoritmo de Simulación
```javascript
function updateWater() {
  // 1. Actualizar velocidad basada en presión
  updateVelocity();
  
  // 2. Aplicar fuerzas externas (audio, mouse)
  applyExternalForces();
  
  // 3. Actualizar posición del agua
  updatePosition();
  
  // 4. Aplicar condiciones de borde
  applyBoundaryConditions();
  
  // 5. Intercambiar buffers
  swapBuffers();
}
```

## 🎨 Efectos Visuales

### Shaders de Agua
```glsl
// Vertex Shader
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
uniform sampler2D waterTexture;
uniform float time;
uniform vec3 audioLevels;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec4 waterColor = texture2D(waterTexture, vUv);
  
  // Efectos de audio en el color
  float audioInfluence = audioLevels.x * 0.5 + audioLevels.y * 0.3 + audioLevels.z * 0.2;
  
  // Color base del agua
  vec3 baseColor = vec3(0.1, 0.3, 0.8);
  
  // Modificación por audio
  vec3 finalColor = baseColor + audioInfluence * vec3(0.2, 0.1, 0.3);
  
  gl_FragColor = vec4(finalColor, waterColor.r * 0.8);
}
```

### Efectos de Luz
```javascript
function setupLighting() {
  // Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);
  
  // Luz direccional principal
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // Luz puntual para efectos especiales
  const pointLight = new THREE.PointLight(0x00aaff, 1, 100);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);
}
```

## 📱 Optimización de Rendimiento

### LOD (Level of Detail)
```javascript
function updateLOD() {
  const distance = camera.position.distanceTo(waterMesh.position);
  
  if (distance > 100) {
    // LOD bajo para objetos lejanos
    waterSettings.resolution = 64;
  } else if (distance > 50) {
    // LOD medio
    waterSettings.resolution = 128;
  } else {
    // LOD alto para objetos cercanos
    waterSettings.resolution = 256;
  }
}
```

### Gestión de Memoria
```javascript
function optimizeMemory() {
  // Limpiar texturas no utilizadas
  renderer.dispose();
  
  // Reducir resolución en dispositivos móviles
  if (window.innerWidth < 768) {
    waterSettings.resolution = 128;
    renderer.setPixelRatio(1);
  }
  
  // Compresión de texturas
  waterTexture.format = THREE.RGBFormat;
  waterTexture.generateMipmaps = false;
}
```

### Compresión de Texturas
```javascript
function compressTextures() {
  // Usar formatos comprimidos
  if (renderer.capabilities.isWebGL2) {
    waterTexture.format = THREE.RGB_S3TC_DXT1_Format;
  }
  
  // Reducir calidad en dispositivos de gama baja
  if (navigator.hardwareConcurrency < 4) {
    waterTexture.minFilter = THREE.LinearFilter;
    waterTexture.magFilter = THREE.LinearFilter;
  }
}
```

## 🎮 Controles de Usuario

### Controles de Audio
```javascript
const audioControls = {
  play: () => {
    if (audio.paused) {
      audio.play();
      isPlaying = true;
      audioBtn.textContent = "[ stop ]";
    } else {
      audio.pause();
      isPlaying = false;
      audioBtn.textContent = "[ play ]";
    }
  },
  
  volume: (level) => {
    audio.volume = Math.max(0, Math.min(1, level));
  },
  
  speed: (rate) => {
    audio.playbackRate = Math.max(0.5, Math.min(2, rate));
  }
};
```

### Controles de Efectos
```javascript
const effectControls = {
  waterIntensity: (value) => {
    waterSettings.rippleStrength = value;
  },
  
  audioSensitivity: (value) => {
    audioSensitivity = value;
  },
  
  visualQuality: (level) => {
    switch(level) {
      case 'low':
        waterSettings.resolution = 64;
        break;
      case 'medium':
        waterSettings.resolution = 128;
        break;
      case 'high':
        waterSettings.resolution = 256;
        break;
    }
  }
};
```

## 🔧 Configuración y Personalización

### Variables de Configuración
```javascript
// Configuración por defecto
const defaultConfig = {
  audio: {
    enabled: true,
    sensitivity: 1.0,
    bassWeight: 0.4,
    midWeight: 0.3,
    trebleWeight: 0.3
  },
  
  water: {
    resolution: 256,
    damping: 0.913,
    tension: 0.02,
    rippleStrength: 0.2
  },
  
  performance: {
    targetFPS: 60,
    enableLOD: true,
    enableCompression: true,
    mobileOptimization: true
  }
};
```

### Personalización de Efectos
```javascript
function customizeEffects(config) {
  // Aplicar configuración personalizada
  Object.assign(waterSettings, config.water);
  Object.assign(audioSettings, config.audio);
  Object.assign(performanceSettings, config.performance);
  
  // Reinicializar con nueva configuración
  reinitializeWater();
  reinitializeAudio();
}
```

## 🧪 Testing y Debugging

### Herramientas de Debug
```javascript
// Panel de control para desarrollo
const debugPanel = new Pane({
  title: 'Water Effect Debug'
});

debugPanel.addInput(waterSettings, 'resolution', {
  min: 32, max: 512, step: 32
});

debugPanel.addInput(waterSettings, 'rippleStrength', {
  min: 0, max: 1, step: 0.01
});

debugPanel.addInput(audioLevels, 'bassLevel', {
  readonly: true
});
```

### Métricas de Rendimiento
```javascript
function measurePerformance() {
  const stats = {
    fps: 0,
    memoryUsage: 0,
    drawCalls: 0,
    triangles: 0
  };
  
  // Medir FPS
  stats.fps = 1000 / (performance.now() - lastTime);
  lastTime = performance.now();
  
  // Medir uso de memoria
  if (performance.memory) {
    stats.memoryUsage = performance.memory.usedJSHeapSize;
  }
  
  // Medir draw calls y triángulos
  stats.drawCalls = renderer.info.render.calls;
  stats.triangles = renderer.info.render.triangles;
  
  return stats;
}
```

## 🚀 Deployment y Optimización

### Build de Producción
```bash
# Optimizar para producción
npm run build

# Comprimir assets
gzip -k dist/assets/*.js
gzip -k dist/assets/*.css

# Optimizar imágenes
imagemin dist/assets/image/* --out-dir=dist/assets/image/
```

### Configuración de Servidor
```nginx
# Headers para WebGL
add_header Cross-Origin-Embedder-Policy "require-corp";
add_header Cross-Origin-Opener-Policy "same-origin";

# Compresión gzip
gzip on;
gzip_types text/javascript application/javascript;
gzip_types text/css application/css;
```

## 📚 Recursos Adicionales

### Documentación Three.js
- [Three.js Documentation](https://threejs.org/docs/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Shader Language](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

### Herramientas de Desarrollo
- [Three.js Editor](https://threejs.org/editor/)
- [WebGL Inspector](https://benvanik.github.io/WebGL-Inspector/)
- [Shader Playground](https://shader-playground.timjroberts.com/)

### Optimización de Rendimiento
- [WebGL Performance](https://webglfundamentals.org/webgl/lessons/webgl-performance.html)
- [Three.js Performance](https://discoverthreejs.com/tips-and-tricks/)

---

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Audio no funciona
```javascript
// Verificar permisos de audio
if (audioContext.state === 'suspended') {
  await audioContext.resume();
}

// Verificar autoplay policy
audio.play().catch(error => {
  console.log('Autoplay prevented:', error);
});
```

#### 2. Rendimiento bajo
```javascript
// Reducir resolución en dispositivos lentos
if (navigator.hardwareConcurrency < 4) {
  waterSettings.resolution = 128;
}

// Deshabilitar efectos en móviles
if (window.innerWidth < 768) {
  disableComplexEffects();
}
```

#### 3. WebGL no disponible
```javascript
// Fallback para dispositivos sin WebGL
if (!renderer.capabilities.isWebGL) {
  showFallbackMessage();
  return;
}
```

---

*Documentación del Sistema de Efectos de Agua Reactivos - Factor AI - Diciembre 2024*
