import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import { categoryLabels, tools, type ToolCategory } from "@/lib/tools"

export default function HomePage() {
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6)
  const homepageCategories: ToolCategory[] = ["finance", "everyday", "dates"]

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-background to-background" />
        <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur">
              Free online tools for finance, health, dates, and everyday calculations
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Smart calculators and tools, without the clutter
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Toolzen helps you calculate faster with clean, modern tools for
              mortgages, salary, VAT, BMI, calories, time, and more.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl px-6">
                <Link href="/tools">Browse All Tools</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl px-6"
              >
                <Link href="/tools/mortgage-calculator">
                  Try Mortgage Calculator
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold">{tools.length}+</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Useful calculators
                </p>
              </div>

              <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold">Finance</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Salary, mortgage, VAT, loan, savings
                </p>
              </div>

              <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold">Health</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  BMI, calories, water intake, ideal weight
                </p>
              </div>
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
              Start with some of the most useful calculators on Toolzen.
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

      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore tools by topic to find what you need faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {homepageCategories.map((category) => {
              const categoryTools = tools
                .filter((tool) => tool.category === category)
                .slice(0, 3)

              return (
                <div
                  key={category}
                  className="rounded-2xl border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {categoryLabels[category]}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Useful {categoryLabels[category].toLowerCase()} tools for quick,
                      practical calculations.
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Built to be fast, simple, and genuinely useful
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Toolzen is designed for people who want quick answers without
            confusing interfaces. Whether you are checking mortgage payments,
            tracking calories, or splitting a bill, the goal is the same:
            clean tools that save time.
          </p>
        </div>
      </section>
    </div>
  )
}