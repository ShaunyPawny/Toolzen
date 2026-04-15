"use client"

import { ToolContentSection } from "@/components/tool-content-section"
import { useMemo, useState } from "react"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { RelatedTools } from "@/components/related-tools"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateAge } from "@/lib/calculators/date"

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01")

  const result = useMemo(() => {
    if (!dateOfBirth) return null
    return calculateAge(dateOfBirth)
  }, [dateOfBirth])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Age Calculator"
        description="Calculate exact age in years, months, and days from a date of birth."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Years</span>
                  <span className="font-medium">{result.years}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Months</span>
                  <span className="font-medium">{result.months}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Days</span>
                  <span>{result.days}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select a valid date to calculate age.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="age-calculator" />

      <ToolContentSection
  heading="How this age calculator works"
  intro="This age calculator works out the exact difference between a date of birth and today’s date. It shows the result in years, months, and days."
  exampleTitle="Example"
  exampleText="If someone was born on 1 January 2000, the calculator measures the time from that date up to today and shows the exact age."
  faqs={[
    {
      question: "Does this calculate exact age?",
      answer:
        "Yes. It calculates age in years, months, and days based on the date you enter.",
    },
    {
      question: "Can I use this for birthdays?",
      answer:
        "Yes. It is useful for checking ages for birthdays, forms, applications, and general curiosity.",
    },
    {
      question: "Does the result change daily?",
      answer:
        "Yes. Since age depends on the current date, the result updates as time passes.",
    },
  ]}
/>
    </div>
  )
}