import { create } from 'zustand'
import axios from 'axios'
import { api_routes } from '../constants'
import { IWorkoutWithCountAndStreak } from '../types'

type Store = {
  ready: boolean
  workouts: IWorkoutWithCountAndStreak[]
  streak: number
  init(): void
  reset(): void
}

const defaultState = {
  ready: false,
  workouts: [],
  streak: 0,
}

export const workoutsStore = create<Store>((set, get) => ({
  ...defaultState,

  reset: () => {
    set({ ...defaultState })
  },

  init: async () => {
    const res = await axios.get(api_routes.workouts_index)
    const { streak, workouts } = res.data
    set({ ready: true, workouts, streak })
  },
}))

export default workoutsStore
