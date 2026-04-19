import { buildMetadata } from "@/lib/seo"
import BMICalculatorClient from "./bmi-calculator-client"

export const metadata = buildMetadata({
  title: "BMI Calculator",
  description:
    "Calculate your BMI using your weight and height with this simple body mass index calculator.",
  path: "/tools/bmi-calculator",
})

export default function Page() {
  return <BMICalculatorClient />
}