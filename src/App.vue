<template>
  <div id="app" style="position:relative; min-height:100vh;">
    <!-- Loading Screen -->
    <LoadingScreen 
      v-if="isLoading" 
      :progress="loadingProgress"
      @loading-complete="onLoadingComplete"
      ref="loadingScreenRef"
    />
    
    <!-- Main Content -->
    <div v-show="!isLoading" class="main-content">
      <Navigation />
      <main>
        <HeroSection @background-ready="onBackgroundReady" />
        <TrustedExpertsSection />
        <AIExpertiseSection />
        <SolutionsSection />
        <CaseStudiesSection />
        <AboutFactorSection />
        <FAQsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import TrustedExpertsSection from './components/TrustedExpertsSection.vue'
import AIExpertiseSection from './components/AIExpertiseSection.vue'
import SolutionsSection from './components/SolutionsSection.vue'
import CaseStudiesSection from './components/CaseStudiesSection.vue'
import AboutFactorSection from './components/AboutFactorSection.vue'
import ContactSection from './components/ContactSection.vue'
import FAQsSection from './components/FAQsSection.vue'
import Footer from './components/Footer.vue'
import LoadingScreen from './components/LoadingScreen.vue'

// Loading state
const isLoading = ref(true)
const loadingProgress = ref(0)
const loadingScreenRef = ref<InstanceType<typeof LoadingScreen>>()
const backgroundReady = ref(false)
const loadingStartTime = ref(0)


// Simulate loading progress (más lento para sincronizar con la pantalla de carga)
const simulateLoading = () => {
  loadingStartTime.value = Date.now()
  const interval = setInterval(() => {
    if (loadingProgress.value < 90) {
      // Progreso más lento para sincronizar con el tiempo total de la pantalla de carga
      const remaining = 90 - loadingProgress.value
      const increment = Math.max(0.3, remaining * 0.05) // 5% del remanente
      loadingProgress.value += increment
    } else {
      clearInterval(interval)
    }
  }, 200) // Más lento para mayor duración
}

// Handle background ready event (opcional, para sincronización si es necesario)
const onBackgroundReady = () => {
  backgroundReady.value = true
  // No forzamos el fade out, dejamos que la pantalla de carga dure su tiempo natural
}

// Handle loading complete
const onLoadingComplete = () => {
  isLoading.value = false
  
  // Trigger entrance animations after main content fade in completes
  setTimeout(() => {
    triggerEntranceAnimations()
  }, 1300) // Wait for main-content animation (1s) + delay (0.3s) + extra buffer
  
  // Ensure page starts at hero section
  setTimeout(() => {
    // Check if we're not already at the hero section
    if (window.location.hash !== '#hero') {
      // Update the URL to include #hero
      window.location.hash = '#hero'
      // Scroll to hero section smoothly
      const heroSection = document.querySelector('#hero')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, 1500) // Wait a bit longer to ensure all content is loaded
}

// Fallback timer to show content if loading takes too long
let fallbackTimer: ReturnType<typeof setTimeout> | null = null

// Function to trigger entrance animations
const triggerEntranceAnimations = () => {
  // Trigger Navigation animations
  const logo = document.querySelector('.animate-logo') as HTMLElement
  const navigation = document.querySelector('.navigation') as HTMLElement
  const navLinks = document.querySelector('.animate-nav-links') as HTMLElement
  const navItems = document.querySelectorAll('.animate-nav-item') as NodeListOf<HTMLElement>

  if (logo) {
    logo.style.opacity = '1'
    logo.style.transform = 'translateY(0)'
  }

  // First animate the glassmorphism container
  if (navigation) {
    setTimeout(() => {
      navigation.style.transform = 'translateX(-50%) scaleX(1)'
      navigation.style.background = 'rgba(4, 8, 9, 0.26)'
      navigation.style.backdropFilter = 'blur(30px)'
      navigation.style.border = '1px solid var(--border-primary)'
    }, 300)
  }

  // Then animate the navigation buttons after container is deployed
  if (navLinks) {
    setTimeout(() => {
      navLinks.style.opacity = '1'
      navLinks.style.transform = 'translateX(0)'
    }, 800)
  }

  // Animate nav items with staggered timing after container and nav links
  navItems.forEach((item, index) => {
    setTimeout(() => {
      if (item) {
        item.style.opacity = '1'
        item.style.transform = 'translateX(0)'
      }
    }, 1000 + (index * 100))
  })

  // Trigger Hero Section animations
  setTimeout(() => {
    const title = document.querySelector('.animate-title') as HTMLElement
    const description = document.querySelector('.animate-description') as HTMLElement
    const actions = document.querySelector('.animate-actions') as HTMLElement
    const secondary = document.querySelector('.animate-secondary') as HTMLElement
    const effect = document.querySelector('.animate-effect') as HTMLElement
    const scrollIndicator = document.querySelector('.animate-scroll-indicator') as HTMLElement

    if (title) {
      title.style.opacity = '1'
      title.style.transform = 'translateY(0)'
    }

    setTimeout(() => {
      if (description) {
        description.style.opacity = '1'
        description.style.transform = 'translateY(0)'
      }
    }, 300)

    setTimeout(() => {
      if (actions) {
        actions.style.opacity = '1'
        actions.style.transform = 'translateY(0)'
      }
    }, 600)

    setTimeout(() => {
      if (secondary) {
        secondary.style.opacity = '1'
        secondary.style.transform = 'translateY(0)'
      }
    }, 900)

    setTimeout(() => {
      if (effect) {
        effect.style.opacity = '1'
        effect.style.transform = 'translateX(0) scale(1)'
      }
    }, 1200)

    setTimeout(() => {
      if (scrollIndicator) {
        scrollIndicator.style.opacity = '1'
        scrollIndicator.style.transform = 'translateY(0)'
      }
    }, 1500)
  }, 1200) // Start hero animations after navigation is mostly complete
}

onMounted(() => {
  simulateLoading()
  
  // Fallback timer - show content after 15 seconds regardless
  fallbackTimer = setTimeout(() => {
    if (isLoading.value) {
      console.warn('Loading screen taking too long, showing content')
      onLoadingComplete()
    }
  }, 15000)
  
  // Ensure page always starts at hero section on initial load
  if (window.location.hash !== '#hero') {
    // Update the URL immediately to show #hero
    window.location.hash = '#hero'
  }
})

// Clean up timers on unmount
const cleanup = () => {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = null
  }
}

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style>
@import './assets/brand-colors.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  background: rgb(4, 8, 9);
  color: var(--text-primary);
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: url('./assets/image/fondo.webp') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

/* Add subtle background only to sections after hero */
.section-padding {
  background: linear-gradient(180deg, 
    transparent 0%,
    rgba(4, 8, 9, 0.3) 20%,
    rgba(4, 8, 9, 0.5) 50%,
    rgba(4, 8, 9, 0.3) 80%,
    transparent 100%
  );
}

/* Ensure hero section has no background interference */
#hero {
  background: transparent;
}

/* Remove background from main to avoid covering hero video */
/* Background will be added to individual sections instead */

/* Main content transition */
.main-content {
  opacity: 0;
  animation: fadeInContent 1s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Global animations */
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.3)); }
  50% { filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.6)); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Enhanced button styles with new gradients */
.glow-button {
  background: var(--gradient-primary);
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-size: 300% 300%;
}

.glow-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.glow-button:hover::before {
  left: 100%;
}

.glow-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-pink);
  background-position: 100% 50%;
}

.glow-button.primary {
  background: var(--gradient-primary);
}

.glow-button.secondary {
  background: var(--gradient-secondary);
}

.glow-button.warm {
  background: var(--gradient-warm);
}

.glow-button.cool {
  background: var(--gradient-cool);
}

/* Outline button with gradient border */
.outline-button {
  background: transparent;
  border: 2px solid;
  border-image: var(--gradient-primary) 1;
  padding: 16px 32px;
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.outline-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
}

.outline-button:hover::before {
  opacity: 0.1;
}

.outline-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.section-padding {
  padding: 120px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Gradient text utilities */
.gradient-text-primary {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-secondary {
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-warm {
  background: var(--gradient-warm);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-cool {
  background: var(--gradient-cool);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card styles with new gradients */
.gradient-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  transition: all 0.3s ease;
}

.gradient-card:hover {
  border-color: var(--border-primary);
  box-shadow: var(--shadow-glow);
  transform: translateY(-4px);
}

/* Gradient borders */
.gradient-border {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-lg);
  padding: 2px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}
</style>