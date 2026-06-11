export default function sitemap() {
  const base = "https://moorlandhouse-spa.com";
  const routes = [
    "",
    "/lounge",
    "/spa",
    "/accommodations",
    "/pool-grounds",
    "/gallery",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
