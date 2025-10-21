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
import { useTheme } from './composables/useTheme'
import { applyConnectionOptimizations } from './utils/connectionOptimizer'
import { initLazyLoading, preloadCriticalComponents } from './utils/lazyLoader'
import { initResourcePreloading } from './utils/resourcePreloader'
import { startTiming, endTiming, logPerformanceReport } from './utils/performanceMonitor'

// Initialize theme system
useTheme()

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
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 70vh;
  position: relative;
  z-index: 1;
  transition: background 0.3s ease;
}

/* Dark Theme Background Gradient */
.dark-theme #app {
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

/* Light Theme Background Gradient */
.light-theme #app {
  background: linear-gradient(
    180deg,
    rgb(248, 249, 250) 0%,
    rgb(240, 242, 245) 20%,
    rgb(233, 236, 239) 40%,
    rgb(226, 230, 234) 60%,
    rgb(240, 242, 245) 80%,
    rgb(248, 249, 250) 100%
  );
  background-attachment: fixed;
}

/* Add subtle background only to sections after hero */
.dark-theme .section-padding {
  background: linear-gradient(180deg, 
    transparent 0%,
    rgba(4, 8, 9, 0.3) 20%,
    rgba(4, 8, 9, 0.5) 50%,
    rgba(4, 8, 9, 0.3) 80%,
    transparent 100%
  );
}

.light-theme .section-padding {
  background: linear-gradient(180deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.3) 20%,
    rgba(248, 249, 250, 0.5) 50%,
    rgba(255, 255, 255, 0.3) 80%,
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

/* Cursor Light Effect - Theme aware */
.dark-theme .cursor-light {
  position: fixed;
  width: 30px;
  height: 30px;
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

.light-theme .cursor-light {
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(51, 62, 173, 0.15) 0%,
    rgba(49, 204, 240, 0.12) 20%,
    rgba(0, 150, 150, 0.10) 35%,
    rgba(49, 204, 240, 0.06) 50%,
    rgba(51, 62, 173, 0.04) 65%,
    rgba(49, 204, 240, 0.02) 80%,
    rgba(0, 150, 150, 0.01) 92%,
    transparent 100%
  );
  background-size: 200% 200%;
  mix-blend-mode: multiply;
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
  border-radius: 20%;
  background: radial-gradient(
    circle,
    transparent 0%,
    transparent 50%,
    rgba(49, 204, 240, 0.02) 70%,
    rgba(0, 255, 191, 0.01) 85%,
    rgba(51, 62, 173, 0.005) 95%,
    transparent 100%
  );
  background-size: 600% 600%;
  filter: blur(20px);
  pointer-events: none;
  animation: glowPulse 2s ease-in-out infinite;
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

/* ========================================
   GLOBAL THEME OVERRIDES - REMOVE OVERLAYS IN LIGHT MODE
   ======================================== */

/* Remove all section overlays in light mode */
.light-theme .section-padding::before,
.light-theme .section-padding::after,
.light-theme .content-section::before,
.light-theme .content-section::after {
  display: none !important;
}

/* Clean backgrounds for sections in light mode */
.light-theme .section-padding,
.light-theme .content-section {
  background: var(--bg-primary) !important;
}

/* Remove backdrop filters in light mode */
.light-theme .expertise-card-content,
.light-theme .card-overlay {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Clean card backgrounds in light mode */
.light-theme .expertise-card-content {
  background: rgba(255, 255, 255, 0.85) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.light-theme .card-overlay {
  background: rgba(255, 255, 255, 0.92) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

/* Clean scroll indicators in light mode */
.light-theme .scroll-indicator {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  backdrop-filter: none !important;
}

/* Clean overlay texts in light mode */
.light-theme .overlay-content {
  color: var(--text-primary) !important;
}

.light-theme .overlay-content h3,
.light-theme .overlay-content p {
  color: var(--text-primary) !important;
}

/* Remove ALL blurs and dark overlays in light mode */
.light-theme [style*="backdrop-filter"],
.light-theme [class*="overlay"],
.light-theme [class*="blur"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Clean any dark backgrounds in light mode */
.light-theme .professional-card {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

/* Clean glassmorphism elements */
.light-theme [style*="rgba(0, 0, 0"],
.light-theme [style*="rgba(4, 8, 9"] {
  background: rgba(255, 255, 255, 0.9) !important;
}

/* Ensure footer is clean in light mode */
.light-theme footer {
  background: var(--bg-secondary) !important;
}

/* Clean navigation overlay */
.light-theme .navigation {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(10px) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

/* ========================================
   FORCE BLACK TEXT IN ALL SECTIONS - LIGHT MODE
   ======================================== */

/* Force all sections to have clean white background and black text */
.light-theme #industries,
.light-theme #case-studies,
.light-theme #about,
.light-theme #faqs,
.light-theme .solutions,
.light-theme .case-studies,
.light-theme .about-section,
.light-theme .faqs-section {
  background: var(--bg-primary) !important;
  color: var(--text-primary) !important;
}

/* Force all headings to black in light mode */
.light-theme h1,
.light-theme h2,
.light-theme h3,
.light-theme h4,
.light-theme h5,
.light-theme h6,
.light-theme .section-title,
.light-theme .card-title,
.light-theme .overlay-title,
.light-theme .faq-title,
.light-theme .section-header h2,
.light-theme .section-header h3,
.light-theme .section-header h4,
.light-theme .section-header h5,
.light-theme .section-header h6,
.light-theme [class*="title"],
.light-theme [class*="header"] {
  color: var(--text-primary) !important;
  font-weight: 700 !important;
}

/* Force all paragraphs and text to black */
.light-theme p,
.light-theme .section-subtitle,
.light-theme .card-description,
.light-theme .solution-card p,
.light-theme .case-study-card p,
.light-theme .faq-answer,
.light-theme .gradient-text-gray-white {
  color: var(--text-primary) !important;
}

/* Clean solution cards */
.light-theme .solution-card,
.light-theme .case-study-card,
.light-theme .faq-item {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  color: var(--text-primary) !important;
}

/* Clean card content */
.light-theme .card-content,
.light-theme .card-body {
  color: var(--text-primary) !important;
}

/* Icons should be visible */
.light-theme .card-icon {
  color: var(--text-accent) !important;
}

/* Clean glows and effects */
.light-theme .card-glow {
  display: none !important;
}

/* Force all text elements to be visible */
.light-theme span,
.light-theme li,
.light-theme a,
.light-theme label,
.light-theme button,
.light-theme .text-sm,
.light-theme .text-lg,
.light-theme .description {
  color: var(--text-primary) !important;
}

/* Specific section overrides */
.light-theme .faq-question {
  color: var(--text-primary) !important;
}

.light-theme .faq-answer p {
  color: var(--text-secondary) !important;
}

.light-theme .case-study-title,
.light-theme .case-study-description {
  color: var(--text-primary) !important;
}

.light-theme .about-content,
.light-theme .about-text {
  color: var(--text-primary) !important;
}

/* Ensure visibility of ALL section backgrounds */
.light-theme section {
  background: var(--bg-primary) !important;
}

/* Remove any gradient backgrounds in text */
.light-theme .gradient-text-gray-white,
.light-theme [class*="gradient-text"] {
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  color: var(--text-primary) !important;
  background-clip: unset !important;
}

/* Clean any remaining dark sections */
.light-theme [style*="color: white"],
.light-theme [style*="color: #fff"],
.light-theme [style*="color:#fff"],
.light-theme [style*="color: #ffffff"],
.light-theme [style*="color:#ffffff"],
.light-theme [style*="color: rgb(255, 255, 255)"],
.light-theme [style*="color:rgb(255, 255, 255)"] {
  color: var(--text-primary) !important;
}

/* Force ANY element with light colors to be dark */
.light-theme [style*="color: #f"],
.light-theme [style*="color: #e"],
.light-theme [style*="color: #d"],
.light-theme [style*="color: #c"],
.light-theme [style*="color: #b"],
.light-theme [style*="color: #a"],
.light-theme [style*="color: #9"],
.light-theme [style*="color: #8"] {
  color: var(--text-primary) !important;
}

/* Override any CSS classes that might have light colors */
.light-theme .text-white,
.light-theme .text-light,
.light-theme .text-gray-100,
.light-theme .text-gray-200,
.light-theme .text-gray-300,
.light-theme .text-gray-400,
.light-theme .text-gray-500 {
  color: var(--text-primary) !important;
}

/* Force visibility of any faded text */
.light-theme [style*="opacity"],
.light-theme [style*="opacity: 0.5"],
.light-theme [style*="opacity: 0.6"],
.light-theme [style*="opacity: 0.7"],
.light-theme [style*="opacity: 0.8"] {
  opacity: 1 !important;
}

/* SPECIFIC FAQ SECTION OVERRIDE - Force "Preguntas frecuentes" to be black */
.light-theme #faqs .section-title,
.light-theme .faqs .section-title,
.light-theme .faqs h2 {
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  color: var(--text-primary) !important;
  background-clip: unset !important;
  font-weight: 700 !important;
  opacity: 1 !important;
}
</style>