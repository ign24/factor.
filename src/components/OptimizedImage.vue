<template>
  <div class="optimized-image-container" :style="containerStyle">
    <img
      v-if="isLoaded"
      :src="src"
      :alt="alt"
      :class="imageClass"
      :style="imageStyle"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-else class="image-placeholder" :style="placeholderStyle">
      <div class="skeleton-loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  lazy?: boolean
  priority?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  lazy: true,
  priority: false,
  class: ''
})

const isLoaded = ref(false)
const isInView = ref(false)
const hasError = ref(false)

const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  position: 'relative' as const,
  overflow: 'hidden' as const
}))

const imageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  objectPosition: 'center' as const,
  transition: 'opacity 0.3s ease-in-out'
}))

const placeholderStyle = computed(() => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const imageClass = computed(() => [
  'optimized-image',
  props.class,
  { 'loaded': isLoaded.value }
].filter(Boolean).join(' '))

let observer: IntersectionObserver | null = null

const onImageLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const onImageError = () => {
  hasError.value = true
  isLoaded.value = false
}

const setupIntersectionObserver = () => {
  if (!props.lazy || props.priority) {
    isInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          observer?.disconnect()
        }
      })
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  )

  const container = document.querySelector('.optimized-image-container')
  if (container) {
    observer.observe(container)
  }
}

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  overflow: hidden;
}

.optimized-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.optimized-image.loaded {
  opacity: 1;
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>