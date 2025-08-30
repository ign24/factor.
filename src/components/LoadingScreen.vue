
<template>
  <div class="loading-screen" :class="{ 'fade-out': isFadingOut }">
    <div class="loading-content">
      <!-- Logo de Factor -->
      <div class="factor-logo">
        <img src="/factor.webp" alt="Factor" />
      </div>
      
      <div class="loading-text">
        <div class="rotating-text-container">
          <span class="static-text">diseña</span>
          <span class="dynamic-word" :key="currentWordIndex">{{ currentWord }}</span>
        </div>
      </div>
      
      <div class="loading-progress">
        <div class="progress-circle">
          <svg class="progress-ring" width="120" height="120">
            <circle
              class="progress-ring-circle-bg"
              stroke="rgba(255, 255, 255, 0.1)"
              stroke-width="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              class="progress-ring-circle"
              stroke="var(--neutral-white)"
              stroke-width="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
            />
          </svg>
          <div class="progress-percentage">{{ Math.round(localProgress) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

interface Props {
  progress?: number
}

withDefaults(defineProps<Props>(), {
  progress: 0
})

const isFadingOut = ref(false)
const totalLoadingTime = 12000 // 12 segundos total para ver todas las palabras + tiempo extra
const localProgress = ref(0)

const emit = defineEmits<{
  'loading-complete': []
}>()

// Palabras dinámicas
const words = [
  "inteligencia",
  "automatización", 
  "soluciones",
  "confianza",
  "escalabilidad"
]

const currentWordIndex = ref(0)
const currentWord = ref(words[0])
let wordInterval: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let loadingTimer: ReturnType<typeof setTimeout> | null = null

// Círculo de progreso
const radius = 52
const circumference = 2 * Math.PI * radius
const strokeDashoffset = computed(() => {
  return circumference - (localProgress.value / 100) * circumference
})

// Progreso más suave y progresivo
const startProgressAnimation = () => {
  progressInterval = setInterval(() => {
    if (localProgress.value < 95) {
      // Progreso más suave y progresivo
      const remaining = 95 - localProgress.value
      const increment = Math.max(0.2, remaining * 0.03) // 3% del remanente para mayor duración
      localProgress.value += increment
    } else {
      clearInterval(progressInterval!)
    }
  }, 200) // Más lento para mayor duración
}

// Rotar palabras cada 2.4 segundos con animaciones rápidas y simples
const startWordRotation = () => {
  wordInterval = setInterval(async () => {
    // Fade out rápido
    const dynamicWord = document.querySelector('.dynamic-word') as HTMLElement
    if (dynamicWord) {
      dynamicWord.style.opacity = '0'
      dynamicWord.style.transform = 'translateY(10px)'
    }
    
    // Esperar la animación de salida
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Cambiar palabra
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length
    currentWord.value = words[currentWordIndex.value]
    
    // Esperar el siguiente tick para que Vue actualice el DOM
    await nextTick()
    
    // Fade in rápido
    const newDynamicWord = document.querySelector('.dynamic-word') as HTMLElement
    if (newDynamicWord) {
      // Estado inicial invisible
      newDynamicWord.style.opacity = '0'
      newDynamicWord.style.transform = 'translateY(-10px)'
      
      // Aparece rápidamente
      await new Promise(resolve => setTimeout(resolve, 50))
      newDynamicWord.style.opacity = '1'
      newDynamicWord.style.transform = 'translateY(0)'
    }
  }, 2400) // 2.4 segundos para mayor duración
}

// Timer principal que controla la duración total
const startMainTimer = () => {
  loadingTimer = setTimeout(() => {
    // Completar progreso al 100%
    localProgress.value = 100
    
    // Esperar un poco más y luego hacer fade out
    setTimeout(() => {
      startFadeOut()
    }, 1500) // Esperar 1.5 segundos antes del fade out
  }, totalLoadingTime)
}

const stopWordRotation = () => {
  if (wordInterval) {
    clearInterval(wordInterval)
    wordInterval = null
  }
}

const stopProgressAnimation = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const stopMainTimer = () => {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
    loadingTimer = null
  }
}

const startFadeOut = () => {
  isFadingOut.value = true
  stopWordRotation()
  stopProgressAnimation()
  stopMainTimer()
  setTimeout(() => {
    emit('loading-complete')
  }, 800)
}

onMounted(() => {
  // Asegurar que la primera palabra tenga el estado correcto
  nextTick(() => {
    const dynamicWord = document.querySelector('.dynamic-word') as HTMLElement
    if (dynamicWord) {
      dynamicWord.style.opacity = '1'
      dynamicWord.style.transform = 'translateY(0)'
    }
  })
  
  startWordRotation()
  startProgressAnimation()
  startMainTimer()
})

onUnmounted(() => {
  stopWordRotation()
  stopProgressAnimation()
  stopMainTimer()
})

defineExpose({
  startFadeOut
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, var(--neutral-black) 0%, var(--neutral-black) 25%, var(--brand-purple-10) 50%, var(--brand-cyan-10) 75%, var(--neutral-black) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.8s ease-out;
}

/* Ocultar cualquier elemento que no deba estar en la pantalla de carga */
.loading-screen *:not(.loading-content):not(.loading-content *) {
  display: none !important;
}

.loading-screen.fade-out {
  opacity: 0;
}

.loading-content {
  text-align: center;
  color: var(--neutral-white);
  max-width: 500px;
  padding: 2rem;
}

.factor-logo {
  margin-bottom: 0.5rem;
}

.factor-logo img {
  width: 200px;
  height: auto;
}

.loading-text {
  margin-bottom: 5rem;
}

.rotating-text-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: var(--font-light);
  color: var(--neutral-white);
  letter-spacing: var(--tracking-wide);
  max-width: 650px;
  margin: 0 auto;
}

.static-text {
  opacity: 0.9;
  transition: none;
  flex-shrink: 0;
}

.dynamic-word {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  display: inline-block;
  width: 320px;
  text-align: left;
  transform-origin: center;
  will-change: opacity, transform;
  flex-shrink: 0;
  font-weight: var(--font-semibold);
}

.loading-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.progress-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle-bg {
  transition: stroke 0.3s ease;
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.6s ease-out;
}

.progress-percentage {
  position: absolute;
  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-weight: var(--font-medium);
  color: var(--neutral-white);
  opacity: 0.9;
  letter-spacing: var(--tracking-wide);
}

@media (max-width: 768px) {
  .loading-content {
    padding: 1.5rem;
    max-width: 400px;
  }
  
  .factor-logo img {
    width: 160px;
  }
  
  .loading-text {
    margin-bottom: 1rem;
  }
  
  .rotating-text-container {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .dynamic-word {
    width: auto;
    text-align: center;
  }
  
  .progress-circle {
    transform: scale(0.8);
  }
}
</style>
