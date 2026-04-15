export function calculateSalaryAfterTax(
  annualSalary: number,
  taxRate: number
) {
  if (annualSalary <= 0 || taxRate < 0 || taxRate > 100) return null

  const taxAmount = annualSalary * (taxRate / 100)
  const netAnnualSalary = annualSalary - taxAmount
  const netMonthlySalary = netAnnualSalary / 12

  return {
    taxAmount,
    netAnnualSalary,
    netMonthlySalary,
  }
}