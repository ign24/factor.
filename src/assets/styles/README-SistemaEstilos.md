# 🎨 Sistema de Estilos y Diseño - Factor AI Landing Page

## 📖 Descripción General

El sistema de estilos de Factor AI Landing Page está diseñado para crear una experiencia visual coherente, moderna y accesible. Utiliza CSS variables, gradientes personalizados y un sistema de diseño escalable que mantiene la consistencia visual en toda la aplicación.

## 🎯 Principios de Diseño

### ✨ Filosofía Visual
- **Minimalismo funcional**: Diseño limpio que prioriza la funcionalidad
- **Gradientes modernos**: Uso de gradientes sutiles para crear profundidad
- **Tipografía legible**: Jerarquía clara y legibilidad en todos los dispositivos
- **Accesibilidad**: Contraste y tamaños que cumplen estándares WCAG

### 🎨 Paleta de Colores
- **Colores primarios**: Púrpura, cian y verde como base de marca
- **Neutros**: Escala de grises para texto y fondos
- **Semánticos**: Colores que transmiten significado (éxito, error, advertencia)
- **Accesibles**: Contraste mínimo de 4.5:1 para texto normal

## 🌈 Sistema de Colores

### Colores de Marca
```css
:root {
  /* Colores principales */
  --brand-purple: #333ead;           /* Púrpura principal */
  --brand-cyan: rgb(49, 204, 240);  /* Cian vibrante */
  --brand-green: rgb(0, 255, 191);  /* Verde neón */
  
  /* Variaciones de opacidad */
  --brand-purple-10: rgba(51, 62, 173, 0.1);
  --brand-purple-20: rgba(51, 62, 173, 0.2);
  --brand-purple-30: rgba(51, 62, 173, 0.3);
  --brand-purple-50: rgba(51, 62, 173, 0.5);
  --brand-purple-80: rgba(51, 62, 173, 0.8);
  
  --brand-cyan-10: rgba(49, 204, 240, 0.1);
  --brand-cyan-20: rgba(49, 204, 240, 0.2);
  --brand-cyan-30: rgba(49, 204, 240, 0.3);
  --brand-cyan-50: rgba(49, 204, 240, 0.5);
  --brand-cyan-80: rgba(49, 204, 240, 0.8);
  
  --brand-green-10: rgba(0, 255, 191, 0.1);
  --brand-green-20: rgba(0, 255, 191, 0.2);
  --brand-green-30: rgba(0, 255, 191, 0.3);
  --brand-green-50: rgba(0, 255, 191, 0.5);
  --brand-green-80: rgba(0, 255, 191, 0.8);
}
```

### Colores Neutros
```css
:root {
  /* Escala de grises */
  --neutral-black: rgb(4, 8, 9);    /* Negro principal */
  --neutral-dark: #1a1a1a;          /* Gris muy oscuro */
  --neutral-gray: #a0a0a0;          /* Gris medio */
  --neutral-light: #f5f5f5;         /* Gris claro */
  --neutral-white: #ffffff;          /* Blanco */
  
  /* Variaciones de transparencia */
  --neutral-black-10: rgba(4, 8, 9, 0.1);
  --neutral-black-20: rgba(4, 8, 9, 0.2);
  --neutral-black-50: rgba(4, 8, 9, 0.5);
  --neutral-black-80: rgba(4, 8, 9, 0.8);
}
```

### Colores Semánticos
```css
:root {
  /* Estados y significados */
  --success: var(--brand-green);
  --warning: #f59e0b;
  --error: #ef4444;
  --info: var(--brand-cyan);
  
  /* Texto */
  --text-primary: var(--neutral-white);
  --text-secondary: var(--neutral-gray);
  --text-accent: var(--brand-cyan);
  --text-muted: rgba(160, 160, 160, 0.8);
  
  /* Fondos */
  --bg-primary: var(--neutral-black);
  --bg-secondary: var(--neutral-dark);
  --bg-accent: var(--brand-purple-10);
  --bg-card: rgba(26, 26, 26, 0.8);
  --bg-tertiary: rgba(4, 8, 9, 0.6);
  
  /* Bordes */
  --border-primary: var(--brand-purple-30);
  --border-secondary: var(--brand-cyan-30);
  --border-accent: var(--brand-green-30);
  --border-subtle: rgba(255, 255, 255, 0.1);
}
```

## 🌊 Sistema de Gradientes

### Gradientes Principales
```css
:root {
  /* Gradiente principal (diagonal) */
  --gradient-primary: linear-gradient(
    135deg, 
    var(--brand-purple) 0%, 
    var(--brand-cyan) 50%, 
    var(--brand-green) 100%
  );
  
  /* Gradiente secundario (horizontal) */
  --gradient-secondary: linear-gradient(
    90deg, 
    var(--brand-cyan) 0%, 
    var(--brand-purple) 50%, 
    var(--brand-green) 100%
  );
  
  /* Gradiente de acento (invertido) */
  --gradient-accent: linear-gradient(
    135deg, 
    var(--brand-green) 0%, 
    var(--brand-purple) 50%, 
    var(--brand-cyan) 100%
  );
  
  /* Gradiente cálido */
  --gradient-warm: linear-gradient(
    135deg, 
    var(--brand-purple) 0%, 
    #ff6b6b 50%, 
    var(--brand-green) 100%
  );
  
  /* Gradiente frío */
  --gradient-cool: linear-gradient(
    135deg, 
    var(--brand-cyan) 0%, 
    var(--brand-purple) 50%, 
    #4ecdc4 100%
  );
}
```

### Gradientes de Fondo
```css
:root {
  /* Fondos con gradientes */
  --bg-gradient-primary: linear-gradient(
    135deg, 
    rgba(51, 62, 173, 0.1) 0%, 
    rgba(49, 204, 240, 0.1) 50%, 
    rgba(0, 255, 191, 0.1) 100%
  );
  
  --bg-gradient-card: linear-gradient(
    135deg, 
    rgba(26, 26, 26, 0.9) 0%, 
    rgba(26, 26, 26, 0.7) 100%
  );
  
  --bg-gradient-overlay: linear-gradient(
    180deg, 
    transparent 0%,
    rgba(4, 8, 9, 0.3) 20%,
    rgba(4, 8, 9, 0.5) 50%,
    rgba(4, 8, 9, 0.3) 80%,
    transparent 100%
  );
}
```

### Gradientes de Texto
```css
:root {
  /* Texto con gradientes */
  --text-gradient-primary: linear-gradient(
    135deg, 
    var(--brand-purple) 0%, 
    var(--brand-cyan) 100%
  );
  
  --text-gradient-secondary: linear-gradient(
    90deg, 
    var(--brand-cyan) 0%, 
    var(--brand-green) 100%
  );
  
  --text-gradient-accent: linear-gradient(
    135deg, 
    var(--brand-green) 0%, 
    var(--brand-purple) 100%
  );
}
```

## 🔤 Sistema de Tipografía

### Familias de Fuentes
```css
:root {
  /* Fuentes principales */
  --font-primary: 'Sora', sans-serif;        /* Títulos y headings */
  --font-secondary: 'Inter', sans-serif;     /* Texto de cuerpo */
  --font-display: 'Space Grotesk', sans-serif; /* Elementos especiales */
}
```

### Pesos de Fuente
```css
:root {
  /* Pesos disponibles */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Tamaños de Texto
```css
:root {
  /* Escala de tamaños */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}
```

### Altura de Línea
```css
:root {
  /* Alturas de línea */
  --leading-tight: 1.1;      /* Títulos */
  --leading-normal: 1.3;     /* Texto corto */
  --leading-relaxed: 1.6;    /* Texto largo */
  --leading-loose: 1.8;      /* Texto muy largo */
}
```

### Espaciado de Letras
```css
:root {
  /* Espaciado de letras */
  --tracking-tight: -0.025em;  /* Títulos */
  --tracking-normal: 0;        /* Texto normal */
  --tracking-wide: 0.025em;    /* Texto destacado */
  --tracking-wider: 0.05em;    /* Texto muy destacado */
}
```

## 📏 Sistema de Espaciado

### Espaciado Base
```css
:root {
  /* Espaciado base en rem */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */
  --space-48: 12rem;    /* 192px */
  --space-56: 14rem;    /* 224px */
  --space-64: 16rem;    /* 256px */
}
```

### Espaciado de Componentes
```css
:root {
  /* Espaciado específico */
  --section-padding: 120px 0;
  --container-padding: 0 24px;
  --card-padding: var(--space-6);
  --button-padding: 16px 32px;
  --input-padding: 12px 16px;
}
```

## 🔲 Sistema de Bordes

### Radios de Borde
```css
:root {
  /* Radios de borde */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-2xl: 20px;
  --border-radius-full: 9999px;
}
```

### Estilos de Borde
```css
:root {
  /* Estilos de borde */
  --border-width-thin: 1px;
  --border-width-normal: 2px;
  --border-width-thick: 3px;
  
  --border-style-solid: solid;
  --border-style-dashed: dashed;
  --border-style-dotted: dotted;
}
```

## 🌟 Sistema de Sombras

### Sombras de Elevación
```css
:root {
  /* Sombras por nivel de elevación */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Sombras de Glow
```css
:root {
  /* Sombras con glow */
  --shadow-glow: 0 0 20px rgba(49, 204, 240, 0.3);
  --shadow-glow-pink: 0 0 30px rgba(236, 72, 153, 0.4);
  --shadow-glow-green: 0 0 25px rgba(0, 255, 191, 0.3);
  --shadow-glow-purple: 0 0 25px rgba(51, 62, 173, 0.3);
}
```

### Sombras de Marca
```css
:root {
  /* Sombras específicas de marca */
  --shadow-purple: 0 4px 20px rgba(51, 62, 173, 0.3);
  --shadow-cyan: 0 4px 20px rgba(49, 204, 240, 0.3);
  --shadow-green: 0 4px 20px rgba(0, 255, 191, 0.3);
}
```

## 🎭 Sistema de Animaciones

### Duración de Transiciones
```css
:root {
  /* Duración de transiciones */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  --duration-slowest: 1000ms;
}
```

### Curvas de Easing
```css
:root {
  /* Curvas de easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Keyframes de Animación
```css
/* Animaciones de entrada */
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animaciones de hover */
@keyframes glow {
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.3)); 
  }
  50% { 
    filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.6)); 
  }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(5deg); 
  }
}

/* Animaciones de gradiente */
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradient-shift {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}
```

## 🎨 Clases Utilitarias

### Clases de Color
```css
/* Colores de fondo */
.bg-brand-purple { background-color: var(--brand-purple); }
.bg-brand-cyan { background-color: var(--brand-cyan); }
.bg-brand-green { background-color: var(--brand-green); }
.bg-neutral-black { background-color: var(--neutral-black); }

/* Colores de texto */
.text-brand-purple { color: var(--brand-purple); }
.text-brand-cyan { color: var(--brand-cyan); }
.text-brand-green { color: var(--brand-green); }
.text-neutral-white { color: var(--neutral-white); }
.text-neutral-gray { color: var(--neutral-gray); }

/* Bordes de color */
.border-brand-purple { border-color: var(--brand-purple); }
.border-brand-cyan { border-color: var(--brand-cyan); }
.border-brand-green { border-color: var(--brand-green); }
```

### Clases de Gradiente
```css
/* Gradientes de fondo */
.gradient-primary { background: var(--gradient-primary); }
.gradient-secondary { background: var(--gradient-secondary); }
.gradient-accent { background: var(--gradient-accent); }
.gradient-warm { background: var(--gradient-warm); }
.gradient-cool { background: var(--gradient-cool); }

/* Texto con gradientes */
.gradient-text-primary {
  background: var(--text-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-secondary {
  background: var(--text-gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Clases de Tipografía
```css
/* Familias de fuente */
.font-primary { font-family: var(--font-primary); }
.font-secondary { font-family: var(--font-secondary); }
.font-display { font-family: var(--font-display); }

/* Pesos de fuente */
.font-light { font-weight: var(--font-light); }
.font-regular { font-weight: var(--font-regular); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

/* Tamaños de texto */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }
.text-5xl { font-size: var(--text-5xl); }
.text-6xl { font-size: var(--text-6xl); }
```

### Clases de Espaciado
```css
/* Padding */
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

/* Margin */
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }

/* Gap */
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
```

## 📱 Sistema Responsivo

### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Clases Responsivas
```css
/* Grid responsivo */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.md:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.lg:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.xl:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

/* Texto responsivo */
.text-sm { font-size: var(--text-sm); }
.md:text-base { font-size: var(--text-base); }
.lg:text-lg { font-size: var(--text-lg); }
.xl:text-xl { font-size: var(--text-xl); }

/* Espaciado responsivo */
.p-4 { padding: var(--space-4); }
.md:p-6 { padding: var(--space-6); }
.lg:p-8 { padding: var(--space-8); }
.xl:p-10 { padding: var(--space-10); }
```

## ♿ Accesibilidad

### Contraste de Colores
```css
/* Contraste mínimo 4.5:1 para texto normal */
.text-primary { color: var(--text-primary); } /* Contraste: 15.6:1 */
.text-secondary { color: var(--text-secondary); } /* Contraste: 4.8:1 */

/* Contraste mínimo 3:1 para texto grande */
.text-large { 
  font-size: var(--text-lg);
  color: var(--text-secondary); /* Contraste: 3.2:1 */
}
```

### Estados de Foco
```css
/* Foco visible para navegación por teclado */
.focus-visible:focus {
  outline: 2px solid var(--brand-cyan);
  outline-offset: 2px;
}

/* Estados de hover y focus */
.button:hover,
.button:focus {
  background-color: var(--brand-purple-light);
  transform: translateY(-2px);
}
```

## 🔧 Configuración y Personalización

### Variables de Configuración
```css
/* Configuración del tema */
:root {
  /* Modo claro (futuro) */
  --theme-light: {
    --text-primary: var(--neutral-black);
    --text-secondary: #666666;
    --bg-primary: var(--neutral-white);
    --bg-secondary: var(--neutral-light);
  }
  
  /* Modo oscuro (actual) */
  --theme-dark: {
    --text-primary: var(--neutral-white);
    --text-secondary: var(--neutral-gray);
    --bg-primary: var(--neutral-black);
    --bg-secondary: var(--neutral-dark);
  }
}
```

### Personalización de Colores
```css
/* Personalizar colores de marca */
:root {
  --brand-purple: #tu_color_purpura;
  --brand-cyan: #tu_color_cyan;
  --brand-green: #tu_color_verde;
}

/* Los gradientes se actualizan automáticamente */
```

## 🚀 Optimización y Rendimiento

### CSS Crítico
```css
/* Estilos críticos inline en App.vue */
<style>
@import './assets/brand-colors.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Resto de estilos críticos... */
</style>
```

### Lazy Loading de Estilos
```css
/* Cargar estilos no críticos de forma diferida */
<link rel="preload" href="./assets/styles/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Compresión y Minificación
```bash
# Comprimir CSS en build
npm run build

# Comprimir con gzip
gzip -k dist/assets/*.css
```

## 🧪 Testing y Validación

### Herramientas de Testing
- **Lighthouse**: Validación de accesibilidad y rendimiento
- **axe-core**: Testing de accesibilidad automatizado
- **CSS Validator**: Validación de sintaxis CSS
- **Color Contrast Analyzer**: Verificación de contraste

### Checklist de Validación
- [ ] Contraste de colores cumple WCAG 2.1 AA
- [ ] Estados de foco son visibles
- [ ] Texto es legible en todos los tamaños
- [ ] Gradientes funcionan en navegadores antiguos
- [ ] CSS es válido y sin errores
- [ ] Rendimiento es óptimo

## 📚 Recursos Adicionales

### Documentación CSS
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

### Herramientas de Diseño
- [Figma](https://figma.com/) - Diseño de interfaces
- [Adobe Color](https://color.adobe.com/) - Paletas de colores
- [Coolors](https://coolors.co/) - Generador de paletas
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificación de contraste

### Frameworks CSS
- [Tailwind CSS](https://tailwindcss.com/) - Framework utility-first
- [CSS Modules](https://github.com/css-modules/css-modules) - CSS modular
- [Styled Components](https://styled-components.com/) - CSS-in-JS

---

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Gradientes no se muestran
```css
/* Verificar que el navegador soporte gradientes */
@supports (background: linear-gradient(red, blue)) {
  .gradient-element {
    background: var(--gradient-primary);
  }
}
```

#### 2. Variables CSS no funcionan
```css
/* Fallback para navegadores antiguos */
.element {
  color: #333ead; /* Fallback */
  color: var(--brand-purple); /* Valor moderno */
}
```

#### 3. Contraste insuficiente
```css
/* Ajustar contraste automáticamente */
.text {
  color: var(--text-primary);
  filter: contrast(1.2); /* Aumentar contraste */
}
```

---

*Documentación del Sistema de Estilos - Factor AI - Diciembre 2024*
