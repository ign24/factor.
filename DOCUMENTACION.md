# 📚 Documentación Completa - Factor AI Landing Page

## 🎯 Descripción del Proyecto

**Factor AI Landing Page** es una landing page moderna y interactiva desarrollada con Vue.js 3, TypeScript y Vite. La página presenta los servicios de inteligencia artificial de Factor AI, una empresa especializada en soluciones de IA que entrega MVPs listos para producción.

## 🚀 Características Destacadas

- **🎨 Diseño Moderno**: Gradientes personalizados y efectos visuales avanzados
- **🎵 Audio Reactivo**: Efectos de agua 3D que responden a la música de fondo
- **📱 Responsivo**: Diseño mobile-first que se adapta a todos los dispositivos
- **⚡ Alto Rendimiento**: Optimizado para velocidad y experiencia de usuario
- **♿ Accesible**: Cumple estándares WCAG 2.1 AA
- **🎭 Animaciones Fluidas**: Transiciones suaves y efectos interactivos

## 📖 Índice de Documentación

### 1. [README.md](./README.md) - Documentación Principal
- **Descripción general** del proyecto
- **Características principales** y funcionalidades
- **Arquitectura** y estructura del proyecto
- **Instalación** y scripts de desarrollo
- **Deployment** y optimización
- **Contribución** y estándares de código

### 2. [src/components/README-Componentes.md](./src/components/README-Componentes.md) - Documentación de Componentes
- **Estructura** de todos los componentes Vue.js
- **Funcionalidades** y props de cada componente
- **Sistema de animaciones** y transiciones
- **Responsividad** y adaptación por dispositivo
- **Accesibilidad** y mejores prácticas
- **Testing** y estrategias de calidad

### 3. [src/assets/effects/README-AudioReactiveWaterEffect.md](./src/assets/effects/README-AudioReactiveWaterEffect.md) - Efectos de Audio
- **Sistema de efectos** de agua reactivos al audio
- **Tecnologías** utilizadas (Three.js, Web Audio API)
- **Configuración** y personalización de efectos
- **Optimización** de rendimiento
- **Troubleshooting** y debugging

### 4. [src/assets/styles/README-SistemaEstilos.md](./src/assets/styles/README-SistemaEstilos.md) - Sistema de Estilos
- **Paleta de colores** y sistema de marca
- **Gradientes** y efectos visuales
- **Tipografía** y sistema de fuentes
- **Espaciado** y layout system
- **Animaciones** y transiciones
- **Responsividad** y breakpoints

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
Landing/
├── 📁 public/                    # Archivos estáticos públicos
│   ├── 🎵 audio/                 # Archivos de audio
│   └── 🖼️ images/                # Imágenes públicas
├── 📁 src/                       # Código fuente principal
│   ├── 📁 assets/                # Recursos estáticos
│   │   ├── 🎵 audio/             # Archivos de audio
│   │   ├── 🌊 effects/           # Efectos visuales y audio
│   │   ├── 🖼️ image/             # Imágenes del proyecto
│   │   └── 🎨 styles/            # Estilos CSS
│   ├── 📁 components/            # Componentes Vue.js
│   ├── 🎯 App.vue                # Componente principal
│   └── 🚀 main.ts                # Punto de entrada
├── 📄 package.json               # Dependencias y scripts
├── ⚙️ vite.config.ts             # Configuración de Vite
└── 🔧 tsconfig.json              # Configuración de TypeScript
```

### Tecnologías Utilizadas
- **Frontend**: Vue.js 3 con Composition API
- **Lenguaje**: TypeScript para tipado estático
- **Build Tool**: Vite para desarrollo rápido
- **Estilos**: CSS personalizado con variables CSS
- **3D**: Three.js para efectos de agua reactivos
- **Audio**: Web Audio API para análisis de frecuencia
- **Responsive**: CSS Grid y Flexbox

## 🎯 Secciones de la Landing Page

### 1. **Hero Section** - Sección Principal
- Video de fondo en loop con transiciones suaves
- Título principal: "IA REAL diseñada para generar impacto"
- Efectos de agua reactivos al audio
- CTA principal para contacto

### 2. **Trusted Experts** - Expertos de Confianza
- Sección de credenciales y testimonios
- Contadores animados para métricas
- Efectos visuales de autoridad

### 3. **AI Expertise** - Áreas de Expertise
- 6 áreas de especialización en IA
- Cards interactivas con scroll horizontal
- Información detallada de cada expertise

### 4. **Solutions** - Soluciones Ofrecidas
- 4 soluciones principales de Factor AI
- Cards con efectos 3D y animaciones
- CTA secundario para AI Guidance

### 5. **Case Studies** - Casos de Estudio
- Proyectos exitosos y resultados
- Métricas con contadores animados
- Testimonios de clientes

### 6. **About Factor** - Sobre la Empresa
- Información de la empresa y misión
- Valores y principios
- Historia y trayectoria

### 7. **FAQs** - Preguntas Frecuentes
- Acordeón interactivo de preguntas
- Categorías organizadas
- Respuestas detalladas

### 8. **Contact** - Formulario de Contacto
- Formulario completo con validación
- Métodos alternativos (Calendly)
- Diseño responsive y accesible

### 9. **Footer** - Pie de Página
- Enlaces importantes y navegación
- Información legal y de contacto
- Redes sociales

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

## 🚀 Guía de Inicio Rápido

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

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Scripts Disponibles
- `npm run dev`: Servidor de desarrollo
- `npm run build`: Build optimizado para producción
- `npm run preview`: Preview del build de producción

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
- Cambiar resolución del agua
- Ajustar sensibilidad al audio
- Modificar colores y efectos visuales

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
- **Vue Test Utils**: Testing de componentes
- **Vitest**: Testing unitario
- **Playwright**: Testing E2E (opcional)
- **axe-core**: Testing de accesibilidad

### Checklist de Calidad
- [ ] Componentes Vue.js funcionando correctamente
- [ ] Responsividad en todos los dispositivos
- [ ] Efectos de audio funcionando
- [ ] Formulario de contacto validando
- [ ] Navegación suave entre secciones
- [ ] Animaciones fluidas en 60fps

## 🚀 Deployment

### Plataformas Soportadas
- **Vercel**: Deploy automático con Git
- **Netlify**: Deploy automático con Git
- **GitHub Pages**: Deploy estático
- **AWS S3 + CloudFront**: Hosting empresarial
- **Docker**: Containerización

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

#### 1. **Audio no funciona**
- Verificar permisos de audio del navegador
- Comprobar autoplay policy
- Verificar que el archivo de audio existe

#### 2. **Efectos 3D no se muestran**
- Verificar soporte de WebGL
- Comprobar que Three.js se carga correctamente
- Verificar consola del navegador para errores

#### 3. **Rendimiento bajo**
- Reducir resolución de efectos en dispositivos móviles
- Comprobar uso de memoria del navegador
- Verificar que no hay múltiples instancias ejecutándose

#### 4. **Estilos no se aplican**
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

---

**Desarrollado con ❤️ por el equipo de Factor AI**

*Última actualización: Diciembre 2024*

---

## 📋 Checklist de Documentación

- [x] README.md principal
- [x] Documentación de componentes
- [x] Documentación de efectos de audio
- [x] Documentación del sistema de estilos
- [x] Documentación general del proyecto
- [x] Guías de instalación y configuración
- [x] Troubleshooting y FAQ
- [x] Recursos adicionales y enlaces
- [x] Guías de contribución
- [x] Información de contacto y soporte

**Estado**: ✅ **COMPLETADO** - Documentación completa y actualizada
