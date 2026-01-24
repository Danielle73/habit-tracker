import { useState } from 'react'

interface AddHabitFormProps {
  onAdd: (name: string, description: string) => void
}

function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim() === '') return
    
    onAdd(name, description)
    setName('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Add New Habit
      </h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Habit Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Read for 20 minutes"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description (optional)
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Read before bed to wind down"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 font-medium transition-colors"
      >
        Add Habit
      </button>
    </form>
  )
}

export default AddHabitForm 