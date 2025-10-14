<template>
  <div id="app" style="position:relative; min-height:100vh;">
    <!-- Cursor Light Effect -->
    <div 
      class="cursor-light" 
      ref="cursorLight"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    ></div>
    
    <!-- Skeleton Loading -->
    <SkeletonLoading 
      v-if="isLoading" 
      :duration="300"
      @skeleton-complete="onSkeletonComplete"
      ref="skeletonLoadingRef"
    />
    
    <!-- Navigation - Always visible for better FCP -->
    <Navigation />
    
    <!-- Main Content -->
    <div v-show="!isLoading" class="main-content">
      <main>
        <HeroSection v-if="!isMobile" @background-ready="onBackgroundReady" />
        <HeroSectionMobile v-if="isMobile" @background-ready="onBackgroundReady" />
        
        <!-- Critical sections - load immediately -->
        <TrustedExpertsSection />
        
        <!-- All sections - load immediately for better mobile UX -->
        <AIExpertiseSection />
        <SolutionsSection />
        <CaseStudiesSection />
        <AboutFactorSection />
        <FAQsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
    
    <!-- Async Font Loaders for non-critical fonts -->
    <FontLoader 
      font-family="Inter" 
      :font-weight="300" 
      :delay="2000" 
      :priority="false" 
    />
    <FontLoader 
      font-family="Inter" 
      :font-weight="500" 
      :delay="3000" 
      :priority="false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import HeroSectionMobile from './components/HeroSectionMobile.vue'
import TrustedExpertsSection from './components/TrustedExpertsSection.vue'
import AIExpertiseSection from './components/AIExpertiseSection.vue'
import SolutionsSection from './components/SolutionsSection.vue'
import CaseStudiesSection from './components/CaseStudiesSection.vue'
import AboutFactorSection from './components/AboutFactorSection.vue'
import ContactSection from './components/ContactSection.vue'
import FAQsSection from './components/FAQsSection.vue'
import Footer from './components/Footer.vue'
import SkeletonLoading from './components/SkeletonLoading.vue'
import FontLoader from './components/FontLoader.vue'
import { applyConnectionOptimizations } from './utils/connectionOptimizer'
import { initLazyLoading, preloadCriticalComponents } from './utils/lazyLoader'
import { initResourcePreloading } from './utils/resourcePreloader'
import { startTiming, endTiming, logPerformanceReport } from './utils/performanceMonitor'

// Loading state
const isLoading = ref(true)
const skeletonLoadingRef = ref<InstanceType<typeof SkeletonLoading>>()

// Mobile detection
const isMobile = ref(false)

// Cursor light effect
const cursorX = ref(0)
const cursorY = ref(0)
const cursorLight = ref<HTMLElement | null>(null)

// Function to check if screen is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Function to handle resize
const handleResize = () => {
  checkMobile()
}

// Function to handle mouse move for cursor light effect
const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

// Handle background ready event
const onBackgroundReady = () => {
  // Background is ready, but we still wait for skeleton loading to complete
}

// Handle skeleton loading complete  
const onSkeletonComplete = () => {
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

    // Only animate effect if it exists (not in mobile version)
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

onMounted(async () => {
  const mountStartTime = startTiming('app-mount')
  
  // Check mobile on mount
  checkMobile()
  
  // Apply connection-based optimizations
  applyConnectionOptimizations()
  
  // Initialize lazy loading system
  initLazyLoading()
  
  // Initialize resource preloading
  initResourcePreloading()
  
  // Preload critical components
  await preloadCriticalComponents()
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
  
  // Add mouse move listener for cursor light effect
  window.addEventListener('mousemove', handleMouseMove)
  
  // Ensure page always starts at hero section on initial load
  if (window.location.hash !== '#hero') {
    // Update the URL immediately to show #hero
    window.location.hash = '#hero'
  }
  
  endTiming('app-mount', mountStartTime)
  
  // Log performance report after a delay
  setTimeout(() => {
    logPerformanceReport()
  }, 3000)
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style>
@import './assets/brand-colors.css';
@import './assets/animations-optimized.css';

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
  min-height: 70vh;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgb(2, 4, 6) 0%,
    rgb(5, 10, 18) 20%,
    rgb(8, 15, 28) 40%,
    rgb(10, 18, 32) 60%,
    rgb(5, 10, 18) 80%,
    rgb(2, 4, 6) 100%
  );
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
  animation: fadeInContent 0.6s ease-out forwards;
  animation-delay: 0.1s;
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
  transform: translateY(-4px) scale(1.02);
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

/* Cursor Light Effect */
.cursor-light {
  position: fixed;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(51, 62, 173, 0.25) 0%,
    rgba(49, 204, 240, 0.20) 20%,
    rgba(0, 255, 191, 0.15) 35%,
    rgba(49, 204, 240, 0.10) 50%,
    rgba(51, 62, 173, 0.06) 65%,
    rgba(49, 204, 240, 0.03) 80%,
    rgba(0, 255, 191, 0.01) 92%,
    transparent 100%
  );
  background-size: 200% 200%;
  mix-blend-mode: screen;
  filter: blur(30px);
  transition: opacity 0.3s ease;
  will-change: transform, opacity;
  opacity: 0;
  animation: fadeInCursorLight 0.5s ease-out 1s forwards, subtleGlow 4s ease-in-out infinite;
}

.cursor-light::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    transparent 0%,
    transparent 50%,
    rgba(49, 204, 240, 0.02) 70%,
    rgba(0, 255, 191, 0.01) 85%,
    rgba(51, 62, 173, 0.005) 95%,
    transparent 100%
  );
  background-size: 200% 200%;
  filter: blur(20px);
  pointer-events: none;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes fadeInCursorLight {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes subtleGlow {
  0%, 100% {
    filter: blur(30px) brightness(1);
    transform: translate(-50%, -50%) scale(1);
    background-position: 0% 0%;
  }
  33% {
    filter: blur(35px) brightness(1.15);
    transform: translate(-50%, -50%) scale(1.08);
    background-position: 50% 50%;
  }
  66% {
    filter: blur(32px) brightness(1.20);
    transform: translate(-50%, -50%) scale(1.12);
    background-position: 100% 100%;
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.6;
    background-position: 0% 0%;
  }
  50% {
    opacity: 1;
    background-position: 100% 100%;
  }
}

/* Hide cursor light on mobile devices */
@media (max-width: 768px) {
  .cursor-light {
    display: none;
  }
}
</style>