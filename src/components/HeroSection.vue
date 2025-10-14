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
    <button id="audioBtn" class="effect-button"></button>
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
    // Set initial text
    audioBtn.textContent = '[ play ]'
    
    audioBtn.addEventListener('click', () => {
      const button = audioBtn as HTMLElement
      const isPlaying = button.getAttribute('data-playing') === 'true'
      
      if (isPlaying) {
        button.textContent = '[ play ]'
        button.setAttribute('data-playing', 'false')
      } else {
        button.textContent = '[ stop ]'
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
  max-height: clamp(25px, 4vw, 30px);
  position: relative;
  z-index: 0;
  padding-right: clamp(15vw,20vw,30vw);
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
  background: black;
  border: none;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  position: absolute;
  top: clamp(25%, 30%, 35%);
  right: clamp(10%, 15%, 20%);
  transform: translateY(-50%);
  z-index: 150;
  width: auto;
  height: auto;
  padding: clamp(4px, 0.5vw, 8px) clamp(6px, 1vw, 12px);
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-size: clamp(0.8rem, 1.5vw, 1.1rem);
  font-family: 'Inter', monospace;
  font-weight: 300;
  white-space: nowrap;
  letter-spacing: clamp(0.3px, 0.5px, 0.7px);
  text-align: center;
  line-height: 1;
  animation: buttonEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateY(-50%) scale(0.8) translateX(20px);
}

.effect-button:hover {
  opacity: 0.8;
  transform: translateY(-50%) scale(1.05);
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
