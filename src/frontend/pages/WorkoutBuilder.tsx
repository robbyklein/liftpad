import React, { useEffect } from 'react'
import Page from '../modules/Page'
import workoutBuilderStore from '../stores/workoutBuilderStore'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyPage from '../modules/EmptyPage'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import PlusIcon from '../svg/PlusIcon'
import ExerciseBrowser from '../modules/ExerciseBrowser'
import { IExercise } from '../types'
import WorkoutExercise from '../modules/WorkoutExercise'
import Width from '../components/Width'
import CalendarIcon from '../svg/CalendarIcon'
import WorkoutBuilderHeader from '../modules/WorkoutBuilderHeader'

export default function WorkoutBuilder() {
  const s = workoutBuilderStore()
  const params = useParams()
  const navigate = useNavigate()

  const handleSelect = (exercise: IExercise) => {
    s.addExercise(exercise)
    s.setBrowserOpen(false)
  }

  const handleDelete = async () => {
    if (confirm('Permanently delete workout?')) {
      await s.destroy()
      navigate('/')
    }
  }

  const handleSave = async () => {
    await s.save()
    navigate('/')
  }

  useEffect(() => {
    params?.id ? s.init(Number(params?.id)) : s.init()

    return () => {
      s.reset()
    }
  }, [])

  return (
    <>
      <Page
        loading={!s.ready}
        headerRight={
          <>
            <Button small type="button" onClick={handleSave}>
              Save
            </Button>
            <IconButton type="button" onClick={() => s.setBrowserOpen(true)}>
              <PlusIcon />
            </IconButton>
          </>
        }
      >
        {s.workout.exercises.length === 0 && (
          <EmptyPage
            heading="No exercises"
            description="Click the button below to add your first one."
            actionText="Add exercise"
            actionOnClick={() => s.setBrowserOpen(true)}
          />
        )}

        {s.workout.exercises.length > 0 && (
          <>
            <WorkoutBuilderHeader />

            <div className="space-y-3">
              {s.workout.exercises.map((exercise, i) => {
                return (
                  <WorkoutExercise
                    index={i}
                    key={i}
                    workoutExercise={exercise}
                    exercise={s.exercises[exercise.exerciseId]}
                  />
                )
              })}
            </div>

            {s.workout.id && (
              <footer className="flex justify-between">
                <Button color="danger-line" type="button" onClick={handleDelete} small>
                  Delete workout
                </Button>

                <Button color="primary" type="button" onClick={handleSave} small>
                  Save
                </Button>
              </footer>
            )}
          </>
        )}
      </Page>
      <ExerciseBrowser
        onSelect={handleSelect}
        open={s.browserOpen}
        onClose={() => s.setBrowserOpen(false)}
      />
    </>
  )
}
