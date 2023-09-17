import { NextFunction, Request, Response } from 'express'
import prisma from '../initializers/prisma'

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, query } = req.query
    const pageSize = 50 // Number of items per page

    // Calculate the offset for pagination
    const offset = (Number(page) - 1) * pageSize

    const whereClause = query
      ? {
          title: {
            contains: query as string,
            // @ts-ignore
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

export default { index }
