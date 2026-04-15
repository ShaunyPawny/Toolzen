"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { removeVAT } from "@/lib/calculators/vat"
import { formatCurrency } from "@/lib/utils/format"

export default function ReverseVATCalculatorClient() {
  const [grossAmount, setGrossAmount] = useState("120")
  const [vatRate, setVatRate] = useState("20")

  const result = useMemo(() => {
    const parsedGrossAmount = Number(grossAmount)
    const parsedVatRate = Number(vatRate)

    if (
      Number.isNaN(parsedGrossAmount) ||
      Number.isNaN(parsedVatRate) ||
      parsedGrossAmount < 0 ||
      parsedVatRate < 0
    ) {
      return null
    }

    return removeVAT(parsedGrossAmount, parsedVatRate)
  }, [grossAmount, vatRate])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Reverse VAT Calculator"
        description="Remove VAT from a total amount and see the net amount and VAT portion instantly."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="grossAmount">Amount Including VAT</Label>
              <Input
                id="grossAmount"
                type="number"
                min="0"
                step="0.01"
                value={grossAmount}
                onChange={(e) => setGrossAmount(e.target.value)}
                placeholder="Enter amount including VAT"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatRate">VAT Rate (%)</Label>
              <Input
                id="vatRate"
                type="number"
                min="0"
                step="0.01"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                placeholder="Enter VAT rate"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Net Amount</span>
                  <span className="font-medium">
                    {formatCurrency(result.originalAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">VAT Amount</span>
                  <span className="font-medium">
                    {formatCurrency(result.vatAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Total Including VAT</span>
                  <span>{formatCurrency(result.total)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to reverse VAT.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="reverse-vat-calculator" />

      <ToolContentSection
        heading="How this reverse VAT calculator works"
        intro="A reverse VAT calculator helps you remove VAT from a VAT-inclusive total. This is useful when you know the final amount paid and want to see how much of it is the original price and how much is VAT."
        formula="Net amount = gross amount ÷ (1 + VAT rate ÷ 100)"
        exampleTitle="Example"
        exampleText="If the total including VAT is £120 and the VAT rate is 20%, the net amount is £100 and the VAT portion is £20."
        faqs={[
          {
            question: "What is reverse VAT?",
            answer:
              "Reverse VAT means removing VAT from a VAT-inclusive total to find the original net amount before tax.",
          },
          {
            question: "Why would I need this?",
            answer:
              "It is useful for invoices, bookkeeping, receipts, and checking how much VAT was included in a final payment.",
          },
          {
            question: "Is this useful for UK VAT?",
            answer:
              "Yes. It is especially helpful for UK users dealing with standard VAT calculations.",
          },
        ]}
      />
    </div>
  )
}