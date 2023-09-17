import { create } from 'zustand'
import axios from 'axios'
import { api_routes } from '../constants'

type Store = {
  form: {
    email: string
    password: string
  }
  error: string
  changeField(key: string, value: string): void
  signup(): void
  reset(): void
  setError(error: string): void
}

const defaultState = {
  form: {
    email: '',
    password: '',
  },

  error: '',
}

export const signupStore = create<Store>((set, get) => ({
  ...defaultState,

  reset: () => {
    set({ ...defaultState })
  },

  changeField: (key, value) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          [key]: value,
        },
      }
    })
  },

  setError(error) {
    set({ error })
  },

  signup: async () => {
    const { form } = get()
    const res = await axios.post(api_routes.signup, form)
  },
}))

export default signupStore
