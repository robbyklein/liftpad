import { create } from 'zustand'
import axios from 'axios'
import { api_routes } from '../constants'
import { IExercise } from '../types'
import debounce from '../helpers/debounce'

type TExerciseStore = {
  exercises: IExercise[]
  query: string
  loading: boolean
  page: number
  totalPages: number
  init(): void
  reset(): void
  fetchExercises(page?: number, query?: string): void
  fetchMoreExercises(): Promise<void>
  debouncedFetch: () => void
  setQuery(query: string): void
  filteredExercises(): IExercise[]
  buildUrl(): string
}

const defaultState = {
  exercises: [],
  query: '',
  loading: false,
  page: 1,
  totalPages: 1,
}

const exerciseStore = create<TExerciseStore>((set, get) => ({
  ...defaultState,

  debouncedFetch: debounce(() => get().fetchExercises(), 300),

  reset: () => {
    set({ ...defaultState })
  },

  init: async () => {
    await get().fetchExercises()
  },

  buildUrl: () => {
    const { query, page } = get()
    let url = `${api_routes.exercises_index}?page=${page}`
    if (query) url += `&query=${query}`
    return url
  },

  fetchExercises: async (page = 1, query = '') => {
    set({ loading: true })
    const res = await axios.get(get().buildUrl())
    const { exercises, totalPages } = res.data

    set({ exercises, totalPages, loading: false })

    const el = document.querySelector('.exercise-browser__drawer')
    if (el) el.scrollTop = 0
  },

  fetchMoreExercises: async () => {
    // Set loading
    set({ loading: true })

    // Update page
    const { page, exercises } = get()
    set({ page: page + 1 })

    // Fetch new page
    const res = await axios.get(get().buildUrl())

    // Set it
    set({
      exercises: [...exercises, ...res.data.exercises],
      totalPages: res.data.totalPages,
    })

    setTimeout(() => {
      set({ loading: false })
    }, 200)
  },

  setQuery: (query) => {
    set({ query: query })
    get().debouncedFetch()
  },

  filteredExercises: () => {
    const { exercises, query } = get()
    if (!query) return exercises
    return exercises.filter((exercise: IExercise) =>
      exercise.title.toLowerCase().includes(query.toLowerCase())
    )
  },
}))

export default exerciseStore
