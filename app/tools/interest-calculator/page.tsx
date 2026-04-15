import { buildMetadata } from "@/lib/seo"
import InterestCalculatorClient from "./interest-calculator-client"

export const metadata = buildMetadata({
  title: "Interest Calculator",
  description:
    "Calculate simple interest and total amount over time with this easy interest calculator.",
  path: "/tools/interest-calculator",
})

export default function Page() {
  return <InterestCalculatorClient />
}