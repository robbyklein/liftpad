export default function createExpiresDate(days = 7) {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)

  return expires
}
