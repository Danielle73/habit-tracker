import type { Category, Habit } from '../types'

interface TemplateCategory {
  name: string
  color: string
  icon: string
  habits: Array<{ name: string; description: string }>
}

interface Template {
  name: string
  icon: string
  description: string
  categories: TemplateCategory[]
}

interface HabitTemplatesProps {
  onLoadTemplate: (categories: Category[], habits: Habit[]) => void
}

const TEMPLATES: Template[] = [
  {
    name: "Morning Routine",
    icon: "🌅",
    description: "Start your day right",
    categories: [
      {
        name: "Morning",
        color: "bg-yellow-500",
        icon: "☀️",
        habits: [
          { name: "Wake up at 6am", description: "Early bird gets the worm" },
          { name: "Drink water", description: "Hydrate first thing" },
          { name: "Morning exercise", description: "10 minute stretch or walk" },
          { name: "Healthy breakfast", description: "Fuel your body" }
        ]
      }
    ]
  },
  {
    name: "Fitness Beginner",
    icon: "💪",
    description: "Get moving daily",
    categories: [
      {
        name: "Exercise",
        color: "bg-blue-500",
        icon: "🏃",
        habits: [
          { name: "30 min walk", description: "Daily movement" },
          { name: "Stretch", description: "Morning or evening" },
          { name: "Drink 8 glasses of water", description: "Stay hydrated" }
        ]
      }
    ]
  },
  {
    name: "Self-Care Sunday",
    icon: "💅",
    description: "Wellness & beauty",
    categories: [
      {
        name: "Beauty",
        color: "bg-pink-500",
        icon: "💅",
        habits: [
          { name: "Skincare routine", description: "Cleanse, moisturize, SPF" },
          { name: "Hair mask", description: "Weekly deep treatment" },
          { name: "Meditation", description: "10 minutes mindfulness" }
        ]
      },
      {
        name: "Wellness",
        color: "bg-green-500",
        icon: "🧘",
        habits: [
          { name: "Journal", description: "Reflect on the week" },
          { name: "Relaxing bath", description: "Unwind" }
        ]
      }
    ]
  }
]

function HabitTemplates({ onLoadTemplate }: HabitTemplatesProps) {
  const handleLoadTemplate = (template: Template) => {
    const categories: Category[] = template.categories.map((cat, idx) => ({
      id: `template-cat-${Date.now()}-${idx}`,
      name: cat.name,
      color: cat.color,
      icon: cat.icon
    }))

    const habits: Habit[] = template.categories.flatMap((cat, catIdx) =>
      cat.habits.map((habit, habitIdx) => ({
        id: `template-habit-${Date.now()}-${catIdx}-${habitIdx}`,
        name: habit.name,
        description: habit.description,
        categoryId: categories[catIdx].id,
        isCompleted: false,
        completionHistory: [],
        currentStreak: 0,
        bestStreak: 0
      }))
    )

    onLoadTemplate(categories, habits)
  }

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          ⚡ Quick Start Templates
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Get started instantly with pre-made habit collections
        </p>

        <div className="grid grid-cols-1 gap-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.name}
              onClick={() => handleLoadTemplate(template)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all active:scale-98 text-left"
            >
              <span className="text-4xl">{template.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {template.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {template.description}
                </div>
              </div>
              <span className="text-blue-500 dark:text-blue-400">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HabitTemplates