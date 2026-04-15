export function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth)
  const today = new Date()

  if (Number.isNaN(birthDate.getTime())) return null

  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months -= 1
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += previousMonth.getDate()
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

export function calculateDaysBetween(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null

  const differenceInTime = end.getTime() - start.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

  return differenceInDays
}