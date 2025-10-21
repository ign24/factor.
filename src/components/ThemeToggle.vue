<!--
  ThemeToggle Component
  
  Professional theme toggle with:
  - Smooth animations
  - ARIA accessibility
  - Icon transitions
  - Tooltip support
  - Keyboard navigation
  - Visual feedback
-->

<template>
  <button
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    :aria-label="ariaLabel"
    :aria-pressed="isDark"
    role="switch"
    @click="handleToggle"
    @keydown.space.prevent="handleToggle"
    @keydown.enter.prevent="handleToggle"
  >
    <!-- Sun Icon (Light Mode) -->
    <svg
      class="theme-icon theme-icon-sun"
      :class="{ 'is-active': !isDark }"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>

    <!-- Moon Icon (Dark Mode) -->
    <svg
      class="theme-icon theme-icon-moon"
      :class="{ 'is-active': isDark }"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>

    <!-- Glow Effect -->
    <span class="theme-toggle-glow" aria-hidden="true"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

/**
 * Use theme composable
 */
const { isDark, toggle } = useTheme()

/**
 * Aria label for accessibility
 */
const ariaLabel = computed(() => {
  return isDark.value 
    ? 'Cambiar a modo claro' 
    : 'Cambiar a modo oscuro'
})

/**
 * Handle toggle with haptic feedback (if supported)
 */
const handleToggle = () => {
  toggle()
  
  // Haptic feedback for mobile devices
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
}
</script>

<style scoped>
/* ========================================
   THEME TOGGLE BUTTON - PROFESSIONAL DESIGN
   ======================================== */

.theme-toggle {
  /* Layout */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  
  /* Appearance */
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  
  /* Effects */
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  /* Transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Interaction */
  cursor: pointer;
  outline: none;
  
  /* GPU Acceleration */
  transform: translateZ(0);
  will-change: transform, background, border-color;
}

/* Hover State */
.theme-toggle:hover {
  background: var(--bg-accent);
  border-color: var(--border-primary);
  transform: scale(1.05) translateZ(0);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Active State */
.theme-toggle:active {
  transform: translateY(0) scale(0.95) translateZ(0);
}

/* Focus State - Accessibility */
.theme-toggle:focus-visible {
  border-color: var(--brand-cyan);
  box-shadow: 0 0 0 3px var(--brand-cyan-20);
  outline: none;
}

/* Dark Theme Variations */
.dark-theme .theme-toggle {
  background: rgba(4, 8, 9, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dark-theme .theme-toggle:hover {
  background: rgba(15, 25, 35, 0.8);
  border-color: var(--brand-cyan-30);
  box-shadow: var(--glow-cyan);
  transform: scale(1.05) translateZ(0);
}

/* Light Theme Variations */
.light-theme .theme-toggle {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.light-theme .theme-toggle:hover {
  background: rgba(248, 249, 250, 0.95);
  border-color: rgba(51, 62, 173, 0.2);
  box-shadow: 0 4px 16px rgba(51, 62, 173, 0.15);
  transform: scale(1.05) translateZ(0);
}

/* ========================================
   THEME ICONS - SMOOTH TRANSITIONS
   ======================================== */

.theme-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  
  /* Color */
  color: var(--text-secondary);
  
  /* Transitions */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Initial state - hidden */
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5) rotate(-180deg);
  transform-origin: center;
}

/* Active Icon */
.theme-icon.is-active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
}

/* Sun Icon Specific Animation */
.theme-icon-sun.is-active {
  color: #f59e0b; /* Warm yellow/orange */
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
}

/* Moon Icon Specific Animation */
.theme-icon-moon.is-active {
  color: var(--brand-cyan);
  filter: drop-shadow(0 0 4px var(--brand-cyan-30));
}

/* Hover Effects on Icons */
.theme-toggle:hover .theme-icon.is-active {
  transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
}

/* ========================================
   GLOW EFFECT - AMBIENT LIGHTING
   ======================================== */

.theme-toggle-glow {
  position: absolute;
  inset: -2px;
  border-radius: 12px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(8px);
  pointer-events: none;
}

.theme-toggle:hover .theme-toggle-glow {
  opacity: 0.2;
}

.dark-theme .theme-toggle:hover .theme-toggle-glow {
  opacity: 0.3;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

@media (max-width: 768px) {
  .theme-toggle {
    width: 40px;
    height: 40px;
  }
  
  .theme-icon {
    width: 18px;
    height: 18px;
  }
}

/* ========================================
   REDUCED MOTION - ACCESSIBILITY
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-icon,
  .theme-toggle-glow {
    transition: none;
    animation: none;
  }
  
  .theme-icon {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  
  .theme-icon.is-active {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

/* ========================================
   HIGH CONTRAST MODE - ACCESSIBILITY
   ======================================== */

@media (prefers-contrast: high) {
  .theme-toggle {
    border-width: 2px;
    border-color: currentColor;
  }
  
  .theme-icon {
    stroke-width: 2.5;
  }
}
</style>

