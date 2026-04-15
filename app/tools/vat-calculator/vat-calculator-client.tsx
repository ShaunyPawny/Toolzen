"use client"

import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { useMemo, useState } from "react"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addVAT, removeVAT } from "@/lib/calculators/vat"
import { formatCurrency } from "@/lib/utils/format"



export default function VATCalculatorClient() {
  const [amount, setAmount] = useState("100")
  const [vatRate, setVatRate] = useState("20")
  const [mode, setMode] = useState<"add" | "remove">("add")

  const parsedAmount = Number(amount)
  const parsedVatRate = Number(vatRate)

  const result = useMemo(() => {
    if (
      Number.isNaN(parsedAmount) ||
      Number.isNaN(parsedVatRate) ||
      parsedAmount < 0 ||
      parsedVatRate < 0
    ) {
      return null
    }

    return mode === "add"
      ? addVAT(parsedAmount, parsedVatRate)
      : removeVAT(parsedAmount, parsedVatRate)
  }, [parsedAmount, parsedVatRate, mode])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
    <CalculatorShell
      title="VAT Calculator"
      description="Quickly add or remove VAT from any amount. Great for UK pricing, invoices, and everyday calculations."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount">
              {mode === "add" ? "Amount (excluding VAT)" : "Amount (including VAT)"}
            </Label>
            <Input
              id="amount"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vatRate">VAT Rate (%)</Label>
            <Input
              id="vatRate"
              min="0"
              step="0.01"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="Enter VAT rate"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={mode === "add" ? "default" : "outline"}
              onClick={() => setMode("add")}
            >
              Add VAT
            </Button>

            <Button
              type="button"
              variant={mode === "remove" ? "default" : "outline"}
              onClick={() => setMode("remove")}
            >
              Remove VAT
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-muted/30 p-5">
          <h2 className="mb-4 text-xl font-semibold">Results</h2>

          {result ? (
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-center justify-between gap-4 border-b pb-2">
                <span className="text-muted-foreground">Original Amount</span>
                <span className="font-medium">
                  {formatCurrency(result.originalAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b pb-2">
                <span className="text-muted-foreground">VAT Rate</span>
                <span className="font-medium">{result.vatRate}%</span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b pb-2">
                <span className="text-muted-foreground">VAT Amount</span>
                <span className="font-medium">
                  {formatCurrency(result.vatAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(result.total)}</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Enter valid numbers to calculate VAT.
            </p>
          )}
        </div>
      </div>
    </CalculatorShell>

    <RelatedTools currentSlug="vat-calculator" />

    <ToolContentSection
  heading="How this VAT calculator works"
  intro="This VAT calculator helps you either add VAT to a price or remove VAT from a VAT-inclusive total. It is useful for invoices, pricing, and checking how much VAT is included in a final amount."
  formula="VAT amount = net amount × (VAT rate ÷ 100)"
  exampleTitle="Example"
  exampleText="If a product costs £100 excluding VAT and the VAT rate is 20%, the VAT amount is £20 and the total including VAT is £120."
  faqs={[
    {
      question: "What is VAT?",
      answer:
        "VAT stands for Value Added Tax. It is a consumption tax added to many goods and services.",
    },
    {
      question: "Can I remove VAT from a total price?",
      answer:
        "Yes. Use the remove VAT option to estimate the original net amount and the VAT portion from a VAT-inclusive total.",
    },
    {
      question: "Is this useful for UK pricing?",
      answer:
        "Yes. This calculator is especially useful for UK users, where VAT is commonly applied to products and services.",
    },
  ]}
/>
    </div>
  )
}