<template>
  <section id="ai-expertise" class="section-padding">
    <div class="container">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 gradient-text-primary">
          Explora Nuestra Expertise
        </h2>
        <p class="text-xl gradient-text-gray-white max-w-4xl mx-auto leading-relaxed text-justify">
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
                <img :src="item.image" :alt="item.title" class="card-image">
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
import cubo from '@/assets/image/llms.webp'
import flower from '@/assets/image/vision.webp'
import prisma from '@/assets/image/analysis.webp'
import rings from '@/assets/image/mlops.webp'
import sphere from '@/assets/image/paraboloide.webp'
import torus from '@/assets/image/toroide.webp'

const expertiseItems = [
  {
    title: 'LLMs y RAG',
    description: 'Implementa LLMs y sistemas de recuperación de información en tiempo real para desarrollar agentes de IA, co-pilotos y herramientas de soporte de decisiones con funcionalidad precisa y consciente del contexto.',
    image: cubo
  },
  {
    title: 'Visión por computadora',
    description: 'Utiliza reconocimiento de imágenes, modelado 3D y detección de defectos para impulsar la innovación en sistemas autónomos y manufactura de precisión.',
    image: flower
  },
  {
    title: 'Análisis predictivo',
    description: 'Aplica analytics avanzado para mantenimiento predictivo, detección de anomalías y pronóstico de demanda para optimizar el rendimiento del sistema y resultados del negocio.',
    image: prisma
  },
  {
    title: 'MLOps',
    description: 'Automatiza workflows de ML, desde entrenamiento de modelos hasta pipelines de CI/CD y monitoreo, para asegurar sistemas de IA escalables y resilientes en producción.',
    image: rings
  },
  {
    title: 'Soluciones Edge',
    description: 'Integra IA en el edge para procesamiento de baja latencia en redes IoT, sistemas embebidos y monitoreo remoto bajo restricciones de recursos.',
    image: sphere
  },
  {
    title: 'Consultoría en IA',
    description: 'Estrategia y consultoría en IA para ayudarte a definir tu roadmap tecnológico y maximizar el ROI de tus inversiones en inteligencia artificial.',
    image: torus
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

.mb-4 {
  margin-bottom: 1rem;
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

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
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

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-8 {
  gap: 2rem;
}

.w-16 {
  width: 4rem;
}

.h-16 {
  height: 4rem;
}

.w-12 {
  width: 3rem;
}

.h-12 {
  height: 3rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-white {
  color: white;
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
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.05);
}

.scroll-arrow {
  animation: slide-right 1.5s ease-in-out infinite;
}

.scroll-text {
  white-space: nowrap;
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
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(51, 62, 173, 0.3);
}

.expertise-card:hover {
  border: 1.5px solid transparent;
  border-image: linear-gradient(135deg, #333ead, #31ccf0, #00ffbf) 1;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
  transition: all 0.3s ease;
  z-index: 2;
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
  background: rgba(17, 24, 39, 0.205);
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  z-index: 1;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.overlay-content {
  text-align: center;
  color: white;
  width: 100%;
}

/* Hover Effects */
.expertise-card:hover .card-front {
  opacity: 0;
  transform: translateY(-100%);
}

.expertise-card:hover .card-overlay {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:text-5xl {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Gradient Text classes are now imported from global styles */
</style> 