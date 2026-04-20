import { buildWebPage, buildItemList, buildArticle } from "./builders";

export function resolveSchemas({ type, data }: any) {
  const schemas: any[] = [];

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

  /* ---------------- BASE WEBPAGE ---------------- */
  schemas.push(
    buildWebPage({
      title: data.title,
      description: data.description,
      url: data.url,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url,
      },
    })
  );

  /* ---------------- HOME ---------------- */
  if (type === "home") {
    if (data.hero) {
      schemas.push(
        buildItemList([data.hero], "Hero Section", baseUrl)
      );
    }

    if (data.trending?.length) {
      schemas.push(
buildItemList(data.trending, "Trending News")      );
    }

    if (data.explore?.length) {
      schemas.push(
        buildItemList(data.explore, "Explore News")
      );
    }
  }

  /* ---------------- CATEGORY ---------------- */
  if (type === "category") {
    if (data.articles?.length) {
      schemas.push(
        buildItemList(
          data.articles,
          `${data.title} Articles`,
          baseUrl
        )
      );
    }
  }

  /* ---------------- ARTICLE ---------------- */
  if (type === "article") {
    if (data.article) {
      schemas.push(
        buildArticle({
          ...data.article,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.article.url,
          },
          publisher: {
            "@type": "Organization",
            name: "Sophie Media",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
        })
      );
    }
  }

  return schemas;
}