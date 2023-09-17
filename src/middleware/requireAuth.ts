import { NextFunction, Request, Response } from 'express'
import jwt from '../helpers/jwt'
import prisma from '../initializers/prisma'
import { RequestWithExtras } from '../types'

const requireAuth = async (requ: Request, res: Response, next: NextFunction) => {
  const req = requ as RequestWithExtras

  try {
    // Try to get the token from the Authorization cookie
    const token = req.cookies?.Authorization

    console.log('--------------')
    console.log(req.cookies?.Authorization)
    console.log('--------------')

    if (!token) throw new Error('No token provided')

    const decodedToken = jwt.decode(token)

    // Validate the user exists
    req.user = (decodedToken as any).sub

    const existingUser = await prisma.user.findUnique({
      where: {
        id: req.user,
      },
    })

    if (!existingUser) {
      return res.status(401).json({ error: 'Unauthorized: User does not exist' })
    }

    next()
  } catch (err) {
    // Token verification failed
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}

export default requireAuth
