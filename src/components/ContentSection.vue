<template>
  <section :id="sectionId" class="section-padding content-section">
    <div class="container">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 gradient-text-primary">
          {{ title }}
        </h2>
        <p class="text-xl gradient-text-gray-white max-w-4xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- Stats Section -->
      <div v-if="type === 'stats'" class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="gradient-card text-center p-8 stats-card-animate"
          :style="{ '--animation-delay': `${index * 200}ms` }"
        >
          <div class="text-5xl font-bold gradient-text-primary mb-4 stats-number-gradient"
               :style="{ '--gradient-delay': `${index * 0.1}s` }">
            <AnimatedCounter 
              :value="item.number" 
              :duration="2000" 
              :delay="index * 200"
            />
          </div>
          <div class="text-lg gradient-text-gray-white">
            {{ item.label }}
          </div>
        </div>
      </div>

      <!-- Expertise Section -->
      <div v-if="type === 'expertise'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="gradient-card p-6 hover:transform hover:scale-105 transition-all duration-300"
        >
          <div class="mb-4">
            <img :src="item.image" :alt="item.title" class="w-16 h-16 mx-auto mb-4">
          </div>
          <h3 class="text-xl font-semibold mb-3 gradient-text-primary">
            {{ item.title }}
          </h3>
          <p class="gradient-text-gray-white leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>

      <!-- Trust Message -->
      <div v-if="trustMessage" class="mt-16">
        <div class="w-full max-w-7xl mx-auto px-6 trust-message-container">
          <AnimatedText :text="trustMessage" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AnimatedCounter from './AnimatedCounter.vue'
import AnimatedText from './AnimatedText.vue'

interface Props {
  sectionId: string
  title: string
  subtitle: string
  type: 'stats' | 'expertise'
  items: any[]
  trustMessage?: string
}

const props = defineProps<Props>()

// Trigger entrance animations for stats cards
onMounted(() => {
  if (props.type === 'stats') {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.stats-card-animate')
          cards.forEach((card) => {
            setTimeout(() => {
              card.classList.add('animate-in')
            }, 100) // Small delay to ensure smooth animation
          })
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    })

    const statsSection = document.getElementById(props.sectionId)
    if (statsSection) {
      observer.observe(statsSection)
    }
  }
})
</script>

<style scoped>
.content-section {
  background: linear-gradient(245deg, rgb(3,6,8) 0%, rgb(5,9,12) 25%, rgb(7,12,15) 75%, rgb(4,7,10) 100%);
  color: white;
  position: relative;
}

/* Separador superior plateado elegante */
.content-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(185, 185, 185, 0.29) 18%, 
    rgba(215, 215, 215, 0.59) 38%, 
    rgba(250, 250, 250, 0.79) 50%, 
    rgba(215, 215, 215, 0.59) 62%, 
    rgba(185, 185, 185, 0.29) 82%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante */
.content-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(165, 165, 165, 0.25) 21%, 
    rgba(195, 195, 195, 0.51) 41%, 
    rgba(215, 215, 215, 0.71) 50%, 
    rgba(195, 195, 195, 0.51) 59%, 
    rgba(165, 165, 165, 0.25) 79%, 
    transparent 100%
  );
  z-index: 2;
}

.mb-16 {
  margin-bottom: 4rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mt-16 {
  margin-top: 4rem;
}

.text-center {
  text-align: center;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.leading-relaxed {
  line-height: 1.75;
}

.max-w-4xl {
  max-width: 56rem;
}

.max-w-7xl {
  max-width: 80rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.trust-message-container {
  overflow: visible !important;
  word-wrap: normal !important;
  overflow-wrap: normal !important;
  word-break: normal !important;
  hyphens: none !important;
}

.w-full {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-8 {
  gap: 2rem;
}

.p-8 {
  padding: 2rem;
}

.p-6 {
  padding: 1.5rem;
}

.w-16 {
  width: 4rem;
}

.h-16 {
  height: 4rem;
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:text-5xl {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.hover\:transform:hover {
  transform: translateY(-4px);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

/* Gradient Text classes are now imported from global styles */

/* Statistics Cards Entrance Animation */
.stats-card-animate {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  border-color: transparent;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
  will-change: opacity, transform, border-color;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.stats-card-animate.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-subtle);
}

/* Smooth border animation */
.stats-card-animate {
  border: 1px solid transparent;
}

.stats-card-animate.animate-in {
  border: 1px solid var(--border-subtle);
}

/* Animated gradient for statistics numbers */
.stats-number-gradient {
  background: linear-gradient(
    90deg,
    #333ead 0%,
    #4a5bb8 25%,
    #31ccf0 50%,
    #4a5bb8 75%,
    #333ead 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow-subtle 10s linear infinite;
  animation-delay: var(--gradient-delay, 0s);
  will-change: background-position;
}

@keyframes gradient-flow-subtle {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

/* Enhanced hover effect with scale */
.gradient-card:hover {
  transform: translateY(-4px) scale(1.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 