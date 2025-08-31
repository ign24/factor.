<template>
  <section id="industries" class="solutions">
    <div class="container">
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 class="section-title">Soluciones Adaptadas a Tus Necesidades</h2>
        <p class="section-subtitle gradient-text-gray-white" style="text-align: justify;">
          Ya sea que seas responsable del desarrollo de productos o innovación, busques mejoras en tus operaciones de negocio, apuntes a implementar y operar IA más eficientemente, o busques un equipo de expertos en IA, estamos aquí para ayudarte.
        </p>
      </div>
      
      <div class="solutions-grid" :class="{ 'animate-in': isVisible }">
        <!-- Integra IA en tus productos -->
        <div class="solution-card" ref="card1" @mousemove="handleTilt" @mouseleave="resetTilt" tabindex="0" :style="{ animationDelay: '0.1s' }">
          <div class="card-content">
            <div class="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="card-title">Integra IA en tus productos</h3>
            <p class="card-description gradient-text-gray-white">
              Integramos IA avanzada – como LLMs, computer vision o edge AI – en tu software y hardware para mejorar la funcionalidad, impulsar el engagement y hacer tus productos a prueba de futuro.
            </p>
          </div>
          <div class="card-glow"></div>
        </div>
        
        <!-- Aplica IA a tus operaciones -->
        <div class="solution-card" ref="card2" @mousemove="handleTilt" @mouseleave="resetTilt" tabindex="0" :style="{ animationDelay: '0.2s' }">
          <div class="card-content">
            <div class="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="card-title">Aplica IA a tus operaciones</h3>
            <p class="card-description gradient-text-gray-white">
              Optimiza procesos repetitivos, mejora la toma de decisiones y mejora las interacciones con clientes. Desde automatización con IA hasta analytics predictivo, enfócate en recursos que impulsen el crecimiento.
            </p>
          </div>
          <div class="card-glow"></div>
        </div>
        
        <!-- Eleva tus operaciones de IA -->
        <div class="solution-card" ref="card3" @mousemove="handleTilt" @mouseleave="resetTilt" tabindex="0" :style="{ animationDelay: '0.3s' }">
          <div class="card-content">
            <div class="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="card-title">Eleva tus operaciones de IA</h3>
            <p class="card-description gradient-text-gray-white">
              Te ayudamos a escalarlo con foco en eficiencia y confiabilidad. Desde optimización de MLOps hasta mejorar despliegues edge, resolvemos los dolores de cabeza operacionales que te frenan.
            </p>
          </div>
          <div class="card-glow"></div>
        </div>
        
        <!-- Mejora tu equipo con nuestros expertos -->
        <div class="solution-card" ref="card4" @mousemove="handleTilt" @mouseleave="resetTilt" tabindex="0" :style="{ animationDelay: '0.4s' }">
          <div class="card-content">
            <div class="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M23 21V19C23 18.1137 22.7312 17.2528 22.2314 16.5523C21.7316 15.8519 21.0219 15.3516 20.2 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8219 3.3516 17.5316 3.8519 18.0314 4.5523C18.5312 5.2528 18.8 6.1137 18.8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="card-title">Mejora tu equipo con nuestros expertos</h3>
            <p class="card-description gradient-text-gray-white">
              Aprovecha nuestro equipo de especialistas para potenciar tus iniciativas de IA. Ya sea que estés entrenando un equipo interno o necesites potencia externa, te ayudamos a obtener resultados más rápido e inteligentemente.
            </p>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>

      <div class="cta-section" :class="{ 'animate-in': isVisible }">
        <h3 class="cta-title">¿Ya trabajas con IA pero te encuentras con obstáculos?</h3>
        <p class="cta-text gradient-text-gray-white">
          ¿No estás seguro por dónde empezar o qué casos de uso traen el mejor ROI? ¿Necesitas respuestas rápidas de expertos en IA?
        </p>
        <button class="cta-primary" @click="scrollToContact">Explorar AI Guidance</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const card1 = ref<HTMLElement>()
const card2 = ref<HTMLElement>()
const card3 = ref<HTMLElement>()
const card4 = ref<HTMLElement>()

const handleTilt = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (y - centerY) / centerY * -8
  const rotateY = (x - centerX) / centerX * 8

  target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

  const rawAngle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 90
  const currentAngle = parseFloat(target.style.getPropertyValue('--gradient-angle') || '135')
  const smoothedAngle = currentAngle + (rawAngle - currentAngle) * 0.3
  target.style.setProperty('--gradient-angle', `${smoothedAngle}deg`)
}

const resetTilt = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  target.style.setProperty('--gradient-angle', `135deg`)
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
  
  const section = document.querySelector('#industries')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
.solutions {
  padding: 120px 0;
  background: linear-gradient(160deg, rgb(3,7,8) 0%, rgb(5,10,12) 40%, rgb(7,13,16) 80%, rgb(4,8,10) 100%);
  color: white;
  position: relative;
}

/* Separador superior plateado elegante */
.solutions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(165, 165, 165, 0.28) 16%, 
    rgba(200, 200, 200, 0.58) 36%, 
    rgba(235, 235, 235, 0.78) 50%, 
    rgba(200, 200, 200, 0.58) 64%, 
    rgba(165, 165, 165, 0.28) 84%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante */
.solutions::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(145, 145, 145, 0.22) 22%, 
    rgba(175, 175, 175, 0.48) 42%, 
    rgba(195, 195, 195, 0.68) 50%, 
    rgba(175, 175, 175, 0.48) 58%, 
    rgba(145, 145, 145, 0.22) 78%, 
    transparent 100%
  );
  z-index: 2;
}

/* Entrance animations */
.section-header,
.solutions-grid,
.cta-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-header.animate-in,
.solutions-grid.animate-in,
.cta-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  line-height: 1.1;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 1100px;
  margin: 0 auto;
  line-height: 1.6;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.solution-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius-lg);
  padding: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  --gradient-angle: 135deg;
}



.solution-card:hover {
  border: 1.8px solid transparent;
  border-image: linear-gradient(135deg, #333ead, #31ccf0, #00ffbf) 1;
  transform: translateY(-4px);
}



.card-content {
  position: relative;
  z-index: 1;
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.3;
}

.card-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 400;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: var(--border-radius-lg);
  z-index: -1;
}

.solution-card:hover .card-glow {
  opacity: 0.1;
}

.cta-section {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.3;
}

.cta-text {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Button Styles */
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

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .solutions-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .solution-card {
    padding: 32px;
  }
  
  .card-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
}
</style> 