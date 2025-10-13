// Mobile optimization utilities
export class MobileOptimizer {
  private static instance: MobileOptimizer
  private isMobile: boolean = false
  private loadedResources: Set<string> = new Set()
  private preloadQueue: string[] = []

  private constructor() {
    this.checkMobile()
    this.setupResizeListener()
  }

  static getInstance(): MobileOptimizer {
    if (!MobileOptimizer.instance) {
      MobileOptimizer.instance = new MobileOptimizer()
    }
    return MobileOptimizer.instance
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth < 768
  }

  private setupResizeListener(): void {
    let resizeTimeout: number
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        this.checkMobile()
      }, 250)
    })
  }

  isMobileDevice(): boolean {
    return this.isMobile
  }

  // Preload critical resources for mobile
  preloadCriticalResources(): void {
    if (!this.isMobile) return

    const criticalResources = [
      '/assets/image/optimized/fondo-mobile.webp',
      '/assets/image/optimized/llms-mobile.webp',
      '/assets/image/optimized/vision-mobile.webp',
      '/assets/image/optimized/analysis-mobile.webp'
    ]

    criticalResources.forEach(resource => {
      this.preloadResource(resource, 'image')
    })
  }

  // Preload non-critical resources when user scrolls
  preloadOnScroll(): void {
    if (!this.isMobile) return

    // Add non-critical resources to preload queue
    const nonCriticalResources = [
      '/assets/image/optimized/mlops-mobile.webp',
      '/assets/image/optimized/paraboloide-mobile.webp',
      '/assets/image/optimized/toroide-mobile.webp',
      '/assets/image/optimized/conocenos-mobile.webp'
    ]
    
    // Add resources to queue
    nonCriticalResources.forEach(resource => this.queueResource(resource))

    let scrollTimeout: number
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        this.preloadNextResource()
      }, 100)
    })
  }

  private preloadResource(url: string, type: 'image' | 'script' | 'style'): void {
    if (this.loadedResources.has(url)) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = type
    link.crossOrigin = 'anonymous'
    
    if (type === 'image') {
      link.type = 'image/webp'
    }

    document.head.appendChild(link)
    this.loadedResources.add(url)
  }

  private preloadNextResource(): void {
    if (this.preloadQueue.length === 0) return

    const resource = this.preloadQueue.shift()
    if (resource) {
      this.preloadResource(resource, 'image')
    }
  }

  // Add resource to preload queue
  queueResource(url: string): void {
    if (!this.loadedResources.has(url) && !this.preloadQueue.includes(url)) {
      this.preloadQueue.push(url)
    }
  }

  // Optimize images for mobile viewport
  optimizeImagesForMobile(): void {
    if (!this.isMobile) return

    const images = document.querySelectorAll('img[data-src]')
    images.forEach(img => {
      const src = img.getAttribute('data-src')
      if (src && src.includes('-mobile.webp')) {
        img.setAttribute('src', src)
        img.removeAttribute('data-src')
      }
    })
  }

  // Reduce animation complexity on mobile
  reduceAnimationsOnMobile(): void {
    if (!this.isMobile) return

    const style = document.createElement('style')
    style.textContent = `
      @media (max-width: 768px) {
        * {
          animation-duration: 0.3s !important;
          transition-duration: 0.3s !important;
        }
        
        .animate-optimized {
          transition-duration: 0.2s !important;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Initialize mobile optimizations
  init(): void {
    this.preloadCriticalResources()
    this.preloadOnScroll()
    this.optimizeImagesForMobile()
    this.reduceAnimationsOnMobile()
  }
}

// Export singleton instance
export const mobileOptimizer = MobileOptimizer.getInstance()

// Utility functions
export const isMobile = (): boolean => mobileOptimizer.isMobileDevice()

export const preloadImage = (url: string): void => mobileOptimizer.queueResource(url)

export const initMobileOptimizations = (): void => mobileOptimizer.init()
