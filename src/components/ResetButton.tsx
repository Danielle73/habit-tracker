interface ResetButtonProps {
  onReset: () => void
  hasCompletedHabits: boolean
}

function ResetButton({ onReset, hasCompletedHabits }: ResetButtonProps) {
  if (!hasCompletedHabits) {
    return null // Don't show button if nothing is completed
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            Start Fresh
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Reset all habits for a new day
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow hover:shadow-lg"
        >
          🔄 Reset All
        </button>
      </div>
    </div>
  )
}

export default ResetButton