export function calculateTimeDuration(
  startTime: string,
  endTime: string,
  breakMinutes: number
) {
  if (!startTime || !endTime || breakMinutes < 0) return null

  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  if (
    Number.isNaN(startHour) ||
    Number.isNaN(startMinute) ||
    Number.isNaN(endHour) ||
    Number.isNaN(endMinute)
  ) {
    return null
  }

  let startTotalMinutes = startHour * 60 + startMinute
  let endTotalMinutes = endHour * 60 + endMinute

  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60
  }

  const totalMinutes = endTotalMinutes - startTotalMinutes - breakMinutes

  if (totalMinutes < 0) return null

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const decimalHours = totalMinutes / 60

  return {
    totalMinutes,
    hours,
    minutes,
    decimalHours,
  }
}