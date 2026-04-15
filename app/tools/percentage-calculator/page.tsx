import { buildMetadata } from "@/lib/seo"
import PercentageCalculatorClient from "./percentage-calculator-client"

export const metadata = buildMetadata({
  title: "Percentage Calculator",
  description:
    "Calculate percentages easily. Find percentage of a number or percentage increase in seconds.",
  path: "/tools/percentage-calculator",
})

export default function Page() {
  return <PercentageCalculatorClient />
}