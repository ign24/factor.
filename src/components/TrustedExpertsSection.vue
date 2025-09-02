<template>
  <div class="trusted-experts-wrapper">
    <ContentSection
      section-id="expertise"
      title="Tus Expertos en IA de Confianza"
      subtitle="Proporcionando orientación y entregando soluciones de IA personalizadas que te dan una ventaja competitiva."
      type="stats"
      :items="statsItems"
      trust-message="Únete a nuestra lista establecida de clientes satisfechos a largo plazo, incluyendo marcas globales, empresas tecnológicas, scaleups ambiciosos y startups. Ya sea que estés escalando rápidamente con IA o haciéndola el núcleo de tu negocio, asóciate con nosotros para lograr resultados excepcionales."
    />
  </div>
</template>

<script setup lang="ts">
import ContentSection from './ContentSection.vue'

const statsItems = [
  {
    number: '50+',
    label: 'Sistemas de IA desplegados'
  },
  {
    number: '99.9%',
    label: 'Tiempo activo promedio'
  },
  {
    number: '3x',
    label: 'Entrega más rápida'
  }
]
</script>

<style scoped>
.trusted-experts-wrapper {
  background: linear-gradient(225deg, rgb(1,4,6) 0%, rgb(3,8,10) 30%, rgb(5,11,13) 70%, rgb(2,6,8) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

/* Separador superior plateado elegante */
.trusted-experts-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(180, 180, 180, 0.27) 17%, 
    rgba(210, 210, 210, 0.57) 37%, 
    rgba(245, 245, 245, 0.77) 50%, 
    rgba(210, 210, 210, 0.57) 63%, 
    rgba(180, 180, 180, 0.27) 83%, 
    transparent 100%
  );
  z-index: 2;
}

/* Separador inferior plateado elegante */
.trusted-experts-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(160, 160, 160, 0.23) 23%, 
    rgba(190, 190, 190, 0.47) 43%, 
    rgba(210, 210, 210, 0.67) 50%, 
    rgba(190, 190, 190, 0.47) 57%, 
    rgba(160, 160, 160, 0.23) 77%, 
    transparent 100%
  );
  z-index: 2;
}
</style> 