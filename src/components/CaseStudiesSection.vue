<template>
  <section id="case-studies" class="case-studies">
    <div class="container">
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 class="section-title">Mostrando Nuestro Estado del Arte</h2>
        <p class="section-pitch gradient-text-gray-white">
          Sistemas de IA listos para producción que entregan impacto de negocio medible. Así es como hemos transformado ideas en soluciones inteligentes.
        </p>
      </div>
      
      <div class="cases-grid" :class="{ 'animate-in': isVisible }">
        <div class="case-study" :style="{ animationDelay: '0.1s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Plataforma de Análisis Predictivo</h3>
            <p class="case-description gradient-text-gray-white">
              Construimos un motor de predicción en tiempo real para una startup fintech, procesando 10M+ transacciones diarias con 99.2% de precisión.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">99.2%</span>
                <span class="metric-label">Precisión</span>
              </div>
              <div class="metric">
                <span class="metric-value">10M+</span>
                <span class="metric-label">Transacciones diarias</span>
              </div>
              <div class="metric">
                <span class="metric-value">3x</span>
                <span class="metric-label">Procesamiento más rápido</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-study" :style="{ animationDelay: '0.2s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Moderación Automatizada de Contenido</h3>
            <p class="case-description gradient-text-gray-white">
              Desarrollamos un sistema de IA para una plataforma de redes sociales que marca automáticamente contenido inapropiado con 95% de precisión.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">95%</span>
                <span class="metric-label">Precisión</span>
              </div>
              <div class="metric">
                <span class="metric-value">50K+</span>
                <span class="metric-label">Elementos/día procesados</span>
              </div>
              <div class="metric">
                <span class="metric-value">80%</span>
                <span class="metric-label">Reducción de costos</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-study" :style="{ animationDelay: '0.3s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 10H20M4 14H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Gestión Inteligente de Inventario</h3>
            <p class="case-description gradient-text-gray-white">
              Creamos un sistema de inventario inteligente para una cadena de e-commerce que predice la demanda y optimiza los niveles de stock.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">30%</span>
                <span class="metric-label">Reducción de stock</span>
              </div>
              <div class="metric">
                <span class="metric-value">25%</span>
                <span class="metric-label">Incremento en ingresos</span>
              </div>
              <div class="metric">
                <span class="metric-value">90%</span>
                <span class="metric-label">Precisión de pronóstico</span>
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

const isVisible = ref(false)

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
  
  const section = document.querySelector('#case-studies')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Entrance animations */
.section-header,
.cases-grid {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-header.animate-in,
.cases-grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  transition-delay: 0.1s;
}

.cases-grid {
  transition-delay: 0.2s;
}

.case-study {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.cases-grid.animate-in .case-study {
  opacity: 1;
  transform: translateY(0);
}

.case-studies {
  padding: 120px 0;
  background: rgb(4,8,9);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.section-pitch {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #a0a0a0;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.case-study {
  background: rgba(15, 88, 107, 0.1);
  border: 1px solid rgba(51, 157, 191, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.case-study:hover {
  background: rgba(15, 88, 107, 0.15);
  border-color: rgba(51, 157, 191, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(51, 157, 191, 0.1);
}

.case-image {
  height: 200px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.case-content {
  padding: 2rem;
}

.case-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.case-description {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #a0a0a0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.case-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--button-primary);
  line-height: 1;
}

.metric-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #a0a0a0;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .case-studies {
    padding: 80px 0;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .case-content {
    padding: 1.5rem;
  }
  
  .case-metrics {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .metric-value {
    font-size: 1.25rem;
  }
  
  .metric-label {
    font-size: 0.7rem;
  }
}
</style> 