# 📚 Documentación de Componentes - Factor AI Landing Page

Este documento describe en detalle todos los componentes Vue.js utilizados en la landing page de Factor AI, incluyendo su funcionalidad, props, eventos y estilos.

## 🏗️ Estructura de Componentes

### Componente Principal: `App.vue`
**Archivo**: `src/App.vue`

**Descripción**: Componente raíz que orquesta toda la landing page y define el layout principal.

**Características**:
- Importa y renderiza todos los componentes de sección
- Define estilos globales y animaciones
- Maneja el sistema de navegación y scroll
- Implementa el sistema de colores de marca

**Estructura**:
```vue
<template>
  <div id="app">
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
```

**Estilos Globales**:
- Sistema de colores CSS variables
- Animaciones keyframes personalizadas
- Clases utilitarias para gradientes y efectos
- Responsive breakpoints

---

## 🎯 Componentes de Sección

### 1. HeroSection.vue
**Archivo**: `src/components/HeroSection.vue`

**Propósito**: Sección principal de la landing page con video de fondo y mensaje clave.

**Características Técnicas**:
- **Video de fondo en loop** con transiciones suaves entre dos videos
- **Efectos de agua reactivos** usando Three.js
- **Animaciones de entrada** para título, descripción y CTA
- **Sistema de audio** integrado con controles de reproducción

**Funcionalidades**:
```typescript
// Gestión de videos
const video1Ref = ref<HTMLVideoElement>()
const video2Ref = ref<HTMLVideoElement>()
const currentVideo = ref(1)
const isTransitioning = ref(false)

// Transiciones automáticas
const startTransition = (targetVideo: number) => {
  // Lógica de transición entre videos
}

// Efectos de agua reactivos
const initWaterEffect = () => {
  // Inicialización de Three.js y efectos de agua
}
```

**Props**: No recibe props externos
**Eventos**: 
- `scrollToContact`: Navega a la sección de contacto
- `onVideoLoaded`: Maneja la carga de videos

**Estilos Responsivos**:
- Mobile: Layout vertical con video optimizado
- Tablet: Layout híbrido con efectos adaptados
- Desktop: Layout completo con todos los efectos

---

### 2. AIExpertiseSection.vue
**Archivo**: `src/components/AIExpertiseSection.vue`

**Propósito**: Muestra las 6 áreas de expertise en tecnologías de IA.

**Características Técnicas**:
- **Cards interactivas** con efectos hover 3D
- **Scroll horizontal** para navegación entre expertise
- **Imágenes optimizadas** para cada área de expertise
- **Animaciones de entrada** escalonadas

**Datos del Componente**:
```typescript
const expertiseItems = [
  {
    title: 'LLMs y RAG',
    description: 'Implementa LLMs y sistemas de recuperación...',
    image: cubo
  },
  {
    title: 'Visión por computadora',
    description: 'Utiliza reconocimiento de imágenes...',
    image: flower
  },
  // ... más items
]
```

**Funcionalidades**:
- Scroll horizontal suave con indicadores
- Efectos hover en cards
- Animaciones de entrada escalonadas
- Navegación por teclado

**Props**: No recibe props externos
**Eventos**: 
- `scrollRight`: Navega horizontalmente en las cards

---

### 3. SolutionsSection.vue
**Archivo**: `src/components/SolutionsSection.vue`

**Propósito**: Presenta las 4 soluciones principales que ofrece Factor AI.

**Características Técnicas**:
- **Cards con efectos 3D** y animaciones de tilt
- **Sistema de observación** para animaciones de entrada
- **Efectos de glow** y sombras dinámicas
- **Layout responsive** con grid adaptativo

**Funcionalidades**:
```typescript
// Sistema de observación para animaciones
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

// Efectos 3D en cards
const handleTilt = (event: MouseEvent, card: HTMLElement) => {
  // Lógica de tilt 3D
}
```

**Props**: No recibe props externos
**Eventos**:
- `scrollToContact`: Navega a la sección de contacto

**Soluciones Presentadas**:
1. Integra IA en tus productos
2. Aplica IA a tus operaciones
3. Eleva tus operaciones de IA
4. Mejora tu equipo con expertos

---

### 4. ContactSection.vue
**Archivo**: `src/components/ContactSection.vue`

**Propósito**: Formulario de contacto principal con validación y métodos alternativos.

**Características Técnicas**:
- **Formulario completo** con validación HTML5
- **Métodos alternativos** de contacto (Calendly)
- **Animaciones de entrada** escalonadas
- **Diseño responsive** y accesible

**Estructura del Formulario**:
```typescript
const form = reactive({
  name: '',
  email: '',
  company: '',
  project: '',
  budget: ''
})

const handleSubmit = async () => {
  // Lógica de envío del formulario
}
```

**Campos del Formulario**:
- **Nombre**: Texto requerido
- **Email**: Email requerido con validación
- **Empresa**: Texto opcional
- **Proyecto**: Textarea requerido
- **Presupuesto**: Select con rangos predefinidos

**Validaciones**:
- Campos requeridos marcados con `required`
- Validación de email nativa del navegador
- Mensajes de error personalizados
- Estado de envío con loading

**Métodos Alternativos**:
- **Calendly**: Agendar demo de 30 minutos gratis
- **Integración directa** con calendario externo

---

### 5. Navigation.vue
**Archivo**: `src/components/Navigation.vue`

**Propósito**: Navegación principal con menú responsive y navegación suave.

**Características Técnicas**:
- **Menú hamburguesa** para dispositivos móviles
- **Navegación suave** entre secciones
- **Estado activo** para la sección actual
- **Animaciones de entrada** para el menú móvil

**Funcionalidades**:
- Navegación por anclas internas
- Menú responsive con toggle
- Indicador de sección activa
- Scroll suave entre secciones

---

### 6. Footer.vue
**Archivo**: `src/components/Footer.vue`

**Propósito**: Pie de página con enlaces importantes y información de contacto.

**Características Técnicas**:
- **Enlaces organizados** por categorías
- **Información legal** y de contacto
- **Redes sociales** integradas
- **Diseño responsive** y accesible

---

## 🎨 Componentes de UI

### AnimatedCounter.vue
**Archivo**: `src/components/AnimatedCounter.vue`

**Propósito**: Contador animado para mostrar métricas y estadísticas.

**Props**:
- `value`: Número final a mostrar
- `duration`: Duración de la animación en ms
- `prefix`: Texto antes del número
- `suffix`: Texto después del número

**Funcionalidades**:
- Animación de conteo suave
- Formateo de números grandes
- Pausa en hover
- Reinicio automático al entrar en viewport

---

### AnimatedText.vue
**Archivo**: `src/components/AnimatedText.vue`

**Propósito**: Texto con animaciones de entrada y efectos de typing.

**Props**:
- `text`: Texto a animar
- `type`: Tipo de animación ('fade', 'slide', 'type')
- `delay`: Retraso antes de iniciar la animación
- `duration`: Duración de la animación

---

### AudioReactiveWaterEffect.vue
**Archivo**: `src/components/AudioReactiveWaterEffect.vue`

**Propósito**: Efectos de agua 3D que responden al audio de fondo.

**Características Técnicas**:
- **Integración con Three.js** para renderizado 3D
- **Análisis de audio** en tiempo real
- **Efectos de agua** con física realista
- **Optimización de rendimiento** para móviles

**Funcionalidades**:
- Análisis de frecuencia de audio
- Separación de bandas (bass, mid, treble)
- Efectos de agua reactivos
- Controles de reproducción

---

## 🔧 Componentes de Utilidad

### ContentSection.vue
**Archivo**: `src/components/ContentSection.vue`

**Propósito**: Contenedor genérico para secciones de contenido con estilos consistentes.

**Props**:
- `title`: Título de la sección
- `subtitle`: Subtítulo opcional
- `background`: Color de fondo personalizado
- `padding`: Padding personalizado

---

### TrustedExpertsSection.vue
**Archivo**: `src/components/TrustedExpertsSection.vue`

**Propósito**: Sección de confianza con testimonios y credenciales.

**Características**:
- Contadores animados para métricas
- Testimonios de clientes
- Logos de empresas confiables
- Efectos visuales de autoridad

---

### CaseStudiesSection.vue
**Archivo**: `src/components/CaseStudiesSection.vue`

**Propósito**: Casos de estudio y proyectos exitosos.

**Características**:
- Grid de casos de estudio
- Métricas y resultados
- Testimonios de clientes
- Enlaces a proyectos completos

---

### AboutFactorSection.vue
**Archivo**: `src/components/AboutFactorSection.vue`

**Propósito**: Información sobre la empresa y su misión.

**Contenido**:
- Historia de la empresa
- Valores y principios
- Equipo y experiencia
- Visión y misión

---

### FAQsSection.vue
**Archivo**: `src/components/FAQsSection.vue`

**Propósito**: Preguntas frecuentes organizadas en acordeón.

**Características**:
- Acordeón interactivo
- Categorías de preguntas
- Búsqueda de preguntas
- Animaciones suaves

---

## 🎭 Sistema de Animaciones

### Tipos de Animaciones
1. **Entrada**: `fadeInUp`, `slideInLeft`, `zoomIn`
2. **Hover**: `scale`, `glow`, `tilt`
3. **Scroll**: `parallax`, `stagger`, `reveal`
4. **Audio**: `water`, `particles`, `waves`

### Implementación
```css
/* Animaciones de entrada */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
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
```

---

## 📱 Responsividad

### Breakpoints Implementados
```css
/* Mobile First */
@media (min-width: 768px)  /* Tablet */
@media (min-width: 1024px) /* Desktop */
@media (min-width: 1440px) /* Large Desktop */
```

### Adaptaciones por Dispositivo
- **Mobile**: Layout vertical, menú hamburguesa, efectos simplificados
- **Tablet**: Layout híbrido, navegación adaptada, efectos moderados
- **Desktop**: Layout completo, navegación completa, todos los efectos

---

## ♿ Accesibilidad

### Características Implementadas
- **Navegación por teclado** completa
- **ARIA labels** para elementos interactivos
- **Contraste de colores** optimizado
- **Textos alternativos** para imágenes
- **Estructura semántica** HTML5

### Mejores Prácticas
- Uso de elementos semánticos (`<section>`, `<article>`, `<nav>`)
- Labels descriptivos para formularios
- Estados de foco visibles
- Mensajes de error claros

---

## 🧪 Testing

### Estrategias de Testing
1. **Unit Testing**: Componentes individuales con Vue Test Utils
2. **Integration Testing**: Interacciones entre componentes
3. **E2E Testing**: Flujos completos de usuario
4. **Accessibility Testing**: Cumplimiento de estándares WCAG

### Herramientas Recomendadas
- **Vue Test Utils** para testing de componentes
- **Vitest** para testing unitario
- **Playwright** para testing E2E
- **axe-core** para testing de accesibilidad

---

## 🔄 Ciclo de Vida de Componentes

### Hooks de Vue 3
```typescript
import { ref, onMounted, onUnmounted } from 'vue'

// Setup del componente
const isVisible = ref(false)

// Montaje
onMounted(() => {
  // Inicialización de efectos y observadores
})

// Desmontaje
onUnmounted(() => {
  // Limpieza de recursos y listeners
})
```

### Patrones de Comunicación
1. **Props Down**: Datos pasados de padre a hijo
2. **Events Up**: Eventos emitidos de hijo a padre
3. **Provide/Inject**: Datos compartidos en árbol de componentes
4. **Composables**: Lógica reutilizable entre componentes

---

## 📚 Recursos Adicionales

### Documentación Vue.js
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Vue Style Guide](https://vuejs.org/style-guide/)

### Herramientas de Desarrollo
- [Vue DevTools](https://devtools.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

*Documentación generada para Factor AI Landing Page - Diciembre 2024*
