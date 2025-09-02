<template>
  <div class="optimized-image-container" :style="containerStyle">
    <!-- Skeleton placeholder -->
    <div 
      v-if="!isLoaded" 
      class="image-skeleton"
      :style="skeletonStyle"
    ></div>
    
    <!-- Actual image -->
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      :style="imageStyle"
      @load="onImageLoad"
      @error="onImageError"
      class="optimized-image"
      :class="{ 'loaded': isLoaded }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  borderRadius?: string
  showSkeleton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  decoding: 'async',
  objectFit: 'cover',
  borderRadius: '8px',
  showSkeleton: true
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const isLoaded = ref(false)

const containerStyle = computed((): CSSProperties => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  position: 'relative',
  display: 'inline-block',
  borderRadius: props.borderRadius
}))

const imageStyle = computed((): CSSProperties => ({
  objectFit: props.objectFit,
  opacity: isLoaded.value ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
  borderRadius: props.borderRadius
}))

const skeletonStyle = computed((): CSSProperties => ({
  width: '100%',
  height: '100%',
  borderRadius: props.borderRadius
}))

const onImageLoad = (event: Event) => {
  isLoaded.value = true
  emit('load', event)
}

const onImageError = (event: Event) => {
  emit('error', event)
}
</script>

<style scoped>
.optimized-image-container {
  overflow: hidden;
}

.optimized-image {
  max-width: 100%;
  height: auto;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: inherit;
}

.optimized-image.loaded {
  position: relative;
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.08) 25%, 
    rgba(255, 255, 255, 0.15) 50%, 
    rgba(255, 255, 255, 0.08) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Optimización para usuarios que prefieren movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .image-skeleton {
    animation: none;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .optimized-image {
    transition: none;
  }
}
</style>
