# AudioReactiveWaterEffect Component

Un componente Vue 3 reutilizable que encapsula un efecto de agua reactiva al audio con funcionalidad de scroll, utilizando Three.js y Web Audio API.

## Características

- **Efecto de agua reactiva**: Simulación de fluidos en tiempo real
- **Reactividad al audio**: Análisis de frecuencia en tiempo real (bass, mid, treble)
- **Scroll interactivo**: El efecto responde al scroll del usuario
- **Interactividad**: Mouse y touch support con ripples
- **Presets de colores**: Múltiples esquemas de colores predefinidos
- **Configurable**: Props para personalizar comportamiento
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## Instalación

Asegúrate de tener Three.js instalado:

```bash
npm install three
```

## Uso Básico

```vue
<template>
  <AudioReactiveWaterEffect>
    <div class="content">
      <h1>Tu contenido aquí</h1>
      <p>El efecto de agua aparecerá detrás</p>
    </div>
  </AudioReactiveWaterEffect>
</template>

<script setup>
import AudioReactiveWaterEffect from './AudioReactiveWaterEffect.vue'
</script>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `text` | String | 'Transform your digital presence...' | Texto a mostrar en el efecto |
| `showAudioControls` | Boolean | true | Mostrar controles de audio |
| `scrollSensitivity` | Number | 1.0 | Sensibilidad del scroll (0.0 - 3.0) |
| `waterStrength` | Number | 0.55 | Intensidad del efecto de agua (0.0 - 1.0) |
| `audioReactivity` | Number | 1.0 | Reactividad al audio (0.0 - 3.0) |
| `colorPreset` | String | 'Tech Blue' | Preset de colores |
| `autoPlay` | Boolean | false | Reproducir audio automáticamente |

## Presets de Colores Disponibles

- `Tech Blue` - Azul tecnológico
- `Ocean Deep` - Azul profundo oceánico
- `Midnight` - Azul medianoche
- `Crystal` - Cristal transparente
- `Pure Monochrome` - Blanco y negro

## Ejemplo Avanzado

```vue
<template>
  <div class="page">
    <!-- Hero section con efecto intenso -->
    <AudioReactiveWaterEffect
      :scroll-sensitivity="1.5"
      :water-strength="0.7"
      :audio-reactivity="1.5"
      color-preset="Ocean Deep"
      class="hero-section"
    >
      <div class="hero-content">
        <h1>AI-Powered Solutions</h1>
        <p>Transform your digital presence</p>
        <button>Get Started</button>
      </div>
    </AudioReactiveWaterEffect>

    <!-- Sección de contenido normal -->
    <section class="content">
      <h2>About Us</h2>
      <p>Your content here...</p>
    </section>

    <!-- Otra sección con efecto más sutil -->
    <AudioReactiveWaterEffect
      :scroll-sensitivity="0.8"
      :water-strength="0.4"
      :audio-reactivity="0.8"
      color-preset="Midnight"
      class="feature-section"
    >
      <div class="features">
        <h2>Our Features</h2>
        <div class="feature-grid">
          <div class="feature">Feature 1</div>
          <div class="feature">Feature 2</div>
          <div class="feature">Feature 3</div>
        </div>
      </div>
    </AudioReactiveWaterEffect>
  </div>
</template>

<script setup>
import AudioReactiveWaterEffect from './AudioReactiveWaterEffect.vue'
</script>

<style scoped>
.hero-section {
  height: 100vh;
}

.hero-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.feature-section {
  height: 80vh;
}

.features {
  text-align: center;
  color: white;
  padding: 2rem;
}

.content {
  padding: 4rem 2rem;
  background: #f5f5f5;
}
</style>
```

## Funcionalidades

### Scroll Reactivo
El efecto responde al scroll del usuario:
- El radio del círculo principal cambia según el progreso del scroll
- La intensidad del efecto aumenta cuando el elemento está visible
- Animaciones suaves basadas en la posición del viewport

### Audio Reactivo
- Análisis de frecuencia en tiempo real
- Separación en bass, mid y treble
- Reactividad configurable por frecuencia
- Controles de audio integrados

### Interactividad
- **Mouse**: Movimiento del mouse crea ripples
- **Click**: Clicks crean ondas más intensas
- **Touch**: Soporte completo para dispositivos táctiles
- **Throttling**: Optimización de rendimiento

### Efectos Visuales
- Simulación de fluidos en tiempo real
- Efectos de vorticity y presión
- Distorsión de texto por el agua
- Múltiples capas de efectos

## Eventos

El componente emite los siguientes eventos:

```vue
<AudioReactiveWaterEffect
  @audio-start="handleAudioStart"
  @audio-stop="handleAudioStop"
  @scroll-active="handleScrollActive"
/>
```

## Métodos Públicos

```javascript
// Referencia al componente
const waterEffect = ref()

// Métodos disponibles
waterEffect.value.toggleAudio()
waterEffect.value.setColorPreset('Ocean Deep')
waterEffect.value.addRipple(x, y, strength)
```

## Optimización de Rendimiento

- **Throttling**: Eventos de mouse limitados a 60fps
- **Lazy Loading**: Three.js se inicializa solo cuando es necesario
- **Memory Management**: Limpieza automática de recursos
- **Responsive**: Ajuste automático de resolución

## Troubleshooting

### Audio no funciona
- Asegúrate de que el archivo `/audio/speech.mp3` existe
- Verifica que el navegador soporte Web Audio API
- Algunos navegadores requieren interacción del usuario para reproducir audio

### Rendimiento lento
- Reduce `waterStrength` o `audioReactivity`
- Ajusta `scrollSensitivity` a valores más bajos
- Considera usar `autoPlay={false}` en dispositivos móviles

### Efecto no visible
- Verifica que Three.js esté instalado correctamente
- Asegúrate de que el contenedor tenga dimensiones definidas
- Revisa la consola del navegador para errores

## Personalización CSS

```css
.audio-reactive-water-container {
  /* Personalizar el contenedor */
}

.water-canvas {
  /* Personalizar el canvas */
}

.content-overlay {
  /* Personalizar el overlay de contenido */
}

.audio-controls {
  /* Personalizar controles de audio */
}
```

## Dependencias

- Vue 3 (Composition API)
- Three.js
- Web Audio API (nativo del navegador)

## Compatibilidad

- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

## Licencia

Este componente está diseñado para uso interno del proyecto.
