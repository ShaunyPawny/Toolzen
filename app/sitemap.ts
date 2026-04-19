import { MetadataRoute } from "next"
import { tools } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toolzen.co.uk"

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      priority: 1,
    },
  ]

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [...staticRoutes, ...toolRoutes]
}