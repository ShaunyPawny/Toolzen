export function calculateBMI(weightKg: number, heightCm: number) {
  if (weightKg <= 0 || heightCm <= 0) return null

  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  let category = ""

  if (bmi < 18.5) {
    category = "Underweight"
  } else if (bmi < 25) {
    category = "Normal weight"
  } else if (bmi < 30) {
    category = "Overweight"
  } else {
    category = "Obese"
  }

  return {
    bmi,
    category,
  }
}