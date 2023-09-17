export default function createTimestamp(date?: Date) {
  if (!date) {
    date = new Date() // This already uses the current local date and time
  }
  // Convert to UTC midnight
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}T00:00:00.000Z`
}
