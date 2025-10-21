 s<template>
  <section id="hero-mobile" class="hero-mobile">
    <div class="hero-content-mobile">
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

// Función de scroll removida - ya no se usa en móviles

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
  padding: 10rem 0.8rem 1.5rem;
  text-align: center;
  box-sizing: border-box;
}

.hero-content-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  max-width: 100%;
  width: 100%;
  padding: 0 0.2rem;
  gap: 0.3rem;
  box-sizing: border-box;
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
  font-size: clamp(2.2rem, 7vw, 3.5rem);
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 0.2em;
  font-family: var(--font-primary);
  letter-spacing: -0.02em;
  word-break: break-word;
  hyphens: auto;
}

.subtitle {
  font-size: clamp(1rem, 3.5vw, 1.4rem);
  font-weight: 400;
  color: var(--brand-cyan);
  line-height: 1.2;
  font-family: var(--font-primary);
  letter-spacing: 0.01em;
  margin-bottom: 0.4rem;
  word-break: break-word;
  hyphens: auto;
}

.hero-description {
  font-size: clamp(0.9rem, 3.5vw, 1.1rem);
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #999999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;
  margin: 1rem 0 1.5rem 0;
  max-width: 100%;
  font-family: var(--font-primary);
  font-weight: 400;
  text-align: justify;
  padding: 0 0.3rem;
  word-break: break-word;
  hyphens: auto;
}

/* Light mode: make description completely black */
.light-theme .hero-description {
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: black;
  background-clip: unset;
  color: black;
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
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: clamp(0.85rem, 3vw, 0.95rem);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-primary);
  width: 100%;
  max-width: 280px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 44px;
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-sizing: border-box;
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
  pointer-events: none;
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

/* Extra Small Mobile Devices */
@media (max-width: 320px) {
  .hero-mobile {
    padding: 7rem 0.3rem 0.8rem;
  }
  
  .hero-content-mobile {
    padding: 0 0.05rem;
    gap: 0.15rem;
  }
  
  .main-title {
    font-size: clamp(1.6rem, 5.5vw, 2.4rem);
    line-height: 1.2;
  }
  
  .subtitle {
    font-size: clamp(0.8rem, 2.8vw, 1.1rem);
    line-height: 1.3;
  }
  
  .hero-description {
    font-size: clamp(0.75rem, 2.8vw, 0.95rem);
    padding: 0 0.15rem;
    line-height: 1.3;
    margin: 0.6rem 0 1rem 0;
  }
  
  .cta-primary {
    max-width: 240px;
    padding: 0.7rem 1rem;
    font-size: clamp(0.75rem, 2.5vw, 0.85rem);
    min-height: 40px;
  }
}

/* Small Mobile Devices */
@media (max-width: 375px) {
  .hero-mobile {
    padding: 8rem 0.5rem 1rem;
  }
  
  .hero-content-mobile {
    padding: 0 0.1rem;
    gap: 0.2rem;
  }
  
  .main-title {
    font-size: clamp(1.8rem, 6vw, 2.8rem);
    line-height: 1.15;
  }
  
  .subtitle {
    font-size: clamp(0.9rem, 3vw, 1.2rem);
    line-height: 1.25;
  }
  
  .hero-description {
    font-size: clamp(0.8rem, 3vw, 1rem);
    padding: 0 0.2rem;
    line-height: 1.35;
    margin: 0.8rem 0 1.2rem 0;
  }
  
  .cta-primary {
    max-width: 260px;
    padding: 0.8rem 1.2rem;
    font-size: clamp(0.8rem, 2.8vw, 0.9rem);
    min-height: 42px;
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
