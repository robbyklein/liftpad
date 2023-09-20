import { NextFunction, Request, Response } from 'express'
import prisma from '../initializers/prisma'
import { RequestWithExtras } from '../types'
import { Prisma } from '@prisma/client'

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, query } = req.query
    const pageSize = 50 // Number of items per page

    // Calculate the offset for pagination
    const offset = (Number(page) - 1) * pageSize

    const whereClause: any = query
      ? {
          title: {
            contains: query as string,
            mode: 'insensitive',
          },
        }
      : {}

    const exercises = await prisma.exercise.findMany({
      where: whereClause,
      skip: offset,
      take: pageSize,
      orderBy: {
        title: 'asc', // Order alphabetically by title
      },
    })

    // Get the total count of exercises
    const totalCount = await prisma.exercise.count({ where: whereClause })

    // Calculate the number of pages
    const totalPages = Math.ceil(totalCount / pageSize)

    res.json({ exercises, totalPages })
  } catch (err) {
    next(err)
  }
}

const max = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras

  try {
    const exerciseIds: number[] = req.body.exerciseIds

    const results = await prisma.$queryRaw`
      SELECT "exerciseId" as id,
             MAX(CASE WHEN reps >= 1 THEN weight ELSE NULL END) AS maxFor1,
            --  MAX(CASE WHEN reps >= 6 THEN weight ELSE NULL END) AS maxFor6,
             MAX(CASE WHEN reps >= 8 THEN weight ELSE NULL END) AS maxFor8
      FROM "Set"
      WHERE "exerciseId" IN (${Prisma.join(exerciseIds)})
      GROUP BY "exerciseId"
    `

    res.json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve max weights.' })
  }
}

export default { index, max }
