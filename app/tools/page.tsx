"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { tools, categoryLabels, type ToolCategory } from "@/lib/tools"

const categories: ("all" | ToolCategory)[] = ["all", "finance", "everyday", "dates"]

const iconMap: Record<string, string> = {
  finance: "💷",
  everyday: "✨",
  dates: "📅",
}

export default function ToolsPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"all" | ToolCategory>("all")

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = category === "all" || tool.category === category

      return matchesSearch && matchesCategory
    })
  }, [query, category])

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 px-4 py-20 text-white">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-100px] h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium text-cyan-100">All Tools</p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Everything you need, all in{" "}
            <span className="text-cyan-200">one place.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            Browse Toolzen’s growing collection of free calculators for finance,
            health, dates, conversions, and everyday life.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl rounded-2xl bg-white p-2 shadow-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators and tools..."
              className="min-w-0 flex-1 rounded-xl px-4 text-sm text-slate-900 outline-none"
            />
            <button className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                category === item
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              {item === "all" ? "🧰 All Tools" : `${iconMap[item]} ${categoryLabels[item]}`}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500">
          {filteredTools.length} tools found
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-3xl border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:scale-110">
                {iconMap[tool.category] ?? "🧮"}
              </div>

              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                {tool.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {tool.description}
              </p>

              <div className="mt-5 text-sm font-medium text-indigo-600">
                Open tool →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}