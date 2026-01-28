export const getTodayString = (): string => {
  const today = new Date()
  return today.toISOString().split('T')[0] 
}

export const getYesterdayString = (): string => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0]
}

export const isCompletedToday = (completionHistory: string[]): boolean => {
  return completionHistory.includes(getTodayString())
}

export const calculateStreak = (completionHistory: string[]): number => {
  if (completionHistory.length === 0) return 0
  
  const sortedDates = [...completionHistory].sort((a, b) => b.localeCompare(a))
  
  const today = getTodayString()
  const yesterday = getYesterdayString()
  
  if (!sortedDates.includes(today) && !sortedDates.includes(yesterday)) {
    return 0
  }
  
  let streak = 0
  let currentDate = new Date()
  
  for (let i = 0; i < 365; i++) { 
    const dateString = currentDate.toISOString().split('T')[0]
    
    if (sortedDates.includes(dateString)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1) 
    } else {
      break 
    }
  }
  
  return streak
}

export const calculateBestStreak = (completionHistory: string[]): number => {
  if (completionHistory.length === 0) return 0
  
  const sortedDates = [...completionHistory].sort((a, b) => a.localeCompare(b))
  
  let bestStreak = 1
  let currentStreak = 1
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1])
    const currDate = new Date(sortedDates[i])
    
    const diffTime = currDate.getTime() - prevDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    
    if (diffDays === 1) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }
  
  return bestStreak
}

export const getWeeklyStats = (habits: any[]): { labels: string[], completed: number[], total: number[] } => {
  const stats: { [key: string]: { completed: number, total: number } } = {}
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]
    stats[dateString] = { completed: 0, total: habits.length }
  }
  
  habits.forEach(habit => {
    habit.completionHistory.forEach((date: string) => {
      if (stats[date]) {
        stats[date].completed++
      }
    })
  })
  
  const labels = Object.keys(stats).map(date => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { weekday: 'short' })
  })
  
  const completed = Object.values(stats).map(s => s.completed)
  const total = Object.values(stats).map(s => s.total)
  
  return { labels, completed, total }
}