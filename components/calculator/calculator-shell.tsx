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
    <section className="overflow-hidden rounded-[2rem] border bg-white shadow-xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 px-6 py-10 text-white md:px-10">
        <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-3xl backdrop-blur">
            🧮
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              ⚡ Instant results
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              ✅ Free to use
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              🔒 No signup
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-5 md:p-8">{children}</div>
    </section>
  )
}