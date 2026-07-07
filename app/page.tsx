import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import { categoryLabels, tools, type ToolCategory } from "@/lib/tools"

export default function HomePage() {
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6)
  const homepageCategories: ToolCategory[] = ["finance", "everyday", "dates"]

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur">
              Fast, free and easy to use. No signup required.
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Simple online calculators and tools for{" "}
              <span className="text-cyan-200">everyday life</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Useful calculators for finance, health, dates, conversions and
              everyday decisions.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl rounded-2xl bg-white p-2 shadow-2xl">
              <input
                className="min-w-0 flex-1 rounded-xl px-4 text-sm text-slate-900 outline-none"
                placeholder="Search calculators..."
              />
              <Button asChild className="rounded-xl">
                <Link href="/tools">Search</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepageCategories.map((category) => (
              <Link
                key={category}
                href="/tools"
                className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl">
                  {category === "finance" ? "💷" : category === "dates" ? "📅" : "🧰"}
                </div>
                <h3 className="font-semibold">{categoryLabels[category]}</h3>
                <p className="mt-1 text-sm text-white/70">
                  Quick {categoryLabels[category].toLowerCase()} tools
                </p>
              </Link>
            ))}

            <Link
              href="/tools"
              className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl">
                ✨
              </div>
              <h3 className="font-semibold">All Tools</h3>
              <p className="mt-1 text-sm text-white/70">
                Browse every calculator
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Popular Calculators
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start with some of the most useful tools on Toolzen.
            </p>
          </div>

          <Link
            href="/tools"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            View all tools →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["⚡", "Fast & Easy", "Instant results"],
            ["🔒", "100% Free", "No hidden fees"],
            ["✅", "Accurate", "Practical calculations"],
            ["📱", "Mobile Ready", "Works on any device"],
          ].map(([icon, title, text]) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl border bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                {icon}
              </div>
              <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-muted-foreground">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}