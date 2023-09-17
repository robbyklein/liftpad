import { test, expect } from 'bun:test'
import request from 'supertest'
import { app } from '../../index'
import { TEST_EMAIL, TEST_PASSWORD } from '../constants'

let authToken = ''

test('POST /login - invalid email', async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: 'nonexistent@example.com', password: TEST_PASSWORD })

  expect(res.status).toBe(400)
})

test('POST /login - successful login', async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: TEST_EMAIL, password: TEST_PASSWORD })

  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)
  console.log(res.status)

  expect(res.status).toBe(200)
  expect(res.headers).toHaveProperty('Set-Cookie')
  expect(res.headers['Set-Cookie'][0]).toMatch(/Authorization=/)

  authToken = res.headers['Set-Cookie'][0]
})

test('GET /validate - unauthorized with invalid token', async () => {
  const res = await request(app)
    .get('/api/validate')
    .set('Authorization', `Bearer 123123123.123123123.123123123`)
    .expect(401)

  expect(res.body).toEqual({ error: 'Unauthorized: Invalid token' })
})

test('GET /validate - unauthorized with no token', async () => {
  const res = await request(app).get('/api/validate').expect(401)
})

test('GET /validate - authorized with valid token', async () => {
  const res = await request(app).get('/api/validate').set('Cookie', [authToken]).expect(200)
  expect(res.body).toEqual({ success: 'Valid!' })
})
