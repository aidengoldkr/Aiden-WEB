import type { MetadataRoute } from "next";
import projectsData from "./data/projects.json";

const SITE = "https://aidengoldkr.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projectsData
    .filter((p) => p.visibility.allowDetailPage)
    .map((p) => ({
      url: `${SITE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: p.isMain ? 0.8 : 0.6,
    }));

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectRoutes,
  ];
}
