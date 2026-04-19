import { buildMetadata } from "@/lib/seo"
import TipCalculatorClient from "./tip-calculator-client"

export const metadata = buildMetadata({
  title: "Tip Calculator",
  description:
    "Calculate tip, total bill, and split the cost between people with this simple tip calculator.",
  path: "/tools/tip-calculator",
})

export default function Page() {
  return <TipCalculatorClient />
}