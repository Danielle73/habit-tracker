interface TabBarProps {
  activeTab: 'home' | 'analytics'
  onTabChange: (tab: 'home' | 'analytics') => void
}

function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-pb z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'home'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span className="text-2xl mb-1">
              {activeTab === 'home' ? '✓' : '○'}
            </span>
            <span className="text-xs font-medium">Habits</span>
          </button>

          <button
            onClick={() => onTabChange('analytics')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'analytics'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span className="text-2xl mb-1">📊</span>
            <span className="text-xs font-medium">Analytics</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TabBar