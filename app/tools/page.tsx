import { ToolsFilter } from "@/components/tools-filter"

export default function ToolsPage() {
  return (
    <div className="mx-auto min-h-screen pb-8 pt-8 px-10 bg-gradient-to-r from-slate-200 to-slate-300">
      <section className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">All Tools</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Browse our growing collection of simple and useful calculators.
        </p>
      </section>

      <ToolsFilter />
    </div>
  )
}