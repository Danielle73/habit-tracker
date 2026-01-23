interface HabitCardProps {
    name: string
    description: string
}


function HabitCard({name, description}: HabitCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">
       {name}
      </h3>
      <p className="text-gray-500 text-sm mt-1">
       {description}
      </p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Complete
      </button>
    </div>
  )
}

export default HabitCard