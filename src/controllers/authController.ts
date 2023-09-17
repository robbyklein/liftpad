import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../initializers/prisma'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get data off body
    const { email, password } = req.body

    // Find the user
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user || !password || !user.password || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid email or password.')
    }

    if (!user.confirmedAt) {
      throw new Error('Please confirm your email address.')
    }

    // Create a token
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || '')

    // Store it in an httponly cookie
    res.cookie('Authorization', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2592000000, // 30 days
      path: '/',
      sameSite: 'strict',
    })

    // Send it to the user
    res.json()
  } catch (err) {
    next(err)
  }
}

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: 'Valid!' })
  } catch (err) {
    next(err)
  }
}

export default { login, validate }
