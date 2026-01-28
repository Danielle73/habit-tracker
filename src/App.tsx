import { useState, useEffect } from 'react'
import HabitCard from './components/HabitCard'
import AddHabitForm from './components/AddHabitForm'
import CategoryForm from './components/CategoryForm'
import CategorySection from './components/CategorySection'
import Stats from './components/Stats'
import ThemeToggle from './components/ThemeToggle'
import ResetButton from './components/ResetButton'
import type { Habit, Category } from './types'
import { migrateHabits } from './utils/migration'
import { getTodayString, isCompletedToday, calculateStreak, calculateBestStreak } from './utils/streaks'
import Analytics from './components/Analytics'

const STORAGE_KEY = 'habit-tracker-habits'
const CATEGORIES_KEY = 'habit-tracker-categories'
const THEME_KEY = 'habit-tracker-theme'

function App() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  })

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Migrate old habits to new format
      return migrateHabits(parsed)
    }
    return []
  })

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_KEY, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_KEY, 'light')
    }
  }, [isDark])

  const addCategory = (name: string, color: string, icon: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color,
      icon
    }
    setCategories([...categories, newCategory])
  }

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
    setHabits(habits.filter(habit => habit.categoryId !== categoryId))
  }

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit
      
      const today = getTodayString()
      let newHistory = [...habit.completionHistory]
      
      // If already completed today, remove today from history
      if (isCompletedToday(habit.completionHistory)) {
        newHistory = newHistory.filter(date => date !== today)
      } else {
        // Add today to history
        newHistory.push(today)
      }
      
      const currentStreak = calculateStreak(newHistory)
      const bestStreak = Math.max(calculateBestStreak(newHistory), habit.bestStreak)
      
      return {
        ...habit,
        completionHistory: newHistory,
        isCompleted: isCompletedToday(newHistory),
        currentStreak,
        bestStreak
      }
    }))
  }

  const addHabit = (name: string, description: string, categoryId: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      isCompleted: false,
      categoryId,
      completionHistory: [],
      currentStreak: 0,
      bestStreak: 0
    }
    setHabits([...habits, newHabit])
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const resetAllHabits = () => {
    const today = getTodayString()
    setHabits(habits.map(habit => ({
      ...habit,
      completionHistory: habit.completionHistory.filter(date => date !== today),
      isCompleted: false,
      currentStreak: calculateStreak(habit.completionHistory.filter(date => date !== today))
    })))
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const completedCount = habits.filter(habit => habit.isCompleted).length
  const hasCompletedHabits = completedCount > 0

  const getHabitsByCategory = (categoryId: string) => {
    return habits.filter(habit => habit.categoryId === categoryId)
  }

  const uncategorizedHabits = habits.filter(
    habit => !categories.some(cat => cat.id === habit.categoryId)
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Habit Tracker
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Track your daily habits and build consistency
      </p>
      
      <Stats 
        totalHabits={habits.length} 
        completedHabits={completedCount} 
        totalCategories={categories.length}
        habits={habits}
      />
      
      <Analytics habits={habits} categories={categories} />

      <ResetButton onReset={resetAllHabits} hasCompletedHabits={hasCompletedHabits} />
      
      <CategoryForm onAdd={addCategory} />
      
      <AddHabitForm onAdd={addHabit} categories={categories} />
      
      <div className="mt-6">
        {categories.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No categories yet. Create your first category above! 👆
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Try categories like: Beauty 💅, Exercise 💪, Learning 📚
            </p>
          </div>
        ) : (
          <>
            {categories.map(category => (
              <CategorySection
                key={category.id}
                category={category}
                habits={getHabitsByCategory(category.id)}
                onToggle={toggleHabit}
                onDelete={deleteHabit}
                onDeleteCategory={deleteCategory}
              />
            ))}
            
            {uncategorizedHabits.length > 0 && (
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  ⚠️ Uncategorized Habits
                </p>
                {uncategorizedHabits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={toggleHabit}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App