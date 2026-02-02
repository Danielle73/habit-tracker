import type { Habit, Category } from '../types'
import Analytics from './Analytics'

interface AnalyticsPageProps {
  habits: Habit[]
  categories: Category[]
}

function AnalyticsPage({ habits, categories }: AnalyticsPageProps) {
  const totalCompletions = habits.reduce((sum, habit) => 
    sum + habit.completionHistory.length, 0
  )

  const longestStreak = habits.reduce((max, habit) => 
    Math.max(max, habit.bestStreak), 0
  )

  const longestStreakHabit = habits.find(h => h.bestStreak === longestStreak)

  const avgCompletionRate = habits.length > 0
    ? Math.round((habits.reduce((sum, h) => 
        sum + (h.completionHistory.length > 0 ? 1 : 0), 0) / habits.length) * 100)
    : 0

const mostConsistentHabit = habits.length > 0
  ? habits.reduce((best, habit) => {
      const habitCompletions = habit.completionHistory.length
      const bestCompletions = best.completionHistory.length
      
      return habitCompletions > bestCompletions ? habit : best
    })
  : null

  return (
    <div className="pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Insights into your habit journey
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalCompletions}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200 mt-1">
            Total Completions
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {longestStreak}
          </div>
          <div className="text-sm text-orange-800 dark:text-orange-200 mt-1">
            Longest Streak
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {avgCompletionRate}%
          </div>
          <div className="text-sm text-green-800 dark:text-green-200 mt-1">
            Active Habits
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {habits.length}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-200 mt-1">
            Total Habits
          </div>
        </div>
      </div>

      {/* Achievements */}
      {longestStreakHabit && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🏆</span> Achievements
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span className="text-2xl">🔥</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  Best Streak Champion
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {longestStreakHabit.name} - {longestStreak} days in a row!
                </div>
              </div>
            </div>

            {mostConsistentHabit && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-2xl">⭐</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Most Consistent
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {mostConsistentHabit.name}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Analytics */}
      <Analytics habits={habits} categories={categories} />

      {habits.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <span className="text-6xl mb-4 block">📊</span>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No data yet
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Start tracking habits to see analytics
          </p>
        </div>
      )}
    </div>
  )
}

export default AnalyticsPage