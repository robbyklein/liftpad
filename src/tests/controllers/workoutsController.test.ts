import { test, expect, beforeAll, afterAll } from 'bun:test'
import request from 'supertest'
import { app } from '../../index'
import { getAuthCookie } from '../helpers'

let authToken: string
let createdWorkoutId: string

beforeAll(async () => {
  authToken = await getAuthCookie()
})

test('POST /workouts - create a new workout', async () => {
  const newWorkout = {
    workout: {
      title: 'My first workout',
      performed: '2023-01-05T00:00:00.000Z',
      exercises: [
        {
          exerciseId: 12,
          sets: [
            {
              reps: 10,
              weight: 80,
            },
            {
              reps: 8,
              weight: 100,
            },
            {
              reps: 10,
              weight: 80,
            },
          ],
        },
        {
          exerciseId: 27,
          sets: [
            {
              reps: 10,
              weight: 80,
            },
            {
              reps: 8,
              weight: 100,
            },
            {
              reps: 10,
              weight: 80,
            },
          ],
        },
        {
          exerciseId: 45,
          sets: [
            {
              reps: 10,
              weight: 80,
            },
            {
              reps: 8,
              weight: 100,
            },
            {
              reps: 10,
              weight: 80,
            },
          ],
        },
      ],
    },
  }

  const res = await request(app).post('/api/workouts').set('Cookie', [authToken]).send(newWorkout)

  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body).toHaveProperty('title', newWorkout.workout.title)
  expect(res.body).toHaveProperty('performed', newWorkout.workout.performed)
  expect(res.body).toHaveProperty('exercises')
  expect(res.body.exercises).toHaveLength(newWorkout.workout.exercises.length)

  createdWorkoutId = res.body.id
})

test('GET /workouts - list workouts', async () => {
  const res = await request(app).get('/api/workouts').set('Cookie', [authToken])

  expect(res.status).toBe(200)
  expect(Array.isArray(res.body.workouts)).toBe(true)
  expect(typeof res.body.totalPages).toBe('number')
  expect(typeof res.body.currentPage).toBe('number')
})

test('GET /workouts/:id - show a specific workout', async () => {
  const res = await request(app).get(`/api/workouts/${createdWorkoutId}`).set('Cookie', [authToken])

  expect(res.status).toBe(200)

  // Check if the response has the workout object
  expect(res.body).toHaveProperty('workout')
  expect(res.body.workout).toHaveProperty('id', createdWorkoutId)
  expect(res.body.workout).toHaveProperty('title')
  expect(res.body.workout).toHaveProperty('performed')
  expect(res.body.workout).toHaveProperty('exercises')

  // Check if the response has the exercises details array
  expect(res.body).toHaveProperty('exercises')
  expect(Array.isArray(res.body.exercises)).toBe(true)

  // You can add more specific checks depending on your application's requirements
})

test('PUT /api/workouts/:id - update a workout', async () => {
  // Define the updated workout data
  const updatedWorkout = {
    workout: {
      title: 'My updated workout',
      performed: '2023-01-06T00:00:00.000Z',
      exercises: [
        {
          exerciseId: 12,
          sets: [
            {
              reps: 12,
              weight: 85,
            },
            {
              reps: 9,
              weight: 105,
            },
            {
              reps: 12,
              weight: 85,
            },
          ],
        },
        {
          exerciseId: 27,
          sets: [
            {
              reps: 12,
              weight: 85,
            },
            {
              reps: 9,
              weight: 105,
            },
            {
              reps: 12,
              weight: 85,
            },
          ],
        },
      ],
    },
  }

  // Make the PUT request to update the workout
  const res = await request(app)
    .put(`/api/workouts/${createdWorkoutId}`)
    .set('Cookie', [authToken])
    .send(updatedWorkout)

  // Assertions to verify the update was successful
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('id', createdWorkoutId)
  expect(res.body).toHaveProperty('title', updatedWorkout.workout.title)
  expect(res.body).toHaveProperty('performed', updatedWorkout.workout.performed)
  expect(res.body).toHaveProperty('exercises')
  expect(res.body.exercises).toHaveLength(updatedWorkout.workout.exercises.length)
})

// test('DELETE /workouts/:id - destroy a workout', async () => {
//   const res = await request(app)
//     .delete(`/workouts/${createdWorkoutId}`)
//     .set('Cookie', [authToken])

//   expect(res.status).toBe(204)
// })
