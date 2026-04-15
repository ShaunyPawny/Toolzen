import { buildMetadata } from "@/lib/seo"
import AgeCalculatorClient from "./age-calculator-client"

export const metadata = buildMetadata({
  title: "Age Calculator",
  description:
    "Find your exact age in years, months, and days from your date of birth.",
  path: "/tools/age-calculator",
})

export default function Page() {
  return <AgeCalculatorClient />
}