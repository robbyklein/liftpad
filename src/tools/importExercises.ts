import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const readJSONFile = (filePath: string) => {
  const file = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(file)
}

const filePath = path.join(__dirname, '../data/exercises.json')
const data = readJSONFile(filePath)

await prisma.set.deleteMany()
await prisma.workout.deleteMany()
await prisma.exercise.deleteMany()

for (const exercise of data.exercises) {
  try {
    const imageEndFileName = 'image_end.jpg' // Replace with your desired format
    const imageStartFileName = 'image_start.jpg' // Replace with your desired format

    await prisma.exercise.create({
      data: {
        id: exercise.id,
        equipment: exercise.equipment,
        imageEnd: `/images/exercises/${exercise.id}/${imageEndFileName}`,
        imageStart: `/images/exercises/${exercise.id}/${imageStartFileName}`,
        instructions: exercise.instructions,
        liftType: exercise.lift_type,
        muscle: exercise.muscle,
        title: exercise.title,
      },
    })
    console.log(`Successfully imported exercise: ${exercise.title}`)
  } catch (err) {
    console.error(`Failed to import exercise: ${exercise.title}. Error: ${err}`)
  }
}

// Count the number of exercises
const count = await prisma.exercise.count()
console.log(`There are ${count} exercises in the database.`) // Changed 'users' to 'exercises'
