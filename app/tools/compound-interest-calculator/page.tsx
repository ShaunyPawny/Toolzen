import { buildMetadata } from "@/lib/seo"
import CompoundInterestCalculatorClient from "./compound-interest-calculator-client"

export const metadata = buildMetadata({
  title: "Compound Interest Calculator",
  description:
    "Calculate compound interest and investment growth with monthly contributions.",
  path: "/tools/compound-interest-calculator",
})

export default function Page() {
  return <CompoundInterestCalculatorClient />
}