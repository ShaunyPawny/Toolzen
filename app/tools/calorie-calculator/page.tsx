import { buildMetadata } from "@/lib/seo"
import CalorieCalculatorClient from "./calorie-calculator-client"

export const metadata = buildMetadata({
  title: "Calorie Calculator",
  description:
    "Estimate daily calorie needs based on age, sex, weight, height, and activity level.",
  path: "/tools/calorie-calculator",
})

export default function Page() {
  return <CalorieCalculatorClient />
}