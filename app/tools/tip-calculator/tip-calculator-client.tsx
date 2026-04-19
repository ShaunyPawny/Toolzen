"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateTip } from "@/lib/calculators/tip"
import { formatCurrency } from "@/lib/utils/format"

export default function TipCalculatorClient() {
  const [billAmount, setBillAmount] = useState("80")
  const [tipPercent, setTipPercent] = useState("10")
  const [peopleCount, setPeopleCount] = useState("2")

  const result = useMemo(() => {
    const parsedBillAmount = Number(billAmount)
    const parsedTipPercent = Number(tipPercent)
    const parsedPeopleCount = Number(peopleCount)

    if (
      Number.isNaN(parsedBillAmount) ||
      Number.isNaN(parsedTipPercent) ||
      Number.isNaN(parsedPeopleCount) ||
      parsedBillAmount <= 0 ||
      parsedTipPercent < 0 ||
      parsedPeopleCount <= 0
    ) {
      return null
    }

    return calculateTip(
      parsedBillAmount,
      parsedTipPercent,
      parsedPeopleCount
    )
  }, [billAmount, tipPercent, peopleCount])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Tip Calculator"
        description="Calculate tip, total bill, and split the cost between people."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="billAmount">Bill Amount</Label>
              <Input
                id="billAmount"
                type="number"
                min="0"
                step="0.01"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount"
              />
            </div>

            <div className="space-y-3">
              <Label>Tip Percentage</Label>
              <div className="flex flex-wrap gap-3">
                {[5, 10, 12.5, 15, 20].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={Number(tipPercent) === value ? "default" : "outline"}
                    onClick={() => setTipPercent(String(value))}
                  >
                    {value}%
                  </Button>
                ))}
              </div>

              <Input
                id="tipPercent"
                type="number"
                min="0"
                step="0.1"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                placeholder="Custom tip percentage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peopleCount">Split Between</Label>
              <Input
                id="peopleCount"
                type="number"
                min="1"
                step="1"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                placeholder="Number of people"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Tip Amount</span>
                  <span className="font-medium">
                    {formatCurrency(result.tipAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Total Bill</span>
                  <span className="font-medium">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Per Person</span>
                  <span>{formatCurrency(result.perPerson)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid values to calculate the tip.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="tip-calculator" />

      <ToolContentSection
        heading="How this tip calculator works"
        intro="This calculator helps you work out how much tip to leave, what the total bill will be, and how much each person should pay when splitting the bill."
        formula="Tip = bill amount × tip percentage ÷ 100"
        exampleTitle="Example"
        exampleText="If your bill is £80 and you leave a 10% tip, the tip is £8 and the total becomes £88. Split between 2 people, each person pays £44."
        faqs={[
          {
            question: "Can I split the bill between several people?",
            answer:
              "Yes. Enter the number of people and the calculator will show the total cost per person.",
          },
          {
            question: "Can I use a custom tip percentage?",
            answer:
              "Yes. You can choose a quick preset or type your own tip percentage.",
          },
          {
            question: "Is this useful on mobile?",
            answer:
              "Yes. This calculator is simple and works well on mobile devices when paying at restaurants or cafés.",
          },
        ]}
      />
    </div>
  )
}