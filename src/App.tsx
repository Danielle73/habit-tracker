import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import AnalyticsPage from './components/AnalyticsPage'
import TabBar from './components/TabBar'
import ThemeToggle from './components/ThemeToggle'
import type { Habit, Category } from './types'
import { migrateHabits } from './utils/migration'
import { getTodayString, isCompletedToday, calculateStreak, calculateBestStreak } from './utils/streaks'

const STORAGE_KEY = 'habit-tracker-habits'
const CATEGORIES_KEY = 'habit-tracker-categories'
const THEME_KEY = 'habit-tracker-theme'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'analytics'>('home')
  
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

  // Auto-reset completions for new day
  useEffect(() => {
    const checkAndResetDay = () => {
      const lastResetDate = localStorage.getItem('habit-tracker-last-reset')
      const today = getTodayString()
      
      if (lastResetDate !== today) {
        setHabits(currentHabits => 
          currentHabits.map(habit => ({
            ...habit,
            isCompleted: isCompletedToday(habit.completionHistory),
            currentStreak: calculateStreak(habit.completionHistory),
            bestStreak: calculateBestStreak(habit.completionHistory)
          }))
        )
        
        localStorage.setItem('habit-tracker-last-reset', today)
      }
    }
    
    checkAndResetDay()
    
    const interval = setInterval(checkAndResetDay, 60000)
    return () => clearInterval(interval)
  }, [])

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
      
      if (isCompletedToday(habit.completionHistory)) {
        newHistory = newHistory.filter(date => date !== today)
      } else {
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

  const loadTemplate = (templateCategories: Category[], templateHabits: Habit[]) => {
    setCategories([...categories, ...templateCategories])
    setHabits([...habits, ...templateHabits])
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Habit Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your daily habits and build consistency
          </p>
        </div>

        {activeTab === 'home' ? (
          <HomePage
            categories={categories}
            habits={habits}
            onToggle={toggleHabit}
            onDelete={deleteHabit}
            onDeleteCategory={deleteCategory}
            onAddCategory={addCategory}
            onAddHabit={addHabit}
            onReset={resetAllHabits}
            onLoadTemplate={loadTemplate}
          />
        ) : (
          <AnalyticsPage
            habits={habits}
            categories={categories}
          />
        )}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App