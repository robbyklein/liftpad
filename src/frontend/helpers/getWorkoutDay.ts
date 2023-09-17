export default function getWorkoutDay() {
  // Starting date in the format (YYYY, MM - 1, DD)
  // The month is 0-indexed, so January is 0, February is 1, and so on
  const startingDate = new Date(2023, 8, 16) // Starting from September 16, 2023

  // Today's date
  const today = new Date()

  // Calculate the difference in days
  const diffInTime = today.getTime() - startingDate.getTime()
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))

  // Define the workout days and rounds
  const workoutDays = ['Push', 'Pull', 'Hybrid']
  const totalRounds = 2

  // Calculate the current day in the cycle
  const totalWorkoutDaysInCycle = workoutDays.length * totalRounds

  // Adjust for the offset (in this case, the offset is 1 because the starting day is 'pull round 1', which is the second day in the cycle)
  const offset = 1
  const currentDayInCycle = (diffInDays + offset) % totalWorkoutDaysInCycle

  // Find the current workout day
  const currentRound = Math.floor(currentDayInCycle / workoutDays.length) + 1
  const currentWorkout = workoutDays[currentDayInCycle % workoutDays.length]

  return {
    workout: currentWorkout,
    round: currentRound,
  }
}
