import { buildMetadata } from "@/lib/seo"
import MortgageCalculatorClient from "./mortgage-calculator-client"

export const metadata = buildMetadata({
  title: "Mortgage Calculator",
  description:
    "Estimate mortgage payments, total repayment, and total interest with this easy mortgage calculator.",
  path: "/tools/mortgage-calculator",
})

export default function Page() {
  return <MortgageCalculatorClient />
}