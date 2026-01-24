import { useState, useEffect } from 'react'
import HabitCard from './components/HabitCard'
import AddHabitForm from './components/AddHabitForm'
import Stats from './components/Stats'
import ThemeToggle from './components/ThemeToggle'
import type { Habit } from './types'

const STORAGE_KEY = 'habit-tracker-habits'
const THEME_KEY = 'habit-tracker-theme'

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      {
        id: '1',
        name: 'Drink Water',
        description: 'Stay hydrated throughout the day',
        isCompleted: false
      },
      {
        id: '2',
        name: 'Exercise',
        description: '30 minutes of physical activity',
        isCompleted: false
      },
      {
        id: '3',
        name: 'Meditate',
        description: '10 minutes of mindfulness',
        isCompleted: false
      }
    ]
  })

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_KEY, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_KEY, 'light')
    }
  }, [isDark])

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, isCompleted: !habit.isCompleted }
        : habit
    ))
  }

  const addHabit = (name: string, description: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      isCompleted: false
    }
    setHabits([...habits, newHabit])
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const completedCount = habits.filter(habit => habit.isCompleted).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Habit Tracker
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Track your daily habits and build consistency
      </p>
      
      <Stats totalHabits={habits.length} completedHabits={completedCount} />
      
      <AddHabitForm onAdd={addHabit} />
      
      <div className="mt-6">
        {habits.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No habits yet. Add your first habit above! 👆
            </p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App