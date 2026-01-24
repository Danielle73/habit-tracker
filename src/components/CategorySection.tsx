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

  return (
    <div className="mb-8 animate-slideIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl shadow-md`}>
            {category.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {completedCount} of {totalCount} completed ({percentage}%)
            </p>
          </div>
        </div>
        <button
          onClick={() => onDeleteCategory(category.id)}
          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors"
        >
          Delete Category
        </button>
      </div>

      <div className="ml-0 md:ml-16">
        {habits.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400">
              No habits in this category yet
            </p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default CategorySection