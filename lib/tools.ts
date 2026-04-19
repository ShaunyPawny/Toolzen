export type ToolCategory = "finance" | "everyday" | "dates"

export type Tool = {
  name: string
  slug: string
  description: string
  category: ToolCategory
  featured?: boolean
}

export const tools: Tool[] = [
  {
    name: "VAT Calculator",
    slug: "vat-calculator",
    description: "Add or remove VAT from any amount quickly and easily.",
    category: "finance",
    featured: true,
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate sale prices and discount savings in seconds.",
    category: "finance",
    featured: true,
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Work out percentages, increases, and percentages of values.",
    category: "everyday",
    featured: true,
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate exact age from a date of birth.",
    category: "dates",
    featured: true,
  },
  {
    name: "Days Between Dates Calculator",
    slug: "days-between-dates",
    description: "Find the number of days between two dates.",
    category: "dates",
    featured: true,
  },

  {
  name: "Loan Repayment Calculator",
  slug: "loan-repayment-calculator",
  description: "Calculate monthly repayments, total repayment, and total interest.",
  category: "finance",
  featured: true,
},

{
  name: "Interest Calculator",
  slug: "interest-calculator",
  description: "Calculate simple interest and total amount over time.",
  category: "finance",
  featured: true,
},

{
  name: "Mortgage Calculator",
  slug: "mortgage-calculator",
  description: "Estimate mortgage payments, loan amount, and total interest.",
  category: "finance",
  featured: true,
},

{
  name: "Salary Calculator",
  slug: "salary-calculator",
  description: "Estimate tax, annual take-home pay, and monthly net salary.",
  category: "finance",
  featured: true,
},

{
  name: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  description: "Estimate investment growth with compound interest.",
  category: "finance",
  featured: true,
},

{
  name: "Reverse VAT Calculator",
  slug: "reverse-vat-calculator",
  description: "Remove VAT from a total amount and find the net amount.",
  category: "finance",
  featured: true,
},

{
  name: "Unit Converter",
  slug: "unit-converter",
  description: "Convert between common length and weight units.",
  category: "everyday",
  featured: true,
},

{
  name: "BMI Calculator",
  slug: "bmi-calculator",
  description: "Calculate your BMI from your height and weight.",
  category: "everyday",
  featured: true,
},

]

export const categoryLabels: Record<ToolCategory, string> = {
  finance: "Finance",
  everyday: "Everyday",
  dates: "Dates",
}