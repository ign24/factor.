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
            
            <a href="https://calendly.com/factor-ai" class="contact-method" :style="{ animationDelay: '0.3s' }">
              <CalendarIcon />
              <div>
                <div class="method-label">Agendar demo</div>
                <div class="method-value">30 minutos gratis</div>
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

/* Separador superior plateado elegante */
.contact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(180, 180, 180, 0.3) 15%, 
    rgba(220, 220, 220, 0.6) 35%, 
    rgba(255, 255, 255, 0.8) 50%, 
    rgba(220, 220, 220, 0.6) 65%, 
    rgba(180, 180, 180, 0.3) 85%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante */
.contact::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(160, 160, 160, 0.2) 20%, 
    rgba(190, 190, 190, 0.4) 40%, 
    rgba(210, 210, 210, 0.6) 50%, 
    rgba(190, 190, 190, 0.4) 60%, 
    rgba(160, 160, 160, 0.2) 80%, 
    transparent 100%
  );
  z-index: 2;
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: inherit;
  position: relative;
  overflow: hidden;
}

.contact-method:hover {
  border-color: var(--color-blue-light);
  background: linear-gradient(135deg, 
    rgba(51, 157, 191, 0.08) 0%, 
    rgba(49, 204, 240, 0.12) 100%
  );
  transform: translateX(6px);
  backdrop-filter: blur(8px);
}

.contact-method:hover svg {
  color: var(--color-blue-light);
  transform: scale(1.1);
}

.contact-method:hover .method-label {
  color: var(--color-blue-light);
}

.contact-method:hover .method-value {
  color: var(--text-primary);
}

.contact-method::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    var(--color-blue-light) 0%, 
    var(--color-blue) 50%, 
    var(--color-blue-dark) 100%
  );
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  z-index: -1;
}

.contact-method:hover::before {
  opacity: 0.03;
}

.contact-method svg {
  width: 24px;
  height: 24px;
  color: var(--color-blue);
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.method-label {
  color: var(--text-subtle);
  font-size: 14px;
  margin-bottom: 4px;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.method-value {
  color: var(--text-primary);
  font-weight: 500;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-form-container {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    var(--color-blue-light) 0%, 
    var(--color-blue) 50%, 
    var(--color-blue-dark) 100%
  );
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px;
  z-index: -1;
}

.contact-form-container:hover::before {
  opacity: 0.05;
}

.contact-form-container:hover {
  border-color: var(--color-blue-light);
  box-shadow: 0 8px 32px rgba(51, 157, 191, 0.1);
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  position: relative;
}

/* Estilos específicos para el select */
.form-group select {
  border: 1px solid var(--border-subtle);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.form-group input:hover,
.form-group textarea:hover,
.form-group select:hover {
  border-color: var(--color-blue);
  background: rgba(51, 157, 191, 0.02);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-subtle);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-blue-light);
  box-shadow: 0 0 0 3px rgba(51, 157, 191, 0.15);
  background: rgba(51, 157, 191, 0.03);
  transform: translateY(-1px);
}

.form-group input::before,
.form-group textarea::before,
.form-group select::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, 
    var(--color-blue-light) 0%, 
    var(--color-blue) 50%, 
    var(--color-blue-dark) 100%
  );
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.form-group input:focus::before,
.form-group textarea:focus::before,
.form-group select:focus::before {
  opacity: 0.1;
}

/* Estilos específicos para el dropdown del select */
.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300AEEF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 18px;
  padding-right: 48px;
  cursor: pointer;
  background-color: rgb(4,8,9);
  color: white;
}

.form-group select option {
  background-color: rgb(4,8,9);
  color: var(--text-primary);
  padding: 16px 20px;
  border: none;
  font-size: 15px;
  line-height: 1.4;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Estilos para el dropdown nativo en diferentes navegadores */
.form-group select::-ms-expand {
  display: none;
}

.form-group select {
  -moz-appearance: none;
}

.form-group select::-webkit-select-placeholder {
  color: var(--text-subtle);
}

/* Estilos para la opción placeholder */
.form-group select option[value=""] {
  color: var(--text-subtle);
  font-style: italic;
}

/* Mejorar la legibilidad del dropdown */
.form-group select:invalid {
  color: var(--text-subtle);
}

.form-group select:valid {
  color: var(--text-primary);
}

/* Estilos adicionales para el dropdown */
.form-group select:focus option {
  background-color: rgb(4,8,9);
}

.form-group select:focus option:hover {
  background-color: rgba(0, 174, 239, 0.3);
}

/* Estilos específicos para las opciones del select */
.form-group select option {
  background-color: rgb(4,8,9) !important;
  color: white !important;
  border: none !important;
  outline: none !important;
}

.form-group select option:hover,
.form-group select option:focus,
.form-group select option:checked {
  background-color: rgba(0, 174, 239, 0.3) !important;
  color: white !important;
}

.form-group select option:checked {
  background-color: rgba(0, 174, 239, 0.4) !important;
  font-weight: 500;
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