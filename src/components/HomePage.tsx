import type { Category, Habit } from '../types'
import CategorySection from './CategorySection'
import Stats from './Stats'
import ResetButton from './ResetButton'
import CategoryForm from './CategoryForm'
import AddHabitForm from './AddHabitForm'
import HabitTemplates from './HabitTemplates'

interface HomePageProps {
  categories: Category[]
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onDeleteCategory: (id: string) => void
  onAddCategory: (name: string, color: string, icon: string) => void
  onAddHabit: (name: string, description: string, categoryId: string) => void
  onReset: () => void
  onLoadTemplate: (templateCategories: Category[], templateHabits: Habit[]) => void
}

function HomePage({
  categories,
  habits,
  onToggle,
  onDelete,
  onDeleteCategory,
  onAddCategory,
  onAddHabit,
  onReset,
  onLoadTemplate
}: HomePageProps) {
  const completedCount = habits.filter(h => h.isCompleted).length
  const hasCompletedHabits = completedCount > 0

  const getHabitsByCategory = (categoryId: string) => {
    return habits.filter(habit => habit.categoryId === categoryId)
  }

  const uncategorizedHabits = habits.filter(
    habit => !categories.some(cat => cat.id === habit.categoryId)
  )

  return (
    <div className="pb-20">
      <Stats 
        totalHabits={habits.length} 
        completedHabits={completedCount} 
        totalCategories={categories.length}
      />

      <ResetButton onReset={onReset} hasCompletedHabits={hasCompletedHabits} />

      {categories.length === 0 && habits.length === 0 && (
        <HabitTemplates onLoadTemplate={onLoadTemplate} />
      )}

      <CategoryForm onAdd={onAddCategory} />

      <AddHabitForm onAdd={onAddHabit} categories={categories} />

      <div className="mt-6">
        {categories.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No categories yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Use a template above or create your own category
            </p>
          </div>
        ) : (
          <>
            {categories.map(category => (
              <CategorySection
                key={category.id}
                category={category}
                habits={getHabitsByCategory(category.id)}
                onToggle={onToggle}
                onDelete={onDelete}
                onDeleteCategory={onDeleteCategory}
              />
            ))}

            {uncategorizedHabits.length > 0 && (
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  ⚠️ Uncategorized Habits
                </p>
                {uncategorizedHabits.map(habit => (
                  <div key={habit.id} className="text-sm text-yellow-700 dark:text-yellow-300">
                    {habit.name}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage