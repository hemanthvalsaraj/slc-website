import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slc.run";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/docs/quick-start`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/docs/cli`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/docs/sdk`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/docs/api`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/docs/examples`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}

