import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Toolzen. All rights reserved.</p>

        <nav className="flex items-center gap-4">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link href="/tools" className="transition hover:text-foreground">
            Tools
          </Link>
        </nav>
      </div>
    </footer>
  )
}