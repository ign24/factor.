// Performance monitoring and optimization tracking
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()
  private observers: PerformanceObserver[] = []
  private isEnabled: boolean = true

  private constructor() {
    this.setupPerformanceObservers()
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private setupPerformanceObservers(): void {
    if (!this.isEnabled || !('PerformanceObserver' in window)) return

    // Observe LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.set('lcp', lastEntry.startTime)
        console.log('🎯 LCP:', lastEntry.startTime.toFixed(2), 'ms')
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)
    } catch (error) {
      console.warn('LCP observer not supported:', error)
    }

    // Observe FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          // @ts-ignore - FID is experimental
          const fid = entry.processingStart - entry.startTime
          this.metrics.set('fid', fid)
          console.log('🎯 FID:', fid.toFixed(2), 'ms')
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)
    } catch (error) {
      console.warn('FID observer not supported:', error)
    }

    // Observe CLS (Cumulative Layout Shift)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries()
        entries.forEach(entry => {
          // @ts-ignore - CLS is experimental
          if (!entry.hadRecentInput) {
            // @ts-ignore - CLS value property is experimental
            clsValue += (entry as any).value
          }
        })
        this.metrics.set('cls', clsValue)
        console.log('🎯 CLS:', clsValue.toFixed(4))
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    } catch (error) {
      console.warn('CLS observer not supported:', error)
    }

    // Observe FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          this.metrics.set('fcp', entry.startTime)
          console.log('🎯 FCP:', entry.startTime.toFixed(2), 'ms')
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })
      this.observers.push(fcpObserver)
    } catch (error) {
      console.warn('FCP observer not supported:', error)
    }
  }

  // Measure custom performance metrics
  measureCustomMetric(name: string, startTime: number, endTime?: number): void {
    const duration = endTime ? endTime - startTime : performance.now() - startTime
    this.metrics.set(name, duration)
    console.log(`📊 ${name}:`, duration.toFixed(2), 'ms')
  }

  // Start timing for custom metric
  startTiming(_name: string): number {
    return performance.now()
  }

  // End timing for custom metric
  endTiming(name: string, startTime: number): void {
    this.measureCustomMetric(name, startTime)
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  // Get specific metric
  getMetric(name: string): number | undefined {
    return this.metrics.get(name)
  }

  // Calculate performance score
  calculatePerformanceScore(): {
    score: number
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    details: Record<string, { value: number; grade: string }>
  } {
    const lcp = this.metrics.get('lcp') || 0
    const fid = this.metrics.get('fid') || 0
    const cls = this.metrics.get('cls') || 0
    const fcp = this.metrics.get('fcp') || 0

    // LCP scoring (0-100)
    const lcpScore = lcp <= 2500 ? 100 : 
                    lcp <= 4000 ? 75 : 
                    lcp <= 6000 ? 50 : 25

    // FID scoring (0-100)
    const fidScore = fid <= 100 ? 100 : 
                    fid <= 300 ? 75 : 
                    fid <= 500 ? 50 : 25

    // CLS scoring (0-100)
    const clsScore = cls <= 0.1 ? 100 : 
                    cls <= 0.25 ? 75 : 
                    cls <= 0.4 ? 50 : 25

    // FCP scoring (0-100)
    const fcpScore = fcp <= 1800 ? 100 : 
                    fcp <= 3000 ? 75 : 
                    fcp <= 4000 ? 50 : 25

    const totalScore = (lcpScore + fidScore + clsScore + fcpScore) / 4

    const grade = totalScore >= 90 ? 'A' : 
                 totalScore >= 80 ? 'B' : 
                 totalScore >= 70 ? 'C' : 
                 totalScore >= 60 ? 'D' : 'F'

    return {
      score: Math.round(totalScore),
      grade,
      details: {
        lcp: { value: lcp, grade: this.getGrade(lcpScore) },
        fid: { value: fid, grade: this.getGrade(fidScore) },
        cls: { value: cls, grade: this.getGrade(clsScore) },
        fcp: { value: fcp, grade: this.getGrade(fcpScore) }
      }
    }
  }

  private getGrade(score: number): string {
    return score >= 90 ? 'A' : 
           score >= 80 ? 'B' : 
           score >= 70 ? 'C' : 
           score >= 60 ? 'D' : 'F'
  }

  // Log performance report
  logPerformanceReport(): void {
    const report = this.calculatePerformanceScore()
    
    console.log('🚀 Performance Report:')
    console.log(`Overall Score: ${report.score}/100 (${report.grade})`)
    console.log('Details:')
    Object.entries(report.details).forEach(([metric, data]) => {
      console.log(`  ${metric.toUpperCase()}: ${data.value.toFixed(2)} (${data.grade})`)
    })
  }

  // Export metrics for analysis
  exportMetrics(): string {
    const data = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      metrics: this.getMetrics(),
      score: this.calculatePerformanceScore()
    }
    
    return JSON.stringify(data, null, 2)
  }

  // Cleanup observers
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()

// Utility functions
export const measureMetric = (name: string, startTime: number, endTime?: number): void => 
  performanceMonitor.measureCustomMetric(name, startTime, endTime)

export const startTiming = (name: string): number => 
  performanceMonitor.startTiming(name)

export const endTiming = (name: string, startTime: number): void => 
  performanceMonitor.endTiming(name, startTime)

export const getPerformanceScore = () => performanceMonitor.calculatePerformanceScore()

export const logPerformanceReport = (): void => performanceMonitor.logPerformanceReport()
