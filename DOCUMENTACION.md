# 📚 Documentación Técnica - Factor AI Landing Page

## 🎯 Índice de Documentación Técnica

Este documento sirve como **índice central** de toda la documentación técnica del proyecto Factor AI Landing Page. Aquí encontrarás enlaces a documentación detallada de cada aspecto del proyecto.

## 📖 Documentación Principal

### [README.md](./README.md) - Documentación Principal del Proyecto
- **Descripción general** del proyecto y características principales
- **Arquitectura** y estructura del proyecto
- **Tecnologías utilizadas** y versiones específicas
- **Guía de instalación** y scripts de desarrollo
- **Secciones de la landing page** y componentes principales
- **Sistema de diseño** y paleta de colores
- **Deployment** y optimización
- **Historial de cambios** y actualizaciones recientes

## 🔧 Documentación Técnica Especializada

### [src/components/README-Componentes.md](./src/components/README-Componentes.md) - Documentación de Componentes
- **Estructura detallada** de todos los componentes Vue.js
- **Props, eventos y funcionalidades** de cada componente
- **Sistema de animaciones** y transiciones
- **Responsividad** y adaptación por dispositivo
- **Accesibilidad** y mejores prácticas
- **Testing** y estrategias de calidad
- **Ciclo de vida** de componentes Vue 3

### [src/assets/effects/README-AudioReactiveWaterEffect.md](./src/assets/effects/README-AudioReactiveWaterEffect.md) - Efectos de Audio
- **Sistema de efectos** de agua reactivos al audio
- **Tecnologías utilizadas** (Three.js, Web Audio API)
- **Configuración** y personalización de efectos
- **Optimización** de rendimiento para móviles
- **Shaders personalizados** y efectos visuales
- **Troubleshooting** y debugging
- **Métricas de rendimiento** y monitoreo

### [src/assets/styles/README-SistemaEstilos.md](./src/assets/styles/README-SistemaEstilos.md) - Sistema de Estilos
- **Paleta de colores** y sistema de marca
- **Gradientes** y efectos visuales
- **Tipografía** y sistema de fuentes
- **Espaciado** y layout system
- **Animaciones** y transiciones CSS
- **Responsividad** y breakpoints
- **Clases utilitarias** y helpers

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
Landing/
├── 📁 public/                    # Archivos estáticos públicos
│   ├── 🎵 audio/                 # Archivos de audio
│   ├── 🖼️ images/                # Imágenes públicas
│   └── 📄 archivos de configuración
├── 📁 src/                       # Código fuente principal
│   ├── 📁 assets/                # Recursos estáticos
│   │   ├── 🎵 audio/             # Archivos de audio
│   │   ├── 🌊 effects/           # Efectos visuales y audio
│   │   ├── 🖼️ image/             # Imágenes del proyecto
│   │   └── 🎨 styles/            # Estilos CSS
│   ├── 📁 components/            # Componentes Vue.js
│   ├── 📁 utils/                 # Utilidades y helpers
│   ├── 🎯 App.vue                # Componente principal
│   └── 🚀 main.ts                # Punto de entrada
├── 📁 scripts/                   # Scripts de automatización
├── 📄 package.json               # Dependencias y scripts
├── ⚙️ vite.config.ts             # Configuración de Vite
└── 🔧 tsconfig.json              # Configuración de TypeScript
```

### Tecnologías y Versiones
- **Vue.js**: 3.4.38 con Composition API
- **TypeScript**: 5.5.3 para tipado estático
- **Vite**: 7.0.5 para desarrollo y build
- **Three.js**: 0.178.0 para efectos 3D
- **VueUse**: 13.5.0 para composables
- **Video.js**: 8.23.4 para manejo de videos

## 🎯 Componentes Principales

### Secciones de la Landing Page
1. **Navigation** - Navegación principal con menú responsive
2. **HeroSection** - Sección principal con video de fondo y efectos de agua
3. **HeroSectionMobile** - Versión optimizada para dispositivos móviles
4. **TrustedExpertsSection** - Sección de confianza con testimonios
5. **AIExpertiseSection** - 6 áreas de expertise en IA
6. **SolutionsSection** - 4 soluciones principales
7. **CaseStudiesSection** - Casos de estudio y proyectos
8. **AboutFactorSection** - Información sobre la empresa
9. **FAQsSection** - Preguntas frecuentes
10. **ContactSection** - Formulario de contacto
11. **Footer** - Pie de página

### Componentes Auxiliares
- **AnimatedCounter** - Contadores animados para métricas
- **AnimatedText** - Texto con animaciones de entrada
- **AudioReactiveWaterEffect** - Efectos de agua 3D reactivos al audio
- **ContentSection** - Contenedor base para secciones
- **OptimizedImage** - Carga optimizada de imágenes
- **SkeletonLoading** - Loading placeholders animados
- **FontLoader** - Carga asíncrona de fuentes web
- **ResponsiveImage** - Imágenes adaptativas

## 🛠️ Utilidades del Proyecto

### Archivos de Utilidades
- **connectionOptimizer.ts** - Optimización basada en velocidad de red
- **lazyLoader.ts** - Sistema de carga diferida de componentes
- **mobileOptimization.ts** - Optimizaciones específicas para móviles
- **performanceMonitor.ts** - Monitoreo de rendimiento en tiempo real
- **resourcePreloader.ts** - Precarga de recursos críticos

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Púrpura Principal**: #333ead
- **Cian Vibrante**: rgb(49, 204, 240)
- **Verde Neón**: rgb(0, 255, 191)
- **Neutros**: Escala de grises para fondos y texto

### Gradientes
- **Principal**: Diagonal púrpura → cian → verde
- **Secundario**: Horizontal cian → púrpura → verde
- **Acento**: Invertido verde → púrpura → cian

### Tipografías
- **Sora**: Fuente principal para títulos
- **Inter**: Fuente secundaria para texto
- **Space Grotesk**: Fuente de display especial

## 🚀 Guía de Desarrollo

### Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd Landing

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Optimizar imágenes
npm run optimize-images
```

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview del build de producción
- `npm run optimize-images` - Optimización de imágenes

## 📱 Responsividad y Accesibilidad

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: > 1440px

### Características de Accesibilidad
- Navegación por teclado completa
- ARIA labels para elementos interactivos
- Contraste de colores optimizado
- Textos alternativos para imágenes
- Estructura semántica HTML5

## 🧪 Testing y Calidad

### Herramientas de Testing
- **Vue Test Utils** - Testing de componentes
- **Vitest** - Testing unitario
- **Playwright** - Testing E2E (opcional)
- **axe-core** - Testing de accesibilidad

### Checklist de Calidad
- [ ] Componentes Vue.js funcionando correctamente
- [ ] Responsividad en todos los dispositivos
- [ ] Efectos de audio funcionando
- [ ] Formulario de contacto validando
- [ ] Navegación suave entre secciones
- [ ] Animaciones fluidas en 60fps

## 🚀 Deployment

### Plataformas Soportadas
- **Vercel** - Deploy automático con Git
- **Netlify** - Deploy automático con Git
- **GitHub Pages** - Deploy estático
- **AWS S3 + CloudFront** - Hosting empresarial
- **Docker** - Containerización

### Configuración de Servidor
```nginx
# Headers para WebGL y seguridad
add_header Cross-Origin-Embedder-Policy "require-corp";
add_header Cross-Origin-Opener-Policy "same-origin";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Audio no funciona
- Verificar permisos de audio del navegador
- Comprobar autoplay policy
- Verificar que el archivo de audio existe

#### 2. Efectos 3D no se muestran
- Verificar soporte de WebGL
- Comprobar que Three.js se carga correctamente
- Verificar consola del navegador para errores

#### 3. Rendimiento bajo
- Reducir resolución de efectos en dispositivos móviles
- Comprobar uso de memoria del navegador
- Verificar que no hay múltiples instancias ejecutándose

#### 4. Estilos no se aplican
- Verificar que las variables CSS están definidas
- Comprobar que los archivos CSS se importan correctamente
- Verificar que no hay conflictos de CSS

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vue.js 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/)

### Herramientas de Desarrollo
- [Vue DevTools](https://devtools.vuejs.org/)
- [Three.js Editor](https://threejs.org/editor/)
- [WebGL Inspector](https://benvanik.github.io/WebGL-Inspector/)

### Recursos de Diseño
- [Figma](https://figma.com/)
- [Adobe Color](https://color.adobe.com/)
- [Coolors](https://coolors.co/)

## 🤝 Contribución

### Guías de Contribución
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios con mensajes descriptivos
4. Push a la rama
5. Abre un Pull Request

### Estándares de Código
- TypeScript estricto
- ESLint para linting
- Prettier para formateo
- Conventional Commits

## 📞 Soporte y Contacto

- **Email**: [tu_email@factor.ai]
- **Website**: [https://factor.ai]
- **LinkedIn**: [Factor AI]
- **Calendly**: [https://calendly.com/factor-ai]

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo de licencia para más detalles.

---

## 🔄 Historial de Versiones

### v1.0.0 - Diciembre 2024
- ✅ Landing page completa con todas las secciones
- ✅ Sistema de efectos de agua reactivos al audio
- ✅ Diseño responsive y accesible
- ✅ Sistema de estilos con variables CSS
- ✅ Componentes Vue.js optimizados
- ✅ Documentación completa del proyecto
- ✅ Sistema de utilidades para optimización
- ✅ Documentación unificada y actualizada

---

**Desarrollado con ❤️ por el equipo de Factor AI**

*Última actualización: Diciembre 2024*

---

## 📋 Checklist de Documentación

- [x] README.md principal actualizado
- [x] Documentación de componentes
- [x] Documentación de efectos de audio
- [x] Documentación del sistema de estilos
- [x] Documentación general del proyecto
- [x] Guías de instalación y configuración
- [x] Troubleshooting y FAQ
- [x] Recursos adicionales y enlaces
- [x] Guías de contribución
- [x] Información de contacto y soporte
- [x] Documentación unificada y consistente

**Estado**: ✅ **COMPLETADO** - Documentación técnica completa y actualizada