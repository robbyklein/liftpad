import React from 'react'
import workoutBuilderStore from '../stores/workoutBuilderStore'
import formatDateForInput from '../helpers/formatDateForInput'
import createTimestamp from '../helpers/createTimestamp'

export default function WorkoutBuilderHeader() {
  const changeField = workoutBuilderStore((s) => s.changeField)
  const performed = workoutBuilderStore((s) => s.workout.performed)
  const id = workoutBuilderStore((s) => s.workout.id)

  const handleChange = (e: any) => {
    const newDate = new Date(e.target.value)
    changeField('performed', createTimestamp(newDate))
  }

  return (
    <header className="workout-builder-header">
      <h2>{id ? 'New' : 'Edit'} Workout</h2>
      <input
        type="date"
        name="performed"
        onChange={handleChange}
        value={formatDateForInput(performed)}
      />
    </header>
  )
}
