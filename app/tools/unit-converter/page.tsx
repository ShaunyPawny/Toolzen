import { buildMetadata } from "@/lib/seo"
import UnitConverterClient from "./unit-converter-client"

export const metadata = buildMetadata({
  title: "Unit Converter",
  description:
    "Convert between common length and weight units quickly and easily.",
  path: "/tools/unit-converter",
})

export default function Page() {
  return <UnitConverterClient />
}