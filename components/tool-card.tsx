import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tool } from "@/lib/tools"

type ToolCardProps = {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="block h-full">
      <Card className="h-full rounded-2xl border bg-background shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            {tool.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}