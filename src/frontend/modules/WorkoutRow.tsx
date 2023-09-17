import React from 'react'
import { IWorkout, IWorkoutWithCountAndStreak } from '../types'
import formatDate from '../helpers/formatDate'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '../svg/ChevronRightIcon'

interface IProps {
  workout: IWorkoutWithCountAndStreak
}

export default function WorkoutRow({ workout }: IProps) {
  return (
    <Link to={`/workouts/${workout.id}`} className="workout-row">
      <span className="workout-row__text">
        <h3>{formatDate(workout.performed)}</h3>
        <p>{workout.exerciseCount} Exercises</p>
      </span>
      <span>
        <ChevronRightIcon />
      </span>
    </Link>
  )
}
