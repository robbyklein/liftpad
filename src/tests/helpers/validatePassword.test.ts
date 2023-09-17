import { test, expect } from 'bun:test'
import validatePassword from '../../helpers/validatePassword'

test('should return false for null or undefined', () => {
  expect(validatePassword(null as any)).toBe(false)
  expect(validatePassword(undefined as any)).toBe(false)
})

test('should return false for an empty string or short password', () => {
  expect(validatePassword('')).toBe(false)
  expect(validatePassword('1234567')).toBe(false)
})

test('should return false if missing uppercase', () => {
  expect(validatePassword('abcdefg1!')).toBe(false)
})

test('should return false if missing lowercase', () => {
  expect(validatePassword('ABCDEFG1!')).toBe(false)
})

test('should return false if missing numbers', () => {
  expect(validatePassword('Abcdefg!')).toBe(false)
})

test('should return false if missing special characters', () => {
  expect(validatePassword('Abcdefg1')).toBe(false)
})

test('should return true for valid password', () => {
  expect(validatePassword('Abcdefg1!')).toBe(true)
})
