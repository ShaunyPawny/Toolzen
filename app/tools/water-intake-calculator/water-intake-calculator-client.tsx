"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  calculateWaterIntake,
  type WaterActivityLevel,
} from "@/lib/calculators/water-intake"

type WeightMode = "metric" | "imperial"

export default function WaterIntakeCalculatorClient() {
  const [weightMode, setWeightMode] = useState<WeightMode>("metric")
  const [weightKg, setWeightKg] = useState("70")
  const [weightStone, setWeightStone] = useState("11")
  const [weightPounds, setWeightPounds] = useState("0")
  const [activityLevel, setActivityLevel] =
    useState<WaterActivityLevel>("moderate")

  const result = useMemo(() => {
    let parsedWeightKg = 0

    if (weightMode === "metric") {
      parsedWeightKg = Number(weightKg)

      if (Number.isNaN(parsedWeightKg) || parsedWeightKg <= 0) {
        return null
      }
    } else {
      const stone = Number(weightStone)
      const pounds = Number(weightPounds)

      if (
        Number.isNaN(stone) ||
        Number.isNaN(pounds) ||
        stone < 0 ||
        pounds < 0
      ) {
        return null
      }

      const totalPounds = stone * 14 + pounds
      parsedWeightKg = totalPounds * 0.45359237

      if (parsedWeightKg <= 0) {
        return null
      }
    }

    return calculateWaterIntake(parsedWeightKg, activityLevel)
  }, [weightMode, weightKg, weightStone, weightPounds, activityLevel])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Water Intake Calculator"
        description="Estimate your recommended daily water intake based on body weight and activity level."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-3">
              <Label>Weight Unit</Label>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant={weightMode === "metric" ? "default" : "outline"}
                  onClick={() => setWeightMode("metric")}
                >
                  Weight in kg
                </Button>

                <Button
                  type="button"
                  variant={weightMode === "imperial" ? "default" : "outline"}
                  onClick={() => setWeightMode("imperial")}
                >
                  Weight in st + lb
                </Button>
              </div>
            </div>

            {weightMode === "metric" ? (
              <div className="space-y-2">
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input
                  id="weightKg"
                  type="number"
                  min="0"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Enter weight in kilograms"
                />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weightStone">Weight (st)</Label>
                  <Input
                    id="weightStone"
                    type="number"
                    min="0"
                    step="1"
                    value={weightStone}
                    onChange={(e) => setWeightStone(e.target.value)}
                    placeholder="Stone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightPounds">Weight (lb)</Label>
                  <Input
                    id="weightPounds"
                    type="number"
                    min="0"
                    step="1"
                    value={weightPounds}
                    onChange={(e) => setWeightPounds(e.target.value)}
                    placeholder="Pounds"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label>Activity Level</Label>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant={activityLevel === "low" ? "default" : "outline"}
                  onClick={() => setActivityLevel("low")}
                >
                  Low
                </Button>

                <Button
                  type="button"
                  variant={activityLevel === "moderate" ? "default" : "outline"}
                  onClick={() => setActivityLevel("moderate")}
                >
                  Moderate
                </Button>

                <Button
                  type="button"
                  variant={activityLevel === "high" ? "default" : "outline"}
                  onClick={() => setActivityLevel("high")}
                >
                  High
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Daily Water Intake</span>
                  <span className="font-medium">
                    {result.totalLitres.toFixed(2)} litres
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>{Math.round(result.totalMl)} ml</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid values to calculate your water intake.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="water-intake-calculator" />

      <ToolContentSection
        heading="How this water intake calculator works"
        intro="This calculator estimates your daily water intake using your body weight and a simple activity adjustment. It gives a practical daily target rather than a strict medical recommendation."
        formula="Water intake ≈ body weight × 35 ml, plus extra for activity"
        exampleTitle="Example"
        exampleText="A person weighing 70 kg with moderate activity may need around 2.95 litres of water per day based on this formula."
        faqs={[
          {
            question: "Can I use stone and pounds?",
            answer:
              "Yes. This calculator supports both kilograms and stone with pounds.",
          },
          {
            question: "Does activity level affect water needs?",
            answer:
              "Yes. More activity generally means higher fluid needs, especially if you sweat more.",
          },
          {
            question: "Is this a medical recommendation?",
            answer:
              "No. It is a general estimate designed to be practical and easy to use.",
          },
        ]}
      />
    </div>
  )
}