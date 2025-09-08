<template>
  <div ref="container" class="lazy-component-wrapper">
    <div v-if="isVisible" class="lazy-component">
      <slot />
    </div>
    <div v-else-if="isLoading" class="lazy-placeholder">
      <div class="skeleton-loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  threshold?: number
  rootMargin?: string
  delay?: number
  priority?: boolean
  mobileOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0.1,
  rootMargin: '50px 0px',
  delay: 0,
  priority: false,
  mobileOnly: false
})

const isVisible = ref(false)
const isLoading = ref(false)
const isMobile = ref(false)
const container = ref<HTMLElement>()

let observer: IntersectionObserver | null = null

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const shouldLoad = () => {
  if (props.mobileOnly && !isMobile.value) return false
  return true
}

const loadComponent = () => {
  if (!shouldLoad()) return
  
  isLoading.value = true
  
  // Simulate loading delay for non-priority components
  setTimeout(() => {
    isVisible.value = true
    isLoading.value = false
  }, props.delay)
}

const setupIntersectionObserver = () => {
  if (props.priority) {
    loadComponent()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadComponent()
          observer?.disconnect()
        }
      })
    },
    {
      rootMargin: props.rootMargin,
      threshold: props.threshold
    }
  )

  if (container.value) {
    observer.observe(container.value)
  }
}

onMounted(() => {
  checkMobile()
  
  // For mobile, load components more aggressively
  if (isMobile.value) {
    // Load immediately on mobile for better UX
    loadComponent()
  } else {
    setupIntersectionObserver()
  }
  
  // Listen for resize events to update mobile state
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.lazy-component-wrapper {
  width: 100%;
}

.lazy-component {
  width: 100%;
  min-height: 200px;
}

.lazy-placeholder {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 8px;
  margin: 1rem 0;
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .lazy-placeholder {
    min-height: 150px;
    margin: 0.5rem 0;
  }
}
</style>
