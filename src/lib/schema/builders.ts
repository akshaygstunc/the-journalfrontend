const base = { "@context": "https://schema.org" };

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

/* ---------------- WEB PAGE ---------------- */
export const buildWebPage = (d: any) => ({
  ...base,
  "@type": "WebPage",
  name: d.title,
  description: d.description,
  url: d.url,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": d.url,
  },
});

/* ---------------- ITEM LIST ---------------- */
export const buildItemList = (items: any[], name: string) => ({
  ...base,
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.title,
    url:
      item.url ||
      `${BASE_URL}/category/${item.category}/${item.slug}-${item._id}`,
  })),
});

/* ---------------- ARTICLE ---------------- */
export const buildArticle = (d: any) => ({
  ...base,
  "@type": "NewsArticle", // 🔥 fixed (important)

  headline: d.title,
  description: d.description,

  image: d.image ? [d.image] : [],

  datePublished: d.datePublished || d.createdAt,
  dateModified: d.dateModified || d.updatedAt,

  author: {
    "@type": "Person",
    name: d.author || "Admin",
  },

  publisher: {
    "@type": "Organization",
    name: "Sophie Media",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": d.url,
  },
});