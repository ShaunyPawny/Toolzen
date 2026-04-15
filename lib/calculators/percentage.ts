
export function calculatePercentageOf(value: number, percentage: number) {
  return (value * percentage) / 100
}

export function calculatePercentageIncrease(
  original: number,
  newValue: number
) {
  if (original === 0) return null

  return ((newValue - original) / original) * 100
}