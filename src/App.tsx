import HabitCard from "./components/HabitCard";

function App(){
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
