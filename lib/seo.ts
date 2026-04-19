type SEOProps = {
  title: string
  description: string
  path?: string
}

export function buildMetadata({ title, description, path = "" }: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toolzen.co.uk"
  const fullTitle = `${title} | Toolzen`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${baseUrl}${path}`,
      siteName: "Toolzen",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}