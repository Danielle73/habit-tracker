interface StatsProps {
  totalHabits: number
  completedHabits: number
}

function Stats({ totalHabits, completedHabits }: StatsProps) {
  const percentage = totalHabits > 0 
    ? Math.round((completedHabits / totalHabits) * 100)
    : 0

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Today's Progress
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{totalHabits}</p>
          <p className="text-sm text-gray-500 mt-1">Total Habits</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">{completedHabits}</p>
          <p className="text-sm text-gray-500 mt-1">Completed</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
          <p className="text-sm text-gray-500 mt-1">Success Rate</p>
        </div>
      </div>
      
      {percentage === 100 && totalHabits > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-md text-center">
          <p className="text-green-700 font-medium">
            🎉 Amazing! You completed all your habits today!
          </p>
        </div>
      )}
    </div>
  )
}

export default Stats