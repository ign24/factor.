# 🚀 Factor AI - Landing Page

Una landing page moderna y interactiva para **Factor AI**, una empresa especializada en soluciones de inteligencia artificial que entrega MVPs listos para producción con automatización real y mínima complejidad operativa.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño moderno y responsivo** con gradientes personalizados y efectos visuales avanzados
- **Sistema de colores de marca** con paleta de púrpura, cian y verde
- **Tipografías premium** (Sora, Inter, Space Grotesk) para máxima legibilidad
- **Animaciones fluidas** con CSS y JavaScript para una experiencia inmersiva
- **Efectos de agua reactivos al audio** usando Three.js para interacciones únicas

### 🎥 Contenido Multimedia
- **Video de fondo en loop** para la sección hero
- **Transiciones de video suaves** entre dos videos para reproducción continua
- **Efectos de audio reactivos** que responden a la música de fondo
- **Imágenes optimizadas** para diferentes dispositivos y resoluciones

### 📱 Responsividad
- **Diseño mobile-first** que se adapta a todos los tamaños de pantalla
- **Grid layouts flexibles** que se reorganizan según el dispositivo
- **Navegación adaptativa** con menús colapsables para móviles
- **Optimización de rendimiento** para dispositivos de gama baja

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
Landing/
├── public/                 # Archivos estáticos públicos
│   ├── audio/             # Archivos de audio
│   └── images/            # Imágenes públicas
├── src/                   # Código fuente principal
│   ├── assets/            # Recursos estáticos
│   │   ├── audio/         # Archivos de audio
│   │   ├── effects/       # Efectos visuales y audio
│   │   ├── image/         # Imágenes del proyecto
│   │   └── styles/        # Estilos CSS
│   ├── components/        # Componentes Vue.js
│   ├── App.vue           # Componente principal
│   └── main.ts           # Punto de entrada
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
└── tsconfig.json          # Configuración de TypeScript
```

### Tecnologías Utilizadas
- **Frontend**: Vue.js 3 con Composition API
- **Lenguaje**: TypeScript para tipado estático
- **Build Tool**: Vite para desarrollo rápido
- **Estilos**: CSS personalizado con variables CSS y gradientes
- **Efectos 3D**: Three.js para efectos de agua reactivos
- **Audio**: Web Audio API para análisis de frecuencia
- **Responsive**: CSS Grid y Flexbox para layouts adaptativos

## 🎯 Secciones de la Landing Page

### 1. **Hero Section** (`HeroSection.vue`)
- **Video de fondo en loop** con transiciones suaves
- **Título principal**: "IA REAL diseñada para generar impacto"
- **Descripción**: Soluciones completas con IA integrada
- **CTA principal**: "Quiero mi solución IA"
- **Efectos de agua reactivos** al audio de fondo

### 2. **Trusted Experts** (`TrustedExpertsSection.vue`)
- **Sección de confianza** con testimonios y credenciales
- **Contadores animados** para métricas de la empresa
- **Efectos visuales** que refuerzan la autoridad

### 3. **AI Expertise** (`AIExpertiseSection.vue`)
- **6 áreas de expertise** en tecnologías de IA:
  - LLMs y RAG (Recuperación de Información)
  - Visión por computadora
  - Análisis predictivo
  - MLOps
  - Soluciones Edge
  - Consultoría en IA
- **Cards interactivas** con efectos hover y información detallada
- **Scroll horizontal** para navegación entre expertise

### 4. **Solutions** (`SolutionsSection.vue`)
- **4 soluciones principales**:
  - Integra IA en tus productos
  - Aplica IA a tus operaciones
  - Eleva tus operaciones de IA
  - Mejora tu equipo con expertos
- **Cards con efectos 3D** y animaciones de tilt
- **CTA secundario** para AI Guidance

### 5. **Case Studies** (`CaseStudiesSection.vue`)
- **Casos de estudio** y proyectos exitosos
- **Métricas y resultados** con contadores animados
- **Testimonios** de clientes satisfechos

### 6. **About Factor** (`AboutFactorSection.vue`)
- **Información de la empresa** y su misión
- **Valores y principios** que guían el trabajo
- **Historia y trayectoria** en el sector de IA

### 7. **FAQs** (`FAQsSection.vue`)
- **Preguntas frecuentes** sobre servicios y soluciones
- **Acordeón interactivo** para mejor organización
- **Respuestas detalladas** a dudas comunes

### 8. **Contact** (`ContactSection.vue`)
- **Formulario de contacto** completo con validación
- **Métodos alternativos** de contacto (Calendly)
- **Campos del formulario**:
  - Nombre, Email, Empresa
  - Descripción del proyecto
  - Presupuesto estimado
- **Diseño responsive** y accesible

### 9. **Footer** (`Footer.vue`)
- **Enlaces importantes** y navegación secundaria
- **Información legal** y de contacto
- **Redes sociales** y enlaces externos

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
/* Colores principales de marca */
--brand-purple: #333ead      /* Púrpura principal */
--brand-cyan: rgb(49, 204, 240)    /* Cian vibrante */
--brand-green: rgb(0, 255, 191)    /* Verde neón */

/* Variaciones de opacidad */
--brand-purple-10: rgba(51, 62, 173, 0.1)
--brand-cyan-20: rgba(49, 204, 240, 0.2)
--brand-green-30: rgba(0, 255, 191, 0.3)
```

### Gradientes
```css
/* Gradientes principales */
--gradient-primary: linear-gradient(135deg, #333ead 0%, #31c0f0 50%, #00ffbf 100%)
--gradient-secondary: linear-gradient(90deg, #31c0f0 0%, #333ead 50%, #00ffbf 100%)
--gradient-accent: linear-gradient(135deg, #00ffbf 0%, #333ead 50%, #31c0f0 100%)
```

### Tipografías
- **Sora**: Fuente principal para títulos y headings
- **Inter**: Fuente secundaria para texto de cuerpo
- **Space Grotesk**: Fuente de display para elementos especiales

### Efectos Visuales
- **Sombras con glow** para botones y elementos interactivos
- **Backdrop filters** para efectos de cristal esmerilado
- **Transiciones suaves** con curvas de bezier personalizadas
- **Animaciones CSS** para entrada y hover de elementos

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o pnpm

### Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd Landing

# Instalar dependencias
npm install
# o
pnpm install
```

### Scripts Disponibles
```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Variables de Entorno
```bash
# Crear archivo .env.local si es necesario
VITE_API_URL=tu_url_api
VITE_ANALYTICS_ID=tu_id_analytics
```

## 🎵 Efectos de Audio Reactivos

### Características del Sistema de Audio
- **Análisis de frecuencia en tiempo real** usando Web Audio API
- **Separación de bandas** (bass, mid, treble)
- **Efectos de agua 3D** que responden a la música
- **Controles de reproducción** integrados en la UI

### Tecnologías de Audio
- **Three.js** para renderizado 3D del agua
- **Web Audio API** para análisis de frecuencia
- **Shaders personalizados** para efectos de agua realistas
- **Optimización de rendimiento** para dispositivos móviles

## 📱 Responsividad y Accesibilidad

### Breakpoints
```css
/* Mobile First */
@media (min-width: 768px)  /* Tablet */
@media (min-width: 1024px) /* Desktop */
@media (min-width: 1440px) /* Large Desktop */
```

### Características de Accesibilidad
- **Navegación por teclado** completa
- **Contraste de colores** optimizado
- **Textos alternativos** para imágenes
- **Estructura semántica** HTML5
- **ARIA labels** para elementos interactivos

## 🔧 Configuración y Personalización

### Personalización de Colores
Edita `src/assets/brand-colors.css` para cambiar la paleta de colores:
```css
:root {
  --brand-purple: #tu_color_purpura;
  --brand-cyan: #tu_color_cyan;
  --brand-green: #tu_color_verde;
}
```

### Personalización de Contenido
- **Textos**: Edita los componentes Vue.js en `src/components/`
- **Imágenes**: Reemplaza archivos en `src/assets/image/`
- **Audio**: Cambia el archivo en `public/audio/speech.mp3`

### Personalización de Efectos
Modifica `src/assets/effects/audio-reactive-water.js` para:
- Cambiar la resolución del agua
- Ajustar la sensibilidad al audio
- Modificar colores y efectos visuales

## 📊 Optimización y Rendimiento

### Técnicas Implementadas
- **Lazy loading** de imágenes y componentes
- **Optimización de videos** con formatos modernos
- **Compresión de assets** para carga rápida
- **CSS crítico** inline para renderizado inmediato
- **Minificación** automática en build

### Métricas de Rendimiento
- **Lighthouse Score**: 90+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🧪 Testing y Calidad

### Herramientas de Testing
- **Vue Test Utils** para testing de componentes
- **Vitest** para testing unitario
- **Playwright** para testing E2E (configuración opcional)

### Checklist de Calidad
- [ ] Componentes Vue.js funcionando correctamente
- [ ] Responsividad en todos los dispositivos
- [ ] Efectos de audio funcionando
- [ ] Formulario de contacto validando
- [ ] Navegación suave entre secciones
- [ ] Animaciones fluidas en 60fps

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Plataformas Soportadas
- **Vercel**: Deploy automático con Git
- **Netlify**: Deploy automático con Git
- **GitHub Pages**: Deploy estático
- **AWS S3 + CloudFront**: Hosting empresarial
- **Docker**: Containerización para entornos empresariales

### Configuración de Servidor
```nginx
# Ejemplo para Nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Headers de seguridad
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
```

## 🤝 Contribución

### Guías de Contribución
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código
- **TypeScript** estricto con configuración recomendada
- **ESLint** para linting de código
- **Prettier** para formateo automático
- **Conventional Commits** para mensajes de commit

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE) - ver el archivo de licencia para más detalles.

## 📞 Soporte y Contacto

- **Email**: [tu_email@factor.ai]
- **Website**: [https://factor.ai]
- **LinkedIn**: [Factor AI]
- **Calendly**: [https://calendly.com/factor-ai]

---

**Desarrollado con ❤️ por el equipo de Factor AI**

*Última actualización: Diciembre 2024*
