export interface Habit {
  id: string
  name: string
  description: string
  isCompleted: boolean
  categoryId: string
  completionHistory: string[]
  currentStreak: number
  bestStreak: number
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface DailyStats {
  date: string
  completed: number
  total: number
}