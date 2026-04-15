"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateMortgage } from "@/lib/calculators/mortgage"
import { formatCurrency } from "@/lib/utils/format"

export default function MortgageCalculatorClient() {
  const [propertyPrice, setPropertyPrice] = useState("250000")
  const [deposit, setDeposit] = useState("50000")
  const [interestRate, setInterestRate] = useState("5")
  const [mortgageTerm, setMortgageTerm] = useState("25")

  const result = useMemo(() => {
    const parsedPropertyPrice = Number(propertyPrice)
    const parsedDeposit = Number(deposit)
    const parsedInterestRate = Number(interestRate)
    const parsedMortgageTerm = Number(mortgageTerm)

    if (
      Number.isNaN(parsedPropertyPrice) ||
      Number.isNaN(parsedDeposit) ||
      Number.isNaN(parsedInterestRate) ||
      Number.isNaN(parsedMortgageTerm) ||
      parsedPropertyPrice <= 0 ||
      parsedDeposit < 0 ||
      parsedDeposit >= parsedPropertyPrice ||
      parsedInterestRate < 0 ||
      parsedMortgageTerm <= 0
    ) {
      return null
    }

    return calculateMortgage(
      parsedPropertyPrice,
      parsedDeposit,
      parsedInterestRate,
      parsedMortgageTerm
    )
  }, [propertyPrice, deposit, interestRate, mortgageTerm])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Mortgage Calculator"
        description="Estimate your mortgage loan amount, monthly payments, total repayment, and total interest."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="propertyPrice">Property Price</Label>
              <Input
                id="propertyPrice"
                type="number"
                min="0"
                step="0.01"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                placeholder="Enter property price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit</Label>
              <Input
                id="deposit"
                type="number"
                min="0"
                step="0.01"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Enter deposit amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter annual interest rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgageTerm">Mortgage Term (Years)</Label>
              <Input
                id="mortgageTerm"
                type="number"
                min="1"
                step="1"
                value={mortgageTerm}
                onChange={(e) => setMortgageTerm(e.target.value)}
                placeholder="Enter mortgage term in years"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="font-medium">
                    {formatCurrency(result.loanAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Monthly Payment</span>
                  <span className="font-medium">
                    {formatCurrency(result.monthlyPayment)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-medium">
                    {formatCurrency(result.totalRepayment)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Total Interest</span>
                  <span>{formatCurrency(result.totalInterest)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate your mortgage.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="mortgage-calculator" />

      <ToolContentSection
        heading="How this mortgage calculator works"
        intro="This mortgage calculator estimates how much you may borrow and repay based on the property price, deposit, interest rate, and mortgage term. It helps you understand monthly costs and the overall cost of borrowing."
        formula="Monthly repayment = P × r × (1 + r)^n ÷ ((1 + r)^n - 1)"
        exampleTitle="Example"
        exampleText="If a property costs £250,000, your deposit is £50,000, the interest rate is 5%, and the term is 25 years, this calculator estimates the monthly payment and total mortgage cost."
        faqs={[
          {
            question: "What is the loan amount?",
            answer:
              "The loan amount is the property price minus your deposit. This is the amount you borrow from the lender.",
          },
          {
            question: "Does this include interest?",
            answer:
              "Yes. The monthly payment and total repayment include interest based on the rate you enter.",
          },
          {
            question: "Can I use this for UK mortgages?",
            answer:
              "Yes. This is especially useful for estimating mortgage payments for UK property purchases.",
          },
        ]}
      />
    </div>
  )
}