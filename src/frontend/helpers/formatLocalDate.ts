export default function formatLocalDate(dateInput: any) {
  // Try to convert input to Date object
  let date
  if (dateInput instanceof Date) {
    date = dateInput
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput)
  } else {
    throw new Error('Invalid date input')
  }

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Get date components using local methods (changes made here)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  // Determine day suffix
  let suffix = 'th'
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  }

  return `${months[monthIndex]} ${day}${suffix}, ${year}`
}
