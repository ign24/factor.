<template>
  <section id="faqs" class="faqs">
    <div class="container">
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 class="section-title">Preguntas frecuentes.</h2>
      </div>
      
      <div class="faqs-grid" :class="{ 'animate-in': isVisible }">
        <div class="faq-item" :style="{ animationDelay: '0.1s' }">
          <h3 class="faq-question">¿Qué hace diferente a su IA de otras?</h3>
          <p class="faq-answer gradient-text-gray-white">
            Nos enfocamos en sistemas listos para producción, no prototipos. Nuestra IA está construida para despliegue real, con explicabilidad, confiabilidad e impacto de negocio medible desde el primer día.
          </p>
        </div>
        
        <div class="faq-item" :style="{ animationDelay: '0.2s' }">
          <h3 class="faq-question">¿Cuánto cuesta construir un sistema de IA?</h3>
          <p class="faq-answer gradient-text-gray-white">
            El costo varía según la complejidad, pero nuestros MVPs típicamente van de $25K a $75K. Ofrecemos precios transparentes y nos enfocamos en el ROI: cada sistema que construimos se paga solo mediante eficiencia o aumento de ingresos.
          </p>
        </div>
        
        <div class="faq-item" :style="{ animationDelay: '0.3s' }">
          <h3 class="faq-question">¿Cuánto tiempo toma construir y desplegar?</h3>
          <p class="faq-answer gradient-text-gray-white">
            Nuestros MVPs listos para producción suelen tomar de 6 a 12 semanas desde el concepto hasta el despliegue. Usamos arquitecturas probadas y componentes preconstruidos para acelerar el desarrollo sin sacrificar calidad.
          </p>
        </div>
        
        <div class="faq-item" :style="{ animationDelay: '0.4s' }">
          <h3 class="faq-question">¿Qué tecnologías utilizan?</h3>
          <p class="faq-answer gradient-text-gray-white">
            Somos agnósticos en tecnología y elegimos las mejores herramientas para cada proyecto. Nuestro stack común incluye Python, TensorFlow/PyTorch, FastAPI, React, AWS/GCP y pipelines de MLOps personalizados.
          </p>
        </div>
        
        <div class="faq-item" :style="{ animationDelay: '0.5s' }">
          <h3 class="faq-question">¿Ofrecen soporte y mantenimiento continuo?</h3>
          <p class="faq-answer gradient-text-gray-white">
            Sí. Cada sistema incluye 3 meses de soporte, monitoreo y optimización post-despliegue. Ofrecemos paquetes de mantenimiento para asegurar que tu IA siga rindiendo al máximo nivel.
          </p>
        </div>
        
        <div class="faq-item" :style="{ animationDelay: '0.6s' }">
          <h3 class="faq-question">¿Cómo miden el éxito y el ROI?</h3>
          <p class="faq-answer gradient-text-gray-white">
            Definimos KPIs claros antes de comenzar el desarrollo e incorporamos monitoreo integral en cada sistema. Tendrás dashboards en tiempo real mostrando precisión, rendimiento y métricas de impacto de negocio.
          </p>
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
  
  const section = document.querySelector('#faqs')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Entrance animations */
.section-header,
.faqs-grid {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-header.animate-in,
.faqs-grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  transition-delay: 0.1s;
}

.faqs-grid {
  transition-delay: 0.2s;
}

.faq-item {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.faqs-grid.animate-in .faq-item {
  opacity: 1;
  transform: translateY(0);
}

.faqs {
  padding: 120px 0;
  background: rgb(4,8,9);
  color: white;
}

.container {
  max-width: 1000px;
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
  line-height: 1.2;
}

.faqs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.faq-item {
  padding: 2rem;
  background: rgba(15, 88, 107, 0.05);
  border: 1px solid rgba(51, 157, 191, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: rgba(15, 88, 107, 0.1);
  border-color: rgba(51, 157, 191, 0.2);
  transform: translateY(-4px);
}

.faq-question {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.faq-answer {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #a0a0a0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .faqs {
    padding: 80px 0;
  }
  
  .faqs-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .faq-item {
    padding: 1.5rem;
  }
  
  .faq-question {
    font-size: 1.1rem;
  }
}
</style> 