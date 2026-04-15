"use client"

import { ToolContentSection } from "@/components/tool-content-section"
import { useMemo, useState } from "react"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { RelatedTools } from "@/components/related-tools"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateDaysBetween } from "@/lib/calculators/date"

export default function DaysBetweenDatesPage() {
  const [startDate, setStartDate] = useState("2025-01-01")
  const [endDate, setEndDate] = useState("2025-12-31")

  const result = useMemo(() => {
    if (!startDate || !endDate) return null
    return calculateDaysBetween(startDate, endDate)
  }, [startDate, endDate])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Days Between Dates Calculator"
        description="Calculate the number of days between two dates quickly and easily."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result !== null ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{startDate}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{endDate}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Total Days</span>
                  <span>{result}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select two valid dates to calculate the difference.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="days-between-dates" />

      <ToolContentSection
  heading="How this days between dates calculator works"
  intro="This calculator finds the number of days between two dates. It is useful for planning events, counting deadlines, and measuring time periods."
  exampleTitle="Example"
  exampleText="If your start date is 1 January and your end date is 31 January, the calculator works out the total number of days between those dates."
  faqs={[
    {
      question: "Can I use this to count down to an event?",
      answer:
        "Yes. It is useful for holidays, birthdays, deadlines, and project planning.",
    },
    {
      question: "Does it work for past dates too?",
      answer:
        "Yes. You can compare both past and future dates.",
    },
    {
      question: "Why is this useful?",
      answer:
        "It helps with planning, scheduling, contracts, bookings, and understanding time gaps clearly.",
    },
  ]}
/>
    </div>
  )
}