# Sistema de Gradientes Modular

## Descripción
Este sistema permite usar y modificar todos los gradientes de texto desde un solo lugar (`src/assets/styles/gradients.css`).

## Cómo usar

### 1. Clases disponibles

#### Gradiente Gris a Blanco (Circular)
```html
<p class="gradient-text-gray-white">Texto con gradiente circular</p>
```

#### Gradiente Primario (Azul a Cian)
```html
<h2 class="gradient-text-primary">Título con gradiente primario</h2>
```

#### Variaciones del gradiente gris
```html
<!-- Gradiente lineal -->
<p class="gradient-text-gray-white-linear">Texto con gradiente lineal</p>

<!-- Gradiente diagonal -->
<p class="gradient-text-gray-white-diagonal">Texto con gradiente diagonal</p>
```

### 2. Modificar colores

Para cambiar todos los gradientes, edita las variables CSS en `src/assets/styles/gradients.css`:

```css
:root {
  /* Cambia estos valores para actualizar todos los gradientes */
  --gradient-gray-start: #7b8089;    /* Color inicial del gradiente gris */
  --gradient-gray-middle: #d1d5db;   /* Color medio del gradiente gris */
  --gradient-gray-end: #ffffff;      /* Color final del gradiente gris */
  
  /* Gradiente primario */
  --gradient-primary-start: #333ead;   /* Azul inicial */
  --gradient-primary-middle: #31ccf0;  /* Cian medio */
  --gradient-primary-end: #00ffbf;     /* Verde cian final */
}
```

### 3. Ejemplos de personalización

#### Gradiente más oscuro
```css
--gradient-gray-start: #4b5563;    /* Gris más oscuro */
--gradient-gray-middle: #9ca3af;   /* Gris medio */
--gradient-gray-end: #ffffff;      /* Blanco */
```

#### Gradiente más claro
```css
--gradient-gray-start: #9ca3af;    /* Gris claro */
--gradient-gray-middle: #e5e7eb;   /* Gris muy claro */
--gradient-gray-end: #ffffff;      /* Blanco */
```

#### Gradiente con colores personalizados
```css
--gradient-gray-start: #6b7280;    /* Gris azulado */
--gradient-gray-middle: #d1d5db;   /* Gris claro */
--gradient-gray-end: #f9fafb;      /* Gris muy claro */
```

## Ventajas del sistema modular

1. **Cambios centralizados**: Modifica todos los gradientes desde un solo archivo
2. **Consistencia**: Todos los componentes usan los mismos colores
3. **Mantenimiento**: Fácil de actualizar y mantener
4. **Flexibilidad**: Múltiples estilos de gradiente disponibles
5. **Reutilización**: Las clases se pueden usar en cualquier componente

## Componentes que usan estos gradientes

- `AIExpertiseSection.vue`
- `ContentSection.vue`
- Cualquier otro componente que importe `style.css`

## Notas técnicas

- Los gradientes usan `background-clip: text` para aplicar el efecto solo al texto
- Compatible con todos los navegadores modernos
- Las variables CSS permiten cambios dinámicos si es necesario
- Se puede extender fácilmente agregando nuevas clases de gradiente
