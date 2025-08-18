<template>
  <section id="contacto" class="contact section-padding">
    <div class="container">
      <div class="contact-content">
        <div class="contact-info" :class="{ 'animate-in': isVisible }">
          <h2 class="contact-title">
            ¿Listo para <span class="highlight">crear algo increíble</span>?
          </h2>
          
          <p class="contact-description gradient-text-gray-white">
            Transformemos tu idea en una solución de IA que escale. 
            Te respondo en menos de 24 horas.
          </p>
          
          <div class="contact-methods">
            <a href="mailto:ignacio@cicloml.com" class="contact-method" :style="{ animationDelay: '0.1s' }">
              <EmailIcon />
              <div>
                <div class="method-label">Email</div>
                <div class="method-value">ignacio@cicloml.com</div>
              </div>
            </a>
            
            <a href="https://linkedin.com/in/ignacioz" class="contact-method" :style="{ animationDelay: '0.2s' }">
              <LinkedinIcon />
              <div>
                <div class="method-label">LinkedIn</div>
                <div class="method-value">/in/ignacioz</div>
              </div>
            </a>
            
            <a href="https://calendly.com/ignacioz" class="contact-method" :style="{ animationDelay: '0.3s' }">
              <CalendarIcon />
              <div>
                <div class="method-label">Agendar call</div>
                <div class="method-value">15 minutos gratis</div>
              </div>
            </a>
          </div>
        </div>
        
        <div class="contact-form-container" :class="{ 'animate-in': isVisible }">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="Tu nombre completo"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="tu@email.com"
              >
            </div>
            
            <div class="form-group">
              <label for="company">Empresa (opcional)</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
                placeholder="Tu empresa o startup"
              >
            </div>
            
            <div class="form-group">
              <label for="project">Cuéntame sobre tu proyecto</label>
              <textarea 
                id="project" 
                v-model="form.project" 
                required
                placeholder="Describe tu idea, el problema que quieres resolver, o qué tipo de solución de IA necesitas..."
                rows="4"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="budget">Presupuesto estimado</label>
              <select id="budget" v-model="form.budget" required>
                <option value="">Selecciona un rango</option>
                <option value="< $5K">Menos de $5,000</option>
                <option value="$5K - $15K">$5,000 - $15,000</option>
                <option value="$15K - $30K">$15,000 - $30,000</option>
                <option value="$30K+">$30,000+</option>
              </select>
            </div>
            
            <button type="submit" class="submit-button" :class="{ loading: isSubmitting }">
              <span v-if="!isSubmitting">Empezar proyecto</span>
              <span v-else>Enviando...</span>
              <SendIcon v-if="!isSubmitting" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const isSubmitting = ref(false)
const isVisible = ref(false)

const form = reactive({
  name: '',
  email: '',
  company: '',
  project: '',
  budget: ''
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form)
  
  // Reset form
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
  
  isSubmitting.value = false
  
  // Show success message (you could use a toast library)
  alert('¡Gracias! Te responderé pronto.')
}

// Icon Components
const EmailIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const LinkedinIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 16 12A2 2 0 0 0 14 14V21H10V9H14V11A6 6 0 0 1 16 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const CalendarIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const SendIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )
  
  const section = document.querySelector('#contacto')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Entrance animations */
.contact-info,
.contact-form-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-info.animate-in,
.contact-form-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.contact-info {
  transition-delay: 0.1s;
}

.contact-form-container {
  transition-delay: 0.2s;
}

.contact-method {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-info.animate-in .contact-method {
  opacity: 1;
  transform: translateX(0);
}

.contact {
  background: rgb(4,8,9);
  position: relative;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  position: relative;
  z-index: 2;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 300%;
  animation: gradient-shift 8s ease-in-out infinite;
}

.contact-description {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: inherit;
}

.contact-method:hover {
  border-color: var(--border-primary);
  background: rgba(236, 72, 153, 0.1);
  transform: translateX(8px);
}

.contact-method svg {
  width: 24px;
  height: 24px;
  color: var(--color-magenta);
  flex-shrink: 0;
}

.method-label {
  color: var(--text-subtle);
  font-size: 14px;
  margin-bottom: 4px;
}

.method-value {
  color: var(--text-primary);
  font-weight: 500;
}

.contact-form-container {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-subtle);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-magenta);
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}

.submit-button {
  background: var(--gradient-primary);
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  background-size: 200% 200%;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-pink);
  background-position: 100% 50%;
}

.submit-button.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-button svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.submit-button:hover svg {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-form-container {
    padding: 24px;
  }
  
  .contact-methods {
    margin-bottom: 32px;
  }
}
</style>