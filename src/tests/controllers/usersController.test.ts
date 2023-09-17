import { test, expect } from 'bun:test'
import request from 'supertest'
import { app } from '../../index'
import prisma from '../../initializers/prisma'
import { TEST_PASSWORD } from '../constants'

test('POST /signup - successful signup', async () => {
  const res = await request(app)
    .post('/api/signup')
    .send({ email: 'new@email.com', password: TEST_PASSWORD })

  expect(res.status).toBe(201)
  // expect(res.body).toHaveProperty('token')

  const user = await prisma.user.findUnique({ where: { email: process.env.TEST_EMAIL } })

  expect(user).not.toBeNull()
  expect(user?.email).toBe(process.env.TEST_EMAIL)
})

test('POST /signup - invalid email', async () => {
  const res = await request(app)
    .post('/api/signup')
    .send({ email: 'invalid-email', password: 'password123' })

  expect(res.status).toBe(400)
})
