// Intelligent resource preloading system
export class ResourcePreloader {
  private static instance: ResourcePreloader
  private preloadedResources: Set<string> = new Set()
  private loadingPromises: Map<string, Promise<void>> = new Map()
  private isMobile: boolean = false
  private connectionType: string = '4g'

  private constructor() {
    this.checkMobile()
    this.detectConnection()
    this.setupListeners()
  }

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader()
    }
    return ResourcePreloader.instance
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth < 768
  }

  private detectConnection(): void {
    // @ts-ignore - navigator.connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      this.connectionType = connection.effectiveType || '4g'
    }
  }

  private setupListeners(): void {
    let resizeTimeout: number
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        this.checkMobile()
      }, 250)
    })
  }

  // Preload image with error handling
  private async preloadImage(url: string): Promise<void> {
    if (this.preloadedResources.has(url)) return

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.preloadedResources.add(url)
        resolve()
      }
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`)
        reject(new Error(`Failed to preload image: ${url}`))
      }
      img.src = url
    })
  }


  // Get critical resources based on device and connection
  private getCriticalResources(): string[] {
    const baseResources = [
      '/assets/image/optimized/fondo-mobile.webp',
      '/assets/image/optimized/llms-mobile.webp',
      '/assets/image/optimized/vision-mobile.webp',
      '/assets/image/optimized/analysis-mobile.webp'
    ]

    if (this.isMobile) {
      return baseResources
    }

    return [
      '/assets/image/optimized/fondo-desktop.webp',
      '/assets/image/optimized/llms-desktop.webp',
      '/assets/image/optimized/vision-desktop.webp',
      '/assets/image/optimized/analysis-desktop.webp'
    ]
  }

  // Get secondary resources for lazy loading
  private getSecondaryResources(): string[] {
    const baseResources = [
      '/assets/image/optimized/mlops-mobile.webp',
      '/assets/image/optimized/paraboloide-mobile.webp',
      '/assets/image/optimized/toroide-mobile.webp',
      '/assets/image/optimized/conocenos-mobile.webp'
    ]

    if (this.isMobile) {
      return baseResources
    }

    return [
      '/assets/image/optimized/mlops-desktop.webp',
      '/assets/image/optimized/paraboloide-desktop.webp',
      '/assets/image/optimized/toroide-desktop.webp',
      '/assets/image/optimized/conocenos-desktop.webp'
    ]
  }

  // Preload critical resources immediately
  async preloadCriticalResources(): Promise<void> {
    const criticalResources = this.getCriticalResources()
    
    const preloadPromises = criticalResources.map(resource => 
      this.preloadImage(resource).catch(error => 
        console.warn(`Failed to preload critical resource ${resource}:`, error)
      )
    )

    await Promise.all(preloadPromises)
  }

  // Preload secondary resources with delay
  async preloadSecondaryResources(): Promise<void> {
    const secondaryResources = this.getSecondaryResources()
    
    // Delay based on connection type
    const delay = this.connectionType === 'slow-2g' ? 5000 : 
                  this.connectionType === '2g' ? 3000 : 
                  this.connectionType === '3g' ? 2000 : 1000

    setTimeout(async () => {
      const preloadPromises = secondaryResources.map(resource => 
        this.preloadImage(resource).catch(error => 
          console.warn(`Failed to preload secondary resource ${resource}:`, error)
        )
      )

      await Promise.all(preloadPromises)
    }, delay)
  }

  // Preload resources on scroll
  setupScrollPreloading(): void {
    let scrollTimeout: number
    let preloadedCount = 0
    const secondaryResources = this.getSecondaryResources()

    const preloadOnScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        if (preloadedCount < secondaryResources.length) {
          const resource = secondaryResources[preloadedCount]
          this.preloadImage(resource).catch(error => 
            console.warn(`Failed to preload scroll resource ${resource}:`, error)
          )
          preloadedCount++
        }
      }, 100)
    }

    window.addEventListener('scroll', preloadOnScroll, { passive: true })
  }

  // Preload resources on hover
  setupHoverPreloading(): void {
    const hoverElements = document.querySelectorAll('[data-preload]')
    
    hoverElements.forEach(element => {
      const preloadResource = element.getAttribute('data-preload')
      if (preloadResource) {
        element.addEventListener('mouseenter', () => {
          this.preloadImage(preloadResource).catch(error => 
            console.warn(`Failed to preload hover resource ${preloadResource}:`, error)
          )
        }, { once: true })
      }
    })
  }

  // Preload resources on intersection
  setupIntersectionPreloading(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const preloadResource = entry.target.getAttribute('data-preload')
            if (preloadResource) {
              this.preloadImage(preloadResource).catch(error => 
                console.warn(`Failed to preload intersection resource ${preloadResource}:`, error)
              )
            }
          }
        })
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    )

    const preloadElements = document.querySelectorAll('[data-preload]')
    preloadElements.forEach(element => observer.observe(element))
  }

  // Get preload status
  getPreloadStatus(): {
    preloaded: string[]
    loading: string[]
    total: number
  } {
    return {
      preloaded: Array.from(this.preloadedResources),
      loading: Array.from(this.loadingPromises.keys()),
      total: this.getCriticalResources().length + this.getSecondaryResources().length
    }
  }

  // Initialize resource preloading
  init(): void {
    this.preloadCriticalResources()
    this.preloadSecondaryResources()
    this.setupScrollPreloading()
    this.setupHoverPreloading()
    this.setupIntersectionPreloading()
  }
}

// Export singleton instance
export const resourcePreloader = ResourcePreloader.getInstance()

// Utility functions
export const preloadCriticalResources = (): Promise<void> => 
  resourcePreloader.preloadCriticalResources()

export const initResourcePreloading = (): void => resourcePreloader.init()

export const getPreloadStatus = () => resourcePreloader.getPreloadStatus()
