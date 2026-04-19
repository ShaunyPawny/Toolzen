export function calculateTip(
  billAmount: number,
  tipPercent: number,
  peopleCount: number
) {
  if (billAmount <= 0 || tipPercent < 0 || peopleCount <= 0) {
    return null
  }

  const tipAmount = billAmount * (tipPercent / 100)
  const totalAmount = billAmount + tipAmount
  const perPerson = totalAmount / peopleCount

  return {
    tipAmount,
    totalAmount,
    perPerson,
  }
}