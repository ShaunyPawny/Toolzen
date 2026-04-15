import { buildMetadata } from "@/lib/seo"
import LoanRepaymentCalculatorClient from "./loan-repayment-calculator-client"

export const metadata = buildMetadata({
  title: "Loan Repayment Calculator",
  description:
    "Calculate monthly loan repayments, total repayment, and total interest with this simple loan calculator.",
  path: "/tools/loan-repayment-calculator",
})

export default function Page() {
  return <LoanRepaymentCalculatorClient />
}