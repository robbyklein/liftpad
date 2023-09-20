import { create } from 'zustand'
import axios from 'axios'
import { api_routes } from '../constants'
import { IExercise, IExerciseWithMaxes, IMax, IWorkout, IWorkoutWithNested } from '../types'
import arrayToMapById from '../helpers/arrayToMapById'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

type Store = {
  ready: boolean
  workout: IWorkoutWithNested
  browserOpen: boolean
  exercises: { [id: number]: IExerciseWithMaxes }
  setBrowserOpen(browserOpen: boolean): void
  changeField(key: string, value: string): void
  init(id?: number): void
  reset(): void
  addExercise(exercise: IExercise): void
  removeExercise(exerciseIndex: number): void
  addSet(exerciseIndex: number): void
  removeSet(exerciseIndex: number, setIndex: number): void
  changeSetField(
    exerciseIndex: number,
    setIndex: number,
    name: 'reps' | 'weight',
    value: string
  ): void
  save(): void
  destroy(): void
  addMaxesToExercises(maxes: IMax[]): void
}

const emptyWorkout = {
  title: '',
  performed: dayjs.utc().format(),
  exercises: [],
}

const defaultSet = { weight: 10, reps: 10 }

const defaultState = {
  ready: false,
  workout: emptyWorkout,
  exercises: {},
  performed: dayjs.utc().format(),
  browserOpen: false,
}

export const workoutBuilderStore = create<Store>((set, get) => ({
  ...defaultState,

  reset: () => {
    set({ ...defaultState })
  },

  init: async (id) => {
    if (id) {
      const res = await axios.get(api_routes.workouts_show(id))
      const { exercises, workout } = res.data
      set({ ready: true, workout, exercises: arrayToMapById(exercises) })

      // Get maxes but no rush
      const exerciseIds = exercises.map((e: IExercise) => e.id)
      const maxes = await axios.post(api_routes.exercise_maxes, { exerciseIds })
      get().addMaxesToExercises(maxes.data)
    } else {
      set({ ready: true })
    }
  },

  changeField: (key, value) => {
    console.log({ key, value })

    set((state) => {
      return {
        workout: {
          ...state.workout,
          [key]: value,
        },
      }
    })
  },

  setBrowserOpen(browserOpen) {
    set({ browserOpen })
  },

  addExercise: async (exercise) => {
    set((state) => {
      return {
        exercises: {
          ...state.exercises,
          [exercise.id]: exercise,
        },
        workout: {
          ...state.workout,
          exercises: [
            ...state.workout.exercises,
            {
              exerciseId: exercise.id,
              sets: [{ reps: 10, weight: 10 }],
            },
          ],
        },
      }
    })

    const res = await axios.post(api_routes.exercise_maxes, { exerciseIds: [exercise.id] })
    get().addMaxesToExercises(res.data)
  },

  removeExercise: (exerciseIndex) => {
    set((state) => {
      const exercisesCopy = [...state.workout.exercises]
      exercisesCopy.splice(exerciseIndex, 1)

      return {
        workout: {
          ...state.workout,
          exercises: exercisesCopy,
        },
      }
    })
  },

  addSet: (exerciseIndex) => {
    set((state) => {
      const exercisesCopy = [...state.workout.exercises]

      const lastSet = exercisesCopy[exerciseIndex].sets.at(-1)

      exercisesCopy[exerciseIndex].sets.push(lastSet ? lastSet : defaultSet)

      return {
        workout: {
          ...state.workout,
          exercises: exercisesCopy,
        },
      }
    })
  },

  removeSet: (exerciseIndex, setIndex) => {
    set((state) => {
      const exercisesCopy = [...state.workout.exercises]
      exercisesCopy[exerciseIndex].sets.splice(setIndex, 1)

      return {
        workout: {
          ...state.workout,
          exercises: exercisesCopy,
        },
      }
    })
  },

  changeSetField: (exerciseIndex, setIndex, name, value) => {
    set((state) => {
      const exercisesCopy = JSON.parse(JSON.stringify(state.workout.exercises))
      exercisesCopy[exerciseIndex].sets[setIndex][name] = Number(value)

      return {
        workout: {
          ...state.workout,
          exercises: exercisesCopy,
        },
      }
    })
  },

  save: async () => {
    const { workout } = get()

    if (workout.id) {
      await axios.put(api_routes.workouts_edit(workout.id), { workout })
    } else {
      await axios.post(api_routes.workouts_create, { workout })
    }
  },

  destroy: async () => {
    const { workout } = get()
    if (workout.id) {
      await axios.delete(api_routes.workouts_edit(workout.id))
    }
  },

  addMaxesToExercises(maxes) {
    const { exercises } = get()

    for (let i = 0; i < maxes.length; i++) {
      const max = maxes[i]

      if (exercises[max.id]) {
        exercises[max.id] = {
          ...exercises[max.id],
          ...max,
        }
      }

      set({ exercises })
    }

    console.log(maxes)
  },
}))

export default workoutBuilderStore
