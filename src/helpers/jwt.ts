import jwt from 'jsonwebtoken'

const create = (sub: number) => {
  return jwt.sign({ sub }, process.env.JWT_SECRET || '')
}

const decode = (token: string) => {
  return jwt.verify(token || '', process.env.JWT_SECRET || '')
}

export default {
  create,
  decode,
}
