<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <img src="/factor.png" alt="Factor" class="brand-logo" />
          </div>
          <p class="footer-description">
            Soluciones de IA reales para productos escalables. Entregamos MVPs listos para producción con mínima complejidad operativa.
          </p>
          <div class="social-links-mobile">
            <a href="https://linkedin.com/company/factor-ai" class="social-link" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://twitter.com/factor_ai" class="social-link" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://github.com/factor-ai" class="social-link" aria-label="GitHub">
              <GithubIcon />
            </a>
          </div>
        </div>
        
        <nav class="footer-nav">
          <div class="nav-section">
            <h4 class="nav-title">Soluciones</h4>
            <ul class="nav-links">
              <li><a href="#expertise" @click="scrollTo('#expertise')">Expertise IA</a></li>
              <li><a href="#industries" @click="scrollTo('#industries')">Industrias</a></li>
              <li><a href="#case-studies" @click="scrollTo('#case-studies')">Casos de Estudio</a></li>
              <li><a href="#solutions" @click="scrollTo('#solutions')">Servicios</a></li>
            </ul>
          </div>
          
          <div class="nav-section">
            <h4 class="nav-title">Empresa</h4>
            <ul class="nav-links">
              <li><a href="#about" @click="scrollTo('#about')">Sobre Factor</a></li>
              <li><a href="#expertise" @click="scrollTo('#expertise')">Nuestro Enfoque</a></li>
              <li><a href="#case-studies" @click="scrollTo('#case-studies')">Portfolio</a></li>
              <li><a href="#faqs" @click="scrollTo('#faqs')">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          
          <div class="nav-section">
            <h4 class="nav-title">Contacto</h4>
            <ul class="nav-links">
              <li><a href="#contacto" @click="scrollTo('#contacto')">Contacto</a></li>
              <li><a href="mailto:hola@factor.ai">hola@factor.ai</a></li>
              <li><a href="https://calendly.com/factor-ai">Agendar Demo</a></li>
              <li><a href="#contacto" @click="scrollTo('#contacto')">Solicitar Cotización</a></li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-meta">
          <div class="footer-legal">
            <p class="copyright">
              © {{ currentYear }} Factor. Todos los derechos reservados.
            </p>
            <div class="legal-links">
              <a href="/privacy" class="legal-link">Privacidad</a>
              <span class="separator">•</span>
              <a href="/terms" class="legal-link">Términos</a>
              <span class="separator">•</span>
              <a href="/cookies" class="legal-link">Cookies</a>
            </div>
          </div>
          <div class="footer-tech">
            <span class="tech-text">Desarrollado con Vue.js & TypeScript</span>
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
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 16 12A2 2 0 0 0 14 14V21H10V9H14V11A6 6 0 0 1 16 8Z" stroke="currentColor" stroke-width="2"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const GithubIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <path d="M15 22V18C15.1392 16.7473 14.7351 15.4978 13.8915 14.5039C16.3915 14.2189 19 13.0659 19 9.5C19 8.5 18.7 7.7 18.1 7.1C18.35 6.35 18.35 5.3 18.1 4.55C17.1 4.3 15.8 5.3 15 5.95C13.68 5.6 12.32 5.6 11 5.95C10.2 5.3 8.9 4.3 7.9 4.55C7.65 5.3 7.65 6.35 7.9 7.1C7.3 7.7 7 8.5 7 9.5C7 13.0659 9.6085 14.2189 12.1085 14.5039C11.2649 15.4978 10.8608 16.7473 11 18V22" stroke="currentColor" stroke-width="2"/>
      <path d="M9 18C4.49 20 4 16 2 16" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <path d="M22 4S20.1 5.1 18.5 5.3C17.7 4.4 16.6 3.9 15.4 3.9C12.6 3.9 10.3 6.2 10.3 9S5.9 7.3 3 5.2C2.4 6.3 2.8 7.6 3.8 8.3C3.2 8.3 2.7 8.1 2.2 7.8C2.2 10.3 3.8 12.5 6.1 13C5.6 13.1 5.1 13.1 4.6 13C5.2 15.1 7 16.5 9.1 16.5C7.3 17.9 5 18.6 2.6 18.3C4.7 19.6 7.1 20.4 9.7 20.4C15.4 20.4 18.6 15.1 18.6 10.6V10C19.4 9.4 20.1 8.7 20.7 7.9L22 4Z" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, 
    rgba(4, 8, 9, 0.95) 0%,
    rgba(4, 8, 9, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  padding: 80px 0 40px;
  position: relative;
  margin-top: 120px;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.4) 20%,
    rgba(49, 204, 240, 0.4) 50%,
    rgba(0, 255, 191, 0.4) 80%,
    transparent 100%
  );
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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

.brand-logo {
  height: 60px;
  width: auto;
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.brand-logo:hover {
  filter: brightness(1) invert(0);
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 320px;
  font-size: 15px;
}

.social-links-mobile {
  display: none;
  gap: 16px;
  margin-top: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}

.social-link .icon {
  width: 18px;
  height: 18px;
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
  position: relative;
}

.nav-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 20px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 1px;
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
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
}

.nav-links a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 1px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
  transform: translateY(-50%);
}

.nav-links a:hover {
  color: var(--text-primary);
  padding-left: 12px;
}

.nav-links a:hover::before {
  width: 8px;
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
    rgba(139, 92, 246, 0.2) 20%,
    rgba(49, 204, 240, 0.2) 50%,
    rgba(0, 255, 191, 0.2) 80%,
    transparent 100%
  );
  margin-bottom: 32px;
}

.footer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 24px;
}

.copyright {
  margin: 0;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.legal-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: var(--text-primary);
}

.separator {
  color: var(--text-secondary);
  opacity: 0.5;
}

.footer-tech {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-text {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 0 40px;
    margin-top: 80px;
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
    gap: 24px;
    text-align: center;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 16px;
  }
  
  .legal-links {
    justify-content: center;
  }
  
  .social-links-mobile {
    display: flex;
    justify-content: center;
  }
  
  .brand-logo {
    margin: 0 auto;
  }
  
  .footer-description {
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 40px 0 30px;
  }
  
  .footer-content {
    gap: 32px;
  }
  
  .footer-nav {
    gap: 24px;
  }
  
  .nav-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
 }
</style>