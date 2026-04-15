export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  years: number
) {
  if (principal <= 0 || annualRate < 0 || years <= 0) return null

  const interest = principal * (annualRate / 100) * years
  const totalAmount = principal + interest

  return {
    interest,
    totalAmount,
  }
}