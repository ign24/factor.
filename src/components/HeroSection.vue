<template>
  <section id="hero" class="hero">
    <!-- First video for seamless looping -->
    <video 
      class="hero-video-background video-1" 
      autoplay 
      muted 
      loop
      playsinline
      preload="auto"
      ref="video1Ref"
      @loadedmetadata="onVideo1Loaded"
      @timeupdate="onVideo1TimeUpdate"
      @ended="onVideo1Ended"
    >
      <source src="/src/assets/image/fondo.mp4" type="video/mp4">
    </video>
    
    <!-- Second video for seamless transition -->
    <video 
      class="hero-video-background video-2" 
      muted 
      loop
      playsinline
      preload="auto"
      ref="video2Ref"
      @loadedmetadata="onVideo2Loaded"
      @timeupdate="onVideo2TimeUpdate"
      @ended="onVideo2Ended"
    >
      <source src="/src/assets/image/fondo.mp4" type="video/mp4">
    </video>
    
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
        <a href="#expertise" class="see-how-link">
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
import { ref, onMounted, onUnmounted } from 'vue'
import '@/assets/effects/audio-reactive-water.css'

const video1Ref = ref<HTMLVideoElement>()
const video2Ref = ref<HTMLVideoElement>()
const currentVideo = ref(1)
const isTransitioning = ref(false)
const fadeDuration = 5000 // 5 segundos de transición

const onVideo1Loaded = () => {
  if (video1Ref.value) {
    video1Ref.value.currentTime = 0
    video1Ref.value.play().catch(() => {
      console.log('Video 1 autoplay prevented')
    })
  }
}

const onVideo2Loaded = () => {
  if (video2Ref.value) {
    video2Ref.value.currentTime = 0
    // Video 2 starts hidden and will be activated later
  }
}

const onVideo1TimeUpdate = () => {
  if (video1Ref.value && !isTransitioning.value) {
    const duration = video1Ref.value.duration
    const currentTime = video1Ref.value.currentTime
    
    // Start transition 5 seconds before video ends
    if (duration && currentTime >= duration - 5) {
      startTransition(2)
    }
  }
}

const onVideo2TimeUpdate = () => {
  if (video2Ref.value && !isTransitioning.value) {
    const duration = video2Ref.value.duration
    const currentTime = video2Ref.value.currentTime
    
    // Start transition 5 seconds before video ends
    if (duration && currentTime >= duration - 5) {
      startTransition(1)
    }
  }
}

const startTransition = (nextVideo: number) => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentVideo.value = nextVideo
  
  if (nextVideo === 2) {
    // Transition to video 2
    if (video2Ref.value) {
      video2Ref.value.currentTime = 0
      video2Ref.value.play().catch(() => {})
    }
    
    // Long fade transition
    if (video1Ref.value) {
      video1Ref.value.style.opacity = '0'
    }
    if (video2Ref.value) {
      video2Ref.value.style.opacity = '1'
    }
  } else {
    // Transition to video 1
    if (video1Ref.value) {
      video1Ref.value.currentTime = 0
      video1Ref.value.play().catch(() => {})
    }
    
    // Long fade transition
    if (video2Ref.value) {
      video2Ref.value.style.opacity = '0'
    }
    if (video1Ref.value) {
      video1Ref.value.style.opacity = '1'
    }
  }
  
  // Reset transition state after fade completes
  setTimeout(() => {
    isTransitioning.value = false
  }, fadeDuration)
}

const onVideo1Ended = () => {
  // Fallback if timeupdate doesn't work
  if (!isTransitioning.value) {
    startTransition(2)
  }
}

const onVideo2Ended = () => {
  // Fallback if timeupdate doesn't work
  if (!isTransitioning.value) {
    startTransition(1)
  }
}

const scrollToProjects = () => {
  document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' })
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

onMounted(() => {
  // Initialize dual video system
  if (video1Ref.value && video2Ref.value) {
    // Set initial states
    video1Ref.value.loop = true
    video1Ref.value.muted = true
    video1Ref.value.playsInline = true
    video1Ref.value.currentTime = 0
    
    video2Ref.value.loop = true
    video2Ref.value.muted = true
    video2Ref.value.playsInline = true
    video2Ref.value.currentTime = 0
    
    // Video 1 starts visible, video 2 hidden
    if (video1Ref.value) {
      video1Ref.value.style.opacity = '1'
    }
    if (video2Ref.value) {
      video2Ref.value.style.opacity = '0'
    }
  }

  // Add entrance animations
  const animateElements = () => {
    const title = document.querySelector('.animate-title') as HTMLElement
    const description = document.querySelector('.animate-description') as HTMLElement
    const actions = document.querySelector('.animate-actions') as HTMLElement
    const secondary = document.querySelector('.animate-secondary') as HTMLElement
    const effect = document.querySelector('.animate-effect') as HTMLElement

    if (title) {
      title.style.opacity = '1'
      title.style.transform = 'translateY(0)'
    }

    setTimeout(() => {
      if (description) {
        description.style.opacity = '1'
        description.style.transform = 'translateY(0)'
      }
    }, 300)

    setTimeout(() => {
      if (actions) {
        actions.style.opacity = '1'
        actions.style.transform = 'translateY(0)'
      }
    }, 600)

    setTimeout(() => {
      if (secondary) {
        secondary.style.opacity = '1'
        secondary.style.transform = 'translateY(0)'
      }
    }, 900)

    setTimeout(() => {
      if (effect) {
        effect.style.opacity = '1'
        effect.style.transform = 'translateX(0) scale(1)'
      }
    }, 1200)
  }

  // Start animations after a brief delay
  setTimeout(animateElements, 200)

  // Import the audio effect
  import('@/assets/effects/audio-reactive-water.js').catch(() => {
    console.warn('Audio effect module not found')
  })

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
})

onUnmounted(() => {
  if (video1Ref.value) {
    video1Ref.value.pause()
    video1Ref.value.currentTime = 0
  }
  if (video2Ref.value) {
    video2Ref.value.pause()
    video2Ref.value.currentTime = 0
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
  gap: clamp(10px, 3vw, 20px);
  font-family: var(--font-primary);
}

.hero-video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  transition: opacity 5s ease-in-out;
}

.video-1 {
  opacity: 1;
  z-index: -1;
}

.video-2 {
  opacity: 0;
  z-index: -2;
}

.hero-content-left {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  padding-left: clamp(5vw, 15vw, 20vw);
  padding-top: clamp(5vh, 5vh, 20vh);
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
  padding-right: clamp(25vw, 30vw, 35vw);
  margin-left: -10vw;
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
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 150;
  width: auto;
  height: auto;
  padding: 4px 8px;
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  font-family: 'Inter', monospace;
  font-weight: 400;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 1;
}

.effect-button:hover {
  opacity: 0.8;
}

/* Removed glow animation for cleaner look */

/* Removed gradient-move animation for cleaner look */

.main-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 0.4em;
  font-family: var(--font-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: 400;
  color: var(--brand-cyan);
  line-height: 1.3;
  font-family: var(--font-primary);
  letter-spacing: 0.01em;
}

.hero-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 1.2rem 0 1.5rem 0;
  max-width: 500px;
  font-family: var(--font-primary);
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.cta-primary {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid;
  border-image: linear-gradient(135deg, var(--brand-purple-80), var(--brand-cyan-80), var(--brand-green-80)) 1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,1,.7,1.2);
  font-family: var(--font-primary);
}

.cta-primary:hover {
  border-image: linear-gradient(135deg, var(--brand-purple), var(--brand-cyan), var(--brand-green)) 1;
  transform: translateY(-1px);
}

.cta-secondary {
  background: rgba(49,204,240,0.13);
  color: #fff;
  border: 1.5px solid rgba(49,204,240,0.35);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 16px 0 rgba(49,204,240,0.10);
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}

.cta-secondary:hover {
  background: rgba(49, 205, 240, 0.752);
  box-shadow: 0 4px 24px 0 rgba(49, 205, 240, 0.819);
}

.hero-secondary-cta {
  margin-top: 0.8rem;
}

.see-how-link {
  color: var(--brand-cyan);
  text-decoration: none;
  font-size: 0.8rem;
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
