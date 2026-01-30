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
  const completedCount = habits.filter(h => h.isCompleted).length
  const totalCount = habits.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this habit?')) {
      onDelete(id)
    }
  }

  return (
    <div className="mb-8 animate-slideIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center text-3xl shadow-lg transform transition-transform hover:scale-110`}>
              {category.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
            </div>
          </div>
          <button
            onClick={() => {
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

      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-1">
              No habits in this category yet
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
    </div>
  )
}

export default CategorySection