"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateBMI } from "@/lib/calculators/bmi"

export default function BMICalculatorClient() {
  const [weight, setWeight] = useState("70")
  const [height, setHeight] = useState("175")

  const result = useMemo(() => {
    const parsedWeight = Number(weight)
    const parsedHeight = Number(height)

    if (
      Number.isNaN(parsedWeight) ||
      Number.isNaN(parsedHeight) ||
      parsedWeight <= 0 ||
      parsedHeight <= 0
    ) {
      return null
    }

    return calculateBMI(parsedWeight, parsedHeight)
  }, [weight, height])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="BMI Calculator"
        description="Calculate your Body Mass Index using your weight and height."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kilograms"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="0"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in centimetres"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">BMI</span>
                  <span className="font-medium">{result.bmi.toFixed(1)}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Category</span>
                  <span>{result.category}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid weight and height values.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="bmi-calculator" />

      <ToolContentSection
        heading="How this BMI calculator works"
        intro="BMI stands for Body Mass Index. It uses your height and weight to estimate whether your body weight falls within a common health category."
        formula="BMI = weight (kg) ÷ height (m)²"
        exampleTitle="Example"
        exampleText="If someone weighs 70 kg and is 175 cm tall, their BMI is calculated by dividing 70 by 1.75 squared, giving a BMI of about 22.9."
        faqs={[
          {
            question: "What is BMI?",
            answer:
              "BMI is a simple measurement that compares weight to height to estimate body weight category.",
          },
          {
            question: "Is BMI always accurate?",
            answer:
              "BMI is a useful general guide, but it does not account for factors like muscle mass, age, or body composition.",
          },
          {
            question: "Can I use this on mobile?",
            answer:
              "Yes. This calculator is designed to work well on desktop and mobile devices.",
          },
        ]}
      />
    </div>
  )
}