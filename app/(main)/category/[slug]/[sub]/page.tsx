import ArticleContent from "@/src/components/ArticleContent";
import { getNewsById } from "@/src/lib/api/news";
import Image from "next/image";

export default async function CategorySubPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {

 const { slug, sub } = await params;

  // extract id from slug-id
  const id = sub.split("-").pop();

  const news = await getNewsById(id as string);
  if (!news) return <div>Loading...</div>;

  return (
    <article className="bg-[#F9F6F3] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Category */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
          {news.category}
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {news.title}
        </h1>
        {/* Summary */}
        <p className="text-lg text-gray-600 mb-6">{news.summary}</p>

        {/* Image */}
        <div className="relative w-full h-auto mb-6 rounded-lg overflow-hidden">
          <Image src={news.image} alt={news.title} width={1200} height={400} />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-4">
          <span>Source: {news.source}</span>
          <span>
            •
            {`${new Date(news.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} • ${new Date(news.publishedAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}`}
          </span>
        </div>

        {/* Content */}
       <ArticleContent content={news.content} />

        {/* Tags */}
        {news.tags?.length > 0 && (
          <div className="mt-10">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source link */}
        <div className="mt-8 border-t pt-6">
          <a
            href={news.sourceUrl}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Read original article
          </a>
        </div>
      </div>
    </article>
  );
}
