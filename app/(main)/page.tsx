import Container from "@/src/components/layout/Container";
import { SectionHeader } from "@/src/components/SectionHeader";
import Image from "next/image";
import em from "../../public/images/em.png";
import em1 from "../../public/images/em1.png";
import em2 from "../../public/images/em2.png";
import em3 from "../../public/images/em3.png";
import em4 from "../../public/images/em4.png";
import mw1 from "../../public/images/mw1.png";
import mw2 from "../../public/images/mw2.png";
import mw3 from "../../public/images/mw3.png";
import mw4 from "../../public/images/mw4.png";
import { getCoverage } from "@/src/services/news.service";
import Link from "next/link";

// data/homeData.ts

export const gridNews = Array(4).fill({
  title: "Philomena Cunk Is Weird Enough to Take on the World",
  source: "BBC",
  time: "3h ago",
  read: "4 Min Read",
  description:
    "The new Netflix show looks like an ambitious BBC documentary...",
});

export default async function Home() {
  const news = (await getCoverage("published")) || [];
  console.log("news", news);

  /* SPLIT NEWS FOR SECTIONS */

  /* SPLIT NEWS FOR SECTIONS */

  const hero = news?.[0] || null;

  const sideNews = news.slice(1, 4);

  const mostWatched = news.slice(0, 4);

  const trendingMain = news?.[4] || null;

  const trendingSide = news.slice(0, 4);

  const trendingGrid = news.slice(0, 4);

  const exploreMain = news?.[5] || null;
  const exploreSide = news.slice(6, 9);
  const exploreGrid = news.slice(9, 13);

  const alsoNews = news.slice(-4);
  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };
  return (
    <Container>
      <div className="bg-[#f5f5f5a9] min-h-screen font-sans">
        <div className="w-full mx-auto mt-12 space-y-20">
          {/* HERO SECTION */}
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10">
            {/* HERO */}

            <div className="lg:col-span-2 px-4 lg:px-0">
              {hero && (
                <>
                  <Image
                    src={hero.image || "/placeholder.jpg"}
                    alt={hero.title}
                    width={900}
                    height={500}
                    className="w-full h-131.5 object-cover rounded-md"
                  />
                  <Link
                    href={`/category/${hero?.category}/${hero.slug}-${hero?._id}`}
                  >
                    {" "}
                    <h4 className="font-heading font-bold text-[24px] mt-6">
                      {hero.title}
                    </h4>
                  </Link>

                  <p className="text-[12px] text-[#4F4F4F] mt-3">
                    ● {hero.source || "News"} •{" "}
                    {new Date(hero.publishedAt).toLocaleDateString()} • 4 Min
                    Read
                  </p>

                  <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                    {stripHtml(hero.content).slice(0, 275)}...
                  </p>
                </>
              )}
            </div>

            {/* SIDE NEWS */}
            <div className="space-y-8 px-4 lg:px-0">
              {sideNews.map((item: any) => (
                <div key={item._id} className="pb-6">
                  <Link
                    href={`/category/${item?.category}/${item.slug}-${item?._id}`}
                  >
                    <h3 className="font-heading font-bold text-[18px] text-heading">
                      {item.title}
                    </h3>

                    <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                      ● {item.source || "News"} •{" "}
                      {new Date(item.publishedAt).toLocaleDateString()} • 4 Min
                      Read
                    </p>

                    <p className="text-bodyM text-gray-600 mt-3">
                      {item.content?.slice(0, 137)}...
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* MOST WATCHED */}
          <div className="px-4 lg:px-0">
            <SectionHeader title="Most Watched" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {mostWatched.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/category/${item?.category}/${item.slug}-${item?._id}`}
                  className="flex gap-4 lg:flex-col"
                >
                  {/* Image */}
                  <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <span className="bg-[#861212] text-white text-xs px-4 py-1 rounded-full w-fit mb-2">
                      {item.status || "Live"}
                    </span>

                    <h3 className="font-heading font-bold text-[16px] lg:text-[20px] leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* TRENDING NEWS */}
          <div className="px-4 lg:px-0 w-full">
            <SectionHeader title="Trending News" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
              {/* MAIN TRENDING */}
              {trendingMain && (
                <Link
                  href={`/category/${trendingMain.category}/${trendingMain.slug}-${trendingMain._id}`}
                  className="col-span-2 block"
                >
                  <Image
                    src={trendingMain.image || "/placeholder.jpg"}
                    alt={trendingMain.title}
                    width={900}
                    height={500}
                    className="w-full h-auto object-cover rounded-md"
                  />

                  <h4 className="font-heading font-bold text-[24px] mt-6">
                    {trendingMain.title}
                  </h4>

                  <p className="text-[12px] text-[#4F4F4F] mt-3">
                    ● {trendingMain.source || "News"} •{" "}
                    {new Date(trendingMain.publishedAt).toLocaleDateString()} •
                    4 Min Read
                  </p>

                  <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                    {stripHtml(trendingMain.content).slice(0, 200)}...
                  </p>
                </Link>
              )}

              {/* SIDE TRENDING */}
              <div className="space-y-8">
                {trendingSide.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/category/${item.category}/${item.slug}-${item._id}`}
                    className="block pb-6"
                  >
                    <h3 className="font-heading font-bold text-[18px] text-heading">
                      {item.title}
                    </h3>

                    <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                      ● {item.source || "News"} •{" "}
                      {new Date(item.publishedAt).toLocaleDateString()} • 4 Min
                      Read
                    </p>

                    <p className="text-bodyM text-gray-600 mt-3">
                      {stripHtml(item.content).slice(0, 130)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* TRENDING GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {trendingGrid.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/category/${item.category}/${item.slug}-${item._id}`}
                  className="flex gap-4 lg:flex-col"
                >
                  <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-heading font-bold text-h5 mt-0 lg:mt-4">
                      {item.title}
                    </h3>

                    <p className="text-micro text-label mt-2">
                      ● {item.source || "News"} •{" "}
                      {new Date(item.publishedAt).toLocaleDateString()} • 4 Min
                      Read
                    </p>

                    <p className="text-bodyM text-gray-600 mt-3">
                      {stripHtml(item.content).slice(0, 120)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* EXPLORE MORE */}
          <div className="px-4 lg:px-0 w-full">
            <SectionHeader title="Explore More" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
              {/* MAIN NEWS */}
              <div className="col-span-2">
                {exploreMain && (
                  <Link
                    href={`/category/${exploreMain.category}/${exploreMain.slug}-${exploreMain._id}`}
                  >
                    <div>
                      <Image
                        src={exploreMain.image || "/placeholder.jpg"}
                        alt={exploreMain.title}
                        width={900}
                        height={500}
                        className="w-full object-cover rounded-md"
                      />
                    </div>

                    <h4 className="font-heading font-bold text-[24px] mt-6">
                      {exploreMain.title}
                    </h4>

                    <p className="text-[12px] text-[#4F4F4F] mt-3">
                      ● {exploreMain.source || "News"} •{" "}
                      {new Date(exploreMain.publishedAt).toLocaleDateString()} •
                      4 Min Read
                    </p>

                    <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                      {stripHtml(exploreMain.content).slice(0, 200)}...
                    </p>
                  </Link>
                )}
              </div>

              {/* SIDE NEWS */}
              <div className="space-y-8">
                {exploreSide.map((item: any) => (
                  <div key={item._id} className="pb-6">
                    <Link
                      href={`/category/${item.category}/${item.slug}-${item._id}`}
                    >
                      <h3 className="font-heading font-bold text-[18px] text-heading">
                        {item.title}
                      </h3>

                      <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                        ● {item.source || "News"} •{" "}
                        {new Date(item.publishedAt).toLocaleDateString()} • 4
                        Min Read
                      </p>

                      <p className="text-bodyM text-gray-600 mt-3">
                        {stripHtml(item.content).slice(0, 130)}...
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* GRID NEWS - 🔥 LINK ADDED HERE */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 lg:mt-12">
              {exploreGrid.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/category/${item.category}/${item.slug}-${item._id}`}
                >
                  <div>
                    <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    <h3 className="font-heading font-bold text-h5 mt-4">
                      {item.title}
                    </h3>

                    <p className="text-micro text-label mt-2">
                      ● {item.source || "News"} •{" "}
                      {new Date(item.publishedAt).toLocaleDateString()} • 4 Min
                      Read
                    </p>

                    <p className="text-bodyM text-gray-600 mt-3">
                      {stripHtml(item.content).slice(0, 120)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* ALSO IN NEWS */}
          <div className="pb-20 px-4 lg:px-0">
            <SectionHeader title="Also In News" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
              {alsoNews.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/category/${item?.category}/${item.slug}-${item?._id}`}
                  className="pb-4 block"
                >
                  <h3 className="font-heading font-bold text-[20px]">
                    {item.title}
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● {item.source || "News"} • {item.category} •{" "}
                    {new Date(item.publishedAt).toLocaleDateString()} • 4 Min
                    Read
                  </p>

                  <p className="text-bodyM text-[#2F2F2F] mt-3">
                    {stripHtml(item.content).slice(0, 140)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
