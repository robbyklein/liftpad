import { NextFunction, Request, Response } from 'express'
import prisma from '../initializers/prisma'
import { RequestWithExtras } from '../types'

// Create a new workout
const create = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras
  const { title, performed, exercises } = req.body.workout

  if (!req.user || !exercises || !Array.isArray(exercises)) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  try {
    const newWorkout = await prisma.workout.create({
      data: {
        title,
        performed: new Date(performed),
        userId: req.user,
        exercises: {
          connect: exercises.map((e: any) => ({ id: e.exerciseId })),
        },
      },
      include: {
        exercises: true,
      },
    })

    const setPromises = exercises.map(async (exercise: any) => {
      const setDatas = exercise.sets.map((set: any) => ({
        weight: set.weight,
        reps: set.reps,
        exerciseId: exercise.exerciseId,
        workoutId: newWorkout.id,
      }))
      return prisma.set.createMany({
        data: setDatas,
      })
    })

    await Promise.all(setPromises)

    return res.status(201).json(newWorkout)
  } catch (error) {
    next(error)
  }
}

const show = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras

  try {
    const workout = await prisma.workout.findFirst({
      where: {
        userId: req.user,
        id: Number(req.params.id),
      },
      include: {
        exercises: {
          include: {
            sets: {
              where: {
                workoutId: Number(req.params.id),
              },
            },
          },
        },
      },
    })

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    // Normalize data
    const normalizedWorkout = {
      workout: {
        id: workout.id,
        title: workout.title,
        performed: workout.performed.toISOString(),
        exercises: workout.exercises.map((exercise) => ({
          exerciseId: exercise.id,
          sets: exercise.sets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
          })),
        })),
      },
      // Array of detailed exercises information
      exercises: workout.exercises.map((exercise) => ({
        id: exercise.id,
        equipment: exercise.equipment,
        imageEnd: exercise.imageEnd,
        imageStart: exercise.imageStart,
        instructions: exercise.instructions,
        liftType: exercise.liftType,
        muscle: exercise.muscle,
        title: exercise.title,
      })),
    }

    return res.json(normalizedWorkout)
  } catch (error) {
    next(error)
  }
}

const index = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras
  const userId = req.user
  const currentPage = Number(req.query.page) || 1
  const perPage = 50

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      skip: (currentPage - 1) * perPage,
      take: perPage,
      include: {
        exercises: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        performed: 'desc',
      },
    })

    const workoutsWithExerciseCount = workouts.map((workout) => ({
      ...workout,
      exerciseCount: workout.exercises.length,
    }))

    const totalWorkouts = await prisma.workout.count({
      where: {
        userId,
      },
    })

    const totalPages = Math.ceil(totalWorkouts / perPage)

    const results: any = await prisma.$queryRaw`
      WITH consecutive_days AS (
          SELECT performed::DATE,
                LEAD(performed::DATE, 1) OVER (ORDER BY performed::DATE DESC) AS next_day
          FROM "Workout"
          WHERE "userId" = ${userId}
          ORDER BY performed::DATE DESC
      ),

      streaks AS (
          SELECT performed,
                CASE
                    WHEN performed - next_day = 1 THEN 1
                    ELSE 0
                END AS is_consecutive
          FROM consecutive_days
      )

      SELECT COALESCE(MAX(streak_length), 0) AS current_streak FROM (
          SELECT performed, 
                SUM(is_consecutive) OVER (ORDER BY performed DESC ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING) + 1 AS streak_length
          FROM streaks
          WHERE performed >= current_date - INTERVAL '2 days'
      ) sub
      WHERE streak_length > 1 OR (streak_length = 1 AND performed = current_date);
    `

    const streak = Number(results[0]?.current_streak ?? 0)

    return res.status(200).json({
      workouts: workoutsWithExerciseCount,
      totalPages,
      currentPage,
      streak,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const destroy = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras
  const workoutId = Number(req.params.id)

  try {
    await prisma.set.deleteMany({
      where: {
        workoutId: workoutId,
      },
    })

    await prisma.workout.update({
      where: { id: workoutId },
      data: {
        exercises: {
          disconnect: [],
        },
      },
    })

    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const update = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras
  const workoutId = Number(req.params.id)
  const { title, performed, exercises } = req.body.workout

  if (!req.user || !exercises || !Array.isArray(exercises)) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  try {
    const setDeletePromise = prisma.set.deleteMany({
      where: {
        workoutId,
      },
    })

    const setData = exercises.flatMap((exercise: any) =>
      exercise.sets.map((set: any) => ({
        weight: set.weight,
        reps: set.reps,
        exerciseId: exercise.exerciseId,
        workoutId,
      }))
    )

    const setCreatePromise = prisma.set.createMany({ data: setData })

    const workoutUpdatePromise = prisma.workout.update({
      where: { id: workoutId },
      data: {
        title,
        performed: new Date(performed),
        exercises: {
          set: exercises.map((e: any) => ({ id: e.exerciseId })),
        },
      },
    })

    await prisma.$transaction([setDeletePromise, workoutUpdatePromise, setCreatePromise])

    const updatedWorkout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: {
          include: {
            sets: {
              where: {
                workoutId,
              },
            },
          },
        },
      },
    })

    return res.status(200).json(updatedWorkout)
  } catch (error) {
    next(error)
  }
}

export default { create, show, destroy, index, update }
