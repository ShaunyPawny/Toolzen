export type Sex = "male" | "female"

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
}

export function calculateCalories(
  sex: Sex,
  age: number,
  weightKg: number,
  heightCm: number,
  activityLevel: ActivityLevel
) {
  if (
    age <= 0 ||
    weightKg <= 0 ||
    heightCm <= 0
  ) {
    return null
  }

  const bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161

  const maintenanceCalories = bmr * activityMultipliers[activityLevel]
  const mildWeightLoss = maintenanceCalories - 300
  const weightGain = maintenanceCalories + 300

  return {
    bmr,
    maintenanceCalories,
    mildWeightLoss,
    weightGain,
  }
}