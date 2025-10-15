 s<template>
  <section id="hero-mobile" class="hero-mobile" @wheel="handleWheelScroll">
    <div class="hero-content-mobile">
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initMobileOptimizations, preloadImage } from '../utils/mobileOptimization'

// Simplified state for mobile
const isScrolling = ref(false)

// Scroll functions
const scrollToContact = () => {
  const contactSection = document.querySelector('#contact')
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
  const heroSection = document.getElementById('hero-mobile')
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

onMounted(() => {
  // Initialize mobile optimizations
  initMobileOptimizations()
  
  // Preload critical images for mobile
  preloadImage('/assets/image/optimized/llms-mobile.webp')
  preloadImage('/assets/image/optimized/vision-mobile.webp')
  preloadImage('/assets/image/optimized/analysis-mobile.webp')
  
  // Trigger entrance animations with reduced delay for better performance
  requestAnimationFrame(() => {
    const titleEl = document.querySelector('.animate-title')
    const descriptionEl = document.querySelector('.animate-description')
    const actionsEl = document.querySelector('.animate-actions')
    const secondaryEl = document.querySelector('.animate-secondary')
    
    if (titleEl) titleEl.classList.add('animate-in')
    if (descriptionEl) descriptionEl.classList.add('animate-in')
    if (actionsEl) actionsEl.classList.add('animate-in')
    if (secondaryEl) secondaryEl.classList.add('animate-in')
  })
})
</script>

<style scoped>
/* Mobile First Design */
.hero-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
  font-family: var(--font-primary);
  padding: 12rem 1rem 1.5rem;
  text-align: center;
}

.hero-content-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  max-width: 100%;
  width: 100%;
  padding: 0 0.5rem;
  gap: 0.5rem;
}

/* Optimized entrance animations for mobile - NO REFLOWS */
.animate-title {
  opacity: 0;
  transform: translateY(30px) translateZ(0);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-description {
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-actions {
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-secondary {
  opacity: 0;
  transform: translateY(15px) translateZ(0);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.main-title {
  font-size: clamp(2.8rem, 9vw, 4.2rem);
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 0.95;
  margin-bottom: 0.1em;
  font-family: var(--font-primary);
  letter-spacing: -0.03em;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}

.subtitle {
  font-size: clamp(1.2rem, 4.5vw, 1.6rem);
  font-weight: 400;
  color: var(--brand-cyan);
  line-height: 1.15;
  font-family: var(--font-primary);
  letter-spacing: 0.02em;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.hero-description {
  font-size: clamp(1rem, 4vw, 1.15rem);
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #999999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.5;
  margin: 1.2rem 0 1.8rem 0;
  max-width: 100%;
  font-family: var(--font-primary);
  font-weight: 400;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  padding: 0 0.5rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  width: 100%;
}

.cta-primary {
  background: rgba(0, 0, 0, 0.3);
  color: var(--text-primary);
  border: 1.5px solid;
  border-image: linear-gradient(135deg, var(--brand-purple-80), var(--brand-cyan-80), var(--brand-green-80)) 1;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: clamp(0.9rem, 3.5vw, 1rem);
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-primary);
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 48px;
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  padding: 1.5px;
  background: linear-gradient(135deg, 
    var(--brand-purple), 
    var(--brand-cyan), 
    var(--brand-green), 
    var(--brand-purple)
  );
  background-size: 300% 300%;
  animation: gradientMove 3s ease infinite;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  z-index: -1;
  will-change: background-position;
}

.cta-primary:hover {
  transform: translateY(-2px) translateZ(0);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.hero-secondary-cta {
  margin-top: 0.5rem;
}

.see-how-link {
  color: var(--brand-cyan);
  text-decoration: none;
  font-size: clamp(0.8rem, 3vw, 0.9rem);
  font-family: var(--font-primary);
  transition: color 0.3s ease;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  font-weight: 400;
}

.see-how-link:hover {
  color: white;
  -webkit-text-fill-color: white;
  background: none;
}

/* Animación del gradiente del botón */
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Small Mobile Devices */
@media (max-width: 375px) {
  .main-title {
    font-size: clamp(2.4rem, 8.5vw, 3.2rem);
  }
  
  .subtitle {
    font-size: clamp(1.1rem, 4.2vw, 1.4rem);
  }
  
  .hero-description {
    font-size: clamp(0.95rem, 3.8vw, 1.05rem);
    padding: 0 0.3rem;
  }
  
  .cta-primary {
    max-width: 280px;
    padding: 0.9rem 1.8rem;
    font-size: clamp(0.85rem, 3.2vw, 0.95rem);
  }
}

/* Tablet and Desktop Responsive */
@media (min-width: 768px) {
  .hero-mobile {
    padding: 2rem;
  }
  
  .hero-content-mobile {
    max-width: 600px;
  }
  
  .main-title {
    font-size: clamp(3rem, 6vw, 4.5rem);
  }
  
  .subtitle {
    font-size: clamp(1.3rem, 3vw, 1.7rem);
  }
  
  .hero-description {
    font-size: clamp(1.05rem, 2.5vw, 1.2rem);
    max-width: 500px;
  }
  
  .cta-primary {
    max-width: 350px;
    font-size: clamp(0.9rem, 2vw, 1rem);
    padding: 1.1rem 2.2rem;
  }
}

@media (min-width: 1024px) {
  .hero-mobile {
    padding: 3rem;
  }
  
  .hero-content-mobile {
    max-width: 700px;
  }
  
  .main-title {
    font-size: clamp(3rem, 5vw, 4.5rem);
  }
  
  .subtitle {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  }
  
  .hero-description {
    font-size: clamp(1.1rem, 2vw, 1.2rem);
    max-width: 550px;
  }
  
  .cta-primary {
    max-width: 350px;
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    padding: 1rem 2rem;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .hero-content-mobile {
    max-width: 800px;
  }
  
  .main-title {
    font-size: clamp(3.8rem, 4vw, 5.2rem);
  }
  
  .subtitle {
    font-size: clamp(1.7rem, 2vw, 2.1rem);
  }
  
  .hero-description {
    font-size: clamp(1.25rem, 1.8vw, 1.4rem);
    max-width: 650px;
  }
  
  .cta-primary {
    max-width: 380px;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    padding: 1.2rem 2.5rem;
  }
}
</style>
