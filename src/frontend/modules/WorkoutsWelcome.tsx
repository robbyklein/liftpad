import React from 'react'
import Box from '../components/Box'
import getWorkoutDay from '../helpers/getWorkoutDay'
import workoutsStore from '../stores/workoutsStore'
import formatDate from '../helpers/formatDate'

export default function WorkoutsWelcome() {
  const workout = getWorkoutDay()
  const streak = workoutsStore((s) => s.streak)
  const today = new Date()

  return (
    <div className="workouts-welcome">
      <h2>{formatDate(today)}</h2>
      <Box padded={false} className="workouts-welcome__flex">
        <div className="workouts-welcome__column">
          <h3>Day</h3>
          <p>{workout.workout}</p>
        </div>

        <div className="workouts-welcome__column">
          <h3>Round</h3>
          <p>{workout.round}</p>
        </div>

        <div className="workouts-welcome__column">
          <h3>Streak</h3>
          <p>{streak}</p>
        </div>
      </Box>
    </div>
  )
}
