import { MetadataRoute } from "next"
import { tools } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  // Static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },
  ]

  // Tool pages
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }))

  return [
  ...staticRoutes.map((route) => ({
    ...route,
    priority: 1,
  })),
  ...toolRoutes.map((route) => ({
    ...route,
    priority: 0.8,
  })),
]
}