export function calculateIdealWeightRange(heightCm: number) {
  if (heightCm <= 0) return null

  const heightM = heightCm / 100

  const minWeight = 18.5 * heightM * heightM
  const maxWeight = 24.9 * heightM * heightM

  return {
    minWeight,
    maxWeight,
  }
}