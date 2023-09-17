import React, { useEffect, useRef } from 'react'
import exerciseBrowserStore from '../stores/exerciseBrowserStore'
import Spinner from '../svg/Spinner'
import XIcon from '../svg/XIcon'
import ExerciseBrowserRow from './ExerciseBrowserRow'
import throttle from '../helpers/throttle'
import classNames from 'classnames'
import { IExercise } from '../types'

interface IProps {
  open?: boolean
  onClose(): void
  onSelect(exercise: IExercise): void
}

export default function ExerciseBrowser({ open, onClose, onSelect }: IProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const s = exerciseBrowserStore()
  const handleSearch = (e: any) => s.setQuery(e.target.value)

  useEffect(() => {
    s.init()

    return () => {
      s.reset()
    }
  }, [])

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!drawerRef.current) return

      const drawer = drawerRef.current
      const scrollHeight = drawer.scrollHeight
      const scrollTop = drawer.scrollTop
      const clientHeight = drawer.clientHeight

      if (scrollTop + clientHeight >= scrollHeight * 0.4 && s.page < s.totalPages && !s.loading) {
        s.fetchMoreExercises()
      }
    }, 1000)

    if (drawerRef.current) {
      drawerRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (drawerRef.current) drawerRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [s.totalPages, s.page, s.loading])

  return (
    <div
      onClick={onClose}
      className={classNames('exercise-browser', { 'exercise-browser--active': open })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="exercise-browser__drawer"
        ref={drawerRef}
      >
        <div className="exercise-browser__header">
          <h2 className="exercise-browser__heading">Exercises</h2>
          <button className="exercise-browser__x" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="exercise-browser__search">
          <input
            type="text"
            value={s.query}
            onChange={handleSearch}
            placeholder="Search for something"
          />
        </div>

        {s.loading && s.exercises.length === 0 && (
          <>
            <div className="exercise-browser__loading">
              <Spinner />
            </div>
          </>
        )}

        {s.exercises.length > 0 && (
          <>
            {s.exercises.map((exercise, i) => {
              return <ExerciseBrowserRow onSelect={onSelect} exercise={exercise} key={i} />
            })}
          </>
        )}
      </div>
    </div>
  )
}
