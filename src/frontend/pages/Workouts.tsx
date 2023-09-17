import React, { useEffect } from 'react'
import workoutsStore from '../stores/workoutsStore'
import Page from '../modules/Page'
import EmptyPage from '../modules/EmptyPage'
import { Link } from 'react-router-dom'
import PlusIcon from '../svg/PlusIcon'
import IconButton from '../components/IconButton'
import formatDate from '../helpers/formatDate'
import WorkoutRow from '../modules/WorkoutRow'
import Width from '../components/Width'
import getWorkoutDay from '../helpers/getWorkoutDay'
import Box from '../components/Box'
import WorkoutsWelcome from '../modules/WorkoutsWelcome'
import WorkoutsWorkouts from '../modules/WorkoutsWorkouts'

export default function Workouts() {
  const s = workoutsStore()
  const workout = getWorkoutDay()

  useEffect(() => {
    console.log('init')
    s.init()

    return () => {
      console.log('deinit')

      s.reset()
    }
  }, [])

  return (
    <Page
      loading={!s.ready}
      headerRight={
        <IconButton to="/workouts/new">
          <PlusIcon />
        </IconButton>
      }
    >
      <WorkoutsWelcome />

      {s.workouts.length === 0 && (
        <EmptyPage
          heading="No workouts"
          description="Looks like you have logged a workout yet. Get started with the button below."
          actionText="New workout"
          actionTo="/workouts/new"
        />
      )}

      <WorkoutsWorkouts />
    </Page>
  )
}
