import ArticleContent from "@/src/components/article/ArticleContent";
import ArticleHero from "@/src/components/article/ArticleHero";
import Comments from "@/src/components/article/Comments";
import RelatedArticles from "@/src/components/article/RelatedArticles";
import Container from "@/src/components/layout/Container";

export default function ArticlePage() {
  return (
    <Container>
      <ArticleHero />
      <ArticleContent />
      <Comments />
      <RelatedArticles />
    </Container>
  );
}
