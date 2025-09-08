import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Hide loading fallback when Vue mounts
const hideLoadingFallback = () => {
  const fallback = document.getElementById('loading-fallback')
  if (fallback) {
    fallback.classList.add('hidden')
  }
}

// Create and mount Vue app
const app = createApp(App)
app.mount('#app')

// Hide fallback after Vue mounts
setTimeout(hideLoadingFallback, 100)
