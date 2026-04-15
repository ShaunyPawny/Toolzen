type CalculatorShellProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function CalculatorShell({
  title,
  description,
  children,
}: CalculatorShellProps) {
  return (
    <section className="mx-auto w-full px-4 py-10 bg-gradient-to-r from-slate-200 to-slate-200">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          {description}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {children}
      </div>
    </section>
  )
}