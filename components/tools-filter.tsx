"use client"

import { useMemo, useState } from "react"
import { ToolCard } from "@/components/tool-card"
import { Input } from "@/components/ui/input"
import { tools, categoryLabels, type ToolCategory } from "@/lib/tools"

const categories: Array<"all" | ToolCategory> = [
  "all",
  "finance",
  "everyday",
  "dates",
]

export function ToolsFilter() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | ToolCategory>("all")

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase()

    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory

      const matchesSearch =
        query === "" ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <label htmlFor="tool-search" className="text-sm font-medium">
            Search tools
          </label>
          <Input
            id="tool-search"
            type="text"
            placeholder="Search calculators and tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                {category === "all" ? "All" : categoryLabels[category]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTools.length} tool{filteredTools.length === 1 ? "" : "s"} found
        </p>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-semibold">No tools found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  )
}
