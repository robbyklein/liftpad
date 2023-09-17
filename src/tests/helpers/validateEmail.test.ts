import { test, expect } from 'bun:test'
import validateEmail from '../../helpers/validateEmail'

test('should return null for null', () => {
  expect(validateEmail(null as any)).toBe(null)
})

test('should return null for undefined', () => {
  expect(validateEmail(undefined as any)).toBe(null)
})

test('should return null for an empty string', () => {
  expect(validateEmail('')).toBe(null)
})

test('should return null for invalid email format', () => {
  expect(validateEmail('notAnEmail')).toBe(null)
})

test('should return match object for a valid email', () => {
  expect(validateEmail('test@example.com')).not.toBe(null)
})

test('should return match object for valid email regardless of case', () => {
  expect(validateEmail('TeSt@ExAmPlE.cOm')).not.toBe(null)
})
