<template>
  <ContentSection
    section-id="expertise"
    title="Tus Expertos en IA de Confianza"
    subtitle="Proporcionando orientación y entregando soluciones de IA personalizadas que te dan una ventaja competitiva."
    type="stats"
    :items="statsItems"
    trust-message="Únete a nuestra lista establecida de clientes satisfechos a largo plazo, incluyendo marcas globales, empresas tecnológicas, scaleups ambiciosos y startups. Ya sea que estés escalando rápidamente con IA o haciéndola el núcleo de tu negocio, asóciate con nosotros para lograr resultados excepcionales."
  />
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