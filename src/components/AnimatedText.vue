<template>
  <div class="animated-text-container" ref="containerRef">
    <p class="animated-text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  text: string
  className?: string
}

const props = defineProps<Props>()

const containerRef = ref<HTMLElement>()

onMounted(() => {
  // Simple fade-in animation
  if (containerRef.value) {
    containerRef.value.style.opacity = '0'
    containerRef.value.style.transform = 'translateY(20px)'
    
    setTimeout(() => {
      if (containerRef.value) {
        containerRef.value.style.transition = 'all 0.8s ease-out'
        containerRef.value.style.opacity = '1'
        containerRef.value.style.transform = 'translateY(0)'
      }
    }, 100)
  }
})
</script>

<style scoped>
.animated-text-container {
  perspective: 1000px;
  width: 100%;
  max-width: 100%;
  overflow: visible;
}

.animated-text {
  font-size: 1.5rem;
  line-height: 1.7;
  color: #e5e7eb;
  font-weight: 500;
  margin: 0;
  white-space: normal;
  max-width: 100%;
  word-wrap: normal;
  overflow-wrap: normal;
  hyphens: none;
  word-break: normal;
  text-align: justify;
  text-overflow: clip;
  overflow: visible;
  display: block;
}

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
    word-wrap: normal;
    overflow-wrap: normal;
  }
}
</style>
