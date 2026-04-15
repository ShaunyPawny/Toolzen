"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateSimpleInterest } from "@/lib/calculators/interest"
import { formatCurrency } from "@/lib/utils/format"

export default function InterestCalculatorClient() {
  const [principal, setPrincipal] = useState("5000")
  const [rate, setRate] = useState("5")
  const [years, setYears] = useState("3")

  const result = useMemo(() => {
    const parsedPrincipal = Number(principal)
    const parsedRate = Number(rate)
    const parsedYears = Number(years)

    if (
      Number.isNaN(parsedPrincipal) ||
      Number.isNaN(parsedRate) ||
      Number.isNaN(parsedYears) ||
      parsedPrincipal <= 0 ||
      parsedRate < 0 ||
      parsedYears <= 0
    ) {
      return null
    }

    return calculateSimpleInterest(parsedPrincipal, parsedRate, parsedYears)
  }, [principal, rate, years])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Interest Calculator"
        description="Calculate simple interest and total amount over time."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount</Label>
              <Input
                id="principal"
                type="number"
                min="0"
                step="0.01"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter annual interest rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Time (Years)</Label>
              <Input
                id="years"
                type="number"
                min="0"
                step="0.01"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Enter number of years"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Interest Earned</span>
                  <span className="font-medium">
                    {formatCurrency(result.interest)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(result.totalAmount)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate interest.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="interest-calculator" />

      <ToolContentSection
        heading="How this interest calculator works"
        intro="This calculator uses simple interest to estimate how much interest builds up over time based on the starting amount, annual rate, and number of years."
        formula="Simple interest = principal × rate × time"
        exampleTitle="Example"
        exampleText="If you invest £5,000 at 5% simple annual interest for 3 years, this calculator shows the interest earned and the final total amount."
        faqs={[
          {
            question: "What is simple interest?",
            answer:
              "Simple interest is calculated only on the original principal, not on previously earned interest.",
          },
          {
            question: "Does this calculate compound interest?",
            answer:
              "No. This version calculates simple interest only.",
          },
          {
            question: "Is this useful for savings and loans?",
            answer:
              "Yes. It can help estimate simple interest for borrowing, lending, or savings scenarios.",
          },
        ]}
      />
    </div>
  )
}