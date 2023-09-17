import { create } from 'zustand'
import axios from 'axios'
import { api_routes } from '../constants'

type Store = {
  authenticated: boolean
  ready: boolean
  validate(): void
  setAuthenticated(authenticated: boolean): void
}

const defaultState = {
  authenticated: false,
  ready: false,
}

export const authStore = create<Store>((set, get) => ({
  ...defaultState,

  validate: async () => {
    try {
      await axios.get(api_routes.validate)
      set({ authenticated: true })
    } catch (err) {
      set({ authenticated: false })
    }

    set({ ready: true })
  },

  setAuthenticated: (authenticated) => {
    set({ authenticated })
  },
}))

export default authStore
