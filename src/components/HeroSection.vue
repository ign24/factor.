<template>
  <section id="hero" class="hero" @wheel="handleWheelScroll">
    <!-- Background image instead of video -->
    <div class="hero-background-image"></div>
    
    <div class="hero-content-left">

      
      <h1 class="animate-title">
        <span class="main-title">IA REAL</span><br />
        <span class="subtitle">diseñada para generar impacto.</span>
      </h1>
      <p class="hero-description animate-description">
        Creamos soluciones completas con inteligencia artificial integrada.  
        Entregamos MVPs listos para producción, con automatización real, visión de producto y mínima complejidad operativa.
      </p>
      <div class="hero-actions animate-actions">
        <button class="cta-primary" @click="scrollToContact">
          Quiero mi solución IA
        </button>
      </div>
      <div class="hero-secondary-cta animate-secondary">
        <a href="#expertise" class="see-how-link" @click="scrollToExpertise">
          Ver cómo funciona ↓
        </a>
      </div>
    </div>
    <div class="hero-effect-right animate-effect">
      <div id="container">
        <div id="controls">
        </div>
      </div>
    </div>
    
    <!-- Botón play/stop posicionado independientemente -->
    <button id="audioBtn" class="effect-button">
      <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
      <span class="button-text">play</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '@/assets/effects/audio-reactive-water.css'

// Scroll state
const isScrolling = ref(false)

const emit = defineEmits<{
  'background-ready': []
}>()

// Emit background ready immediately since we're using a static image
onMounted(() => {
  emit('background-ready')
})



const scrollToContact = () => {
  const contactSection = document.querySelector('#contacto')
  if (contactSection) {
    contactSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const handleWheelScroll = (e: WheelEvent) => {
  // Solo procesar si no estamos ya haciendo scroll
  if (isScrolling.value) return
  
  // Detectar si estamos en la Hero Section (viewport completo)
  const heroSection = document.getElementById('hero')
  if (!heroSection) return
  
  const rect = heroSection.getBoundingClientRect()
  const isInHeroViewport = rect.top >= 0 && rect.bottom <= window.innerHeight
  
  if (isInHeroViewport) {
    e.preventDefault()
    
    // Determinar dirección del scroll
    const deltaY = e.deltaY
    
    if (deltaY > 0) { // Scroll hacia abajo
      isScrolling.value = true
      
      // Scroll suave a la sección de expertise
      const expertiseSection = document.querySelector('#expertise')
      if (expertiseSection) {
        // Scroll exactamente a la parte superior de la sección
        expertiseSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        
        // Resetear el flag después de un delay
        setTimeout(() => {
          isScrolling.value = false
        }, 1500)
      }
    }
  }
}

// Función para scroll manual al hacer click en el enlace
const scrollToExpertise = (e: Event) => {
  e.preventDefault()
  isScrolling.value = true
  
  const expertiseSection = document.querySelector('#expertise')
  if (expertiseSection) {
    // Scroll exactamente a la parte superior de la sección
    expertiseSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    setTimeout(() => {
      isScrolling.value = false
    }, 1500)
  }
}

  // Lazy load audio effect only when needed (not on mobile)
  if (window.innerWidth > 768) {
    import('@/assets/effects/audio-reactive-water.js').catch(() => {
      console.warn('Audio effect module not found')
    })
  }

  // Add click handler for play/stop button
  const audioBtn = document.getElementById('audioBtn')
  if (audioBtn) {
    const playIcon = audioBtn.querySelector('.play-icon') as HTMLElement
    const pauseIcon = audioBtn.querySelector('.pause-icon') as HTMLElement
    const buttonText = audioBtn.querySelector('.button-text') as HTMLElement
    
    // Set initial state
    audioBtn.setAttribute('data-playing', 'false')
    
    audioBtn.addEventListener('click', () => {
      const button = audioBtn as HTMLElement
      const isPlaying = button.getAttribute('data-playing') === 'true'
      
      if (isPlaying) {
        // Switch to play state
        playIcon.style.display = 'block'
        pauseIcon.style.display = 'none'
        buttonText.textContent = 'play'
        button.setAttribute('data-playing', 'false')
      } else {
        // Switch to pause state
        playIcon.style.display = 'none'
        pauseIcon.style.display = 'block'
        buttonText.textContent = 'pause'
        button.setAttribute('data-playing', 'true')
      }
    })
  }
</script>

<style>
/* Fonts are now loaded via preload in index.html for better performance */

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
  gap: clamp(10px, 3vw, 20px);
  font-family: var(--font-primary);
}

.hero-background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/fondo.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}


.hero-content-left {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  padding-left: clamp(5vw, 20vw, 18vw);
  padding-top: clamp(0vh, 0vh, 0vh);
}

.hero-effect-right {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: clamp(25px, 4vw, 30px);
  max-height: clamp(25px, 40vw, 50px);
  position: relative;
  z-index: 0;
  padding-right: 25%;
  padding-bottom: 5%;
}

/* Entrance animations */
.animate-title {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-description {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-actions {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-secondary {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-effect {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
  transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}



#container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}

#controls {
  position: absolute;
  z-index: 10;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.effect-button {
  position: relative;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  position: absolute;
  top: clamp(25%, 30%, 35%);
  right: clamp(5%, 10%, 30%);
  transform: translateY(-50%);
  z-index: 150;
  width: auto;
  height: auto;
  padding: clamp(8px, 1vw, 12px) clamp(16px, 2.5vw, 24px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  font-size: clamp(0.9rem, 1.6vw, 1.2rem);
  font-family: 'Inter', monospace;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  line-height: 1;
  border-radius: 8px;
  backdrop-filter: blur(12px);
  animation: buttonEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 3.5s forwards;
  opacity: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
}

.effect-button svg {
  width: clamp(16px, 2vw, 20px);
  height: clamp(16px, 2vw, 20px);
  flex-shrink: 0;
}

.effect-button .button-text {
  font-size: clamp(0.8rem, 1.4vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.effect-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: left 0.5s ease;
}

.effect-button:hover {
  transform: translateY(-50%) translateY(-2px) scale(2);
}

.effect-button:hover::before {
  left: 100%;
}

.effect-button:active {
  transform: translateY(-50%) translateY(0) scale(1.09);
}

@keyframes buttonEntrance {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8) translateX(20px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1.1) translateX(-2px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1) translateX(0);
  }
}

/* Removed glow animation for cleaner look */

/* Removed gradient-move animation for cleaner look */

.main-title {
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.0;
  margin-bottom: 0.05em;
  font-family: var(--font-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
  font-weight: 400;
  color: var(--brand-cyan);
  line-height: 1.1;
  font-family: var(--font-primary);
  letter-spacing: 0.01em;
  margin-bottom: 0.2rem;
}

.hero-description {
  font-size: 0.95rem;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #999999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin: 0.3rem 0 0.8rem 0;
  max-width: 450px;
  font-family: var(--font-primary);
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.cta-primary {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid;
  border-image: linear-gradient(135deg, var(--brand-purple-80), var(--brand-cyan-80), var(--brand-green-80)) 1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.7rem 1.4rem;
  border-radius: 9px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: all 0.3s cubic-bezier(.4,1,.7,1.2);
  font-family: var(--font-primary);
}

.cta-primary:hover {
  border-image: linear-gradient(135deg, var(--brand-purple), var(--brand-cyan), var(--brand-green)) 1;
  transform: translateY(-1px);
}

.hero-secondary-cta {
  margin-top: 0.7rem;
}

.see-how-link {
  color: var(--brand-cyan);
  text-decoration: none;
  font-size: 0.75rem;
  font-family: var(--font-primary);
  transition: color 0.3s ease;
}

.see-how-link:hover {
  color: white;
  -webkit-text-fill-color: white;
  background: none;
}

/* Removed comma styling */

canvas {
  z-index: 0;
  pointer-events: none;
}
</style>
