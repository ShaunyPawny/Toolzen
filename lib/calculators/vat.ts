export function addVAT(amount: number, vatRate: number) {
  const vatAmount = amount * (vatRate / 100)
  const total = amount + vatAmount

  return {
    originalAmount: amount,
    vatRate,
    vatAmount,
    total,
  }
}

export function removeVAT(amountIncludingVAT: number, vatRate: number) {
  const originalAmount = amountIncludingVAT / (1 + vatRate / 100)
  const vatAmount = amountIncludingVAT - originalAmount

  return {
    originalAmount,
    vatRate,
    vatAmount,
    total: amountIncludingVAT,
  }
}