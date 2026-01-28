import type { Habit } from '../types'
import { calculateStreak, calculateBestStreak, isCompletedToday, getTodayString } from './streaks'

export const migrateHabit = (habit: any): Habit => {
  if (habit.completionHistory !== undefined) {
    return {
      ...habit,
      currentStreak: calculateStreak(habit.completionHistory),
      bestStreak: calculateBestStreak(habit.completionHistory)
    }
  }
  
  const completionHistory: string[] = []
  
  if (habit.isCompleted) {
    completionHistory.push(getTodayString())
  }
  
  return {
    ...habit,
    completionHistory,
    currentStreak: calculateStreak(completionHistory),
    bestStreak: calculateBestStreak(completionHistory),
    isCompleted: isCompletedToday(completionHistory)
  }
}

export const migrateHabits = (habits: any[]): Habit[] => {
  return habits.map(migrateHabit)
}