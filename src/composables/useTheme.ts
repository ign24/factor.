/**
 * useTheme Composable
 * 
 * Professional theme management system with:
 * - System preference detection
 * - Manual theme override
 * - LocalStorage persistence
 * - Cross-tab synchronization
 * - SSR-safe implementation
 * - Type-safe API
 * 
 * @example
 * ```ts
 * const { theme, isDark, toggle, setTheme } = useTheme()
 * ```
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * Resolved theme (after system preference resolution)
 */
export type ResolvedTheme = 'light' | 'dark'

/**
 * Storage key for theme persistence
 */
const STORAGE_KEY = 'factor-theme-preference'

/**
 * Event name for cross-tab synchronization
 */
const STORAGE_EVENT = 'theme-change'

/**
 * Media query for system dark mode preference
 */
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

/**
 * Media query for reduced motion preference (accessibility)
 */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Current theme preference (can be 'system')
 */
const themePreference = ref<Theme>('system')

/**
 * Resolved theme (always 'light' or 'dark')
 */
const resolvedTheme = ref<ResolvedTheme>('dark')

/**
 * System dark mode preference
 */
const systemPrefersDark = ref<boolean>(false)

/**
 * Reduced motion preference for accessibility
 */
const prefersReducedMotion = ref<boolean>(false)

/**
 * Media query listeners
 */
let darkModeMediaQuery: MediaQueryList | null = null
let reducedMotionMediaQuery: MediaQueryList | null = null

/**
 * Check if code is running in browser
 */
const isBrowser = typeof window !== 'undefined'

/**
 * Get system dark mode preference
 */
const getSystemPreference = (): boolean => {
  if (!isBrowser) return false
  return window.matchMedia(DARK_MODE_QUERY).matches
}

/**
 * Get reduced motion preference
 */
const getReducedMotionPreference = (): boolean => {
  if (!isBrowser) return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * Get stored theme preference from localStorage
 */
const getStoredTheme = (): Theme | null => {
  if (!isBrowser) return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
  }
  
  return null
}

/**
 * Store theme preference in localStorage
 */
const storeTheme = (theme: Theme): void => {
  if (!isBrowser) return
  
  try {
    localStorage.setItem(STORAGE_KEY, theme)
    // Dispatch custom event for cross-tab sync
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { theme } }))
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error)
  }
}

/**
 * Resolve theme to actual light/dark value
 */
const resolveTheme = (theme: Theme, systemDark: boolean): ResolvedTheme => {
  if (theme === 'system') {
    return systemDark ? 'dark' : 'light'
  }
  return theme
}

/**
 * Apply theme to document with optimizations
 */
const applyTheme = (theme: ResolvedTheme, skipTransition = false): void => {
  if (!isBrowser) return
  
  const root = document.documentElement
  
  // Prevent transitions during initial load or instant theme change
  if (skipTransition || prefersReducedMotion.value) {
    root.classList.add('theme-transition-disabled')
  }
  
  // Remove both classes first
  root.classList.remove('light-theme', 'dark-theme')
  
  // Add appropriate theme class
  root.classList.add(`${theme}-theme`)
  
  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', theme)
  
  // Set color-scheme for native browser elements (scrollbars, form controls)
  root.style.colorScheme = theme
  
  // Re-enable transitions after a frame
  if (skipTransition || prefersReducedMotion.value) {
    requestAnimationFrame(() => {
      root.classList.remove('theme-transition-disabled')
    })
  }
}

/**
 * Initialize theme system
 */
const initializeTheme = (): void => {
  if (!isBrowser) return
  
  // Get system preferences
  systemPrefersDark.value = getSystemPreference()
  prefersReducedMotion.value = getReducedMotionPreference()
  
  // Get stored theme or default to system
  const stored = getStoredTheme()
  themePreference.value = stored ?? 'system'
  
  // Resolve and apply theme without transition (initial load)
  resolvedTheme.value = resolveTheme(themePreference.value, systemPrefersDark.value)
  applyTheme(resolvedTheme.value, true)
  
  // Set up media query listeners
  darkModeMediaQuery = window.matchMedia(DARK_MODE_QUERY)
  reducedMotionMediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  
  // Handle system preference changes
  const handleDarkModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    systemPrefersDark.value = e.matches
    if (themePreference.value === 'system') {
      resolvedTheme.value = resolveTheme('system', e.matches)
      applyTheme(resolvedTheme.value)
    }
  }
  
  const handleReducedMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
    prefersReducedMotion.value = e.matches
  }
  
  // Modern browsers
  if (darkModeMediaQuery.addEventListener) {
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange)
    reducedMotionMediaQuery?.addEventListener('change', handleReducedMotionChange)
  } else {
    // Legacy browsers
    darkModeMediaQuery.addListener(handleDarkModeChange)
    reducedMotionMediaQuery?.addListener(handleReducedMotionChange)
  }
  
  // Handle cross-tab synchronization
  const handleStorageChange = (e: CustomEvent<{ theme: Theme }>) => {
    const newTheme = e.detail.theme
    if (newTheme !== themePreference.value) {
      themePreference.value = newTheme
      resolvedTheme.value = resolveTheme(newTheme, systemPrefersDark.value)
      applyTheme(resolvedTheme.value)
    }
  }
  
  window.addEventListener(STORAGE_EVENT, handleStorageChange as EventListener)
  
  // Standard storage event for other tabs
  const handleNativeStorageChange = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      const newTheme = e.newValue as Theme
      if (newTheme !== themePreference.value) {
        themePreference.value = newTheme
        resolvedTheme.value = resolveTheme(newTheme, systemPrefersDark.value)
        applyTheme(resolvedTheme.value)
      }
    }
  }
  
  window.addEventListener('storage', handleNativeStorageChange)
}

/**
 * Cleanup theme system
 */
const cleanupTheme = (): void => {
  if (!isBrowser) return
  
  if (darkModeMediaQuery) {
    if (darkModeMediaQuery.removeEventListener) {
      darkModeMediaQuery.removeEventListener('change', () => {})
    } else {
      darkModeMediaQuery.removeListener(() => {})
    }
  }
  
  if (reducedMotionMediaQuery) {
    if (reducedMotionMediaQuery.removeEventListener) {
      reducedMotionMediaQuery.removeEventListener('change', () => {})
    } else {
      reducedMotionMediaQuery.removeListener(() => {})
    }
  }
}

/**
 * useTheme Composable
 * 
 * Main composable function for theme management
 */
export const useTheme = () => {
  // Initialize on mount
  onMounted(() => {
    initializeTheme()
  })
  
  // Cleanup on unmount
  onBeforeUnmount(() => {
    cleanupTheme()
  })
  
  /**
   * Computed: Is dark mode active?
   */
  const isDark = computed(() => resolvedTheme.value === 'dark')
  
  /**
   * Computed: Is light mode active?
   */
  const isLight = computed(() => resolvedTheme.value === 'light')
  
  /**
   * Set theme preference
   */
  const setTheme = (theme: Theme): void => {
    themePreference.value = theme
    resolvedTheme.value = resolveTheme(theme, systemPrefersDark.value)
    applyTheme(resolvedTheme.value)
    storeTheme(theme)
  }
  
  /**
   * Toggle between light and dark (bypasses system)
   */
  const toggle = (): void => {
    const newTheme: Theme = resolvedTheme.value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }
  
  /**
   * Cycle through all theme options: light -> dark -> system -> light
   */
  const cycle = (): void => {
    const cycles: Theme[] = ['light', 'dark', 'system']
    const currentIndex = cycles.indexOf(themePreference.value)
    const nextIndex = (currentIndex + 1) % cycles.length
    setTheme(cycles[nextIndex])
  }
  
  /**
   * Reset to system preference
   */
  const resetToSystem = (): void => {
    setTheme('system')
  }
  
  return {
    // State
    theme: themePreference,
    resolvedTheme,
    isDark,
    isLight,
    systemPrefersDark,
    prefersReducedMotion,
    
    // Methods
    setTheme,
    toggle,
    cycle,
    resetToSystem,
  }
}

/**
 * Initialize theme before Vue app mounts (prevent FOUC)
 * Call this in main.ts before createApp
 */
export const initThemeBeforeMount = (): void => {
  if (!isBrowser) return
  
  const systemDark = getSystemPreference()
  const stored = getStoredTheme()
  const theme = stored ?? 'system'
  const resolved = resolveTheme(theme, systemDark)
  
  // Apply immediately without transition
  const root = document.documentElement
  root.classList.add('theme-transition-disabled')
  root.classList.add(`${resolved}-theme`)
  root.setAttribute('data-theme', resolved)
  root.style.colorScheme = resolved
  
  // Remove transition blocker after next frame
  requestAnimationFrame(() => {
    root.classList.remove('theme-transition-disabled')
  })
}

