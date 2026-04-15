"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Toolzen
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Toggle menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition hover:bg-muted"
              >
                <span className="relative h-5 w-5">
                  <Menu
                    className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                      open ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                      open ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
                    }`}
                  />
                </span>
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="mt-10 flex flex-col gap-3">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile navigation</SheetTitle>
                  <SheetDescription>
                    Navigate to the main sections of the website.
                  </SheetDescription>
                </SheetHeader>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`animate-fade-up rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActive
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted"
                      }`}
                      style={{
                        animationDelay: `${index * 60}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}



<SheetContent side="right" className="w-[280px] sm:w-[320px]">
  <SheetHeader className="sr-only">
    <SheetTitle>Mobile navigation</SheetTitle>
    <SheetDescription>
      Navigate to the main sections of the website.
    </SheetDescription>
  </SheetHeader>

  <div className="mt-10 flex flex-col gap-3">
    ...
  </div>
</SheetContent>