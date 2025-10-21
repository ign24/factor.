<template>
  <section id="ai-expertise" class="section-padding">
    <div class="container">
      <div class="text-center mb-16" :class="{ 'animate-in': isVisible }" ref="headerRef">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 gradient-text-primary expertise-title">
          Explora Nuestra Expertise
        </h2>
        <p class="text-xl gradient-text-gray-white max-w-4xl mx-auto leading-relaxed text-justify expertise-description">
          Aprovecha nuestra experiencia en tecnologías avanzadas: LLMs, RAG, MLOps, computer vision, edge solutions y predictive analytics. Entregamos soluciones escalables y listas para producción para optimizar workflows, mejorar decisiones y generar resultados reales.
        </p>
      </div>

      <!-- AI Expertise Cards -->
      <div class="cards-container mt-16">
        <div class="scroll-indicator" @click="scrollRight">
          <svg class="scroll-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="cards-scroll">
          <div 
            v-for="(item, index) in expertiseItems" 
            :key="index"
            class="expertise-card group"
          >
            <div class="card-front">
              <div class="icon-container">
                <ResponsiveImage
                  :base-name="item.baseName"
                  :alt="item.title"
                  :width="320"
                  :height="380"
                  :lazy="true"
                  :priority="index < 2"
                  class="card-image"
                />
              </div>
            </div>
            <div class="card-overlay">
              <div class="overlay-content">
                <h3 class="text-2xl font-bold mb-4 gradient-text-gray-white">
                  {{ item.title }}
                </h3>
                <p class="gradient-text-gray-white text-sm leading-relaxed mb-3 text-justify">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'

const isVisible = ref(false)
const headerRef = ref<HTMLElement>()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )
  
  if (headerRef.value) {
    observer.observe(headerRef.value)
  }
})

const expertiseItems = [
  {
    title: 'LLMs y RAG',
    description: 'Implementa LLMs y sistemas de recuperación de información en tiempo real para desarrollar agentes de IA, co-pilotos y herramientas de soporte de decisiones con funcionalidad precisa y consciente del contexto.',
    baseName: 'llms'
  },
  {
    title: 'Visión por computadora',
    description: 'Utiliza reconocimiento de imágenes, modelado 3D y detección de defectos para impulsar la innovación en sistemas autónomos y manufactura de precisión.',
    baseName: 'vision'
  },
  {
    title: 'Análisis predictivo',
    description: 'Aplica analytics avanzado para mantenimiento predictivo, detección de anomalías y pronóstico de demanda para optimizar el rendimiento del sistema y resultados del negocio.',
    baseName: 'analysis'
  },
  {
    title: 'MLOps',
    description: 'Automatiza workflows de ML, desde entrenamiento de modelos hasta pipelines de CI/CD y monitoreo, para asegurar sistemas de IA escalables y resilientes en producción.',
    baseName: 'mlops'
  },
  {
    title: 'Soluciones Edge',
    description: 'Integra IA en el edge para procesamiento de baja latencia en redes IoT, sistemas embebidos y monitoreo remoto bajo restricciones de recursos.',
    baseName: 'paraboloide'
  },
  {
    title: 'Consultoría en IA',
    description: 'Estrategia y consultoría en IA para ayudarte a definir tu roadmap tecnológico y maximizar el ROI de tus inversiones en inteligencia artificial.',
    baseName: 'toroide'
  }
]

const scrollRight = () => {
  const container = document.querySelector('.cards-container')
  if (container) {
    container.scrollBy({
      left: 400,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.section-padding {
  padding: 4rem 0;
  color: var(--text-primary);
  position: relative;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Dark theme background */
.dark-theme .section-padding {
  background: linear-gradient(200deg, rgb(2,5,7) 0%, rgb(4,9,11) 35%, rgb(6,11,14) 65%, rgb(3,7,9) 100%);
}

/* Light theme - Sin overlay */
.light-theme .section-padding {
  background: var(--bg-primary);
}

/* Separador superior plateado elegante - Solo en modo oscuro */
.dark-theme .section-padding::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(175, 175, 175, 0.26) 19%, 
    rgba(205, 205, 205, 0.56) 39%, 
    rgba(240, 240, 240, 0.76) 50%, 
    rgba(205, 205, 205, 0.56) 61%, 
    rgba(175, 175, 175, 0.26) 81%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante - Solo en modo oscuro */
.dark-theme .section-padding::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(155, 155, 155, 0.24) 24%, 
    rgba(185, 185, 185, 0.49) 44%, 
    rgba(205, 205, 205, 0.69) 50%, 
    rgba(185, 185, 185, 0.49) 56%, 
    rgba(155, 155, 155, 0.24) 76%, 
    transparent 100%
  );
  z-index: 2;
}

/* Modo claro - Sin overlays */
.light-theme .section-padding::before,
.light-theme .section-padding::after {
  display: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.mb-16 {
  margin-bottom: 4rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mt-16 {
  margin-top: 4rem;
}

.text-center {
  text-align: center;
}

.text-justify {
  text-align: justify;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-bold {
  font-weight: 700;
}

.leading-relaxed {
  line-height: 1.75;
}

.max-w-4xl {
  max-width: 56rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-sm {
  font-size: 0.875rem;
}

/* Cards Container Styles */
.cards-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}

/* Scroll Indicator Styles */
.scroll-indicator {
  position: absolute;
  top: 350px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #31ccf0;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 10;
  animation: pulse 2s infinite;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Dark theme scroll indicator */
.dark-theme .scroll-indicator {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.dark-theme .scroll-indicator:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.05) translateZ(0);
}

/* Light theme scroll indicator - limpio */
.light-theme .scroll-indicator {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #0096cc;
}

.light-theme .scroll-indicator:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05) translateZ(0);
}

.scroll-arrow {
  animation: slide-right 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes slide-right {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

/* Custom Scrollbar Styles */
.cards-container::-webkit-scrollbar {
  height: 6px;
}

.cards-container::-webkit-scrollbar-track {
  background: rgba(51, 62, 173, 0.1);
  border-radius: 3px;
}

.cards-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #333ead, #31ccf0, #00ffbf);
  border-radius: 3px;
}

.cards-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4a4fc7, #66e6ff, #33ffcc);
}

.cards-scroll {
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  min-width: max-content;
}

/* Expertise Card Styles */
.expertise-card {
  position: relative;
  height: 380px;
  width: 320px;
  flex-shrink: 0;
  border-radius: 0;
  overflow: hidden;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(51, 62, 173, 0.3);
  will-change: transform, box-shadow, border-color;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.expertise-card:hover {
  border: 1.5px solid transparent;
  border-image: linear-gradient(135deg, #333ead, #31ccf0, #00ffbf) 1;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-4px) translateZ(0);
}

.card-front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  display: block;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(100%) translateZ(0);
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Dark theme card overlay */
.dark-theme .card-overlay {
  background: rgba(17, 24, 39, 0.205);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Light theme card overlay - limpio */
.light-theme .card-overlay {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.overlay-content {
  text-align: center;
  color: white;
  width: 100%;
}

/* Hover Effects - OPTIMIZED */
.expertise-card:hover .card-front {
  opacity: 0;
  transform: translateY(-100%) translateZ(0);
}

.expertise-card:hover .card-overlay {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

/* Responsive Design */
@media (min-width: 768px) {
  .md\:text-5xl {
    font-size: 3rem;
  }
}

/* ========================================
   ENHANCED ENTRANCE ANIMATIONS
   ======================================== */

/* Header animations */
.text-center {
  opacity: 0;
  transform: translateY(40px) translateZ(0);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.text-center.animate-in {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

/* Expertise title with blur effect */
.expertise-title {
  opacity: 0;
  filter: blur(6px);
  transform: translateY(35px) translateZ(0);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              filter 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.15s;
}

.animate-in .expertise-title {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0) translateZ(0);
}

/* Expertise description */
.expertise-description {
  opacity: 0;
  transform: translateY(25px) translateZ(0);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.35s;
}

.animate-in .expertise-description {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

/* Cards entrance with stagger */
.expertise-card {
  opacity: 0;
  transform: translateY(50px) scale(0.95) translateZ(0);
  animation: card-slide-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  will-change: opacity, transform;
}

.expertise-card:nth-child(1) { animation-delay: 0.1s; }
.expertise-card:nth-child(2) { animation-delay: 0.2s; }
.expertise-card:nth-child(3) { animation-delay: 0.3s; }
.expertise-card:nth-child(4) { animation-delay: 0.4s; }
.expertise-card:nth-child(5) { animation-delay: 0.5s; }
.expertise-card:nth-child(6) { animation-delay: 0.6s; }

@keyframes card-slide-in {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) translateZ(0);
  }
}

/* Gradient Text classes are now imported from global styles */
</style> 