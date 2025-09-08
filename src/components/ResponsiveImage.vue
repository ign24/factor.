<template>
  <picture class="responsive-image-container" :class="containerClass">
    <!-- Mobile images (up to 768px) -->
    <source 
      :srcset="mobileSrc" 
      media="(max-width: 768px)"
      :type="imageType"
    />
    
    <!-- Tablet images (768px to 1024px) -->
    <source 
      :srcset="tabletSrc" 
      media="(min-width: 769px) and (max-width: 1024px)"
      :type="imageType"
    />
    
    <!-- Desktop images (1024px+) -->
    <source 
      :srcset="desktopSrc" 
      media="(min-width: 1025px)"
      :type="imageType"
    />
    
    <!-- Fallback image -->
    <img
      :src="fallbackSrc"
      :alt="alt"
      :class="imageClass"
      :style="imageStyle"
      :loading="loading"
      :decoding="decoding"
      @load="onImageLoad"
      @error="onImageError"
    />
    
    <!-- Loading placeholder -->
    <div v-if="!isLoaded && !hasError" class="image-placeholder" :style="placeholderStyle">
      <div class="skeleton-loader"></div>
    </div>
    
    <!-- Error state -->
    <div v-if="hasError" class="image-error" :style="placeholderStyle">
      <span>Error loading image</span>
    </div>
  </picture>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  // Base name for the image (e.g., 'analysis', 'llms', 'vision')
  baseName: string
  alt: string
  width?: string | number
  height?: string | number
  lazy?: boolean
  priority?: boolean
  class?: string
  containerClass?: string
  // Custom breakpoints
  mobileBreakpoint?: number
  tabletBreakpoint?: number
  desktopBreakpoint?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  lazy: true,
  priority: false,
  class: '',
  containerClass: '',
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  desktopBreakpoint: 1025
})

const isLoaded = ref(false)
const isInView = ref(false)
const hasError = ref(false)

// Generate optimized image paths
const mobileSrc = computed(() => `/src/assets/image/optimized/${props.baseName}-mobile.webp`)
const tabletSrc = computed(() => `/src/assets/image/optimized/${props.baseName}-tablet.webp`)
const desktopSrc = computed(() => `/src/assets/image/optimized/${props.baseName}-desktop.webp`)
const fallbackSrc = computed(() => `/src/assets/image/optimized/${props.baseName}-mobile.webp`)

// Image type
const imageType = 'image/webp'

// Loading strategy
const loading = computed(() => props.lazy && !props.priority ? 'lazy' : 'eager')
const decoding = computed(() => props.priority ? 'sync' : 'async')

// Styles
const imageStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  objectFit: 'cover' as const,
  objectPosition: 'center' as const,
  transition: 'opacity 0.3s ease-in-out',
  opacity: isLoaded.value ? 1 : 0
}))

const placeholderStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  backgroundColor: '#1a1a1a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px'
}))

const imageClass = computed(() => [
  'responsive-image',
  props.class,
  { 'loaded': isLoaded.value }
].filter(Boolean).join(' '))

// Intersection Observer for lazy loading
let observer: IntersectionObserver | null = null

const onImageLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const onImageError = () => {
  hasError.value = true
  isLoaded.value = false
  console.warn(`Failed to load image: ${props.baseName}`)
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

  const container = document.querySelector('.responsive-image-container')
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
.responsive-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 8px;
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease-in-out;
}

.responsive-image.loaded {
  opacity: 1;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #666;
  font-size: 0.8rem;
  text-align: center;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Performance optimizations */
.responsive-image-container {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .responsive-image-container {
    border-radius: 6px;
  }
  
  .skeleton-loader {
    border-radius: 3px;
  }
}
</style>
