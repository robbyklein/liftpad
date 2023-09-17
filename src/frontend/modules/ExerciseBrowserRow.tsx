import React from 'react'
import { IExercise } from '../types'
import IconButton from '../components/IconButton'
import PlusIcon from '../svg/PlusIcon'

interface IProps {
  exercise: IExercise
  onSelect(exercise: IExercise): void
}

export default function ExerciseBrowserRow({ exercise, onSelect }: IProps) {
  const handleSelect = () => {
    onSelect(exercise)
  }

  return (
    <div className="exercise-browser-row">
      <div className="exercise-browser-row__image">
        <img src={exercise.imageStart} />
      </div>
      <div className="exercise-browser-row__text">
        <h3>{exercise.title}</h3>
        <p>{exercise.muscle}</p>
      </div>
      <div className="exercise-browser-row__select">
        <IconButton type="button" onClick={handleSelect}>
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  )
}
