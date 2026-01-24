import type { Habit } from '../types'

interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slideIn">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {habit.name}
        </h3>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors hover:scale-110"
          aria-label="Delete habit"
        >
          Delete
        </button>
      </div>
      
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4">
        {habit.description}
      </p>
      
      <button 
        onClick={() => onToggle(habit.id)}
        className={`mt-2 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            habit.isCompleted 
            ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' 
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        } text-white`}
      >
        {habit.isCompleted ? '✓ Completed' : 'Complete'}
      </button>
    </div>
  )
}

export default HabitCard