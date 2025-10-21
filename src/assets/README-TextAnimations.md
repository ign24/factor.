# Animaciones de Texto Fluidas - Documentación

## Descripción General

Se han implementado animaciones de entrada y salida fluidas y sofisticadas para todos los textos de la landing page. Estas animaciones mejoran significativamente la experiencia del usuario al proporcionar transiciones suaves y naturales.

## Nuevas Animaciones Disponibles

### Animaciones de Entrada

#### 1. **Fade In** (`.animate-fade-in`)
- Desvanecimiento suave con movimiento vertical
- Timing: 0.8s
- Uso: Textos generales y elementos simples

#### 2. **Slide Up** (`.animate-slide-up`)
- Deslizamiento desde abajo hacia arriba
- Timing: 1s
- Uso: Títulos y elementos principales

#### 3. **Slide Down** (`.animate-slide-down`)
- Deslizamiento desde arriba hacia abajo
- Timing: 1s
- Uso: Subtítulos y descripciones

#### 4. **Slide Left** (`.animate-slide-left`)
- Deslizamiento de derecha a izquierda
- Timing: 1s
- Uso: Elementos de navegación y menús

#### 5. **Slide Right** (`.animate-slide-right`)
- Deslizamiento de izquierda a derecha
- Timing: 1s
- Uso: Contenido secundario

#### 6. **Scale In** (`.animate-scale-in`)
- Efecto de crecimiento con bounce sutil
- Timing: 0.9s
- Uso: Botones y CTAs

#### 7. **Blur In** (`.animate-blur-in`) ⭐
- Transición de desenfoque a enfoque con movimiento
- Timing: 1s
- Uso: Títulos principales y texto destacado

#### 8. **Rotate In** (`.animate-rotate-in`)
- Rotación sutil con fade in
- Timing: 0.9s
- Uso: Elementos decorativos

#### 9. **Bounce In** (`.animate-bounce-in`)
- Entrada con efecto de rebote suave
- Timing: 0.8s
- Uso: Elementos interactivos y tarjetas

#### 10. **Reveal** (`.animate-reveal`)
- Efecto de cortina revelando contenido
- Timing: 1s
- Uso: Imágenes y bloques de contenido

#### 11. **Elastic In** (`.animate-elastic-in`)
- Entrada con efecto elástico
- Timing: 1.2s
- Uso: Elementos destacados con personalidad

#### 12. **Perspective In** (`.animate-perspective-in`)
- Entrada con perspectiva 3D
- Timing: 1s
- Uso: Elementos especiales con efecto dramático

### Animaciones de Salida

#### 1. **Fade Out** (`.animate-fade-out`)
- Desvanecimiento suave hacia arriba
- Timing: 0.6s

#### 2. **Slide Out Up** (`.animate-slide-out-up`)
- Deslizamiento hacia arriba
- Timing: 0.6s

#### 3. **Slide Out Down** (`.animate-slide-out-down`)
- Deslizamiento hacia abajo
- Timing: 0.6s

#### 4. **Scale Out** (`.animate-scale-out`)
- Reducción de tamaño con fade out
- Timing: 0.6s

### Efectos Especiales de Texto

#### 1. **Gradient Text Flow** (`.animate-gradient-text`)
- Gradiente animado que fluye a través del texto
- Uso: Títulos destacados con branding

#### 2. **Text Shimmer** (`.animate-text-shimmer`)
- Efecto de brillo que recorre el texto
- Uso: Texto de lujo o premium

#### 3. **Text Glow** (`.animate-text-glow`)
- Pulsación de resplandor suave
- Uso: Texto de llamadas a la acción

#### 4. **Stagger Children** (`.animate-stagger-children`)
- Animación secuencial de elementos hijos
- Uso: Listas y grupos de elementos

## Uso del Componente AnimatedText

El componente `AnimatedText.vue` ha sido mejorado con todas estas animaciones:

```vue
<AnimatedText 
  text="Tu texto aquí"
  animation="blur"
  :split-words="true"
  :delay="100"
  class-name="custom-class"
/>
```

### Props disponibles:

- **text** (string, requerido): El texto a animar
- **animation** (string, opcional): Tipo de animación
  - Valores: 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'blur', 'rotate', 'bounce', 'reveal', 'elastic', 'perspective'
  - Default: 'fade'
- **split-words** (boolean, opcional): Anima cada palabra individualmente
  - Default: false
- **delay** (number, opcional): Retardo en ms antes de iniciar
  - Default: 100
- **class-name** (string, opcional): Clases CSS adicionales

## Clases Utilitarias

### Delays
```css
.delay-100  /* 0.1s */
.delay-200  /* 0.2s */
.delay-300  /* 0.3s */
...
.delay-1000 /* 1s */
```

### Transiciones Suaves
```css
.smooth-transition-all       /* Transición suave para todas las propiedades */
.smooth-transition-opacity   /* Solo para opacidad */
.smooth-transition-transform /* Solo para transform */
.smooth-text-transition      /* Optimizada para texto */
```

## Implementación en Componentes

### Componentes Actualizados

1. **HeroSection.vue**
   - Animación de blur para el título principal
   - Animaciones secuenciales para todos los elementos
   - Delays progresivos para una entrada coreografiada

2. **AboutFactorSection.vue**
   - Animaciones con blur y stagger
   - Bounce effect en las estadísticas
   - Entrada desde el lado derecho para imágenes

3. **SolutionsSection.vue**
   - Cards con bounce animado
   - Stagger en tarjetas de solución
   - Blur effect en títulos de sección

4. **ContactSection.vue**
   - Entrada secuencial de elementos del formulario
   - Blur effect en información de contacto
   - Animación de bounce en el botón de submit

5. **AIExpertiseSection.vue**
   - Animación de cards con stagger
   - Blur effect en título de sección
   - Keyframe animations para cards

## Curvas de Timing Utilizadas

```css
/* Suave y natural */
cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Con bounce suave */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Ultra suave */
cubic-bezier(0.16, 1, 0.3, 1)

/* Salida rápida */
cubic-bezier(0.4, 0, 1, 1)
```

## Optimizaciones de Performance

### GPU Acceleration
- Uso de `translateZ(0)` en todos los transforms
- `will-change` para propiedades animadas
- `backface-visibility: hidden` para evitar glitches

### Mobile Optimizations
- Animaciones más rápidas en dispositivos móviles
- Deshabilitación de hover effects en táctiles
- Reducción de complejidad en animaciones complejas

### Accesibilidad
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se deshabilitan */
}
```

## Mejores Prácticas

1. **Usar blur con moderación**: El blur es costoso en rendimiento
2. **Secuenciar animaciones**: Usar delays para crear narrativa visual
3. **Combinar animaciones**: Blur + Slide para efecto dramático
4. **Respetar las preferencias**: Siempre incluir `prefers-reduced-motion`
5. **Testear en mobile**: Las animaciones deben ser fluidas en todos los dispositivos

## Ejemplos de Código

### Ejemplo 1: Título con blur effect
```vue
<h1 class="animate-blur-in animate-in">
  Mi Título Impactante
</h1>
```

### Ejemplo 2: Cards con stagger
```vue
<div class="cards-container animate-stagger-children animate-in">
  <div class="card delay-100">Card 1</div>
  <div class="card delay-200">Card 2</div>
  <div class="card delay-300">Card 3</div>
</div>
```

### Ejemplo 3: Uso con IntersectionObserver
```typescript
const isVisible = ref(false)

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
  
  observer.observe(element)
})
```

## Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ iOS Safari (12+)
- ✅ Chrome Mobile (últimas versiones)

## Performance Metrics

- **FPS Target**: 60fps en desktop, 30fps en mobile
- **Animation Budget**: < 16ms por frame
- **GPU Layers**: Mínimo uso de compositores

## Créditos

Animaciones diseñadas siguiendo las mejores prácticas de:
- Material Design Motion Guidelines
- Apple Human Interface Guidelines
- Web Animation API Best Practices

---

**Última actualización**: Octubre 2025
**Versión**: 2.0

