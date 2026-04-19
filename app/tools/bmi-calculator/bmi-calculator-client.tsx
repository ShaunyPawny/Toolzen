"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateBMI } from "@/lib/calculators/bmi"

type HeightMode = "metric" | "imperial"

export default function BMICalculatorClient() {
  const [weight, setWeight] = useState("70")
  const [heightMode, setHeightMode] = useState<HeightMode>("metric")
  const [heightCm, setHeightCm] = useState("175")
  const [heightFeet, setHeightFeet] = useState("5")
  const [heightInches, setHeightInches] = useState("9")

  const result = useMemo(() => {
    const parsedWeight = Number(weight)

    if (Number.isNaN(parsedWeight) || parsedWeight <= 0) {
      return null
    }

    let parsedHeightCm = 0

    if (heightMode === "metric") {
      parsedHeightCm = Number(heightCm)

      if (Number.isNaN(parsedHeightCm) || parsedHeightCm <= 0) {
        return null
      }
    } else {
      const feet = Number(heightFeet)
      const inches = Number(heightInches)

      if (
        Number.isNaN(feet) ||
        Number.isNaN(inches) ||
        feet < 0 ||
        inches < 0
      ) {
        return null
      }

      const totalInches = feet * 12 + inches
      parsedHeightCm = totalInches * 2.54

      if (parsedHeightCm <= 0) {
        return null
      }
    }

    return calculateBMI(parsedWeight, parsedHeightCm)
  }, [weight, heightMode, heightCm, heightFeet, heightInches])

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

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={heightMode === "metric" ? "default" : "outline"}
                onClick={() => setHeightMode("metric")}
              >
                Height in cm
              </Button>

              <Button
                type="button"
                variant={heightMode === "imperial" ? "default" : "outline"}
                onClick={() => setHeightMode("imperial")}
              >
                Height in ft + in
              </Button>
            </div>

            {heightMode === "metric" ? (
              <div className="space-y-2">
                <Label htmlFor="heightCm">Height (cm)</Label>
                <Input
                  id="heightCm"
                  type="number"
                  min="0"
                  step="0.1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Enter height in centimetres"
                />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="heightFeet">Height (ft)</Label>
                  <Input
                    id="heightFeet"
                    type="number"
                    min="0"
                    step="1"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="Feet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heightInches">Height (in)</Label>
                  <Input
                    id="heightInches"
                    type="number"
                    min="0"
                    step="1"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="Inches"
                  />
                </div>
              </div>
            )}
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
            question: "Can I use feet and inches?",
            answer:
              "Yes. This version supports both centimetres and feet with inches.",
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