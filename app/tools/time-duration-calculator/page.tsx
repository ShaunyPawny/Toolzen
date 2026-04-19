import { buildMetadata } from "@/lib/seo"
import TimeDurationCalculatorClient from "./time-duration-calculator-client"

export const metadata = buildMetadata({
  title: "Time Duration Calculator",
  description:
    "Calculate the time between two times, including optional break deduction.",
  path: "/tools/time-duration-calculator",
})

export default function Page() {
  return <TimeDurationCalculatorClient />
}