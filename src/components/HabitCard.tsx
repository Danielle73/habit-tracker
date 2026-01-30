import { useState } from 'react'
import type { Habit } from '../types'
import { hapticFeedback } from '../utils/mobile'

interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [swiping, setSwiping] = useState(false)

  const hasStreak = habit.currentStreak > 0
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    if (Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      setSwiping(true)
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left to delete
      hapticFeedback('medium')
      if (window.confirm(`Delete "${habit.name}"?`)) {
        onDelete(habit.id)
      }
    }

    if (isRightSwipe) {
      // Swipe right to toggle
      hapticFeedback('light')
      onToggle(habit.id)
    }

    setSwiping(false)
    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleComplete = () => {
    hapticFeedback('light')
    onToggle(habit.id)
  }

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-3 transition-all duration-300 hover:shadow-lg active:scale-[0.98] ${
        swiping ? 'scale-95' : ''
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {habit.name}
          </h3>
          {hasStreak && (
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                🔥 {habit.currentStreak} day{habit.currentStreak !== 1 ? 's' : ''}
              </span>
              {habit.bestStreak > habit.currentStreak && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                  👑 Best: {habit.bestStreak}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {habit.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {habit.description}
        </p>
      )}
      
      <div className="flex gap-2">
        <button 
          onClick={handleComplete}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 active:scale-95 ${
            habit.isCompleted 
              ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
          }`}
        >
          {habit.isCompleted ? '✓ Completed' : 'Complete'}
        </button>
        
        <button
          onClick={() => {
            if (window.confirm(`Delete "${habit.name}"?`)) {
              hapticFeedback('medium')
              onDelete(habit.id)
            }
          }}
          className="px-4 py-3 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
          aria-label="Delete habit"
        >
          🗑️
        </button>
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          💡 Swipe right to complete, left to delete
        </p>
      </div>
    </div>
  )
}

export default HabitCard