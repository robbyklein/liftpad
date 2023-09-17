import request from 'supertest'
import { app } from '../index'
import { TEST_PASSWORD, TEST_EMAIL } from './constants'

export const getAuthCookie = async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
  return res.headers['Set-Cookie'][0]
}
