"use client";
import Container from "@/src/components/layout/Container";
import ExploreMore from "@/src/components/sections/ExploreMore";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import politics from "../../../../public/images/featured1.png";
import poli from "../../../../public/images/poli.png";
import poli1 from "../../../../public/images/poli1.png";
import { MdArrowOutward } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { getNewsByCategory } from "@/src/lib/api/news";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) return;

    loadNews();
  }, [slug]);

  const loadNews = async () => {
    const data = await getNewsByCategory(slug);
    setNews(data);
  };
  const hero1 = news[0];
  const hero2 = news[1];
  const side1 = news[2];
  const center = news[3];
  const side2 = news[4];

  if (!slug) return notFound();
  return (
    <Container>
      <div className="w-full mx-auto p-6 md:p-12">
        <div>
          {/* Category Title */}
          <h1 className="text-[30px] md:text-[50px] font-bold text-[#212121] capitalize mb-6 md:mb-10">
            {slug}
          </h1>
        </div>

        {/* Top 2 Featured */}
        <div className="grid md:grid-cols-2 gap-12 mb-10 md:mb-20">
          {/* Left Featured */}

          {hero1 && (
            <Link href={`/category/${slug}/${hero1._id}`}>
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
                  ● {hero1.source}
                </p>

                <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
                  {hero1.summary}
                </p>
              </div>
            </Link>
          )}
          {/* Right Featured */}
          {hero2 && (
            <Link href={`/category/${slug}/${hero2._id}`}>
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
                  ● {hero2.source}
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
            Russia’s Strategy <MdArrowOutward />
          </span>
          <span className="flex items-center gap-2 hover:text-action cursor-pointer">
            Global Impact <MdArrowOutward />
          </span>
        </div>

        {/* 3 Column Highlight Section */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16">
          {/* Left Small News (3 cols) */}
          {side1 && (
            <div className="col-span-12 lg:col-span-3">
                <Link href={`/category/${slug}/${side1._id}`}>
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

                <p className="text-sm text-gray-500 mb-3">● {side1.source}</p>

                <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
                  {side1.summary}
                </p>
            </Link>
              </div>
          )}
          {/* Center Big Featured (6 cols) */}
          {center && (
            <div className="col-span-12 lg:col-span-6">
                <Link href={`/category/${slug}/${center._id}`}>
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

                <p className="text-sm text-gray-500 mb-3">● {center.source}</p>

                <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
                  {center.summary}
                </p>
            </Link>
              </div>
          )}

          {/* Right Small News (3 cols) */}
          {side2 && (
            <div className="col-span-12 lg:col-span-3">
                <Link href={`/category/${slug}/${side2._id}`}>
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

                <p className="text-sm text-gray-500 mb-3">● {side2.source}</p>

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
  );
}
