type FAQItem = {
  question: string
  answer: string
}

type ToolContentSectionProps = {
  heading: string
  intro: string
  formula?: string
  exampleTitle?: string
  exampleText?: string
  faqs?: FAQItem[]
}

export function ToolContentSection({
  heading,
  intro,
  formula,
  exampleTitle,
  exampleText,
  faqs = [],
}: ToolContentSectionProps) {
  return (
    <section className="mt-10 space-y-8">
      <div className="rounded-2xl border bg-background p-6">
        <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{intro}</p>
      </div>

      {formula ? (
        <div className="rounded-2xl border bg-background p-6">
          <h3 className="text-xl font-semibold tracking-tight">Formula</h3>
          <div className="mt-3 rounded-xl bg-muted/40 p-4 font-mono text-sm">
            {formula}
          </div>
        </div>
      ) : null}

      {exampleTitle && exampleText ? (
        <div className="rounded-2xl border bg-background p-6">
          <h3 className="text-xl font-semibold tracking-tight">{exampleTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{exampleText}</p>
        </div>
      ) : null}

      {faqs.length > 0 ? (
        <div className="rounded-2xl border bg-background p-6">
          <h3 className="text-xl font-semibold tracking-tight">FAQs</h3>
          <div className="mt-4 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h4 className="font-medium">{faq.question}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}