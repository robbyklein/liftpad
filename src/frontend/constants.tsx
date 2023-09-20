export const api_routes = {
  login: '/api/login',
  signup: '/api/signup',
  validate: '/api/validate',
  workouts_index: '/api/workouts',
  workouts_show: (id: number) => `/api/workouts/${id}`,
  workouts_edit: (id: number) => `/api/workouts/${id}`,
  workouts_delete: (id: number) => `/api/workouts/${id}`,
  workouts_create: `/api/workouts`,
  exercise_maxes: `/api/exercises/max`,
  exercises_index: '/api/exercises',
}

export default api_routes
