<template>
  <div id="app" style="position:relative; min-height:100vh;">
    <Navigation />
    <main>
      <HeroSection />
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
</template>

<script setup lang="ts">
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
  background: url('./assets/image/fondo.png') no-repeat center center;
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