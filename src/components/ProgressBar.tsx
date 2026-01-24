interface ProgressBarProps {
    percentage: number
}

function ProgressBar ({percentage}: ProgressBarProps){
    return (

    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Daily Progress
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: percentage === 100 
              ? 'linear-gradient(to right, #10b981, #059669)' 
              : percentage >= 75
              ? 'linear-gradient(to right, #3b82f6, #2563eb)'
              : percentage >= 50
              ? 'linear-gradient(to right, #8b5cf6, #7c3aed)'
              : percentage >= 25
              ? 'linear-gradient(to right, #f59e0b, #d97706)'
              : 'linear-gradient(to right, #ef4444, #dc2626)'
          }}
        >
          {percentage > 0 && (
            <div className="w-full h-full animate-pulse" 
                 style={{ 
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite'
                 }} 
            />
          )}
        </div>
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
    )
}

export default ProgressBar