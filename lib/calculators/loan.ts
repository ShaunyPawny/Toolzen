export function calculateLoanRepayment(
  principal: number,
  annualInterestRate: number,
  years: number
) {
  const monthlyRate = annualInterestRate / 100 / 12
  const numberOfPayments = years * 12

  if (principal <= 0 || years <= 0) return null

  if (monthlyRate === 0) {
    const monthlyPayment = principal / numberOfPayments
    const totalRepayment = monthlyPayment * numberOfPayments
    const totalInterest = totalRepayment - principal

    return {
      monthlyPayment,
      totalRepayment,
      totalInterest,
    }
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalRepayment = monthlyPayment * numberOfPayments
  const totalInterest = totalRepayment - principal

  return {
    monthlyPayment,
    totalRepayment,
    totalInterest,
  }
}