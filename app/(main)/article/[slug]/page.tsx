import ArticleBody from "@/src/components/article/ArticleBody";
import ArticleHeader from "@/src/components/article/ArticleHeader";
import CommentsSection from "@/src/components/article/CommentsSection";
import RelatedArticles from "@/src/components/article/RelatedArticles";
import Container from "@/src/components/layout/Container";
import { notFound } from "next/navigation";
import { resolveSchemas } from "@/src/lib/schema/resolver";
import Schema from "@/src/components/Schema";
import { getArticleBySlug } from "@/src/lib/api/news";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) return notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

  /* ---------------- SCHEMA ---------------- */
  const schemas = resolveSchemas({
    type: "article",
    data: {
      title: article.title,
      description:
        article.summary ||
        article.content?.replace(/<[^>]*>/g, "").slice(0, 160),

      url: `${baseUrl}/category/${article.category}/${article.slug}-${article._id}`,

      article: {
        title: article.title,
        description:
          article.summary ||
          article.content?.replace(/<[^>]*>/g, "").slice(0, 160),

        image: article.image,
        datePublished: article.publishedAt || article.createdAt,
        dateModified: article.updatedAt,

        author: article.source || "Admin",

        url: `${baseUrl}/category/${article.category}/${article.slug}-${article._id}`,
        category: article.category,
      },
    },
  });

  return (
    <>
      {/* ✅ SCHEMA INJECTION */}
      <Schema schemas={schemas} />

      <Container>
        <div>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[1000px] mx-auto pt-14 pb-16">
              <ArticleHeader article={article} />
              <ArticleBody article={article} />
            </div>
          </div>

          <div>
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="max-w-[1000px] mx-auto py-16">
                <CommentsSection />
              </div>
            </div>
          </div>

          <div className="mx-auto px-6 py-16">
            <RelatedArticles category={article.category} />
          </div>
        </div>
      </Container>
    </>
  );
}