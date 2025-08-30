<template>
  <div class="header-container">
    <div class="logo-container animate-logo">
      <img src="/factor.webp" alt="Factor logo" style="height:100px; width:auto; display:block;" />
    </div>
    
    <nav class="navigation">
      <div class="nav-container">
        <ul class="navbar animate-nav-links">
          <li class="animate-nav-item" style="animation-delay: 0.1s;"><a href="#hero" @click="scrollTo('#hero')" :class="{ active: activeSection === 'hero' }">Inicio</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.2s;"><a href="#expertise" @click="scrollTo('#expertise')" :class="{ active: activeSection === 'expertise' }">Expertise</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.3s;"><a href="#industries" @click="scrollTo('#industries')" :class="{ active: activeSection === 'industries' }">Industrias</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.4s;"><a href="#case-studies" @click="scrollTo('#case-studies')" :class="{ active: activeSection === 'case-studies' }">Casos de Estudio</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.5s;"><a href="#about" @click="scrollTo('#about')" :class="{ active: activeSection === 'about' }">Nuestra Empresa</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.6s;"><a href="#faqs" @click="scrollTo('#faqs')" :class="{ active: activeSection === 'faqs' }">FAQ</a></li>
          <li class="animate-nav-item" style="animation-delay: 0.7s;"><a href="#contacto" @click="scrollTo('#contacto')" :class="{ active: activeSection === 'contacto' }">Contacto</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('inicio')

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

const updateActiveSection = () => {
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
}

onMounted(() => {
  // Animations are now controlled by App.vue after loading screen completes
  // This prevents animations from running while content is hidden

  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(15px, 2vw, 40px);
  pointer-events: none;
}

.logo-container {
  pointer-events: auto;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.navigation {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  background: rgba(4, 8, 9, 0);
  backdrop-filter: blur(0px);
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 0 clamp(20px, 3vw, 30px);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
  pointer-events: auto;
  transform-origin: left center;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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


</style>