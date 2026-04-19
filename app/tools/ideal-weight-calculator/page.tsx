import { buildMetadata } from "@/lib/seo"
import IdealWeightCalculatorClient from "./ideal-weight-calculator-client"

export const metadata = buildMetadata({
  title: "Ideal Weight Calculator",
  description:
    "Estimate a healthy weight range based on your height with this ideal weight calculator.",
  path: "/tools/ideal-weight-calculator",
})

export default function Page() {
  return <IdealWeightCalculatorClient />
}