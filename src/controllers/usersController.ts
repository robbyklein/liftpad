import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express' // Import NextFunction
import validateEmail from '../helpers/validateEmail'
import validatePassword from '../helpers/validatePassword' // New utility function
import prisma from '../initializers/prisma'
import { v4 as uuidv4 } from 'uuid'
import createExpiresDate from '../helpers/createExpiresDate'
import sendConfirmationEmail from '../helpers/sendConfirmationEmail'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate incoming data
    const { email, password } = req.body

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email.')
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be 8+ characters with a symbol and capital letter.')
    }

    // Create a user
    const passwordHash = await bcrypt.hash(password, 8) // Asynchronous
    const emailToken = uuidv4()
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        emailToken,
        emailTokenExpires: createExpiresDate(),
      },
    })

    // Send a confirm email
    await sendConfirmationEmail(user.email, emailToken)

    // Respond with token
    res.status(201).json({}) // 201 Created
  } catch (err) {
    next(err)
  }
}

const confirm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate incoming data
    const { emailToken } = req.params

    if (!emailToken) {
      throw new Error('Invalid url.')
    }

    // Find the user
    const user = await prisma.user.findFirst({
      where: {
        emailToken,
      },
    })

    if (!user) {
      throw new Error('Invalid url.')
    }

    // Activate
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        confirmedAt: new Date(),
        emailToken: null,
        emailTokenExpires: null,
      },
    })

    res.redirect('/login?confirm-success')
  } catch (err) {
    next(err)
  }
}

export default { create, confirm }
