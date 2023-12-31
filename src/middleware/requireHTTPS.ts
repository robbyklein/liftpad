import { NextFunction, Request, Response } from 'express'

export default function requireHTTPS(req: Request, res: Response, next: NextFunction) {
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}
