// Connection-based optimization utilities
export class ConnectionOptimizer {
  private static instance: ConnectionOptimizer
  private connectionType: string = '4g'
  private effectiveType: string = '4g'
  private downlink: number = 10
  private rtt: number = 50
  private saveData: boolean = false

  private constructor() {
    this.detectConnection()
    this.setupConnectionListener()
  }

  static getInstance(): ConnectionOptimizer {
    if (!ConnectionOptimizer.instance) {
      ConnectionOptimizer.instance = new ConnectionOptimizer()
    }
    return ConnectionOptimizer.instance
  }

  private detectConnection(): void {
    // @ts-ignore - navigator.connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    
    if (connection) {
      this.connectionType = connection.type || '4g'
      this.effectiveType = connection.effectiveType || '4g'
      this.downlink = connection.downlink || 10
      this.rtt = connection.rtt || 50
      this.saveData = connection.saveData || false
    }
  }

  private setupConnectionListener(): void {
    // @ts-ignore - navigator.connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    
    if (connection) {
      connection.addEventListener('change', () => {
        this.detectConnection()
      })
    }
  }

  // Check if connection is slow
  isSlowConnection(): boolean {
    return this.effectiveType === 'slow-2g' || 
           this.effectiveType === '2g' || 
           this.downlink < 1.5 ||
           this.rtt > 200
  }

  // Check if user has data saver enabled
  isDataSaverEnabled(): boolean {
    return this.saveData
  }

  // Get optimal image quality based on connection
  getOptimalImageQuality(): 'high' | 'medium' | 'low' {
    if (this.isSlowConnection() || this.isDataSaverEnabled()) {
      return 'low'
    }
    
    if (this.effectiveType === '3g' || this.downlink < 5) {
      return 'medium'
    }
    
    return 'high'
  }

  // Get optimal animation settings based on connection
  getOptimalAnimationSettings(): {
    duration: number
    complexity: 'high' | 'medium' | 'low'
    enableParallax: boolean
  } {
    if (this.isSlowConnection()) {
      return {
        duration: 0.2,
        complexity: 'low',
        enableParallax: false
      }
    }
    
    if (this.effectiveType === '3g' || this.downlink < 5) {
      return {
        duration: 0.4,
        complexity: 'medium',
        enableParallax: false
      }
    }
    
    return {
      duration: 0.6,
      complexity: 'high',
      enableParallax: true
    }
  }

  // Get optimal lazy loading threshold based on connection
  getOptimalLazyThreshold(): number {
    if (this.isSlowConnection()) {
      return 0.3 // Load earlier on slow connections
    }
    
    if (this.effectiveType === '3g') {
      return 0.2
    }
    
    return 0.1 // Load just before viewport on fast connections
  }

  // Get optimal preload strategy based on connection
  getOptimalPreloadStrategy(): {
    preloadImages: boolean
    preloadFonts: boolean
    preloadScripts: boolean
    maxConcurrent: number
  } {
    if (this.isSlowConnection() || this.isDataSaverEnabled()) {
      return {
        preloadImages: false,
        preloadFonts: true, // Fonts are critical
        preloadScripts: false,
        maxConcurrent: 1
      }
    }
    
    if (this.effectiveType === '3g') {
      return {
        preloadImages: true,
        preloadFonts: true,
        preloadScripts: false,
        maxConcurrent: 2
      }
    }
    
    return {
      preloadImages: true,
      preloadFonts: true,
      preloadScripts: true,
      maxConcurrent: 4
    }
  }

  // Apply connection-based optimizations
  applyOptimizations(): void {
    const animationSettings = this.getOptimalAnimationSettings()
    const preloadStrategy = this.getOptimalPreloadStrategy()
    
    // Apply animation optimizations
    const style = document.createElement('style')
    style.textContent = `
      :root {
        --animation-duration: ${animationSettings.duration}s;
        --animation-complexity: ${animationSettings.complexity};
      }
      
      ${animationSettings.complexity === 'low' ? `
        * {
          animation-duration: var(--animation-duration) !important;
          transition-duration: var(--animation-duration) !important;
        }
      ` : ''}
      
      ${!animationSettings.enableParallax ? `
        .parallax-element {
          transform: none !important;
        }
      ` : ''}
    `
    document.head.appendChild(style)
    
    // Log optimization strategy
    console.log('🔧 Connection-based optimizations applied:', {
      connectionType: this.effectiveType,
      downlink: this.downlink,
      rtt: this.rtt,
      saveData: this.saveData,
      animationSettings,
      preloadStrategy
    })
  }

  // Get connection info for debugging
  getConnectionInfo(): object {
    return {
      type: this.connectionType,
      effectiveType: this.effectiveType,
      downlink: this.downlink,
      rtt: this.rtt,
      saveData: this.saveData,
      isSlow: this.isSlowConnection(),
      isDataSaver: this.isDataSaverEnabled()
    }
  }
}

// Export singleton instance
export const connectionOptimizer = ConnectionOptimizer.getInstance()

// Utility functions
export const isSlowConnection = (): boolean => connectionOptimizer.isSlowConnection()

export const getOptimalImageQuality = (): 'high' | 'medium' | 'low' => 
  connectionOptimizer.getOptimalImageQuality()

export const applyConnectionOptimizations = (): void => connectionOptimizer.applyOptimizations()
