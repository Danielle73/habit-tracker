interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"      aria-label="Toggle dark mode"
    >
       <span className="text-2xl inline-block transition-transform duration-300 hover:rotate-12">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle