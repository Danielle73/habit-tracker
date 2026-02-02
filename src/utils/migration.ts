import type { Habit } from '../types';
import { calculateStreak, calculateBestStreak, isCompletedToday, getTodayString } from './streaks'

export const migrateHabit = (habit: Partial<Habit> & { id: string; name: string; categoryId: string }): Habit => {
  // If habit already has new fields, just update streaks
  if (habit.completionHistory !== undefined) {
    return {
      ...habit as Habit,
      currentStreak: calculateStreak(habit.completionHistory),
      bestStreak: calculateBestStreak(habit.completionHistory)
    }
  }
  
  // Old habit format - migrate it
  const completionHistory: string[] = []
  
  // If it's marked complete, add today to history
  if (habit.isCompleted) {
    completionHistory.push(getTodayString())
  }
  
  return {
    id: habit.id,
    name: habit.name,
    description: habit.description || '',
    categoryId: habit.categoryId,
    completionHistory,
    currentStreak: calculateStreak(completionHistory),
    bestStreak: calculateBestStreak(completionHistory),
    isCompleted: isCompletedToday(completionHistory)
  }
}

export const migrateHabits = (habits: Array<Partial<Habit> & { id: string; name: string; categoryId: string }>): Habit[] => {
  return habits.map(migrateHabit)
}