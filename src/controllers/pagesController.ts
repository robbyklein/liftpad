import { Request, Response } from 'express'
import fs from 'fs'

const index = (req: Request, res: Response) => {
  fs.readFile(__dirname + '/../public/index.html', 'utf8', (err, text) => {
    res.send(text)
  })
}

export default { index }
