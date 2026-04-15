"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateSalaryAfterTax } from "@/lib/calculators/salary"
import { formatCurrency } from "@/lib/utils/format"

export default function SalaryCalculatorClient() {
  const [annualSalary, setAnnualSalary] = useState("35000")
  const [taxRate, setTaxRate] = useState("20")

  const result = useMemo(() => {
    const parsedAnnualSalary = Number(annualSalary)
    const parsedTaxRate = Number(taxRate)

    if (
      Number.isNaN(parsedAnnualSalary) ||
      Number.isNaN(parsedTaxRate) ||
      parsedAnnualSalary <= 0 ||
      parsedTaxRate < 0 ||
      parsedTaxRate > 100
    ) {
      return null
    }

    return calculateSalaryAfterTax(parsedAnnualSalary, parsedTaxRate)
  }, [annualSalary, taxRate])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Salary Calculator"
        description="Estimate tax, annual take-home pay, and monthly net salary from your gross salary."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="annualSalary">Annual Salary</Label>
              <Input
                id="annualSalary"
                type="number"
                min="0"
                step="0.01"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                placeholder="Enter annual salary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="Enter tax rate"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Tax Amount</span>
                  <span className="font-medium">
                    {formatCurrency(result.taxAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Net Annual Salary</span>
                  <span className="font-medium">
                    {formatCurrency(result.netAnnualSalary)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Net Monthly Salary</span>
                  <span>{formatCurrency(result.netMonthlySalary)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate your salary after tax.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="salary-calculator" />

      <ToolContentSection
        heading="How this salary calculator works"
        intro="This salary calculator estimates how much tax you pay, your take-home annual salary, and your monthly net salary based on a gross annual salary and a tax rate."
        formula="Net salary = annual salary - (annual salary × tax rate ÷ 100)"
        exampleTitle="Example"
        exampleText="If your salary is £35,000 and your tax rate is 20%, your estimated tax is £7,000, your net annual salary is £28,000, and your monthly take-home pay is about £2,333.33."
        faqs={[
          {
            question: "Does this calculate exact UK tax bands?",
            answer:
              "No. This version is a simple calculator using a single tax rate. It is designed as an easy estimate.",
          },
          {
            question: "Can I use this to estimate monthly take-home pay?",
            answer:
              "Yes. It divides your estimated net annual salary by 12 to show a monthly amount.",
          },
          {
            question: "Will this be upgraded later?",
            answer:
              "Yes. You can later add proper UK tax bands, National Insurance, pension deductions, and more.",
          },
        ]}
      />
    </div>
  )
}