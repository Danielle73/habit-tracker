import { useState } from 'react'

interface CategoryFormProps {
  onAdd: (name: string, color: string, icon: string) => void
}

const COLORS = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
]

const ICONS = ['💪', '🧘', '📚', '💼', '🎨', '🍎', '💅', '🏃', '🧠', '❤️', '✨', '🌟']

function CategoryForm({ onAdd }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState('bg-blue-500')
  const [selectedIcon, setSelectedIcon] = useState('✨')
  const [isOpen, setIsOpen] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim() === '') {
        setNameError(true)
        return
    }
    
    onAdd(name, selectedColor, selectedIcon)
    setName('')
    setSelectedColor('bg-blue-500')
    setSelectedIcon('✨')
    setIsOpen(false)
    setNameError(false)
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (nameError && value.trim() !== ''){
        setNameError(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
      >
        + Add New Category
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create Category
        </h2>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false) 
            setNameError(false)
        }}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category Name *
        </label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Beauty, Exercise, Work"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
            nameError
              ? 'border-red-500 focus:ring-red-500 animate-shake'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          }`}        
          />
          {nameError && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-slideIn">
            Category name is required
          </p>
        )}

      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose Icon
        </label>
        <div className="grid grid-cols-6 gap-2">
          {ICONS.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setSelectedIcon(icon)}
              className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                selectedIcon === icon
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setSelectedColor(color.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedColor === color.value
                  ? 'border-gray-900 dark:border-white scale-110'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className={`w-full h-6 rounded ${color.value}`}></div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 font-medium transition-colors"
        >
          Create Category
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false)
            setNameError(false)
        }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CategoryForm