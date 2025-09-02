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
                <path d="M9 19V13H15V19M19 7H5V19H19V7M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Plataforma de Trading Inteligente</h3>
            <p class="case-description gradient-text-gray-white">
              Desarrollamos un sistema multi-agente que combina análisis técnico, volumen y sentimiento de mercado para simular estrategias de trading en tiempo real.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">12</span>
                <span class="metric-label">Indicadores técnicos</span>
              </div>
              <div class="metric">
                <span class="metric-value">8</span>
                <span class="metric-label">Agentes especializados</span>
              </div>
              <div class="metric">
                <span class="metric-value">100%</span>
                <span class="metric-label">Resultados auditables</span>
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
            <h3 class="case-title">Detección de Fraude en Blockchain</h3>
            <p class="case-description gradient-text-gray-white">
              Creamos un MVP que utiliza Graph Neural Networks para analizar transacciones cripto y detectar comportamientos sospechosos en wallets y subgrafos.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">100K+</span>
                <span class="metric-label">Transacciones analizadas</span>
              </div>
              <div class="metric">
                <span class="metric-value">3</span>
                <span class="metric-label">Tipos de anomalías</span>
              </div>
              <div class="metric">
                <span class="metric-value">5</span>
                <span class="metric-label">Blockchains soportadas</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-study" :style="{ animationDelay: '0.3s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 2C13.0909 2 14.1761 2.23279 15.1867 2.68508C16.1974 3.13738 17.1098 3.80031 17.8746 4.63604C18.6394 5.47177 19.2379 6.46392 19.6297 7.55544C20.0215 8.64696 20.1999 9.81811 20.1529 10.9892C20.1059 12.1603 19.8346 13.3023 19.3543 14.3543C18.874 15.4063 18.1947 16.3485 17.3534 17.1213C16.5121 17.8941 15.5276 18.4819 14.4563 18.8501C13.385 19.2183 12.2478 19.3599 11.1104 19.2663C9.973 19.1727 8.85752 18.8451 7.82151 18.2988L2 22L5.299 20.1189C4.32944 19.3603 3.52331 18.4068 2.92844 17.3147C2.33358 16.2226 1.96379 15.0126 1.84082 13.7674C1.71785 12.5221 1.84435 11.2625 2.21219 10.0564C2.58004 8.85035 3.18362 7.72063 3.99454 6.72628C4.80546 5.73192 5.80962 4.89008 6.95843 4.2454C8.10724 3.60072 9.37799 3.16625 10.7 2.97" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Análisis Crítico de Contenido Digital</h3>
            <p class="case-description gradient-text-gray-white">
              Un sistema que examina noticias y artículos para detectar sesgos narrativos y lenguaje emocional, con visualización interactiva para usuarios.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">95%</span>
                <span class="metric-label">Precisión en clasificación</span>
              </div>
              <div class="metric">
                <span class="metric-value">5</span>
                <span class="metric-label">Categorías de tono</span>
              </div>
              <div class="metric">
                <span class="metric-value">RAG</span>
                <span class="metric-label">Fuentes verificables</span>
              </div>
            </div>
          </div>
        </div>

        <div class="case-study" :style="{ animationDelay: '0.4s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Buscador Cultural Personalizado</h3>
            <p class="case-description gradient-text-gray-white">
              Construimos un recomendador que genera perfiles culturales y conecta usuarios con eventos, marcas y comunidades afines a sus intereses.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">1</span>
                <span class="metric-label">Click para perfiles</span>
              </div>
              <div class="metric">
                <span class="metric-value">2s</span>
                <span class="metric-label">Tiempo recomendaciones</span>
              </div>
              <div class="metric">
                <span class="metric-value">3x</span>
                <span class="metric-label">Engagement</span>
              </div>
            </div>
          </div>
        </div>

        <div class="case-study" :style="{ animationDelay: '0.5s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19V13H15V19M19 7H5V19H19V7M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9H15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Inteligencia Económica Automatizada</h3>
            <p class="case-description gradient-text-gray-white">
              Dashboard que procesa datos de fuentes oficiales y genera reportes claros sobre la situación económica en Argentina y la región.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">50+</span>
                <span class="metric-label">Indicadores macro</span>
              </div>
              <div class="metric">
                <span class="metric-value">24h</span>
                <span class="metric-label">Actualización automática</span>
              </div>
              <div class="metric">
                <span class="metric-value">2</span>
                <span class="metric-label">Idiomas + 3 monedas</span>
              </div>
            </div>
          </div>
        </div>

        <div class="case-study" :style="{ animationDelay: '0.6s' }">
          <div class="case-image">
            <div class="image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 15H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 19H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="case-content">
            <h3 class="case-title">Gestión Predictiva de E-Commerce</h3>
            <p class="case-description gradient-text-gray-white">
              MVP que aplica machine learning para prever demanda, optimizar inventario y personalizar recomendaciones en tiendas online.
            </p>
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-value">90%</span>
                <span class="metric-label">Precisión predicción</span>
              </div>
              <div class="metric">
                <span class="metric-value">40%</span>
                <span class="metric-label">Reducción quiebres</span>
              </div>
              <div class="metric">
                <span class="metric-value">ML</span>
                <span class="metric-label">Recomendaciones</span>
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

.section-header { transition-delay: 0.1s; }
.cases-grid { transition-delay: 0.2s; }

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
  background: linear-gradient(135deg, rgb(4,8,9) 0%, rgb(8,16,20) 50%, rgb(4,8,9) 100%);
  color: white;
  position: relative;
}

.case-studies::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(51, 157, 191, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(15, 88, 107, 0.02) 0%, transparent 50%);
  pointer-events: none;
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
  max-width: 1100px;
  margin: 0 auto;
  text-align: justify;
  text-justify: inter-word;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
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
  text-align: justify;
  text-justify: inter-word;
}

.case-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  justify-items: center;
  align-items: center;
}

.metric {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.metric-value {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--button-primary);
  line-height: 1;
  margin-bottom: 0.5rem;
  min-height: 1.7rem;
}

.metric-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #a0a0a0;
  line-height: 1.3;
  text-align: center;
  max-width: 100%;
}

@media (max-width: 768px) {
  .case-studies {
    padding: 80px 0;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 100%;
  }
  
  .case-content {
    padding: 1.5rem;
  }
  
  .case-metrics {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .metric-value {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
  
  .metric-label {
    font-size: 0.75rem;
    line-height: 1.2;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 