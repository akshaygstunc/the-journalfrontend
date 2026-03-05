// ArticlePage.tsx
import ArticleBody from "@/src/components/article/ArticleBody";
import ArticleHeader from "@/src/components/article/ArticleHeader";
import CommentsSection from "@/src/components/article/CommentsSection";
import RelatedArticles from "@/src/components/article/RelatedArticles";
import Container from "@/src/components/layout/Container";
import HeaderSample from "@/src/components/layout/HeaderSample";

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Container>
      {/* <HeaderSample /> */}

      <div>
        {/* Layout Container */}
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Reading Container */}
          <div className="max-w-[1000px] mx-auto pt-14 pb-16">
            <ArticleHeader />
            <ArticleBody />
          </div>
        </div>

        {/* Comments Section - Full width with background */}
        <div>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[1000px] mx-auto py-16">
              <CommentsSection />
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mx-auto px-6 py-16">
          <RelatedArticles />
        </div>
      </div>
    </Container>
  );
}