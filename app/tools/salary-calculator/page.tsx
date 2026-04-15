import { buildMetadata } from "@/lib/seo"
import SalaryCalculatorClient from "./salary-calculator-client"

export const metadata = buildMetadata({
  title: "Salary Calculator",
  description:
    "Estimate tax, annual take-home pay, and monthly net salary with this simple salary calculator.",
  path: "/tools/salary-calculator",
})

export default function Page() {
  return <SalaryCalculatorClient />
}