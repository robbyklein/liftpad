import React from 'react'
import workoutBuilderStore from '../stores/workoutBuilderStore'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function WorkoutBuilderHeader() {
  const changeField = workoutBuilderStore((s) => s.changeField)
  const performed = workoutBuilderStore((s) => s.workout.performed)
  const id = workoutBuilderStore((s) => s.workout.id)

  const handleChange = (e: any) => {
    changeField('performed', dayjs(e.target.value).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'))
  }

  return (
    <header className="workout-builder-header">
      <h2>{id ? 'Edit' : 'New'} Workout</h2>
      <input
        type="date"
        name="performed"
        onChange={handleChange}
        value={dayjs(performed).format('YYYY-MM-DD')}
      />
    </header>
  )
}
