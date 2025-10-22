<template>
  <section id="hero" class="hero" @wheel="handleWheelScroll">
    <!-- Background image instead of video -->
    <div class="hero-background-image"></div>
    
    <div class="hero-content-left">

      
      <h1 class="animate-title">
        <span class="main-title">Inteligencia Artificial</span><br />
        <span class="subtitle">para empresas que buscan resultados reales</span>
      </h1>
      <p class="hero-description animate-description">
        Desarrollamos soluciones de IA personalizadas que optimizan procesos, 
        mejoran la eficiencia y generan valor tangible para su organización.
      </p>
      <div class="hero-actions animate-actions">
        <button class="cta-primary" @click="scrollToContact">
          Quiero mi solución IA
        </button>
      </div>
      <div class="hero-secondary-cta animate-secondary">
        <a href="#expertise" class="see-how-link" @click="scrollToExpertise">
          Conocer nuestros servicios ↓
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
  
  // Trigger entrance animations after a short delay
  setTimeout(() => {
    const elements = [
      document.querySelector('.animate-title'),
      document.querySelector('.animate-description'),
      document.querySelector('.animate-actions'),
      document.querySelector('.animate-secondary'),
      document.querySelector('.animate-effect')
    ]
    
    elements.forEach(el => {
      if (el && el instanceof HTMLElement) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0) translateX(0) scale(1) translateZ(0)'
      }
    })
  }, 200)
})

// Lazy load audio effect only when needed (not on mobile)
if (window.innerWidth > 768) {
  import('@/assets/effects/audio-reactive-water.js').then(() => {
    // La función updateBaseRadius ya se ejecuta automáticamente en el módulo
    console.log('Audio effect loaded successfully')
  }).catch(() => {
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

</script>

<style>
/* Fonts are now loaded via preload in index.html for better performance */

.hero {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  grid-template-areas: "content visual";
  align-items: center;
  min-height: 90vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
  padding: 0 clamp(2rem, 5vw, 4rem);
  font-family: var(--font-primary);
  gap: clamp(2rem, 4vw, 4rem);
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
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  z-index: 2;
  max-width: 100%;
  padding-right: 1rem;
  padding-left: clamp(2rem, 6vw, 6rem);
  gap: 0.8rem;
}

.hero-effect-right {
  grid-area: visual;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
  height: 90vh;
  overflow: visible;
  padding: clamp(2rem, 4vw, 4rem);
  padding-right: 0;
  padding-top: 3vh;
  box-sizing: border-box;
}

/* Entrance animations - Enhanced with fluid motion */
.animate-title {
  opacity: 0;
  transform: translateY(40px) translateZ(0);
  transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-description {
  opacity: 0;
  transform: translateY(30px) translateZ(0);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-actions {
  opacity: 0;
  transform: translateY(25px) scale(0.95) translateZ(0);
  transition: opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: 0.4s;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-secondary {
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.6s;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-effect {
  opacity: 0;
  transform: translateX(40px) scale(0.9) translateZ(0);
  transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.3s;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}



#container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: min(65vw, 90vh);
  max-height: min(65vw, 90vh);
  aspect-ratio: 1;
}

/* Tamaño para tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  #container {
    max-width: min(68vw, 80vh);
    max-height: min(68vw, 80vh);
  }
}

/* Tamaño específico para notebooks */
@media (min-width: 1024px) and (max-width: 1440px) {
  #container {
    max-width: min(62vw, 85vh);
    max-height: min(62vw, 85vh);
  }
}

/* Tamaño para pantallas muy grandes */
@media (min-width: 1440px) {
  #container {
    max-width: min(58vw, 80vh);
    max-height: min(58vw, 80vh);
  }
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
  position: absolute;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  top: 15%;
  right: 15%;
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
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.05;
  margin-bottom: 0;
  font-family: var(--font-primary);
  letter-spacing: -0.02em;
}

/* Light mode: remove gradient, use solid color */
:root[data-theme="light"] .main-title {
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  color: #1a1a1a;
}

.subtitle {
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  font-weight: 300;
  color: var(--text-secondary);
  line-height: 1.25;
  font-family: var(--font-primary);
  letter-spacing: 0.01em;
  margin-bottom: 0;
  opacity: 0.85;
  white-space: normal;
}

.hero-description {
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
  max-width: 450px;
  font-family: var(--font-primary);
  font-weight: 300;
  opacity: 0.8;
}

.hero-actions {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.cta-primary {
  background: var(--bg-primary);
  color: var(--color-white);
  border: 2px solid;
  border-image: linear-gradient(90deg, var(--color-blue-light), var(--color-blue)) 1;
  padding: 0.9rem 1.8rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
  box-shadow: 0 4px 12px rgba(49, 204, 240, 0.2);
  letter-spacing: 0.01em;
  position: relative;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(49, 204, 240, 0.4);
  border-image: linear-gradient(90deg, var(--color-blue-light), var(--color-blue)) 1;
}

.hero-secondary-cta {
  margin-top: 0;
}

.see-how-link {
  color: var(--button-primary);
  text-decoration: none;
  font-size: 0.85rem;
  font-family: var(--font-primary);
  font-weight: 300;
  transition: color 0.3s ease;
  letter-spacing: 0.01em;
}

.see-how-link:hover {
  color: var(--button-accent);
}

/* Removed comma styling */

canvas {
  z-index: 0;
  pointer-events: none;
}

/* Light mode button styles */
:root[data-theme="light"] .cta-primary {
  background: var(--bg-primary);
  color: var(--color-white);
  border: 2px solid;
  border-image: linear-gradient(90deg, var(--color-blue-light), var(--color-blue)) 1;
  box-shadow: 0 4px 12px rgba(51, 157, 191, 0.3);
}

:root[data-theme="light"] .cta-primary:hover {
  box-shadow: 0 6px 20px rgba(51, 157, 191, 0.4);
  border-image: linear-gradient(90deg, var(--color-blue-light), var(--color-blue)) 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "visual"
      "content";
    padding: 2rem 1rem;
    min-height: auto;
    gap: 2rem;
  }
  
  .hero-content-left {
    grid-area: content;
    text-align: center;
    align-items: center;
    padding-right: 0;
    max-width: none;
  }
  
  .hero-effect-right {
    grid-area: visual;
    height: 350px;
    order: -1;
    padding-right: 0;
    justify-content: center;
  }
  
  #container {
    max-width: 320px;
    max-height: 320px;
  }
  
  .effect-button {
    top: 8%;
    right: 5%;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
  
  .hero-effect-right {
    height: 300px;
  }
  
  #container {
    max-width: 280px;
    max-height: 280px;
  }
  
  .effect-button {
    top: 6%;
    right: 3%;
  }
  
  .subtitle {
    font-size: clamp(0.9rem, 4vw, 1.2rem);
    white-space: nowrap;
  }
}
</style>
