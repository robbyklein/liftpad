export default function formatDateForInput(timestamp: string): string {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
