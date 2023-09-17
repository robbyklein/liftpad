import { test, expect } from 'bun:test'
import jwtFunctions from '../../helpers/jwt'

test('should create and decode a JWT token', () => {
  const sub = 1
  const token = jwtFunctions.create(sub)

  expect(token).toBeTruthy()

  const decoded = jwtFunctions.decode(token)
  expect(decoded).toBeTruthy()
  expect(decoded.sub).toBe(sub)
})

test('should throw an error for invalid token', () => {
  expect(() => jwtFunctions.decode('invalid-token')).toThrow()
})
