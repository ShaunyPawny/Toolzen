"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateIdealWeightRange } from "@/lib/calculators/ideal-weight"

type HeightMode = "metric" | "imperial"

export default function IdealWeightCalculatorClient() {
  const [heightMode, setHeightMode] = useState<HeightMode>("metric")
  const [heightCm, setHeightCm] = useState("175")
  const [heightFeet, setHeightFeet] = useState("5")
  const [heightInches, setHeightInches] = useState("9")

  const result = useMemo(() => {
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

    return calculateIdealWeightRange(parsedHeightCm)
  }, [heightMode, heightCm, heightFeet, heightInches])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Ideal Weight Calculator"
        description="Estimate a healthy weight range based on your height."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-3">
              <Label>Height Unit</Label>
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
                  <span className="text-muted-foreground">Healthy Weight Range</span>
                  <span className="font-medium">
                    {result.minWeight.toFixed(1)} kg - {result.maxWeight.toFixed(1)} kg
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter a valid height to calculate your ideal weight range.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="ideal-weight-calculator" />

      <ToolContentSection
        heading="How this ideal weight calculator works"
        intro="This calculator estimates a healthy weight range based on height using the commonly used healthy BMI range. It provides a simple guide rather than a strict target."
        formula="Healthy weight range = BMI range × height (m)²"
        exampleTitle="Example"
        exampleText="If someone is 175 cm tall, this calculator estimates the weight range associated with a healthy BMI between 18.5 and 24.9."
        faqs={[
          {
            question: "What does ideal weight mean?",
            answer:
              "In this calculator, ideal weight means a weight range associated with a healthy BMI for your height.",
          },
          {
            question: "Can I use feet and inches?",
            answer:
              "Yes. You can enter height in either centimetres or feet with inches.",
          },
          {
            question: "Is this an exact target?",
            answer:
              "No. It is a useful general guide, but factors like muscle mass and body composition also matter.",
          },
        ]}
      />
    </div>
  )
}