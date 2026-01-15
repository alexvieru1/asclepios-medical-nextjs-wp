import { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/medici",
    "/specialitati",
    "/contact",
    "/despre-noi",
    "/informatii-utile",
    "/intrebari-frecvente",
    "/gdpr",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.site_domain}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

