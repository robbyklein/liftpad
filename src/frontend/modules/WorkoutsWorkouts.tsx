import React from 'react'
import workoutsStore from '../stores/workoutsStore'
import WorkoutRow from './WorkoutRow'

export default function WorkoutsWorkouts() {
  const s = workoutsStore()

  if (s.workouts.length === 0) return <></>

  return (
    <div className="workouts-workouts">
      <h2>Previous workouts</h2>

      <div className="space-y-3">
        {s.workouts.map((workout, i) => {
          return <WorkoutRow workout={workout} key={i} />
        })}
      </div>
    </div>
  )
}
