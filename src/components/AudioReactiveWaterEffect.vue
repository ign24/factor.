<template>
  <div 
    ref="containerRef" 
    class="audio-reactive-water-container"
    :class="{ 'scroll-active': isScrollActive }"
  >
    <canvas ref="canvasRef" class="water-canvas"></canvas>
    
    <!-- Overlay content -->
    <div class="content-overlay" v-if="$slots.default">
      <slot></slot>
    </div>
    
    <!-- Audio controls -->
    <div class="audio-controls" v-if="showAudioControls">
      <button 
        ref="audioBtnRef"
        class="audio-btn"
        @click="toggleAudio"
      >
        {{ isPlaying ? '[ stop ]' : '[ play ]' }}
      </button>
    </div>
    
    <!-- Help hint -->
    <div class="help-hint" ref="helpHintRef">
      Press 'H' for controls
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as THREE from 'three'

interface Props {
  text?: string
  showAudioControls?: boolean
  scrollSensitivity?: number
  waterStrength?: number
  audioReactivity?: number
  colorPreset?: string
  autoPlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Transform your digital presence with AI-powered solutions that adapt and evolve with your business needs.',
  showAudioControls: true,
  scrollSensitivity: 1.0,
  waterStrength: 0.55,
  audioReactivity: 1.0,
  colorPreset: 'Tech Blue',
  autoPlay: false
})

// Refs
const containerRef = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()
const audioBtnRef = ref<HTMLButtonElement>()
const helpHintRef = ref<HTMLElement>()

// State
const isPlaying = ref(false)
const isScrollActive = ref(false)
const isInitialized = ref(false)

// Three.js components
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let renderer: THREE.WebGLRenderer
let material: THREE.ShaderMaterial
let mesh: THREE.Mesh
let clock: THREE.Clock

// Audio components
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let dataArray: Uint8Array | null = null
let source: MediaElementAudioSourceNode | null = null
let audio: HTMLAudioElement

// Water simulation
let waterTexture: THREE.DataTexture
let waterBuffers: {
  current: Float32Array
  previous: Float32Array
  velocity: Float32Array
  vorticity: Float32Array
  pressure: Float32Array
}

// Settings
const settings = ref({
  preset: props.colorPreset,
  animationSpeed: 1.3,
  waterStrength: props.waterStrength,
  mouseIntensity: 1.2,
  clickIntensity: 3.0,
  rippleStrength: 0.5,
  damping: 0.913,
  showText: true,
  audioVolume: 1.0,
  impactForce: 50000,
  rippleSize: 0.1,
  swirlingMotion: 0.2,
  spiralIntensity: 0.2,
  fluidPressure: 0.3,
  motionDecay: 0.08,
  rippleDecay: 1.0,
  waveHeight: 0.01,
  audioReactivity: props.audioReactivity,
  bassResponse: 1.0,
  midResponse: 1.0,
  trebleResponse: 1.0
})

// Audio levels
const audioLevels = ref({
  bassLevel: 0,
  midLevel: 0,
  trebleLevel: 0,
  overallLevel: 0
})

// Color presets
const colorPresets = {
  "Tech Blue": {
    color1: [0.2, 0.616, 0.749],
    color2: [0.192, 0.8, 0.941],
    color3: [0.141, 0.502, 0.608],
    background: [0.016, 0.031, 0.035]
  },
  "Ocean Deep": {
    color1: [0.788, 0.922, 0.953],
    color2: [0.192, 0.8, 0.941],
    color3: [0.549, 0.706, 0.753],
    background: [0.059, 0.345, 0.42]
  },
  "Midnight": {
    color1: [0.141, 0.502, 0.608],
    color2: [0.035, 0.251, 0.302],
    color3: [0.024, 0.184, 0.227],
    background: [0.016, 0.031, 0.035]
  },
  "Crystal": {
    color1: [0.788, 0.922, 0.953],
    color2: [0.549, 0.706, 0.753],
    color3: [0.2, 0.616, 0.749],
    background: [0.141, 0.286, 0.298]
  },
  "Pure Monochrome": {
    color1: [1.0, 1.0, 1.0],
    color2: [1.0, 1.0, 1.0],
    color3: [1.0, 1.0, 1.0],
    background: [0.0, 0.0, 0.0]
  }
}

// Shaders
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_background;
  uniform float u_speed;
  uniform sampler2D u_waterTexture;
  uniform float u_waterStrength;
  uniform float u_ripple_time;
  uniform vec2 u_ripple_position;
  uniform float u_ripple_strength;
  uniform sampler2D u_textTexture;
  uniform bool u_showText;
  uniform bool u_isMonochrome;
  uniform float u_audioLow;
  uniform float u_audioMid;
  uniform float u_audioHigh;
  uniform float u_audioOverall;
  uniform float u_audioReactivity;
  uniform float u_scrollProgress;
  
  varying vec2 vUv;

  void main() {
    vec2 r = u_resolution;
    vec2 FC = gl_FragCoord.xy;
    vec2 uv = vec2(FC.x / r.x, 1.0 - FC.y / r.y);
    vec2 screenP = (FC.xy * 2.0 - r) / r.y;
    
    vec2 wCoord = vec2(FC.x / r.x, FC.y / r.y);
    float waterHeight = texture2D(u_waterTexture, wCoord).r;
    float waterInfluence = clamp(waterHeight * u_waterStrength, -0.5, 0.5);
    
    // Scroll-based circle radius
    float baseRadius = 0.9;
    float audioPulse = u_audioOverall * u_audioReactivity * 0.1;
    float waterPulse = waterInfluence * 0.3;
    float scrollInfluence = u_scrollProgress * 0.3;
    float circleRadius = baseRadius + audioPulse + waterPulse + scrollInfluence;
    
    float distFromCenter = length(screenP);
    float inCircle = smoothstep(circleRadius + 0.1, circleRadius - 0.1, distFromCenter);
    
    vec4 o = vec4(0.0);
    
    if (inCircle > 0.0) {
      vec2 p = screenP * 1.1;
      
      float rippleTime = u_time - u_ripple_time;
      vec2 ripplePos = u_ripple_position * r;
      float rippleDist = distance(FC.xy, ripplePos);
      
      float clickRipple = 0.0;
      if (rippleTime < 3.0 && rippleTime > 0.0) {
        float rippleRadius = rippleTime * 150.0;
        float rippleWidth = 30.0;
        float rippleDecay = 1.0 - rippleTime / 3.0;
        clickRipple = exp(-abs(rippleDist - rippleRadius) / rippleWidth) * rippleDecay * u_ripple_strength;
      }
      
      float totalWaterInfluence = clamp((waterInfluence + clickRipple * 0.1) * u_waterStrength, -0.8, 0.8);
      float audioInfluence = (u_audioLow * 0.3 + u_audioMid * 0.4 + u_audioHigh * 0.3) * u_audioReactivity;
      float scrollInfluence2 = u_scrollProgress * 0.5;
      
      float angle = length(p) * 4.0 + audioInfluence * 2.0 + scrollInfluence2;
      mat2 R = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      p *= R;
      
      float l = length(p) - 0.7 + totalWaterInfluence * 0.5 + audioInfluence * 0.2 + scrollInfluence2 * 0.3;
      float t = u_time * u_speed + totalWaterInfluence * 2.0 + audioInfluence * 1.5 + scrollInfluence2;
      float enhancedY = p.y + totalWaterInfluence * 0.3 + audioInfluence * 0.2 + scrollInfluence2 * 0.2;
      
      float pattern1 = 0.5 + 0.5 * tanh(0.1 / max(l / 0.1, -l) - sin(l + enhancedY * max(1.0, -l / 0.1) + t));
      float pattern2 = 0.5 + 0.5 * tanh(0.1 / max(l / 0.1, -l) - sin(l + enhancedY * max(1.0, -l / 0.1) + t + 1.0));
      float pattern3 = 0.5 + 0.5 * tanh(0.1 / max(l / 0.1, -l) - sin(l + enhancedY * max(1.0, -l / 0.1) + t + 2.0));
      
      float intensity = 1.0 + totalWaterInfluence * 0.5 + audioInfluence * 0.3 + scrollInfluence2 * 0.4;
      
      if (u_isMonochrome) {
        float mono = (pattern1 + pattern2 + pattern3) / 3.0 * intensity;
        o = vec4(mono, mono, mono, inCircle);
      } else {
        o.r = pattern1 * u_color1.r * intensity;
        o.g = pattern2 * u_color2.g * intensity;
        o.b = pattern3 * u_color3.b * intensity;
        o.a = inCircle;
      }
    }
    
    vec3 bgColor = u_isMonochrome ? vec3(0.0) : u_background;
    vec3 finalColor = bgColor;
    
    finalColor = mix(finalColor, o.rgb, o.a);
    
    if (u_showText) {
      vec2 waterCoords = vec2(FC.x / r.x, FC.y / r.y);
      float step = 1.0 / r.x;
      vec2 waterGrad = clamp(vec2(
        texture2D(u_waterTexture, vec2(waterCoords.x + step, waterCoords.y)).r - 
        texture2D(u_waterTexture, vec2(waterCoords.x - step, waterCoords.y)).r,
        texture2D(u_waterTexture, vec2(waterCoords.x, waterCoords.y + step)).r - 
        texture2D(u_waterTexture, vec2(waterCoords.x, waterCoords.y - step)).r
      ) * u_waterStrength, -0.1, 0.1);
      
      vec2 textDistortedUV = uv + waterGrad * 0.15;
      vec4 textColor = texture2D(u_textTexture, textDistortedUV);
      
      if (u_isMonochrome) {
        float textLum = dot(textColor.rgb, vec3(0.299, 0.587, 0.114));
        textColor = vec4(textLum, textLum, textLum, textColor.a);
      }
      
      finalColor = mix(finalColor, textColor.rgb, textColor.a);
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

// Initialize Three.js
const initThreeJS = () => {
  if (!canvasRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // Initialize water simulation
  initWaterSimulation()
  
  // Create material
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_speed: { value: settings.value.animationSpeed },
      u_color1: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      u_color2: { value: new THREE.Vector3(0.9, 0.95, 1.0) },
      u_color3: { value: new THREE.Vector3(0.8, 0.9, 1.0) },
      u_background: { value: new THREE.Vector3(0.02, 0.02, 0.05) },
      u_waterTexture: { value: waterTexture },
      u_waterStrength: { value: settings.value.waterStrength },
      u_ripple_time: { value: -10.0 },
      u_ripple_position: { value: new THREE.Vector2(0.5, 0.5) },
      u_ripple_strength: { value: settings.value.rippleStrength },
      u_textTexture: { value: null },
      u_showText: { value: settings.value.showText },
      u_isMonochrome: { value: false },
      u_audioLow: { value: 0.0 },
      u_audioMid: { value: 0.0 },
      u_audioHigh: { value: 0.0 },
      u_audioOverall: { value: 0.0 },
      u_audioReactivity: { value: settings.value.audioReactivity },
      u_scrollProgress: { value: 0.0 }
    }
  })
  
  const geometry = new THREE.PlaneGeometry(2, 2)
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  
  camera.position.z = 1
  clock = new THREE.Clock()
  
  // Set initial color preset
  setColorPreset(props.colorPreset)
  
  isInitialized.value = true
}

// Initialize water simulation
const initWaterSimulation = () => {
  const resolution = 256
  
  waterBuffers = {
    current: new Float32Array(resolution * resolution),
    previous: new Float32Array(resolution * resolution),
    velocity: new Float32Array(resolution * resolution * 2),
    vorticity: new Float32Array(resolution * resolution),
    pressure: new Float32Array(resolution * resolution)
  }
  
  // Initialize buffers
  for (let i = 0; i < resolution * resolution; i++) {
    waterBuffers.current[i] = 0.0
    waterBuffers.previous[i] = 0.0
    waterBuffers.velocity[i * 2] = 0.0
    waterBuffers.velocity[i * 2 + 1] = 0.0
    waterBuffers.vorticity[i] = 0.0
    waterBuffers.pressure[i] = 0.0
  }
  
  waterTexture = new THREE.DataTexture(
    waterBuffers.current,
    resolution,
    resolution,
    THREE.RedFormat,
    THREE.FloatType
  )
  waterTexture.minFilter = THREE.LinearFilter
  waterTexture.magFilter = THREE.LinearFilter
  waterTexture.needsUpdate = true
}

// Set color preset
const setColorPreset = (presetName: string) => {
  const preset = colorPresets[presetName as keyof typeof colorPresets]
  if (preset && material) {
    material.uniforms.u_color1.value.fromArray(preset.color1)
    material.uniforms.u_color2.value.fromArray(preset.color2)
    material.uniforms.u_color3.value.fromArray(preset.color3)
    material.uniforms.u_background.value.fromArray(preset.background)
    material.uniforms.u_isMonochrome.value = presetName === "Pure Monochrome"
  }
}

// Initialize audio
const initAudio = () => {
  audio = new Audio('/audio/speech.mp3')
  audio.preload = 'auto'
  audio.volume = settings.value.audioVolume
  audio.crossOrigin = 'anonymous'
  
  audio.addEventListener('ended', () => {
    if (isPlaying.value) {
      audio.currentTime = 0
      audio.play()
    }
  })
  
  audio.load()
}

// Initialize audio analysis
const initAudioAnalysis = () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      
      const bufferLength = analyser.frequencyBinCount
      dataArray = new Uint8Array(bufferLength)
      
      source = audioContext.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
    }
  } catch (e) {
    console.warn('Web Audio API failed to initialize:', e)
    analyser = null
    dataArray = null
  }
}

// Update audio analysis
const updateAudioAnalysis = () => {
  if (analyser && dataArray && isPlaying.value) {
    analyser.getByteFrequencyData(dataArray)
    
    const bassEnd = Math.floor(dataArray.length * 0.1)
    const midEnd = Math.floor(dataArray.length * 0.5)
    
    let bass = 0, mid = 0, treble = 0
    
    for (let i = 0; i < bassEnd; i++) bass += dataArray[i]
    bass = (bass / bassEnd / 255) * settings.value.bassResponse
    
    for (let i = bassEnd; i < midEnd; i++) mid += dataArray[i]
    mid = (mid / (midEnd - bassEnd) / 255) * settings.value.midResponse
    
    for (let i = midEnd; i < dataArray.length; i++) treble += dataArray[i]
    treble = (treble / (dataArray.length - midEnd) / 255) * settings.value.trebleResponse
    
    const overall = (bass + mid + treble) / 3
    
    // Update audio levels
    audioLevels.value.bassLevel = bass
    audioLevels.value.midLevel = mid
    audioLevels.value.trebleLevel = treble
    audioLevels.value.overallLevel = overall
    
    // Update material uniforms with smoothing
    const smoothing = 0.8
    if (material) {
      material.uniforms.u_audioLow.value = material.uniforms.u_audioLow.value * smoothing + bass * (1 - smoothing)
      material.uniforms.u_audioMid.value = material.uniforms.u_audioMid.value * smoothing + mid * (1 - smoothing)
      material.uniforms.u_audioHigh.value = material.uniforms.u_audioHigh.value * smoothing + treble * (1 - smoothing)
      material.uniforms.u_audioOverall.value = material.uniforms.u_audioOverall.value * smoothing + overall * (1 - smoothing)
    }
  }
}

// Update water simulation
const updateWaterSimulation = () => {
  const { current, previous, velocity, vorticity } = waterBuffers
  const resolution = 256
  const damping = 0.913
  const safeTension = Math.min(0.02, 0.05)
  const velocityDissipation = settings.value.motionDecay
  const densityDissipation = settings.value.rippleDecay
  const vorticityInfluence = Math.min(Math.max(settings.value.swirlingMotion, 0.0), 0.5)
  
  // Apply velocity dissipation
  for (let i = 0; i < resolution * resolution * 2; i++) {
    velocity[i] *= 1.0 - velocityDissipation
  }
  
  // Calculate vorticity
  for (let i = 1; i < resolution - 1; i++) {
    for (let j = 1; j < resolution - 1; j++) {
      const index = i * resolution + j
      const left = velocity[(index - 1) * 2 + 1]
      const right = velocity[(index + 1) * 2 + 1]
      const bottom = velocity[(index - resolution) * 2]
      const top = velocity[(index + resolution) * 2]
      vorticity[index] = (right - left - (top - bottom)) * 0.5
    }
  }
  
  // Apply vorticity forces
  if (vorticityInfluence > 0.001) {
    for (let i = 1; i < resolution - 1; i++) {
      for (let j = 1; j < resolution - 1; j++) {
        const index = i * resolution + j
        const velIndex = index * 2
        const left = Math.abs(vorticity[index - 1])
        const right = Math.abs(vorticity[index + 1])
        const bottom = Math.abs(vorticity[index - resolution])
        const top = Math.abs(vorticity[index + resolution])
        const gradX = (right - left) * 0.5
        const gradY = (top - bottom) * 0.5
        const length = Math.sqrt(gradX * gradX + gradY * gradY) + 1e-5
        const safeVorticity = Math.max(-1.0, Math.min(1.0, vorticity[index]))
        const forceX = (gradY / length) * safeVorticity * vorticityInfluence * 0.1
        const forceY = (-gradX / length) * safeVorticity * vorticityInfluence * 0.1
        velocity[velIndex] += Math.max(-0.1, Math.min(0.1, forceX))
        velocity[velIndex + 1] += Math.max(-0.1, Math.min(0.1, forceY))
      }
    }
  }
  
  // Water simulation
  for (let i = 1; i < resolution - 1; i++) {
    for (let j = 1; j < resolution - 1; j++) {
      const index = i * resolution + j
      const velIndex = index * 2
      const top = previous[index - resolution]
      const bottom = previous[index + resolution]
      const left = previous[index - 1]
      const right = previous[index + 1]
      
      current[index] = (top + bottom + left + right) / 2 - current[index]
      current[index] = current[index] * damping + previous[index] * (1 - damping)
      current[index] += (0 - previous[index]) * safeTension
      
      const velMagnitude = Math.sqrt(
        velocity[velIndex] * velocity[velIndex] + velocity[velIndex + 1] * velocity[velIndex + 1]
      )
      const safeVelInfluence = Math.min(velMagnitude * settings.value.waveHeight, 0.1)
      current[index] += safeVelInfluence
      current[index] *= 1.0 - densityDissipation * 0.01
      current[index] = Math.max(-2.0, Math.min(2.0, current[index]))
    }
  }
  
  // Apply boundary conditions
  for (let i = 0; i < resolution; i++) {
    current[i] = 0
    current[(resolution - 1) * resolution + i] = 0
    velocity[i * 2] = 0
    velocity[i * 2 + 1] = 0
    velocity[((resolution - 1) * resolution + i) * 2] = 0
    velocity[((resolution - 1) * resolution + i) * 2 + 1] = 0
    current[i * resolution] = 0
    current[i * resolution + (resolution - 1)] = 0
    velocity[i * resolution * 2] = 0
    velocity[i * resolution * 2 + 1] = 0
    velocity[(i * resolution + (resolution - 1)) * 2] = 0
    velocity[(i * resolution + (resolution - 1)) * 2 + 1] = 0
  }
  
  [waterBuffers.current, waterBuffers.previous] = [waterBuffers.previous, waterBuffers.current]
  waterTexture.image.data = waterBuffers.current
  waterTexture.needsUpdate = true
}

// Add ripple effect
const addRipple = (x: number, y: number, strength = 1.0) => {
  const resolution = 256
  const normalizedX = x / window.innerWidth
  const normalizedY = 1.0 - y / window.innerHeight
  const texX = Math.floor(normalizedX * resolution)
  const texY = Math.floor(normalizedY * resolution)
  const radius = Math.max(2, Math.floor(settings.value.rippleSize * resolution))
  const rippleStrength = strength * (settings.value.impactForce / 100000)
  const radiusSquared = radius * radius
  
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      const distanceSquared = i * i + j * j
      if (distanceSquared <= radiusSquared) {
        const posX = texX + i
        const posY = texY + j
        if (posX >= 0 && posX < resolution && posY >= 0 && posY < resolution) {
          const index = posY * resolution + posX
          const velIndex = index * 2
          const distance = Math.sqrt(distanceSquared)
          const falloff = 1.0 - distance / radius
          const rippleValue = Math.cos((distance / radius) * Math.PI * 0.5) * rippleStrength * falloff
          
          waterBuffers.previous[index] += rippleValue
          const angle = Math.atan2(j, i)
          const velocityStrength = rippleValue * settings.value.spiralIntensity
          waterBuffers.velocity[velIndex] += Math.cos(angle) * velocityStrength
          waterBuffers.velocity[velIndex + 1] += Math.sin(angle) * velocityStrength
        }
      }
    }
  }
}

// Handle scroll
const handleScroll = () => {
  if (!containerRef.value || !material) return
  
  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate scroll progress
  const elementTop = rect.top
  const elementHeight = rect.height
  const viewportHeight = windowHeight
  
  // Calculate when element enters and exits viewport
  const enterPoint = viewportHeight * 0.8
  const exitPoint = viewportHeight * 0.2
  
  let scrollProgress = 0
  
  if (elementTop <= enterPoint && elementTop + elementHeight >= exitPoint) {
    // Element is in viewport
    const visibleTop = Math.max(0, enterPoint - elementTop)
    const visibleBottom = Math.min(elementHeight, elementTop + elementHeight - exitPoint)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    scrollProgress = visibleHeight / elementHeight
    isScrollActive.value = true
  } else {
    isScrollActive.value = false
  }
  
  // Update material uniform
  material.uniforms.u_scrollProgress.value = scrollProgress * props.scrollSensitivity
}

// Mouse and touch handlers
let lastMousePosition = { x: 0, y: 0 }
let mouseThrottleTime = 0

const onMouseMove = (event: MouseEvent) => {
  if (!canvasRef.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const now = performance.now()
  
  if (now - mouseThrottleTime < 8) return
  mouseThrottleTime = now
  
  const dx = x - lastMousePosition.x
  const dy = y - lastMousePosition.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  if (distance > 1) {
    const velocity = distance / 8
    const velocityInfluence = Math.min(velocity / 10, 2.0)
    const baseIntensity = Math.min(distance / 20, 1.0)
    const fluidIntensity = baseIntensity * velocityInfluence * settings.value.mouseIntensity
    const variation = Math.random() * 0.3 + 0.7
    const finalIntensity = fluidIntensity * variation
    
    const jitterX = x + (Math.random() - 0.5) * 3
    const jitterY = y + (Math.random() - 0.5) * 3
    addRipple(jitterX, jitterY, finalIntensity)
    
    lastMousePosition.x = x
    lastMousePosition.y = y
  }
}

const onMouseClick = (event: MouseEvent) => {
  if (!canvasRef.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  addRipple(x, y, settings.value.clickIntensity)
  
  const clickX = x / window.innerWidth
  const clickY = 1.0 - y / window.innerHeight
  material.uniforms.u_ripple_position.value.set(clickX, clickY)
  material.uniforms.u_ripple_time.value = clock.getElapsedTime()
}

const onTouchMove = (event: TouchEvent) => {
  event.preventDefault()
  if (!canvasRef.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const touch = event.touches[0]
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top
  const now = performance.now()
  
  if (now - mouseThrottleTime < 8) return
  mouseThrottleTime = now
  
  const dx = x - lastMousePosition.x
  const dy = y - lastMousePosition.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  if (distance > 1) {
    const velocity = distance / 8
    const velocityInfluence = Math.min(velocity / 10, 2.0)
    const baseIntensity = Math.min(distance / 20, 1.0)
    const fluidIntensity = baseIntensity * velocityInfluence * settings.value.mouseIntensity
    const variation = Math.random() * 0.3 + 0.7
    const finalIntensity = fluidIntensity * variation
    
    const jitterX = x + (Math.random() - 0.5) * 3
    const jitterY = y + (Math.random() - 0.5) * 3
    addRipple(jitterX, jitterY, finalIntensity)
    
    lastMousePosition.x = x
    lastMousePosition.y = y
  }
}

const onTouchStart = (event: TouchEvent) => {
  event.preventDefault()
  if (!canvasRef.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const touch = event.touches[0]
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top
  
  addRipple(x, y, settings.value.clickIntensity)
  
  const clickX = x / window.innerWidth
  const clickY = 1.0 - y / window.innerHeight
  material.uniforms.u_ripple_position.value.set(clickX, clickY)
  material.uniforms.u_ripple_time.value = clock.getElapsedTime()
}

// Toggle audio
const toggleAudio = () => {
  if (!isPlaying.value) {
    initAudioAnalysis()
    audio.play()
      .then(() => {
        isPlaying.value = true
      })
      .catch((e) => {
        console.log('Audio play failed:', e)
      })
  } else {
    audio.pause()
    audio.currentTime = 0
    isPlaying.value = false
  }
}

// Animation loop
const animate = () => {
  if (!isInitialized.value) return
  
  requestAnimationFrame(animate)
  const elapsed = clock.getElapsedTime()
  
  if (material) {
    material.uniforms.u_time.value = elapsed
  }
  
  updateAudioAnalysis()
  updateWaterSimulation()
  renderer.render(scene, camera)
}

// Handle window resize
const handleResize = () => {
  if (!renderer || !material) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  renderer.setSize(width, height)
  material.uniforms.u_resolution.value.set(width, height)
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  
  initThreeJS()
  initAudio()
  
  if (props.autoPlay) {
    toggleAudio()
  }
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onMouseClick)
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: false })
  
  // Start animation
  animate()
  
  // Initial ripple
  setTimeout(() => {
    addRipple(window.innerWidth / 2, window.innerHeight / 2, 1.5)
  }, 500)
})

onUnmounted(() => {
  // Remove event listeners
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('click', onMouseClick)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchstart', onTouchStart)
  
  // Clean up audio
  if (audio) {
    audio.pause()
    audio.src = ''
  }
  
  // Clean up Three.js
  if (renderer) {
    renderer.dispose()
  }
  if (material) {
    material.dispose()
  }
  if (scene) {
    scene.clear()
  }
})

// Watch for prop changes
watch(() => props.colorPreset, (newPreset) => {
  setColorPreset(newPreset)
})

watch(() => props.waterStrength, (newStrength) => {
  if (material) {
    material.uniforms.u_waterStrength.value = newStrength
  }
})

watch(() => props.audioReactivity, (newReactivity) => {
  if (material) {
    material.uniforms.u_audioReactivity.value = newReactivity
  }
})
</script>

<style scoped>
.audio-reactive-water-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.water-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.content-overlay > * {
  pointer-events: auto;
}

.audio-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.audio-btn {
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  text-transform: none;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.audio-btn:hover {
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.2);
}

.help-hint {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 11px;
  text-transform: uppercase;
  opacity: 0.5;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.scroll-active .help-hint {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .audio-controls {
    top: 10px;
    left: 10px;
  }
  
  .help-hint {
    top: 10px;
    right: 10px;
    font-size: 10px;
  }
}
</style>
