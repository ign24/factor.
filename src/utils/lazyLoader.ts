// Advanced lazy loading system with dynamic imports
export class LazyLoader {
  private static instance: LazyLoader
  private loadedComponents: Map<string, any> = new Map()
  private loadingPromises: Map<string, Promise<any>> = new Map()
  private observer: IntersectionObserver | null = null

  private constructor() {
    this.setupResizeListener()
  }

  static getInstance(): LazyLoader {
    if (!LazyLoader.instance) {
      LazyLoader.instance = new LazyLoader()
    }
    return LazyLoader.instance
  }

  private setupResizeListener(): void {
    // Resize listener for future mobile detection if needed
    let resizeTimeout: number
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        // Future mobile detection logic can be added here
      }, 250)
    })
  }

  // Define component mappings for lazy loading
  private getComponentMap(): Record<string, () => Promise<any>> {
    return {
      // Only include components that are NOT statically imported in App.vue
      'LazyComponent': () => import('../components/LazyComponent.vue'),
      'MobileOptimizedSection': () => import('../components/MobileOptimizedSection.vue'),
      'AudioReactiveWaterEffect': () => import('../components/AudioReactiveWaterEffect.vue')
    }
  }

  // Load component with caching
  async loadComponent(componentName: string): Promise<any> {
    // Return cached component if already loaded
    if (this.loadedComponents.has(componentName)) {
      return this.loadedComponents.get(componentName)
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(componentName)) {
      return this.loadingPromises.get(componentName)
    }

    // Create new loading promise
    const componentMap = this.getComponentMap()
    const loadPromise = componentMap[componentName]?.()

    if (!loadPromise) {
      throw new Error(`Component ${componentName} not found in component map`)
    }

    this.loadingPromises.set(componentName, loadPromise)

    try {
      const component = await loadPromise
      this.loadedComponents.set(componentName, component.default || component)
      this.loadingPromises.delete(componentName)
      return this.loadedComponents.get(componentName)
    } catch (error) {
      this.loadingPromises.delete(componentName)
      console.error(`Failed to load component ${componentName}:`, error)
      throw error
    }
  }

  // Preload critical components
  async preloadCriticalComponents(): Promise<void> {
    // Since most components are statically imported, we only preload truly dynamic ones
    const criticalComponents = ['AudioReactiveWaterEffect']

    const preloadPromises = criticalComponents.map(component => 
      this.loadComponent(component).catch(error => 
        console.warn(`Failed to preload ${component}:`, error)
      )
    )

    await Promise.all(preloadPromises)
  }

  // Preload components based on scroll position
  async preloadOnScroll(): Promise<void> {
    const nonCriticalComponents = [
      'LazyComponent',
      'MobileOptimizedSection'
    ]

    let currentIndex = 0

    const preloadNext = () => {
      if (currentIndex < nonCriticalComponents.length) {
        const component = nonCriticalComponents[currentIndex]
        this.loadComponent(component).catch(error => 
          console.warn(`Failed to preload ${component}:`, error)
        )
        currentIndex++
      }
    }

    // Preload first component immediately
    preloadNext()

    // Preload remaining components with delay
    const interval = setInterval(() => {
      preloadNext()
      if (currentIndex >= nonCriticalComponents.length) {
        clearInterval(interval)
      }
    }, 1000)
  }

  // Setup intersection observer for viewport-based loading
  setupViewportLoading(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const componentName = entry.target.getAttribute('data-component')
            if (componentName) {
              this.loadComponent(componentName).catch(error => 
                console.warn(`Failed to load ${componentName}:`, error)
              )
            }
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    )
  }

  // Observe element for lazy loading
  observeElement(element: HTMLElement, componentName: string): void {
    if (this.observer) {
      element.setAttribute('data-component', componentName)
      this.observer.observe(element)
    }
  }

  // Get loading status
  getLoadingStatus(): {
    loaded: string[]
    loading: string[]
    total: number
  } {
    return {
      loaded: Array.from(this.loadedComponents.keys()),
      loading: Array.from(this.loadingPromises.keys()),
      total: Object.keys(this.getComponentMap()).length
    }
  }

  // Initialize lazy loading system
  init(): void {
    this.setupViewportLoading()
    this.preloadCriticalComponents()
    this.preloadOnScroll()
  }

  // Cleanup
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.loadedComponents.clear()
    this.loadingPromises.clear()
  }
}

// Export singleton instance
export const lazyLoader = LazyLoader.getInstance()

// Utility functions
export const loadComponent = (componentName: string): Promise<any> => 
  lazyLoader.loadComponent(componentName)

export const preloadCriticalComponents = (): Promise<void> => 
  lazyLoader.preloadCriticalComponents()

export const initLazyLoading = (): void => lazyLoader.init()

export const getLoadingStatus = () => lazyLoader.getLoadingStatus()
