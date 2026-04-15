"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest"
import { formatCurrency } from "@/lib/utils/format"

export default function CompoundInterestCalculatorClient() {
  const [principal, setPrincipal] = useState("1000")
  const [monthlyContribution, setMonthlyContribution] = useState("100")
  const [rate, setRate] = useState("5")
  const [years, setYears] = useState("10")

  const result = useMemo(() => {
    const p = Number(principal)
    const m = Number(monthlyContribution)
    const r = Number(rate)
    const y = Number(years)

    if (
      Number.isNaN(p) ||
      Number.isNaN(m) ||
      Number.isNaN(r) ||
      Number.isNaN(y) ||
      y <= 0
    ) {
      return null
    }

    return calculateCompoundInterest(p, m, r, y)
  }, [principal, monthlyContribution, rate, years])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Compound Interest Calculator"
        description="Estimate investment growth with compound interest and monthly contributions."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Initial Investment</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Years</Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Total Value</span>
                  <span>{formatCurrency(result.totalValue)}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Total Contributions</span>
                  <span>{formatCurrency(result.totalContributions)}</span>
                </div>

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Interest</span>
                  <span>{formatCurrency(result.totalInterest)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="compound-interest-calculator" />

      <ToolContentSection
        heading="How compound interest works"
        intro="Compound interest allows your money to grow faster because you earn interest on both your initial investment and previously earned interest."
        formula="A = P (1 + r/n)^(nt)"
        exampleTitle="Example"
        exampleText="If you invest £1,000 with £100 monthly contributions at 5% interest for 10 years, your total value grows significantly due to compounding."
        faqs={[
          {
            question: "What is compound interest?",
            answer:
              "Compound interest means earning interest on both your original money and accumulated interest.",
          },
          {
            question: "Why is it powerful?",
            answer:
              "Because growth accelerates over time, especially with regular contributions.",
          },
        ]}
      />
    </div>
  )
}