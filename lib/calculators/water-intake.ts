export type WaterActivityLevel = "low" | "moderate" | "high"

export function calculateWaterIntake(
  weightKg: number,
  activityLevel: WaterActivityLevel
) {
  if (weightKg <= 0) return null

  const baseMl = weightKg * 35

  let extraMl = 0

  if (activityLevel === "moderate") {
    extraMl = 500
  } else if (activityLevel === "high") {
    extraMl = 1000
  }

  const totalMl = baseMl + extraMl
  const totalLitres = totalMl / 1000

  return {
    totalMl,
    totalLitres,
  }
}