export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
) {
  if (
    principal < 0 ||
    monthlyContribution < 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    return null
  }

  const monthlyRate = annualRate / 100 / 12
  const months = years * 12

  let total = principal

  for (let i = 0; i < months; i++) {
    total += monthlyContribution
    total *= 1 + monthlyRate
  }

  const totalContributions = principal + monthlyContribution * months
  const totalInterest = total - totalContributions

  return {
    totalValue: total,
    totalInterest,
    totalContributions,
  }
}