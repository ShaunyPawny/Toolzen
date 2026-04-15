"use client"

import { useMemo, useState } from "react"
import { RelatedTools } from "@/components/related-tools"
import { ToolContentSection } from "@/components/tool-content-section"
import { CalculatorShell } from "@/components/calculator/calculator-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateDiscount } from "@/lib/calculators/discount"
import { formatCurrency } from "@/lib/utils/format"

export default function DiscountCalculatorClient() {
  const [originalPrice, setOriginalPrice] = useState("100")
  const [discountPercent, setDiscountPercent] = useState("20")

  const result = useMemo(() => {
    const parsedOriginalPrice = Number(originalPrice)
    const parsedDiscountPercent = Number(discountPercent)

    if (
      Number.isNaN(parsedOriginalPrice) ||
      Number.isNaN(parsedDiscountPercent) ||
      parsedOriginalPrice < 0 ||
      parsedDiscountPercent < 0
    ) {
      return null
    }

    return calculateDiscount(parsedOriginalPrice, parsedDiscountPercent)
  }, [originalPrice, discountPercent])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CalculatorShell
        title="Discount Calculator"
        description="Quickly calculate discount amounts and final sale prices."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                type="number"
                min="0"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter original price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercent">Discount (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                min="0"
                step="0.01"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="Enter discount percentage"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>

            {result ? (
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Original Price</span>
                  <span className="font-medium">
                    {formatCurrency(result.originalPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium">{result.discountPercent}%</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b pb-2">
                  <span className="text-muted-foreground">You Save</span>
                  <span className="font-medium">
                    {formatCurrency(result.discountAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 text-lg font-semibold">
                  <span>Final Price</span>
                  <span>{formatCurrency(result.finalPrice)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid numbers to calculate the discount.
              </p>
            )}
          </div>
        </div>
      </CalculatorShell>

      <RelatedTools currentSlug="discount-calculator" />

      <ToolContentSection
        heading="How this discount calculator works"
        intro="This discount calculator helps you work out how much money you save and what the final price will be after a percentage discount. It is useful for shopping, promotions, and sale prices."
        formula="Discount amount = original price × (discount ÷ 100)"
        exampleTitle="Example"
        exampleText="If an item costs £100 and the discount is 20%, you save £20 and the final price becomes £80."
        faqs={[
          {
            question: "How do I calculate a sale price?",
            answer:
              "Take the original price, calculate the discount amount, and subtract it from the original price.",
          },
          {
            question: "Can I use this for shopping discounts?",
            answer:
              "Yes. This calculator is ideal for checking sale prices, offers, and percentage-off promotions.",
          },
          {
            question: "Does it show how much I save?",
            answer:
              "Yes. It shows both the amount saved and the final price after discount.",
          },
        ]}
      />
    </div>
  )
}