import React from 'react'
import { IExerciseWithMaxes, IWorkoutExercise } from '../types'
import IconButton from '../components/IconButton'
import XIcon from '../svg/XIcon'
import workoutBuilderStore from '../stores/workoutBuilderStore'
import Button from '../components/Button'

interface IProps {
  workoutExercise: IWorkoutExercise
  exercise: IExerciseWithMaxes
  index: number
}

export default function WorkoutExercise({ workoutExercise, exercise, index }: IProps) {
  const s = workoutBuilderStore()

  const handleSetFieldChange = (e: any, i: number) => {
    const { value, name } = e.target
    s.changeSetField(index, i, name, value)
  }

  return (
    <div className="workout-exercise">
      <header className="workout-exercise__header">
        <div className="workout-exercise__header-image">
          <img src={exercise.imageStart} />
        </div>

        <div className="workout-exercise__header-text">
          <h3>{exercise.title}</h3>
          <p>
            {exercise.maxfor1 || exercise.maxfor8 ? (
              <>
                <strong>Max: </strong>
                {exercise.maxfor8 && <>{exercise.maxfor8}lbs (8 rep)</>}
                {exercise.maxfor1 && exercise.maxfor8 && <> / </>}
                {exercise.maxfor1 && <>{exercise.maxfor1}lbs (1 rep)</>}
              </>
            ) : (
              <>{exercise.muscle}</>
            )}
          </p>
        </div>

        <div className="workout-exercise__header-close">
          <button onClick={() => s.removeExercise(index)}>
            <XIcon />
          </button>
        </div>
      </header>
      <div className="workout-exercise__body">
        {workoutExercise.sets.map((set, i) => {
          return (
            <div key={i} className="workout-exercise__set">
              <h4>SET #{i + 1}</h4>
              <div className="workout-exercise__set-flex">
                <select
                  name="weight"
                  onChange={(e) => handleSetFieldChange(e, i)}
                  value={set.weight}
                >
                  {[...Array(400).keys()].map((i) => {
                    return (
                      <option key={i} value={i * 2.5}>
                        {i * 2.5} lbs
                      </option>
                    )
                  })}
                </select>

                <select name="reps" onChange={(e) => handleSetFieldChange(e, i)} value={set.reps}>
                  {[...Array(100).keys()].map((i) => {
                    return (
                      <option key={i} value={i + 1}>
                        {i + 1} reps
                      </option>
                    )
                  })}
                </select>
                <button onClick={() => s.removeSet(index, i)}>
                  <XIcon />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="workout-exercise__add">
        <Button onClick={() => s.addSet(index)} small fullWidth type="button">
          Add set
        </Button>
      </div>
    </div>
  )
}
