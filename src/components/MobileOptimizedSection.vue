<template>
  <section :id="sectionId" :class="sectionClass">
    <div class="container">
      <div v-if="showTitle" class="section-header">
        <h2 class="section-title">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="section-content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  sectionId: string
  title?: string
  subtitle?: string
  showTitle?: boolean
  className?: string
  mobileOptimized?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  className: '',
  mobileOptimized: true
})

const isMobile = ref(false)
const isVisible = ref(false)

const sectionClass = computed(() => [
  'mobile-optimized-section',
  props.className,
  {
    'mobile': isMobile.value,
    'visible': isVisible.value
  }
].filter(Boolean).join(' '))

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  )

  const section = document.getElementById(props.sectionId)
  if (section) {
    observer.observe(section)
  }
}

onMounted(() => {
  checkMobile()
  
  if (props.mobileOptimized) {
    setupIntersectionObserver()
  } else {
    isVisible.value = true
  }
  
  // Listen for resize events
  window.addEventListener('resize', checkMobile)
})
</script>

<style scoped>
.mobile-optimized-section {
  padding: 2rem 0;
  background: linear-gradient(180deg, 
    transparent 0%,
    rgba(4, 8, 9, 0.3) 20%,
    rgba(4, 8, 9, 0.5) 50%,
    rgba(4, 8, 9, 0.3) 80%,
    transparent 100%
  );
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.mobile-optimized-section.visible {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
  font-family: var(--font-primary);
}

.section-subtitle {
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: #a0a0a0;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  font-family: var(--font-secondary);
}

.section-content {
  width: 100%;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .mobile-optimized-section {
    padding: 1.5rem 0;
  }
  
  .container {
    padding: 0 0.75rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }
  
  .section-subtitle {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
  }
}

/* Performance optimizations */
.mobile-optimized-section.mobile {
  /* Reduce animation complexity on mobile */
  transition-duration: 0.4s;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .mobile-optimized-section {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>
