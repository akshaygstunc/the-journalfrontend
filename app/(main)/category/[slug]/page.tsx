import Container from "@/src/components/layout/Container";
import ExploreMore from "@/src/components/sections/ExploreMore";
import Image from "next/image";
import { notFound } from "next/navigation";
import politics from "../../../../public/images/featured1.png";
import poli1 from "../../../../public/images/poli1.png";
import { MdArrowOutward } from "react-icons/md";
import React from "react";
import { getNewsByCategory } from "@/src/lib/api/news";
import Link from "next/link";
import { resolveSchemas } from "@/src/lib/schema/resolver";
import Schema from "@/src/components/Schema";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ Normalize slug — decode URI encoding + lowercase
  // "Style" → "style", "Foreign%20Affairs" → "foreign affairs"
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();

  if (!normalizedSlug) return notFound();

  const news = await getNewsByCategory(normalizedSlug, {
    next: { revalidate: 60 },
  });

  const hero1 = news[0];
  const hero2 = news[1];
  const side1 = news[2];
  const center = news[3];
  const side2 = news[4];

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} • ${timePart}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

  if (!news || news.length === 0) {
    return (
  <Container>

  <div className="
    w-full
    flex
    justify-center
    items-center
    px-4
    py-10
    md:py-20
  ">

    <div className="
      w-full
      max-w-[700px]
      bg-[#F8F6F3]
      border
      border-[#E7E7E7]
      rounded-[24px]
      px-6
      py-10
      md:px-12
      md:py-14
      text-center
      shadow-sm
    ">

      <h1 className="
        text-[34px]
        md:text-[56px]
        leading-tight
        font-bold
        text-[#111111]
        capitalize
        mb-6
      ">
        {normalizedSlug} News
      </h1>

      <h2 className="
        text-[22px]
        md:text-[32px]
        font-semibold
        text-[#1F1F1F]
        mb-4
      ">
        Fresh stories coming soon
      </h2>

      <p className="
        text-[#555]
        text-[15px]
        md:text-[18px]
        leading-7
        max-w-[520px]
        mx-auto
      ">
        We are curating the latest
        {` ${normalizedSlug} `}
        coverage, trends, and insights.

        Please check back shortly
        for new updates.
      </p>

      <div className="
        mt-8
        flex
        flex-col
        sm:flex-row
        justify-center
        items-center
        gap-4
      ">

        <Link
          href="/"
          className="
            w-full
            sm:w-auto
            bg-[#861212]
            text-white
            px-7
            py-3
            rounded-lg
            text-sm
            md:text-base
            font-medium
            transition-all
            hover:opacity-90
          "
        >
          Back to Home
        </Link>

        <Link
          href={`/category/${normalizedSlug}`}
          className="
            w-full
            sm:w-auto
            border
            border-[#861212]
            text-[#861212]
            px-7
            py-3
            rounded-lg
            text-sm
            md:text-base
            font-medium
            transition-all
            hover:bg-[#861212]
            hover:text-white
          "
        >
          Refresh
        </Link>

      </div>

    </div>

  </div>

</Container>
    );
  }

  const schemas = resolveSchemas({
    type: "category",
    data: {
      // ✅ use normalizedSlug everywhere for consistency
      title: `${normalizedSlug} News`,
      description: `Latest ${normalizedSlug} news, updates and breaking stories`,
      url: `${baseUrl}/category/${normalizedSlug}`,

      articles: news.map((item: any) => ({
        title: item.title,
        description:
          item.summary || item.content?.replace(/<[^>]*>/g, "").slice(0, 140),
        image: item.image,
        datePublished: item.publishedAt || item.createdAt,
        url: `${baseUrl}/category/${normalizedSlug}/${item.slug}-${item._id}`,
      })),
    },
  });

  return (
    <>
      <Schema schemas={schemas} />

      <Container>
        <div className="w-full mx-auto p-6 md:p-12">
          <div>
            {/* Category Title — capitalize display only, slug stays lowercase */}
            <h1 className="text-[30px] md:text-[50px] font-bold text-[#212121] capitalize mb-6 md:mb-10">
              {normalizedSlug} News
            </h1>
          </div>

          {/* Top 2 Featured */}
          <div className="grid md:grid-cols-2 gap-12 mb-10 md:mb-20">
            {hero1 && (
              <Link
                href={`/category/${normalizedSlug}/${hero1.slug}-${hero1._id}`}
              >
                <div className="group cursor-pointer">
                  <div className="relative w-full mb-5">
                    <Image
                      src={hero1.image || politics}
                      alt={hero1.title}
                      width={800}
                      height={400}
                    />
                  </div>
                  <h2 className="text-[24px] md:text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
                    {hero1.title}
                  </h2>
                  <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
                    ● {hero1.source} • {formatDate(hero1.createdAt)}
                  </p>
                  <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
                    {hero1.summary}
                  </p>
                </div>
              </Link>
            )}

            {hero2 && (
              <Link
                href={`/category/${normalizedSlug}/${hero2.slug}-${hero2._id}`}
              >
                <div className="group cursor-pointer">
                  <div className="relative w-full mb-5">
                    <Image
                      src={hero2.image || politics}
                      alt={hero2.title}
                      width={800}
                      height={400}
                    />
                  </div>
                  <h2 className="text-[24px] md:text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
                    {hero2.title}
                  </h2>
                  <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
                    ● {hero2.source} • {formatDate(hero2.createdAt)}
                  </p>
                  <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
                    {hero2.summary}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#D1D1D1] mb-12" />

          {/* Section Tag Navigation */}
          <div className="flex flex-wrap justify-between items-center gap-6 text-[16px] font-medium mb-10 text-[#212121]">
            <span className="uppercase font-extrabold text-[#212121]">
              The Ukraine War
            </span>
            <span className="flex items-center gap-2 hover:text-action cursor-pointer">
              Latest Developments <MdArrowOutward />
            </span>
            <span className="flex items-center gap-2 hover:text-action cursor-pointer">
              Front-Line Shifts <MdArrowOutward />
            </span>
            <span className="flex items-center gap-2 hover:text-action cursor-pointer">
              NATO Response <MdArrowOutward />
            </span>
            <span className="flex items-center gap-2 hover:text-action cursor-pointer">
              Russia's Strategy <MdArrowOutward />
            </span>
            <span className="flex items-center gap-2 hover:text-action cursor-pointer">
              Global Impact <MdArrowOutward />
            </span>
          </div>

          {/* 3 Column Highlight Section */}
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16">
            {/* Left Small (3 cols) */}
            {side1 && (
              <div className="col-span-12 lg:col-span-3">
                <Link
                  href={`/category/${normalizedSlug}/${side1.slug}-${side1._id}`}
                >
                  <div className="mb-4">
                    <Image
                      src={side1.image || poli1}
                      alt={side1.title}
                      width={400}
                      height={200}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <span className="bg-[#861212] text-white text-xs px-3 py-1 rounded-full">
                    Live
                  </span>
                  <h3 className="font-semibold text-lg md:text-[24px] mt-4 mb-2">
                    {side1.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    ● {side1.source} • {formatDate(side1.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
                    {side1.summary}
                  </p>
                </Link>
              </div>
            )}

            {/* Center Big (6 cols) */}
            {center && (
              <div className="col-span-12 lg:col-span-6">
                <Link
                  href={`/category/${normalizedSlug}/${center.slug}-${center._id}`}
                >
                  <div className="mb-4">
                    <Image
                      src={center.image || poli1}
                      alt={center.title}
                      width={800}
                      height={400}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <h2 className="font-bold text-[24px] md:text-3xl text-[#212121] mb-2">
                    {center.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    ● {center.source} • {formatDate(center.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
                    {center.summary}
                  </p>
                </Link>
              </div>
            )}

            {/* Right Small (3 cols) */}
            {side2 && (
              <div className="col-span-12 lg:col-span-3">
                <Link
                  href={`/category/${normalizedSlug}/${side2.slug}-${side2._id}`}
                >
                  <div className="mb-4">
                    <Image
                      src={side2.image || poli1}
                      alt={side2.title}
                      width={400}
                      height={200}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <span className="bg-[#861212] text-white text-xs px-3 py-1 rounded-full">
                    Live
                  </span>
                  <h3 className="font-semibold text-lg md:text-[24px] mt-4 mb-2">
                    {side2.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    ● {side2.source} • {formatDate(side2.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
                    {side2.summary}
                  </p>
                </Link>
              </div>
            )}
          </div>

          {/* Bottom Divider */}
          <div className="border-t border-[#D1D1D1] mb-12" />

          {/* More Articles Grid */}
          <ExploreMore news={news.slice(5)} />
        </div>
      </Container>
    </>
  );
}
