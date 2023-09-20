import React from 'react'
import { IWorkout, IWorkoutWithCountAndStreak } from '../types'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '../svg/ChevronRightIcon'
import dayjs from 'dayjs'

interface IProps {
  workout: IWorkoutWithCountAndStreak
}

export default function WorkoutRow({ workout }: IProps) {
  const date = dayjs(workout.performed).format('MMMM D, YYYY')

  return (
    <Link to={`/workouts/${workout.id}`} className="workout-row">
      <span className="workout-row__text">
        <h3>{date}</h3>
        <p>{workout.exerciseCount} Exercises</p>
      </span>
      <span>
        <ChevronRightIcon />
      </span>
    </Link>
  )
}
