import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initThemeBeforeMount } from './composables/useTheme'

/**
 * Initialize theme system before Vue app mounts
 * This prevents FOUC (Flash of Unstyled Content)
 */
initThemeBeforeMount()

/**
 * Create and mount Vue app
 */
createApp(App).mount('#app')
