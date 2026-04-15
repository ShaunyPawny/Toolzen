import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Toolzen - Free Online Calculators and Tools",
  description:
    "Toolzen offers free online calculators and tools for finance, dates, salary, VAT, mortgage planning, and more.",
  verification: {
    google: "wvNZYMJeqFMMoW0XyatHtPxzOjEd7xcvuLgvGdqe1dQ"
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}