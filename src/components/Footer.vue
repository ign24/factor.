<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-circle"></div>
            <div class="logo-text">
              <span class="brand-name">CicloML</span>
              <span class="brand-by">by Ignacio Z</span>
            </div>
          </div>
          <p class="footer-description">
            Soluciones de IA reales para productos escalables
          </p>
        </div>
        
        <nav class="footer-nav">
          <div class="nav-section">
            <h4 class="nav-title">Navegación</h4>
            <ul class="nav-links">
              <li><a href="#inicio" @click="scrollTo('#inicio')">Inicio</a></li>
              <li><a href="#servicios" @click="scrollTo('#servicios')">Servicios</a></li>
              <li><a href="#proyectos" @click="scrollTo('#proyectos')">Proyectos</a></li>
              <li><a href="#proceso" @click="scrollTo('#proceso')">Proceso</a></li>
            </ul>
          </div>
          
          <div class="nav-section">
            <h4 class="nav-title">Contacto</h4>
            <ul class="nav-links">
              <li><a href="#sobre-mi" @click="scrollTo('#sobre-mi')">Sobre mí</a></li>
              <li><a href="#contacto" @click="scrollTo('#contacto')">Contacto</a></li>
              <li><a href="mailto:ignacio@cicloml.com">Email</a></li>
              <li><a href="https://calendly.com/ignacioz">Agendar call</a></li>
            </ul>
          </div>
          
          <div class="nav-section">
            <h4 class="nav-title">Redes</h4>
            <ul class="social-links">
              <li>
                <a href="https://linkedin.com/in/ignacioz" class="social-link">
                  <LinkedinIcon />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/ignacioz" class="social-link">
                  <GithubIcon />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ignacioz" class="social-link">
                  <TwitterIcon />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-meta">
          <p class="copyright">
            © {{ currentYear }} CicloML. Diseñado y desarrollado con ❤️
          </p>
          <div class="footer-tech">
            <span>Hecho con Vue.js & mucho café</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

// Icon Components
const LinkedinIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 16 12A2 2 0 0 0 14 14V21H10V9H14V11A6 6 0 0 1 16 8Z" stroke="currentColor" stroke-width="2"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const GithubIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 22V18C15.1392 16.7473 14.7351 15.4978 13.8915 14.5039C16.3915 14.2189 19 13.0659 19 9.5C19 8.5 18.7 7.7 18.1 7.1C18.35 6.35 18.35 5.3 18.1 4.55C17.1 4.3 15.8 5.3 15 5.95C13.68 5.6 12.32 5.6 11 5.95C10.2 5.3 8.9 4.3 7.9 4.55C7.65 5.3 7.65 6.35 7.9 7.1C7.3 7.7 7 8.5 7 9.5C7 13.0659 9.6085 14.2189 12.1085 14.5039C11.2649 15.4978 10.8608 16.7473 11 18V22" stroke="currentColor" stroke-width="2"/>
      <path d="M9 18C4.49 20 4 16 2 16" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4S20.1 5.1 18.5 5.3C17.7 4.4 16.6 3.9 15.4 3.9C12.6 3.9 10.3 6.2 10.3 9S5.9 7.3 3 5.2C2.4 6.3 2.8 7.6 3.8 8.3C3.2 8.3 2.7 8.1 2.2 7.8C2.2 10.3 3.8 12.5 6.1 13C5.6 13.1 5.1 13.1 4.6 13C5.2 15.1 7 16.5 9.1 16.5C7.3 17.9 5 18.6 2.6 18.3C4.7 19.6 7.1 20.4 9.7 20.4C15.4 20.4 18.6 15.1 18.6 10.6V10C19.4 9.4 20.1 8.7 20.7 7.9L22 4Z" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}
</script>

<style scoped>
.footer {
  background: rgb(4,8,9);
  border-top: 1px solid var(--border-subtle);
  padding: 80px 0 40px;
  position: relative;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border-radius: 50%;
  position: relative;
}

.logo-circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: var(--bg-primary);
  border-radius: 50%;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.brand-by {
  font-size: 12px;
  color: var(--text-subtle);
}

.footer-description {
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 300px;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.nav-title {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--color-magenta);
}

.social-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.social-link svg {
  width: 16px;
  height: 16px;
}

.social-link:hover {
  color: var(--color-magenta);
  transform: translateX(4px);
}

.footer-bottom {
  position: relative;
  z-index: 2;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.3) 50%,
    transparent 100%
  );
  margin-bottom: 32px;
}

.footer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-subtle);
  font-size: 14px;
}

.footer-tech {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 0 40px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-meta {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .logo {
    justify-content: center;
  }
}
</style>