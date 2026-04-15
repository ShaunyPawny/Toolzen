"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateLoanRepayment } from "@/lib/calculators/loan"
import { formatCurrency } from "@/lib/utils/format"

export default function LoanRepaymentCalculatorClient() {
  const [loanAmount, setLoanAmount] = useState("10000")
  const [interestRate, setInterestRate] = useState("6")
  const [loanTerm, setLoanTerm] = useState("5")

  const result = useMemo(() => {
    const parsedLoanAmount = Number(loanAmount)
    const parsedInterestRate = Number(interestRate)
    const parsedLoanTerm = Number(loanTerm)

    if (
      Number.isNaN(parsedLoanAmount) ||
      Number.isNaN(parsedInterestRate) ||
      Number.isNaN(parsedLoanTerm) ||
      parsedLoanAmount <= 0 ||
      parsedInterestRate < 0 ||
      parsedLoanTerm <= 0
    ) {
      return null
    }

    return calculateLoanRepayment(
      parsedLoanAmount,
      parsedInterestRate,
      parsedLoanTerm
    )
  }, [loanAmount, interestRate, loanTerm])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Loan Repayment Calculator"
        description="Calculate monthly loan repayments, total repayment, and total interest."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                min="0"
                step="0.01"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
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
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input
                id="loanTerm"
                type="number"
                min="1"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term in years"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
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
                Enter valid numbers to calculate loan repayments.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="loan-repayment-calculator" />

      <ToolContentSection
        heading="How this loan repayment calculator works"
        intro="This calculator estimates your monthly loan repayment based on the loan amount, annual interest rate, and repayment term. It also shows the total amount repaid and the total interest paid over the life of the loan."
        formula="Monthly repayment = P × r × (1 + r)^n ÷ ((1 + r)^n - 1)"
        exampleTitle="Example"
        exampleText="If you borrow £10,000 over 5 years at 6% annual interest, this calculator estimates the monthly repayment and shows how much interest you will pay overall."
        faqs={[
          {
            question: "What is a loan repayment?",
            answer:
              "A loan repayment is the regular amount you pay back to the lender, usually monthly, including both principal and interest.",
          },
          {
            question: "Does this include interest?",
            answer:
              "Yes. The calculator includes interest and shows the total amount repaid over the full term.",
          },
          {
            question: "Can I use this for personal loans?",
            answer:
              "Yes. It is useful for personal loans, car loans, and other fixed-term borrowing.",
          },
        ]}
      />
    </div>
  )
}