import type { Habit, Category } from '../types'
import { getWeeklyStats } from '../utils/streaks'

interface AnalyticsProps {
  habits: Habit[]
  categories: Category[]
}

function Analytics({ habits, categories }: AnalyticsProps) {
  if (habits.length === 0) {
    return null
  }

  const { labels, completed } = getWeeklyStats(habits)
  
  const weekTotal = completed.reduce((sum, val) => sum + val, 0)
  
  const categoryStats = categories.map(category => {
    const categoryHabits = habits.filter(h => h.categoryId === category.id)
    const completedToday = categoryHabits.filter(h => h.isCompleted).length
    const percentage = categoryHabits.length > 0 
      ? Math.round((completedToday / categoryHabits.length) * 100)
      : 0
    
    return {
      category,
      percentage,
      completedToday,
      total: categoryHabits.length
    }
  }).sort((a, b) => b.percentage - a.percentage)

  const bestCategory = categoryStats[0]
  
  const longestStreak = habits.reduce((max, habit) => 
    habit.currentStreak > max ? habit.currentStreak : max, 0
  )
  
  const habitWithLongestStreak = habits.find(h => h.currentStreak === longestStreak)

  const today = new Date().getDay() 
  const isWeekend = today === 0 || today === 6

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        📊 Analytics
      </h2>

      {/* Weekly Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
          Last 7 Days
        </h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {completed.map((count, index) => {
            const maxCount = Math.max(...completed, 1)
            const height = (count / maxCount) * 100
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative flex items-end" style={{ height: '100%' }}>
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-t transition-all duration-500 flex items-center justify-center"
                    style={{ height: `${height}%` }}
                  >
                    {count > 0 && (
                      <span className="text-white text-xs font-bold">
                        {count}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {labels[index]}
                </span>
              </div>
            )
          })}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {weekTotal} habits completed this week
        </p>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Best Category */}
        {bestCategory && bestCategory.total > 0 && (
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 ${bestCategory.category.color} rounded-lg flex items-center justify-center text-lg`}>
                {bestCategory.category.icon}
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Top Category Today
              </h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {bestCategory.category.name}
              </span>
              {' '}is leading with{' '}
              <span className="font-bold">{bestCategory.percentage}%</span>
              {' '}completion
            </p>
          </div>
        )}

        {/* Longest Streak */}
        {longestStreak > 0 && habitWithLongestStreak && (
          <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Longest Streak
              </h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {habitWithLongestStreak.name}
              </span>
              {' '}— {longestStreak} day{longestStreak !== 1 ? 's' : ''} in a row!
            </p>
          </div>
        )}
      </div>

      {/* Motivational Insight */}
      {habits.length >= 3 && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <span className="font-medium">Insight:</span>{' '}
            {isWeekend 
              ? "Weekend warrior! Keep the momentum going."
              : "Consistency is key. You're building great habits!"
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default Analytics