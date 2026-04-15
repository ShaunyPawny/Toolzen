import { buildMetadata } from "@/lib/seo"
import VATCalculatorClient from "./vat-calculator-client"

export const metadata = buildMetadata({
  title: "VAT Calculator",
  description:
    "Calculate VAT quickly. Add or remove VAT from any amount with this simple UK VAT calculator.",
  path: "/tools/vat-calculator",
})

export default function Page() {
  return <VATCalculatorClient />
}