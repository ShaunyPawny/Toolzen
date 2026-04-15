"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  calculatePercentageIncrease,
  calculatePercentageOf,
} from "@/lib/calculators/percentage"

export default function PercentageCalculatorClient() {
  const [mode, setMode] = useState<"of" | "increase">("of")
  const [value, setValue] = useState("200")
  const [percentage, setPercentage] = useState("25")
  const [original, setOriginal] = useState("100")
  const [newValue, setNewValue] = useState("120")

  const result = useMemo(() => {
    if (mode === "of") {
      const parsedValue = Number(value)
      const parsedPercentage = Number(percentage)

      if (
        Number.isNaN(parsedValue) ||
        Number.isNaN(parsedPercentage) ||
        parsedValue < 0
      ) {
        return null
      }

      return calculatePercentageOf(parsedValue, parsedPercentage)
    }

    const parsedOriginal = Number(original)
    const parsedNewValue = Number(newValue)

    if (
      Number.isNaN(parsedOriginal) ||
      Number.isNaN(parsedNewValue) ||
      parsedOriginal < 0 ||
      parsedNewValue < 0
    ) {
      return null
    }

    return calculatePercentageIncrease(parsedOriginal, parsedNewValue)
  }, [mode, value, percentage, original, newValue])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Percentage Calculator"
        description="Work out percentages quickly, including percentage of a number and percentage increase."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={mode === "of" ? "default" : "outline"}
                onClick={() => setMode("of")}
              >
                Percentage Of
              </Button>

              <Button
                type="button"
                variant={mode === "increase" ? "default" : "outline"}
                onClick={() => setMode("increase")}
              >
                Percentage Increase
              </Button>
            </div>

            {mode === "of" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage (%)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    step="0.01"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="Enter percentage"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="original">Original Value</Label>
                  <Input
                    id="original"
                    type="number"
                    min="0"
                    step="0.01"
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    placeholder="Enter original value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newValue">New Value</Label>
                  <Input
                    id="newValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Enter new value"
                  />
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result !== null ? (
              mode === "of" ? (
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-center justify-between gap-4 border-b pb-2">
                    <span className="text-muted-foreground">Calculation</span>
                    <span className="font-medium">
                      {percentage}% of {value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                    <span>Result</span>
                    <span>{result.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-center justify-between gap-4 border-b pb-2">
                    <span className="text-muted-foreground">Original Value</span>
                    <span className="font-medium">{original}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b pb-2">
                    <span className="text-muted-foreground">New Value</span>
                    <span className="font-medium">{newValue}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                    <span>Increase</span>
                    <span>{result.toFixed(2)}%</span>
                  </div>
                </div>
              )
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="percentage-calculator" />

      <ToolContentSection
        heading="How this percentage calculator works"
        intro="This percentage calculator helps you find a percentage of a number or calculate the percentage increase between two values. It is useful for finance, shopping, study, and everyday maths."
        formula="Percentage of a number = value × (percentage ÷ 100)"
        exampleTitle="Example"
        exampleText="If you want to find 25% of 200, the result is 50. If a value rises from 100 to 120, the percentage increase is 20%."
        faqs={[
          {
            question: "How do I calculate a percentage of a number?",
            answer:
              "Multiply the value by the percentage and divide by 100. This calculator does that instantly for you.",
          },
          {
            question: "What is percentage increase?",
            answer:
              "Percentage increase shows how much a value has gone up compared with the original value.",
          },
          {
            question: "Can I use this for discounts and markups?",
            answer:
              "Yes. Percentage calculations are useful for discounts, pay rises, markups, exam scores, and more.",
          },
        ]}
      />
    </div>
  )
}