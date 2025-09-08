<template>
  <section id="faqs" class="faqs">
    <div class="container">
      <div class="section-header" :class="{ 'animate-in': isVisible }">
        <h2 class="section-title">Preguntas frecuentes</h2>
        <p class="section-subtitle">Todo lo que necesitas saber sobre nuestras soluciones de IA empresarial de factor.</p>
      </div>
      
      <div class="faqs-container" :class="{ 'animate-in': isVisible }">
        <div class="faq-item" 
             v-for="(faq, index) in faqs" 
             :key="index"
             :class="{ 'active': activeFaq === index }"
             @click="toggleFaq(index)"
             :style="{ animationDelay: `${0.1 + index * 0.1}s` }">
          
          <div class="faq-header">
            <h3 class="faq-question">{{ faq.question }}</h3>
            <div class="faq-toggle">
              <svg class="toggle-icon" :class="{ 'rotated': activeFaq === index }" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="faq-content" :class="{ 'expanded': activeFaq === index }">
            <p class="faq-answer">{{ faq.answer }}</p>
            <div class="faq-meta" v-if="faq.meta">
              <span class="meta-tag">{{ faq.meta }}</span>
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
const activeFaq = ref<number | null>(null)

const faqs = ref([
  {
    question: "¿Qué hace factor.?",
    answer: "Diseñamos y lanzamos MVPs de IA listos para producción, con arquitectura clara, automatización real y mínimo overhead operativo. Entregamos producto, no piezas sueltas.",
    meta: "Servicios"
  },
  {
    question: "¿Cómo es el proceso?",
    answer: "Discovery → Blueprint → Build → Launch & Monitor. Definimos KPIs, diseñamos el sistema, construimos el MVP y lo dejamos operando con métricas y runbooks.",
    meta: "Proceso"
  },
  {
    question: "¿Qué recibo al final del sprint?",
    answer: "Repo privado, endpoints/API, UI mínima usable, documentación de uso y despliegue, variables seguras, pruebas de aceptación y un video de handoff.",
    meta: "Entregables"
  },
  {
    question: "¿Con qué casos trabajamos mejor?",
    answer: "Automatización con LLMs/RAG, visión por computadora, detección de fraude, dashboards ejecutivos, optimización de e-commerce y análisis predictivo.",
    meta: "Casos de uso"
  },
  {
    question: "¿Necesito equipo técnico interno?",
    answer: "No. Co-diseñamos con PMs y founders. factor. se encarga de la complejidad y deja una operación simple para tu equipo.",
    meta: "Equipo"
  },
  {
    question: "¿Cómo aseguramos calidad y explicabilidad?",
    answer: "Criterios de aceptación, métricas (latencia/precisión/cobertura) y explicabilidad operable: qué decide el sistema y por qué. Sin cajas negras.",
    meta: "Calidad"
  },
  {
    question: "¿Qué pasa si no tengo datos listos?",
    answer: "Arrancamos con un MVP de valor mínimo: fuentes públicas o datos de arranque, instrumentación y aprendizaje iterativo sobre datos reales.",
    meta: "Datos"
  },
  {
    question: "¿Cómo manejan seguridad y privacidad?",
    answer: "Mínimos privilegios, gestión de secretos, roles segregados y logging. Elegimos servicios que cumplan lo necesario sin sumar complejidad.",
    meta: "Seguridad"
  },
  {
    question: "¿Quién es dueño del código y los modelos?",
    answer: "El cliente. Con cada hito, la propiedad intelectual y los artefactos quedan a tu nombre.",
    meta: "Propiedad"
  },
  {
    question: "¿Qué pasa después del lanzamiento?",
    answer: "Launch & Monitor: tablero de métricas, alertas, retraining programado y roadmap de mejoras. factor. puede acompañar con soporte evolutivo.",
    meta: "Post-lanzamiento"
  },
  {
    question: "¿Cómo se cotiza?",
    answer: "Por alcance cerrado (MVP Sprint / MVP+ / Soporte). Cada propuesta incluye entregables, tiempos y criterios de aceptación definidos.",
    meta: "Cotización"
  },
  {
    question: "¿Por qué elegir factor.?",
    answer: "Porque entregamos soluciones de IA reales, explicables, escalables y listas para negocio. factor. no es freelance. Es inteligencia aplicada.",
    meta: "Diferenciación"
  }
])

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
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
  
  const section = document.querySelector('#faqs')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Entrance animations */
.section-header,
.faqs-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-header.animate-in,
.faqs-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-header { transition-delay: 0.1s; }
.faqs-container { transition-delay: 0.2s; }

.faq-item {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.faqs-container.animate-in .faq-item {
  opacity: 1;
  transform: translateY(0);
}

.faqs {
  padding: 120px 0;
  background: linear-gradient(135deg, rgb(6,10,12) 0%, rgb(4,8,9) 30%, rgb(8,14,16) 70%, rgb(5,9,11) 100%);
  color: white;
  position: relative;
}

/* Separador superior plateado elegante */
.faqs::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(170, 170, 170, 0.25) 18%, 
    rgba(210, 210, 210, 0.55) 38%, 
    rgba(245, 245, 245, 0.75) 50%, 
    rgba(210, 210, 210, 0.55) 62%, 
    rgba(170, 170, 170, 0.25) 82%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante */
.faqs::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(150, 150, 150, 0.2) 25%, 
    rgba(180, 180, 180, 0.45) 45%, 
    rgba(200, 200, 200, 0.65) 50%, 
    rgba(180, 180, 180, 0.45) 55%, 
    rgba(150, 150, 150, 0.2) 75%, 
    transparent 100%
  );
  z-index: 2;
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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #a0a0a0;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

.faqs-container {
  margin-bottom: 80px;
}

.faq-item {
  background: rgba(15, 88, 107, 0.03);
  border: 1px solid rgba(51, 157, 191, 0.08);
  border-radius: 16px;
  margin-bottom: 16px;
  cursor: url('/src/assets/image/puntero.png'), pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.faq-item:hover {
  background: rgba(15, 88, 107, 0.06);
  border-color: rgba(51, 157, 191, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.faq-item.active {
  background: rgba(15, 88, 107, 0.08);
  border-color: rgba(51, 157, 191, 0.25);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.faq-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  transition: all 0.3s ease;
}

.faq-question {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  padding-right: 20px;
}

.faq-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(51, 157, 191, 0.1);
  color: #33c9bf;
  transition: all 0.3s ease;
}

.faq-item:hover .faq-toggle {
  background: rgba(51, 157, 191, 0.2);
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-content.expanded {
  max-height: 200px;
}

.faq-answer {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #d0d0d0;
  line-height: 1.6;
  margin: 0 0 20px 0;
  padding: 0 28px 0 28px;
}

.faq-meta {
  padding: 0 28px 24px 28px;
}

.meta-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(51, 157, 191, 0.1) 0%, rgba(15, 88, 107, 0.1) 100%);
  border: 1px solid rgba(51, 157, 191, 0.2);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #33c9bf;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .faqs {
    padding: 80px 0;
  }
  
  .section-header {
    margin-bottom: 60px;
  }
  
  .faq-header {
    padding: 20px 24px;
  }
  
  .faq-question {
    font-size: 1rem;
    padding-right: 16px;
  }
  
  .faq-answer {
    padding: 0 24px 0 24px;
  }
  
  .faq-meta {
    padding: 0 24px 20px 24px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .faq-header {
    padding: 18px 20px;
  }
  
  .faq-question {
    font-size: 0.95rem;
  }
  
  .faq-answer {
    padding: 0 20px 0 20px;
    font-size: 0.95rem;
  }
  
  .faq-meta {
    padding: 0 20px 18px 20px;
  }
}
</style> 