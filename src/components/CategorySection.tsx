import { useState } from 'react'
import type { Category, Habit } from '../types'
import HabitCard from './HabitCard'

interface CategorySectionProps {
  category: Category
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onDeleteCategory: (id: string) => void
}

function CategorySection({ category, habits, onToggle, onDelete, onDeleteCategory }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const completedCount = habits.filter(h => h.isCompleted).length
  const totalCount = habits.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this habit?')) {
      onDelete(id)
    }
  }

  const handleCompleteAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    habits.forEach(habit => {
      if (!habit.isCompleted) {
        onToggle(habit.id)
      }
    })
  }

  return (
    <div className="mb-6 animate-slideIn">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-3 transition-all hover:shadow-lg active:scale-[0.99]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
              {category.icon}
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {category.name}
                <span className="text-base text-gray-400 dark:text-gray-500">
                  {isExpanded ? '▼' : '▶'}
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${category.color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isExpanded && totalCount > 0 && completedCount < totalCount && (
              <button
                onClick={handleCompleteAll}
                className="text-xs px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-all font-medium"
              >
                ✓ All
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (window.confirm(`Delete "${category.name}" category and all its habits?`)) {
                  onDeleteCategory(category.id)
                }
              }}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-all hover:scale-105 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Delete
            </button>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-3 ml-0 animate-slideIn">
          {habits.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors">
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                No habits yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Add your first {category.name.toLowerCase()} habit above
              </p>
            </div>
          ) : (
            habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={onToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default CategorySection