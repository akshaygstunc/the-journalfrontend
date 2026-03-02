// RelatedArticles.tsx
import Image from "next/image";

export default function RelatedArticles() {
  const articles = [
    {
      title: "Philomena Cunk Is Weird Enough to Take on the World",
      excerpt:
        "The new Netflix show looks like an ambitious BBC documentary...",
      image: "/images/related1.png",
    },
    {
      title: "Bangladesh Election: What Youth Voters Want",
      excerpt:
        "Young voters are demanding change but face systemic barriers...",
      image: "/images/related2.png",
    },
    {
      title: "How Gen Z Is Reshaping Global Politics",
      excerpt:
        "From climate to democracy, young people are finding their voice...",
      image: "/images/related3.png",
    },
    {
      title: "The Future of Democracy in South Asia",
      excerpt: "Experts weigh in on the region's political trajectory...",
      image: "/images/related4.png",
    },
  ];

  return (
    <div>
      <h3 className="text-[40px] md:text-[44px] font-bold leading-[1.2] tracking-[-0.02em] mb-10">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative w-full h-[170px] mb-4 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <h4 className="font-bold text-[17px] leading-[1.4] group-hover:text-[#8B1C1C] transition">
              {article.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-gray-600 mt-3">
              <span>● BBC</span>
              <span>• 3h ago</span>
              <span>• 4 Min Read</span>
            </div>

            <p className="text-sm text-gray-600 mt-3 leading-[1.6] line-clamp-2 pt-2 border-t border-[#D1D1D1]">
              {article.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
