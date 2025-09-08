<template>
  <div v-if="isLoaded" class="async-component">
    <component :is="loadedComponent" v-bind="$attrs" />
  </div>
  <div v-else-if="isLoading" class="async-loading">
    <div class="loading-skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-content"></div>
      <div class="skeleton-footer"></div>
    </div>
  </div>
  <div v-else-if="hasError" class="async-error">
    <p>Error loading component</p>
    <button @click="retryLoad" class="retry-button">Retry</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadComponent } from '../utils/lazyLoader'

interface Props {
  componentName: string
  threshold?: number
  rootMargin?: string
  delay?: number
  priority?: boolean
  fallback?: any
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0.1,
  rootMargin: '50px 0px',
  delay: 0,
  priority: false,
  fallback: null
})

const isLoaded = ref(false)
const isLoading = ref(false)
const hasError = ref(false)
const loadedComponent = ref<any>(null)

let observer: IntersectionObserver | null = null

const loadComponentAsync = async () => {
  if (isLoaded.value || isLoading.value) return

  isLoading.value = true
  hasError.value = false

  try {
    // Add delay for non-priority components
    if (props.delay > 0 && !props.priority) {
      await new Promise(resolve => setTimeout(resolve, props.delay))
    }

    const component = await loadComponent(props.componentName)
    loadedComponent.value = component
    isLoaded.value = true
  } catch (error) {
    console.error(`Failed to load component ${props.componentName}:`, error)
    hasError.value = true
    
    // Use fallback component if provided
    if (props.fallback) {
      loadedComponent.value = props.fallback
      isLoaded.value = true
    }
  } finally {
    isLoading.value = false
  }
}

const retryLoad = () => {
  hasError.value = false
  loadComponentAsync()
}

const setupIntersectionObserver = () => {
  if (props.priority) {
    loadComponentAsync()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadComponentAsync()
          observer?.disconnect()
        }
      })
    },
    {
      rootMargin: props.rootMargin,
      threshold: props.threshold
    }
  )

  const container = document.querySelector('.async-component, .async-loading, .async-error')
  if (container) {
    observer.observe(container)
  }
}

onMounted(() => {
  setupIntersectionObserver()
})
</script>

<style scoped>
.async-component {
  width: 100%;
}

.async-loading {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-skeleton {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
}

.skeleton-header {
  height: 40px;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.skeleton-content {
  height: 120px;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.skeleton-footer {
  height: 60px;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.async-error {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.retry-button {
  background: var(--brand-cyan);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: var(--brand-cyan-light);
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
  .loading-skeleton {
    padding: 0.5rem;
  }
  
  .skeleton-header {
    height: 30px;
  }
  
  .skeleton-content {
    height: 80px;
  }
  
  .skeleton-footer {
    height: 40px;
  }
}
</style>
