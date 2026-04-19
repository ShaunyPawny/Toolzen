"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateTimeDuration } from "@/lib/calculators/time-duration"

export default function TimeDurationCalculatorClient() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:30")
  const [breakMinutes, setBreakMinutes] = useState("30")

  const result = useMemo(() => {
    const parsedBreakMinutes = Number(breakMinutes)

    if (Number.isNaN(parsedBreakMinutes) || parsedBreakMinutes < 0) {
      return null
    }

    return calculateTimeDuration(startTime, endTime, parsedBreakMinutes)
  }, [startTime, endTime, breakMinutes])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Time Duration Calculator"
        description="Calculate the time between two times, with optional break deduction."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakMinutes">Break (minutes)</Label>
              <Input
                id="breakMinutes"
                type="number"
                min="0"
                step="1"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(e.target.value)}
                placeholder="Enter break time in minutes"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Total Time</span>
                  <span className="font-medium">
                    {result.hours}h {result.minutes}m
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Total Minutes</span>
                  <span className="font-medium">{result.totalMinutes} min</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Decimal Hours</span>
                  <span>{result.decimalHours.toFixed(2)} hrs</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid times and break duration.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="time-duration-calculator" />

      <ToolContentSection
        heading="How this time duration calculator works"
        intro="This calculator works out the difference between a start time and end time, then subtracts any break duration you enter. It is useful for work shifts, study sessions, and general time tracking."
        formula="Total duration = end time - start time - break time"
        exampleTitle="Example"
        exampleText="If you start at 09:00, finish at 17:30, and take a 30 minute break, the total worked time is 8 hours."
        faqs={[
          {
            question: "Can I use this for work shifts?",
            answer:
              "Yes. It is ideal for calculating shift duration and break-adjusted working hours.",
          },
          {
            question: "What if the end time is after midnight?",
            answer:
              "This calculator supports overnight durations by treating the end time as the next day when needed.",
          },
          {
            question: "Does it show decimal hours too?",
            answer:
              "Yes. It shows both hours and minutes, plus a decimal-hours result.",
          },
        ]}
      />
    </div>
  )
}