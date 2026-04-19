"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  calculateCalories,
  type ActivityLevel,
  type Sex,
} from "@/lib/calculators/calories"

export default function CalorieCalculatorClient() {
  const [sex, setSex] = useState<Sex>("male")
  const [age, setAge] = useState("30")
  const [weight, setWeight] = useState("70")
  const [height, setHeight] = useState("175")
  const [activityLevel, setActivityLevel] =
    useState<ActivityLevel>("moderate")

  const result = useMemo(() => {
    const parsedAge = Number(age)
    const parsedWeight = Number(weight)
    const parsedHeight = Number(height)

    if (
      Number.isNaN(parsedAge) ||
      Number.isNaN(parsedWeight) ||
      Number.isNaN(parsedHeight) ||
      parsedAge <= 0 ||
      parsedWeight <= 0 ||
      parsedHeight <= 0
    ) {
      return null
    }

    return calculateCalories(
      sex,
      parsedAge,
      parsedWeight,
      parsedHeight,
      activityLevel
    )
  }, [sex, age, weight, height, activityLevel])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Calorie Calculator"
        description="Estimate daily calorie needs based on age, sex, weight, height, and activity level."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={sex === "male" ? "default" : "outline"}
                onClick={() => setSex("male")}
              >
                Male
              </Button>
              <Button
                type="button"
                variant={sex === "female" ? "default" : "outline"}
                onClick={() => setSex("female")}
              >
                Female
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                step="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
              />
            </div>

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

            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select
                value={activityLevel}
                onValueChange={(value) =>
                  setActivityLevel(value as ActivityLevel)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Lightly active</SelectItem>
                  <SelectItem value="moderate">Moderately active</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">BMR</span>
                  <span className="font-medium">
                    {Math.round(result.bmr)} kcal/day
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Maintenance</span>
                  <span className="font-medium">
                    {Math.round(result.maintenanceCalories)} kcal/day
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Mild Weight Loss</span>
                  <span className="font-medium">
                    {Math.round(result.mildWeightLoss)} kcal/day
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Weight Gain</span>
                  <span>{Math.round(result.weightGain)} kcal/day</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid values to calculate calorie needs.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="calorie-calculator" />

      <ToolContentSection
        heading="How this calorie calculator works"
        intro="This calculator estimates your basal metabolic rate and daily calorie needs using common formulas based on sex, age, weight, height, and activity level."
        formula="Calories needed = BMR × activity factor"
        exampleTitle="Example"
        exampleText="A moderately active adult needs more daily calories than a sedentary adult of the same height and weight because activity increases total energy use."
        faqs={[
          {
            question: "What is BMR?",
            answer:
              "BMR stands for Basal Metabolic Rate. It estimates how many calories your body needs at rest.",
          },
          {
            question: "Is this an exact calorie target?",
            answer:
              "No. It is an estimate, but it is a useful starting point for planning nutrition goals.",
          },
          {
            question: "Can I use this for weight loss or gain?",
            answer:
              "Yes. The calculator gives estimated maintenance, weight loss, and weight gain calorie targets.",
          },
        ]}
      />
    </div>
  )
}