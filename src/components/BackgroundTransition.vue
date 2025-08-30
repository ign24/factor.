<template>
  <div class="background-transition">
    <!-- Capa de fondo con la imagen -->
    <div class="transition-bg-image"></div>
    
    <!-- Capa de fondo con el video (opcional) -->
    <video 
      v-if="showVideo"
      class="transition-video" 
      autoplay 
      muted 
      loop
      playsinline
      preload="auto"
    >
      <source src="/src/assets/image/fondo.webm" type="video/webm">
    </video>
    
    <!-- Capa de gradiente que se desvanece -->
    <div class="transition-gradient"></div>
    
    <!-- Elementos decorativos para suavizar la transición -->
    <div class="transition-elements">
      <div class="transition-line"></div>
      <div class="transition-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showVideo = ref(false)

onMounted(() => {
  // Solo mostrar video en dispositivos que lo soporten bien
  if (window.innerWidth > 768) {
    showVideo.value = true
  }
})
</script>

<style scoped>
.background-transition {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}

.transition-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/image/fondo.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  filter: blur(1px) brightness(0.4);
}

.transition-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.2;
  filter: blur(2px) brightness(0.3);
  z-index: 1;
}

.transition-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(4, 8, 9, 0.3) 30%,
    rgba(4, 8, 9, 0.7) 70%,
    rgb(4, 8, 9) 100%
  );
  z-index: 2;
}

.transition-elements {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.transition-line {
  width: 2px;
  height: 60px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--brand-cyan) 50%,
    transparent 100%
  );
  opacity: 0.6;
}

.transition-dots {
  display: flex;
  gap: 8px;
}

.transition-dots span {
  width: 6px;
  height: 6px;
  background: var(--brand-cyan);
  border-radius: 50%;
  opacity: 0.4;
  animation: pulse-dots 2s ease-in-out infinite;
}

.transition-dots span:nth-child(2) {
  animation-delay: 0.3s;
}

.transition-dots span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse-dots {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .background-transition {
    height: 150px;
  }
  
  .transition-line {
    height: 40px;
  }
  
  .transition-dots span {
    width: 5px;
    height: 5px;
  }
}
</style>
