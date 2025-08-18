<template>
  <span ref="counterRef" class="animated-counter">
    {{ displayValue }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  value: string | number
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  delay: 0
})

const counterRef = ref<HTMLElement>()
const displayValue = ref<string>('0')
const isAnimating = ref(false)

const parseValue = (value: string | number) => {
  if (typeof value === 'number') {
    return { number: value, suffix: '', prefix: '' }
  }
  
  const str = value.toString()
  
  // Handle percentage
  if (str.includes('%')) {
    const num = parseFloat(str.replace('%', ''))
    return { number: num, suffix: '%', prefix: '' }
  }
  
  // Handle multipliers like "3x"
  if (str.includes('x')) {
    const num = parseFloat(str.replace('x', ''))
    return { number: num, suffix: 'x', prefix: '' }
  }
  
  // Handle numbers with plus sign like "50+"
  if (str.includes('+')) {
    const num = parseFloat(str.replace('+', ''))
    return { number: num, suffix: '+', prefix: '' }
  }
  
  // Handle regular numbers
  const num = parseFloat(str)
  return { number: num, suffix: '', prefix: '' }
}

const animateCounter = async () => {
  if (isAnimating.value) return
  
  const { number, suffix, prefix } = parseValue(props.value)
  isAnimating.value = true
  
  // Wait for delay
  if (props.delay > 0) {
    await new Promise(resolve => setTimeout(resolve, props.delay))
  }
  
  const startTime = Date.now()
  const startValue = 0
  const endValue = number
  
  const updateCounter = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    const currentValue = startValue + (endValue - startValue) * easeOutQuart
    
    // Format the number based on the original value type
    if (suffix === '%') {
      displayValue.value = `${currentValue.toFixed(1)}${suffix}`
    } else if (suffix === 'x' || suffix === '+') {
      displayValue.value = `${Math.round(currentValue)}${suffix}`
    } else {
      displayValue.value = `${Math.round(currentValue)}${suffix}`
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      isAnimating.value = false
    }
  }
  
  updateCounter()
}

const startAnimation = () => {
  // Use Intersection Observer to trigger animation when element is visible
  if (!counterRef.value) return
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isAnimating.value) {
        animateCounter()
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })
  
  observer.observe(counterRef.value)
}

onMounted(() => {
  startAnimation()
})

watch(() => props.value, () => {
  if (counterRef.value) {
    startAnimation()
  }
})
</script>

<style scoped>
.animated-counter {
  display: inline-block;
  font-weight: inherit;
  font-size: inherit;
}
</style> 