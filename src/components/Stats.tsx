import ProgressBar from './ProgressBar'

interface StatsProps {
  totalHabits: number
  completedHabits: number
  totalCategories: number
}

function Stats({ totalHabits, completedHabits, totalCategories }: StatsProps) {
  const percentage = totalHabits > 0 
    ? Math.round((completedHabits / totalHabits) * 100)
    : 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Today's Progress
      </h2>
      
      <ProgressBar percentage={percentage} />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="text-center transform transition-transform hover:scale-110">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all">
            {totalCategories}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Categories</p>
        </div>
        
        <div className="text-center transform transition-transform hover:scale-110">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all">
            {totalHabits}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Habits</p>
        </div>
        
        <div className="text-center transform transition-transform hover:scale-110">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 transition-all">
            {completedHabits}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completed</p>
        </div>
        
        <div className="text-center transform transition-transform hover:scale-110">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 transition-all">
            {percentage}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Success Rate</p>
        </div>
      </div>
      
      {percentage === 100 && totalHabits > 0 && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md text-center animate-slideIn">
          <p className="text-green-700 dark:text-green-300 font-medium">
            🎉 Amazing! You completed all your habits today!
          </p>
        </div>
      )}
    </div>
  )
}

export default Stats