export function calculateMortgage(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  years: number
) {
  const loanAmount = propertyPrice - deposit
  const monthlyRate = annualInterestRate / 100 / 12
  const numberOfPayments = years * 12

  if (
    propertyPrice <= 0 ||
    deposit < 0 ||
    deposit >= propertyPrice ||
    annualInterestRate < 0 ||
    years <= 0
  ) {
    return null
  }

  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / numberOfPayments
    const totalRepayment = monthlyPayment * numberOfPayments
    const totalInterest = totalRepayment - loanAmount

    return {
      loanAmount,
      monthlyPayment,
      totalRepayment,
      totalInterest,
    }
  }

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalRepayment = monthlyPayment * numberOfPayments
  const totalInterest = totalRepayment - loanAmount

  return {
    loanAmount,
    monthlyPayment,
    totalRepayment,
    totalInterest,
  }
}