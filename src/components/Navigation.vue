<template>
  <div class="header-container">
    <div class="logo-container animate-logo" @click="reloadPage" style="cursor: pointer;">
      <img 
        src="/factor.webp" 
        alt="Factor logo" 
        class="logo-image"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    
    <!-- Hamburger Button -->
    <button 
      class="hamburger" 
      :class="{ 'active': isMenuOpen }"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <!-- Desktop Navigation -->
    <nav class="navigation desktop-nav">
      <div class="nav-container">
        <ul class="navbar animate-nav-links">
          <li class="animate-nav-item" style="animation-delay: 0.1s;"><a href="#" @click="reloadPage" :class="{ active: activeSection === 'hero' }">Inicio</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.2s;"><a href="#expertise" @click="scrollTo('#expertise')" :class="{ active: activeSection === 'expertise' }">Expertise</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.3s;"><a href="#industries" @click="scrollTo('#industries')" :class="{ active: activeSection === 'industries' }">Industrias</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.4s;"><a href="#case-studies" @click="scrollTo('#case-studies')" :class="{ active: activeSection === 'case-studies' }">Casos de Estudio</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.5s;"><a href="#about" @click="scrollTo('#about')" :class="{ active: activeSection === 'about' }">Nuestra Empresa</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.6s;"><a href="#faqs" @click="scrollTo('#faqs')" :class="{ active: activeSection === 'faqs' }">FAQ</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.7s;"><a href="#contacto" @click="scrollTo('#contacto')" :class="{ active: activeSection === 'contacto' }">Contacto</a></li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" :class="{ 'active': isMenuOpen }" @click="closeMenu">
      <nav class="mobile-nav" @click.stop>
        <ul class="mobile-navbar">
          <li><a href="#" @click="handleNavClick('hero')" :class="{ active: activeSection === 'hero' }">Inicio</a></li>
          <li><a href="#expertise" @click="handleNavClick('expertise')" :class="{ active: activeSection === 'expertise' }">Expertise</a></li>
          <li><a href="#industries" @click="handleNavClick('industries')" :class="{ active: activeSection === 'industries' }">Industrias</a></li>
          <li><a href="#case-studies" @click="handleNavClick('case-studies')" :class="{ active: activeSection === 'case-studies' }">Casos de Estudio</a></li>
          <li><a href="#about" @click="handleNavClick('about')" :class="{ active: activeSection === 'about' }">Nuestra Empresa</a></li>
          <li><a href="#faqs" @click="handleNavClick('faqs')" :class="{ active: activeSection === 'faqs' }">FAQ</a></li>
          <li><a href="#contacto" @click="handleNavClick('contacto')" :class="{ active: activeSection === 'contacto' }">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('inicio')
const isMenuOpen = ref(false)

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

const reloadPage = () => {
  window.location.reload()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleNavClick = (section: string) => {
  if (section === 'hero') {
    reloadPage()
  } else {
    scrollTo(`#${section}`)
  }
  closeMenu()
}

// Throttled scroll handler for better performance
let scrollTimeout: number | null = null
const updateActiveSection = () => {
  if (scrollTimeout) return
  
  scrollTimeout = window.setTimeout(() => {
    const sections = ['hero', 'expertise', 'industries', 'case-studies', 'about', 'faqs', 'contacto']
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.querySelector(`#${section}`) as HTMLElement
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          activeSection.value = section
          break
        }
      }
    }
    scrollTimeout = null
  }, 16) // ~60fps
}

onMounted(() => {
  // Animations are now controlled by App.vue after loading screen completes
  // This prevents animations from running while content is hidden

  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  // Clean up body overflow style
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header-container {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(15px, 2vw, 40px);
  pointer-events: fill;
}

.logo-container {
  pointer-events: auto;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.logo-image {
  height: 100px;
  width: auto;
  display: block;
}

/* Hamburger Button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  background: rgba(15, 88, 107, 0.8);
  border: 1px solid rgba(51, 157, 191, 0.3);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  z-index: 1003;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.hamburger:hover {
  background: rgba(15, 88, 107, 0.9);
  border-color: rgba(51, 157, 191, 0.5);
  transform: translateY(-1px);
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.hamburger:hover span {
  background: var(--text-primary);
}

.hamburger.active {
  background: rgba(51, 157, 191, 0.9);
  border-color: rgba(49, 204, 240, 0.6);
}

.hamburger.active span {
  background: var(--text-primary);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Desktop Navigation */
.desktop-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  background: rgba(4, 8, 9, 0.675);
  backdrop-filter: blur(30px);
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 0 clamp(20px, 3vw, 30px);
  pointer-events: auto;
  transform-origin: left center;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1002;
}

.nav-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(50px, 8vh, 60px);
  min-width: clamp(500px, 60vw, 600px);
  max-width: clamp(600px, 80vw, 1000px);
}

/* Entrance animations */
.animate-nav-links {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-nav-item {
  opacity: 0;
  transform: translateX(-15px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.navbar {
  display: flex;
  list-style: none;
  gap: clamp(8px, 1.5vw, 15px);
  margin: 0;
  padding: 0;
}

.navbar a {
  color: var(--text-secondary);
  text-decoration: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 200;
  font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  letter-spacing: 0.5px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  position: relative;
  padding: clamp(6px, 1vw, 12px);
  border-radius: 6px;
  white-space: nowrap;
}

.navbar a:hover {
  color: var(--text-primary);
}

.navbar a.active {
  color: var(--text-primary);
  font-weight: 300;
  position: relative;
  letter-spacing: 0.6px;
}

.navbar a.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--text-primary), transparent);
  border-radius: 15px;
  opacity: 0.3;
}

.navbar li:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -7.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  opacity: 0.6;
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 8, 9, 0.955);
  backdrop-filter: blur(20px);
  z-index: 1002;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  padding: 0 2rem;
}

.mobile-navbar {
  list-style:none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
}

.mobile-navbar li {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  width: 100%;
}

.mobile-navbar li:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-nav-overlay.active .mobile-navbar li:not(:last-child)::after {
  opacity: 1;
}

.mobile-nav-overlay.active .mobile-navbar li {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav-overlay.active .mobile-navbar li:nth-child(1) { transition-delay: 0.1s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(2) { transition-delay: 0.15s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(3) { transition-delay: 0.2s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(4) { transition-delay: 0.25s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(5) { transition-delay: 0.3s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(6) { transition-delay: 0.35s; }
.mobile-nav-overlay.active .mobile-navbar li:nth-child(7) { transition-delay: 0.4s; }

.mobile-navbar a {
  color: var(--text-secondary);
  text-decoration: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  position: relative;
  padding: 1rem 0;
  display: block;
  text-align: center;
  width: 100%;
}

.mobile-navbar a:hover {
  color: var(--text-primary);
  transform: scale(1.05);
}

.mobile-navbar a.active {
  color: var(--text-primary);
  font-weight: 400;
  position: relative;
  letter-spacing: 0.8px;
}

.mobile-navbar a.active::after {
  content: '';
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--text-primary), transparent);
  border-radius: 15px;
  opacity: 0.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .header-container {
    justify-content: space-between;
  }
  
  .logo-container img {
    height: 80px !important;
  }
}

@media (max-width: 480px) {
  .logo-container img {
    height: 60px !important;
  }
  
  .mobile-navbar a {
    font-size: 1.25rem;
  }
  
  .mobile-nav {
    padding: 0 1rem;
  }
}
</style>