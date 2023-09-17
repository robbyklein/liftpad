import prisma from '../initializers/prisma'
import bcrypt from 'bcryptjs'
import { TEST_EMAIL, TEST_PASSWORD } from './constants'
import request from 'supertest'
import { app } from '../index'

const beforeAllTests = async () => {
  // Delete everything
  await prisma.set.deleteMany()
  await prisma.workout.deleteMany()
  await prisma.user.deleteMany()

  // Create a user
  const passwordHash = bcrypt.hashSync(TEST_PASSWORD, 8)

  const user = await prisma.user.create({
    data: {
      email: TEST_EMAIL,
      password: passwordHash,
      confirmedAt: new Date(),
    },
  })

  console.log('created a user', user.email)
}

await beforeAllTests()

console.log('\n\n--------------------------------')
console.log('Everything deleted before tests!')
console.log('--------------------------------\n\n')
