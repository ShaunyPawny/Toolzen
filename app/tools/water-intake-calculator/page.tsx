import { buildMetadata } from "@/lib/seo"
import WaterIntakeCalculatorClient from "./water-intake-calculator-client"

export const metadata = buildMetadata({
  title: "Water Intake Calculator",
  description:
    "Estimate your recommended daily water intake based on body weight and activity level.",
  path: "/tools/water-intake-calculator",
})

export default function Page() {
  return <WaterIntakeCalculatorClient />
}