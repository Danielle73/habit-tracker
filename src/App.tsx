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
      
      <HabitCard 
      name = "Drink Water"
      description="Stay hydrated throughout the day"/>
      <HabitCard 
      name = "Exercise"
      description="30 minutes of physical activity"/>
      <HabitCard 
      name = "Meditate"
      description="10 minutes of mindfulness"/>
      <HabitCard 
      name="Practice Language"
      description="Do your duolingo"
      />
    </div>
  )
}

export default App;
