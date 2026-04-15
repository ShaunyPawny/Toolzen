import { ToolCard } from "@/components/tool-card"
import { tools } from "@/lib/tools"

type RelatedToolsProps = {
  currentSlug: string
  limit?: number
}

export function RelatedTools({
  currentSlug,
  limit = 2,
}: RelatedToolsProps) {
  const relatedTools = tools
    .filter((tool) => tool.slug !== currentSlug)
    .slice(0, limit)

  if (relatedTools.length === 0) return null

  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Related Tools</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try some of our other useful calculators.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {relatedTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}