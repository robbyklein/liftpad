import { User } from '@prisma/client'
import { Request } from 'express'

export interface RequestWithExtras extends Request {
  user: number
}
