import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle PrismaClientKnownRequestError
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'This email is already in use.' })
    }
  }

  // You could add more specific error handling here
  res.status(400).json({ error: err.message })
}

export default errorHandler
