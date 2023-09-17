import { test, expect, beforeAll, afterAll } from 'bun:test'
import request from 'supertest'
import { app } from '../../index'
import { getAuthCookie } from '../helpers'

let authToken: string

beforeAll(async () => {
  authToken = await getAuthCookie()
})

test('GET /api/exercises - list exercises with pagination and search', async () => {
  // Test without any query parameters (should return first 50 exercises, sorted alphabetically)
  let res = await request(app).get('/api/exercises').set('Cookie', [authToken])

  expect(res.status).toBe(200)
  expect(Array.isArray(res.body.exercises)).toBe(true)
  expect(res.body.exercises.length).toBeLessThanOrEqual(50)

  // Sort the received exercises and make sure they are in ascending order
  const titles = res.body.exercises.map((exercise: { title: string }) => exercise.title)
  const sortedTitles = [...titles].sort()
  expect(titles).toEqual(sortedTitles)

  // Test with search query (should return exercises whose title contains 'someSearchQuery')
  res = await request(app).get('/api/exercises?query=someSearchQuery').set('Cookie', [authToken])
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body.exercises)).toBe(true)
  for (const exercise of res.body.exercises) {
    expect(exercise.title.toLowerCase()).toContain('somesearchquery')
  }

  // Test pagination by going to the second page (should return next 50 exercises)
  res = await request(app).get('/api/exercises?page=2').set('Cookie', [authToken])
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body.exercises)).toBe(true)
  expect(res.body.exercises.length).toBeLessThanOrEqual(50)
})
