import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import { categoryLabels, tools, type ToolCategory } from "@/lib/tools"

export default function HomePage() {
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6)

  const homepageCategories: ToolCategory[] = ["finance", "everyday", "dates"]

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-cyan-200">
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
              Free online tools for finance, dates, and everyday calculations
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Simple online calculators and tools
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Fast, modern, and easy-to-use tools for finance, percentages,
              dates, salary, mortgage planning, and more.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl px-6">
                <Link href="/tools">Browse All Tools</Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-xl px-6">
                <Link href="/tools/mortgage-calculator">Try Mortgage Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Featured Tools
            </h2>
            <p className="mt-2 text-muted-foreground">
              A few of the most useful calculators to get started.
            </p>
          </div>

          <Link
            href="/tools"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            View all tools
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Browse by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore tools by topic to keep things simple.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {homepageCategories.map((category) => {
            const categoryTools = tools.filter((tool) => tool.category === category).slice(0, 3)

            return (
              <div
                key={category}
                className="rounded-2xl border bg-background p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {categoryLabels[category]}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Useful {categoryLabels[category].toLowerCase()} tools to help with quick
                    calculations.
                  </p>
                </div>

                <div className="space-y-3">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block rounded-xl border px-4 py-3 text-sm transition hover:bg-muted"
                    >
                      <div className="font-medium">{tool.name}</div>
                      <div className="mt-1 text-muted-foreground">
                        {tool.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}