import HabitCard from "./components/HabitCard";

function App(){
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if(saved){
      return JSON.parse(saved)
    }
  return[
    {
      id: '1',
      name: 'Drink Water',
      description: 'Stay hydrated throughout the day',
      isCompleted: false
    },
    {
      id: '2',
      name: 'Exercise',
      description: '30 minutes of physical activity',
      isCompleted: false
    },
    {
      id: '3',
      name: 'Meditate',
      description: '10 minutes of mindfulness',
      isCompleted: false
    }
  ]
})

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
},[habits])

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id
      ? {...habit, isCompleted: !habit.isCompleted }
      : habit
    ))
  }

  const addHabit = (name: string, description: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      isCompleted: false
    }
    setHabits([...habits, newHabit])
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }


  return(
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Habit Tracker
      </h1>
      <p className="text-gray-600 mb-8">
        Track your daily habits and build consistency
      </p>

      <AddHabitForm onAdd={addHabit} />
      
      {habits.map(habit => (
        <HabitCard
        key = {habit.id}
        habit = {habit}
        onToggle = {toggleHabit}
        onDelete = {deleteHabit}
        />
      ))}
    </div>
  )
}

export default App;
