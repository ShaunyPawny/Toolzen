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
  convertUnit,
  unitOptions,
  type ConversionCategory,
} from "@/lib/calculators/unit-converter"

export default function UnitConverterClient() {
  const [category, setCategory] = useState<ConversionCategory>("length")
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("ft")

  const units = unitOptions[category]

  const result = useMemo(() => {
    const parsedValue = Number(value)

    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      return null
    }

    return convertUnit(category, parsedValue, fromUnit, toUnit)
  }, [category, value, fromUnit, toUnit])

  function handleCategoryChange(nextCategory: ConversionCategory) {
    setCategory(nextCategory)

    if (nextCategory === "length") {
      setFromUnit("m")
      setToUnit("ft")
    } else {
      setFromUnit("kg")
      setToUnit("lb")
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Unit Converter"
        description="Convert between common length and weight units quickly and easily."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={category === "length" ? "default" : "outline"}
                onClick={() => handleCategoryChange("length")}
              >
                Length
              </Button>

              <Button
                type="button"
                variant={category === "weight" ? "default" : "outline"}
                onClick={() => handleCategoryChange("weight")}
              >
                Weight
              </Button>
            </div>

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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result !== null ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">{category}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Input</span>
                  <span className="font-medium">
                    {value} {fromUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Converted Value</span>
                  <span>
                    {result.toFixed(4)} {toUnit}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter a valid value to convert units.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="unit-converter" />

      <ToolContentSection
        heading="How this unit converter works"
        intro="This unit converter helps you convert between common length and weight units. It first converts the input into a base unit, then converts that base value into your chosen target unit."
        formula="Converted value = input × from factor ÷ to factor"
        exampleTitle="Example"
        exampleText="If you convert 1 metre to feet, the calculator first uses metres as the base unit and then converts the result into feet."
        faqs={[
          {
            question: "What units can I convert?",
            answer:
              "This version supports common length units like metres and feet, and weight units like kilograms and pounds.",
          },
          {
            question: "Can I switch between categories?",
            answer:
              "Yes. You can switch between length and weight using the buttons at the top of the calculator.",
          },
          {
            question: "Will more units be added later?",
            answer:
              "Yes. You can expand this tool later with temperature, area, volume, and speed conversions.",
          },
        ]}
      />
    </div>
  )
}