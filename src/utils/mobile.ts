// Haptic feedback (vibration)
export const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 50
    }
    navigator.vibrate(patterns[type])
  }
}

// Check if running as installed PWA
export const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)
}

// Detect mobile device
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}