import { buildMetadata } from "@/lib/seo"
import DiscountCalculatorClient from "./discount-calculator-client"

export const metadata = buildMetadata({
  title: "Discount Calculator",
  description:
    "Calculate discounts and final prices instantly. Perfect for sales, shopping, and savings.",
  path: "/tools/discount-calculator",
})

export default function Page() {
  return <DiscountCalculatorClient />
}