import { useState } from 'react'


interface HabitCardProps {
    name: string
    description: string
}

function HabitCard({name, description}: HabitCardProps) {
    const [isCompleted, setIsCompleted] = useState(false)

    const handleComplete = () => {
        setIsCompleted(!isCompleted)
    }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">
       {name}
      </h3>
      <p className="text-gray-500 text-sm mt-1">
       {description}
      </p>
      <button 
      onClick={handleComplete}
      className= {`mt-4 px-4 py-2 rounded ${
          isCompleted 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        >
       {isCompleted ? '✓ Completed' : 'Complete'}
      </button>
    </div>
  )
}

export default HabitCard