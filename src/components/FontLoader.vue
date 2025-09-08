<template>
  <!-- Componente invisible para cargar fuentes de forma asíncrona -->
  <div v-if="shouldLoad" class="font-loader" :class="fontClass" style="opacity: 0; position: absolute; left: -9999px;">
    {{ sampleText }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  fontFamily: string
  fontWeight?: string | number
  sampleText?: string
  delay?: number
  priority?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fontWeight: '400',
  sampleText: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789',
  delay: 0,
  priority: false
})

const shouldLoad = ref(false)
const isLoaded = ref(false)

const fontClass = computed(() => {
  const baseClass = 'font-async'
  const weightClass = `font-weight-${props.fontWeight}`
  return `${baseClass} ${weightClass}`
})

const loadFont = async () => {
  if (isLoaded.value) return
  
  try {
    // Crear un elemento temporal para forzar la carga de la fuente
    const testElement = document.createElement('div')
    testElement.style.fontFamily = props.fontFamily
    testElement.style.fontWeight = props.fontWeight.toString()
    testElement.style.position = 'absolute'
    testElement.style.left = '-9999px'
    testElement.style.opacity = '0'
    testElement.textContent = props.sampleText
    
    document.body.appendChild(testElement)
    
    // Esperar a que la fuente se cargue
    await document.fonts.load(`${props.fontWeight} 16px ${props.fontFamily}`)
    
    // Limpiar el elemento temporal
    document.body.removeChild(testElement)
    
    isLoaded.value = true
    shouldLoad.value = false
    
    console.log(`✅ Font loaded: ${props.fontFamily} ${props.fontWeight}`)
  } catch (error) {
    console.warn(`⚠️ Failed to load font: ${props.fontFamily}`, error)
  }
}

onMounted(() => {
  if (props.priority) {
    // Cargar inmediatamente si es prioritaria
    shouldLoad.value = true
    loadFont()
  } else {
    // Cargar con delay para no bloquear el renderizado crítico
    setTimeout(() => {
      shouldLoad.value = true
      loadFont()
    }, props.delay)
  }
})
</script>

<style scoped>
.font-loader {
  font-display: swap;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-weight-300 { font-weight: 300; }
.font-weight-400 { font-weight: 400; }
.font-weight-500 { font-weight: 500; }
.font-weight-600 { font-weight: 600; }
.font-weight-700 { font-weight: 700; }
.font-weight-800 { font-weight: 800; }
</style>
