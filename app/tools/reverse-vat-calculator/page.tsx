import { buildMetadata } from "@/lib/seo"
import ReverseVATCalculatorClient from "./reverse-vat-calculator-client"

export const metadata = buildMetadata({
  title: "Reverse VAT Calculator",
  description:
    "Remove VAT from a total amount and calculate the net amount and VAT portion instantly.",
  path: "/tools/reverse-vat-calculator",
})

export default function Page() {
  return <ReverseVATCalculatorClient />
}