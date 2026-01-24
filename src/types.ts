export interface Habit {
  id: string
  name: string
  description: string
  isCompleted: boolean
  categoryId: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}