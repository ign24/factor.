<template>
  <section id="about" class="about-factor">
    <div class="container">
      <div class="about-content" :class="{ 'animate-in': isVisible }">
        <div class="about-text">
          <h2 class="section-title">Conócenos, nuestro liderazgo, dirección de desarrollo y por qué nos llamamos expertos en IA aplicada.</h2>
          <div class="manifesto">
            <p class="manifesto-text gradient-text-gray-white">
              Somos un equipo apasionado de ingenieros y expertos en IA que construye sistemas inteligentes listos para producción. Nuestra misión es democratizar el acceso a la IA de alta calidad para empresas de todos los tamaños.
            </p>
            <p class="manifesto-text gradient-text-gray-white">
              Creemos en la IA que es explicable, confiable y construida para el mundo real. No nos enfocamos en la exageración de la IA — nos enfocamos en soluciones que realmente funcionan y generan valor medible.
            </p>
            <p class="manifesto-text gradient-text-gray-white">
              Nuestro enfoque combina experiencia técnica profunda con un entendimiento sólido de los desafíos empresariales. Esto nos permite entregar soluciones que no solo funcionan técnicamente, sino que también impulsan el crecimiento del negocio.
            </p>
          </div>
          <div class="about-stats">
            <div class="stat" :style="{ animationDelay: '0.1s' }">
              <span class="stat-number">50+</span>
              <span class="stat-label">Sistemas de IA desplegados</span>
            </div>
            <div class="stat" :style="{ animationDelay: '0.2s' }">
              <span class="stat-number">99.9%</span>
              <span class="stat-label">Tiempo activo promedio</span>
            </div>
            <div class="stat" :style="{ animationDelay: '0.3s' }">
              <span class="stat-number">3x</span>
              <span class="stat-label">Entrega más rápida</span>
            </div>
          </div>
        </div>
        <div class="about-visual">
          <img src="/src/assets/image/conocenos.png" alt="Conócenos">
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
  
  const section = document.querySelector('#about')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Entrance animations */
.about-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title,
.manifesto,
.about-stats,
.about-visual {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-content.animate-in .section-title,
.about-content.animate-in .manifesto,
.about-content.animate-in .about-stats,
.about-content.animate-in .about-visual {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  transition-delay: 0.1s;
}

.manifesto {
  transition-delay: 0.2s;
}

.about-stats {
  transition-delay: 0.3s;
}

.about-visual {
  transition-delay: 0.4s;
}

.stat {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-stats.animate-in .stat {
  opacity: 1;
  transform: translateY(0);
}

.about-factor {
  padding: 120px 0;
  background: rgb(4,8,9);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 6rem;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
}

.manifesto {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.manifesto-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #a0a0a0;
  line-height: 1.7;
  font-weight: 400;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--button-primary);
  line-height: 1;
}

.stat-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-top: 0.5rem;
  font-weight: 500;
}

.about-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 800px;
}

@media (max-width: 768px) {
  .about-factor {
    padding: 80px 0;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-visual {
    padding-top: 0;
    order: -1;
  }
  
  .about-visual img {
    width: 100%;
    height: 400px;
    min-height: auto;
  }
  
  .about-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  

}
</style> 