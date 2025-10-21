<template>
  <div 
    class="animated-text-container" 
    :class="[animationClass, { 'animate-in': isVisible }]"
    ref="containerRef"
  >
    <p class="animated-text" :class="className">
      <template v-if="splitWords">
        <span 
          v-for="(word, index) in words" 
          :key="index" 
          class="word-wrapper"
          :style="{ transitionDelay: `${index * 0.05}s` }"
        >
          {{ word }}&nbsp;
        </span>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  text: string
  className?: string
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'rotate' | 'bounce' | 'reveal' | 'elastic' | 'perspective'
  splitWords?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade',
  splitWords: false,
  delay: 100
})

const containerRef = ref<HTMLElement>()
const isVisible = ref(false)

const words = computed(() => {
  return props.text.split(' ')
})

const animationClass = computed(() => {
  const animationMap: Record<string, string> = {
    'fade': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale': 'animate-scale-in',
    'blur': 'animate-blur-in',
    'rotate': 'animate-rotate-in',
    'bounce': 'animate-bounce-in',
    'reveal': 'animate-reveal',
    'elastic': 'animate-elastic-in',
    'perspective': 'animate-perspective-in'
  }
  return animationMap[props.animation] || 'animate-fade-in'
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, props.delay)
          observer.disconnect()
        }
      })
    },
    { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )
  
  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})
</script>

<style scoped>
.animated-text-container {
  perspective: 1000px;
  width: 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.animated-text {
  font-size: 1.5rem;
  line-height: 1.7;
  color: #e5e7eb;
  font-weight: 500;
  margin: 0;
  text-align: justify;
  display: block;
}

/* Word wrapper for split word animations */
.word-wrapper {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) translateZ(0);
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

.animate-in .word-wrapper {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

/* Responsive text sizes */
@media (min-width: 768px) {
  .animated-text {
    font-size: 1.8rem;
  }
}

@media (min-width: 1024px) {
  .animated-text {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .animated-text {
    font-size: 1.1rem;
    line-height: 1.6;
    padding: 0 1rem;
  }
}

/* Performance optimization for mobile */
@media (max-width: 768px) {
  .word-wrapper {
    transition-duration: 0.4s;
  }
}
</style>
