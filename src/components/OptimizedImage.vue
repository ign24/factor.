<template>
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
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  decoding: 'async',
  objectFit: 'cover'
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const isLoaded = ref(false)

const imageStyle = computed(() => ({
  objectFit: props.objectFit,
  opacity: isLoaded.value ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out'
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
.optimized-image {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
