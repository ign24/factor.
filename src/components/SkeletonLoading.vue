<template>
  <div class="skeleton-container" :class="{ 'fade-out': isLoaded }" v-show="!isCompleted">
    <!-- Header skeleton -->
    <div class="skeleton-header">
      <div class="skeleton-logo"></div>
      <div class="skeleton-nav">
        <div class="nav-item"></div>
        <div class="nav-item"></div>
        <div class="nav-item"></div>
        <div class="nav-item"></div>
        <div class="nav-item"></div>
        <div class="nav-item"></div>
        <div class="nav-item contact"></div>
      </div>
    </div>

    <div class="skeleton-hero">
      <!-- Contenido izquierdo - Replica exactamente hero-content-left -->
      <div class="skeleton-content-left">
        <!-- Título principal -->
        <div class="skeleton-title-main">
          <div class="title-line primary"></div>
        </div>
        
        <!-- Subtítulo -->
        <div class="skeleton-title-subtitle">
          <div class="subtitle-line"></div>
        </div>
        
        <!-- Descripción -->
        <div class="skeleton-description">
          <div class="desc-line"></div>
          <div class="desc-line"></div>
        </div>
        
        <!-- Botones de acción -->
        <div class="skeleton-actions">
          <div class="action-button primary"></div>
          <div class="action-link"></div>
        </div>
      </div>
      

    </div>

    <!-- Botón flotante de llamada -->
    <div class="skeleton-floating-button">
      <div class="phone-icon"></div>
      <div class="call-text"></div>
    </div>

    <!-- Footer skeleton -->
    <div class="skeleton-footer">
      <div class="footer-text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1500
})

const isLoaded = ref(false)
const isCompleted = ref(false)

const emit = defineEmits<{
  'skeleton-complete': []
}>()

onMounted(() => {
  // Mostrar skeleton por un tiempo mínimo para evitar parpadeo
  setTimeout(() => {
    isLoaded.value = true
    // Esperar que termine la animación de fade out antes de emitir el evento
    setTimeout(() => {
      isCompleted.value = true
      emit('skeleton-complete')
    }, 500) // Tiempo de la animación fade-out
  }, props.duration)
})

defineExpose({
  isLoaded
})
</script>

<style scoped>
.skeleton-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, var(--neutral-black) 0%, var(--neutral-black) 25%, var(--brand-purple-10) 50%, var(--brand-cyan-10) 75%, var(--neutral-black) 100%);
  z-index: 9999;
  font-family: var(--font-primary);
  opacity: 1;
  transition: opacity 0.5s ease-out;
}

.skeleton-container.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* Header skeleton */
.skeleton-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content:space-evenly;
  align-items: center;
  padding: 2rem clamp(5vw, 10vw, 15vw);
  z-index: 10;
}

.skeleton-logo {
  width: 80px;
  height: 30px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.2) 25%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.skeleton-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-item {
  width: 80px;
  height: 20px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 25%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.nav-item.contact {
  width: 100px;
  height: 35px;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.2) 25%, 
    rgba(0, 255, 255, 0.3) 50%, 
    rgba(0, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 8px;
  animation: shimmer 2s infinite;
  animation-delay: 0.3s;
}

/* Hero skeleton */
.skeleton-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: clamp(10px, 3vw, 20px);
  padding: 0 clamp(5vw, 10vw, 15vw);
}

/* Contenido izquierdo - Replica exactamente hero-content-left */
.skeleton-content-left {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: clamp(5vw, 15vw, 20vw);
  padding-top: clamp(5vh, 5vh, 20vh);
  gap: 2rem;
}

.skeleton-title-main {
  margin-bottom: 0.5rem;
}

.title-line.primary {
  width: 200px;
  height: 4rem;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.3) 25%, 
    rgba(0, 255, 255, 0.4) 50%, 
    rgba(0, 255, 255, 0.3) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.skeleton-title-subtitle {
  margin-bottom: 1rem;
}

.subtitle-line {
  width: 350px;
  height: 2.5rem;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.2) 25%, 
    rgba(0, 255, 255, 0.3) 50%, 
    rgba(0, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.2s;
}

.skeleton-description {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 500px;
  margin-bottom: 1rem;
}

.desc-line {
  height: 1.2rem;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.4s;
}

.desc-line:nth-child(1) {
  width: 100%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.08) 25%, 
    rgba(255, 255, 255, 0.15) 50%, 
    rgba(255, 255, 255, 0.08) 75%
  );
  background-size: 200% 100%;
}

.desc-line:nth-child(2) {
  width: 80%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.06) 25%, 
    rgba(255, 255, 255, 0.12) 50%, 
    rgba(255, 255, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.skeleton-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button.primary {
  width: 250px;
  height: 3.5rem;
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.3) 25%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.3) 75%
  );
  background-size: 200% 100%;
  border: 2px solid var(--brand-cyan);
  border-radius: 8px;
  animation: shimmer 2s infinite;
  animation-delay: 0.6s;
}

.action-link {
  width: 180px;
  height: 2rem;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.15) 25%, 
    rgba(0, 255, 255, 0.25) 50%, 
    rgba(0, 255, 255, 0.15) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.8s;
}

/* Efecto derecho */
.skeleton-effect-right {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: clamp(15vw, 20vw, 30vw);
  margin-left: -30vw;
}

.play-button {
  width: 120px;
  height: 40px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 25%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  border-radius: 8px;
  animation: shimmer 2s infinite;
  animation-delay: 1s;
}

/* Botón flotante de llamada */
.skeleton-floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 200px;
  height: 60px;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.2) 25%, 
    rgba(0, 255, 255, 0.3) 50%, 
    rgba(0, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 30px;
  animation: shimmer 2s infinite;
  animation-delay: 1.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.phone-icon {
  width: 20px;
  height: 20px;
  background: var(--neutral-white);
  border-radius: 50%;
  opacity: 0.8;
}

.call-text {
  width: 120px;
  height: 16px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 25%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 1.4s;
}

/* Footer skeleton */
.skeleton-footer {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.footer-text {
  width: 300px;
  height: 16px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.05) 25%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 1.6s;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Ocultar skeleton en mobile - Desktop only */
@media (max-width: 768px) {
  .skeleton-container {
    display: none;
  }
}

/* Optimizaciones de rendimiento */
@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .title-line.primary,
  .subtitle-line,
  .desc-line,
  .action-button.primary,
  .action-link,
  .play-button,
  .skeleton-floating-button,
  .call-text,
  .footer-text {
    animation: none;
  }
}
</style>
