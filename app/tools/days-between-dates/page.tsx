import { buildMetadata } from "@/lib/seo"
import DaysBetweenDatesClient from "./days-between-dates-client"

export const metadata = buildMetadata({
  title: "Days Between Dates Calculator",
  description:
    "Calculate the number of days between two dates quickly and accurately.",
  path: "/tools/days-between-dates",
})

export default function Page() {
  return <DaysBetweenDatesClient />
}