import React, { useEffect } from 'react'
import workoutsStore from '../stores/workoutsStore'
import Page from '../modules/Page'
import EmptyPage from '../modules/EmptyPage'
import { Link } from 'react-router-dom'
import PlusIcon from '../svg/PlusIcon'
import IconButton from '../components/IconButton'
import WorkoutsWelcome from '../modules/WorkoutsWelcome'
import WorkoutsWorkouts from '../modules/WorkoutsWorkouts'

export default function Workouts() {
  const s = workoutsStore()

  useEffect(() => {
    s.init()

    return () => {
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
