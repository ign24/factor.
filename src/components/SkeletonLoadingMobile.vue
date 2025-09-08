<template>
  <div class="skeleton-mobile-container" :class="{ 'fade-out': isLoaded }" v-show="!isCompleted">
    <!-- Mobile Hero Skeleton -->
    <div class="skeleton-mobile-hero">
      <!-- Logo skeleton (top left) -->
      <div class="skeleton-mobile-logo">
        <div class="logo-text"></div>
      </div>
      
      <!-- Hamburger menu skeleton (top right) -->
      <div class="skeleton-mobile-menu">
        <div class="menu-icon"></div>
      </div>
      
      <!-- Main content skeleton (centered) -->
      <div class="skeleton-mobile-content">
        <!-- Main title skeleton -->
        <div class="skeleton-title-container">
          <div class="skeleton-main-title">
            <div class="title-line-1"></div>
            <div class="title-line-2"></div>
          </div>
          <div class="skeleton-subtitle">
            <div class="subtitle-line"></div>
          </div>
        </div>
        
        <!-- Description skeleton -->
        <div class="skeleton-description">
          <div class="desc-line"></div>
          <div class="desc-line"></div>
          <div class="desc-line short"></div>
        </div>
        
        <!-- CTA Button skeleton -->
        <div class="skeleton-cta-button">
          <div class="button-content"></div>
        </div>
        
        <!-- Secondary link skeleton -->
        <div class="skeleton-secondary-link">
          <div class="link-text"></div>
        </div>
      </div>
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
.skeleton-mobile-container {
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
  overflow: hidden;
}

.skeleton-mobile-container.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* Mobile Hero Layout */
.skeleton-mobile-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
  font-family: var(--font-primary);
  padding: 1.5rem 1rem;
  text-align: center;
}

/* Header elements */
.skeleton-mobile-logo {
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  z-index: 10;
}

.logo-text {
  width: 60px;
  height: 24px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.2) 25%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.skeleton-mobile-menu {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  z-index: 10;
}

.menu-icon {
  width: 40px;
  height: 30px;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.2) 25%, 
    rgba(0, 255, 255, 0.3) 50%, 
    rgba(0, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 6px;
  animation: shimmer 2s infinite;
  animation-delay: 0.2s;
}

/* Main content skeleton */
.skeleton-mobile-content {
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

/* Title container */
.skeleton-title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  margin-bottom: 0.3rem;
}

.skeleton-main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.title-line-1 {
  width: 120px;
  height: clamp(2.8rem, 9vw, 4.2rem);
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.3) 25%, 
    rgba(0, 255, 255, 0.4) 50%, 
    rgba(0, 255, 255, 0.3) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.4s;
}

.title-line-2 {
  width: 140px;
  height: clamp(2.8rem, 9vw, 4.2rem);
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.3) 25%, 
    rgba(0, 255, 255, 0.4) 50%, 
    rgba(0, 255, 255, 0.3) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.5s;
}

.skeleton-subtitle {
  margin-top: 0.1rem;
}

.subtitle-line {
  width: 200px;
  height: clamp(1.2rem, 4.5vw, 1.6rem);
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.2) 25%, 
    rgba(0, 255, 255, 0.3) 50%, 
    rgba(0, 255, 255, 0.2) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.6s;
}

/* Description skeleton */
.skeleton-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
  margin: 1.2rem 0 1.8rem 0;
  padding: 0 0.5rem;
}

.desc-line {
  height: clamp(1rem, 4vw, 1.15rem);
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 0.8s;
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
  width: 95%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.06) 25%, 
    rgba(255, 255, 255, 0.12) 50%, 
    rgba(255, 255, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.desc-line.short {
  width: 70%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.05) 25%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
}

/* CTA Button skeleton */
.skeleton-cta-button {
  width: 100%;
  max-width: 320px;
  height: clamp(48px, 12vw, 56px);
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.3) 25%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.3) 75%
  );
  background-size: 200% 100%;
  border: 1.5px solid;
  border-image: linear-gradient(135deg, var(--brand-purple-80), var(--brand-cyan-80), var(--brand-green-80)) 1;
  border-radius: 8px;
  animation: shimmer 2s infinite;
  animation-delay: 1s;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.button-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 20px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 25%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 1.2s;
}

/* Secondary link skeleton */
.skeleton-secondary-link {
  margin-top: 0.3rem;
}

.link-text {
  width: 140px;
  height: clamp(0.8rem, 3vw, 0.9rem);
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0.15) 25%, 
    rgba(0, 255, 255, 0.25) 50%, 
    rgba(0, 255, 255, 0.15) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
  animation-delay: 1.4s;
}

/* Shimmer animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Small Mobile Devices */
@media (max-width: 375px) {
  .skeleton-mobile-hero {
    padding: 1rem 0.8rem;
  }
  
  .title-line-1,
  .title-line-2 {
    width: 100px;
    height: clamp(2.4rem, 8.5vw, 3.2rem);
  }
  
  .subtitle-line {
    width: 180px;
    height: clamp(1.1rem, 4.2vw, 1.4rem);
  }
  
  .skeleton-cta-button {
    max-width: 280px;
    height: clamp(44px, 11vw, 52px);
  }
  
  .button-content {
    width: 160px;
    height: 18px;
  }
  
  .link-text {
    width: 120px;
    height: clamp(0.85rem, 3.2vw, 0.95rem);
  }
}

/* Tablet and Desktop Responsive */
@media (min-width: 768px) {
  .skeleton-mobile-hero {
    padding: 2rem;
  }
  
  .skeleton-mobile-content {
    max-width: 600px;
  }
  
  .title-line-1,
  .title-line-2 {
    width: 140px;
    height: clamp(3rem, 6vw, 4.5rem);
  }
  
  .subtitle-line {
    width: 250px;
    height: clamp(1.3rem, 3vw, 1.7rem);
  }
  
  .skeleton-cta-button {
    max-width: 350px;
    height: clamp(52px, 10vw, 60px);
  }
  
  .button-content {
    width: 220px;
    height: 22px;
  }
  
  .link-text {
    width: 160px;
    height: clamp(0.9rem, 2vw, 1rem);
  }
}

@media (min-width: 1024px) {
  .skeleton-mobile-hero {
    padding: 3rem;
  }
  
  .skeleton-mobile-content {
    max-width: 700px;
  }
  
  .title-line-1,
  .title-line-2 {
    width: 160px;
    height: clamp(3rem, 5vw, 4.5rem);
  }
  
  .subtitle-line {
    width: 280px;
    height: clamp(1.4rem, 2.5vw, 1.8rem);
  }
  
  .skeleton-cta-button {
    max-width: 350px;
    height: clamp(50px, 8vw, 58px);
  }
  
  .button-content {
    width: 240px;
    height: 24px;
  }
  
  .link-text {
    width: 180px;
    height: clamp(0.9rem, 1.5vw, 1rem);
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .skeleton-mobile-content {
    max-width: 800px;
  }
  
  .title-line-1,
  .title-line-2 {
    width: 180px;
    height: clamp(3.8rem, 4vw, 5.2rem);
  }
  
  .subtitle-line {
    width: 320px;
    height: clamp(1.7rem, 2vw, 2.1rem);
  }
  
  .skeleton-cta-button {
    max-width: 380px;
    height: clamp(56px, 6vw, 64px);
  }
  
  .button-content {
    width: 260px;
    height: 26px;
  }
  
  .link-text {
    width: 200px;
    height: clamp(1rem, 1.5vw, 1.1rem);
  }
}

/* Optimizaciones de rendimiento */
@media (prefers-reduced-motion: reduce) {
  .logo-text,
  .menu-icon,
  .title-line-1,
  .title-line-2,
  .subtitle-line,
  .desc-line,
  .button-content,
  .link-text {
    animation: none;
  }
}
</style>

