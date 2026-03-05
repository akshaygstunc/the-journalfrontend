import Container from "@/src/components/layout/Container";
import ExploreMore from "@/src/components/sections/ExploreMore";
import Image from "next/image";
import { notFound } from "next/navigation";
import politics from "../../../../public/images/featured1.png";
import poli from "../../../../public/images/poli.png";
import poli1 from "../../../../public/images/poli1.png";
import { MdArrowOutward } from "react-icons/md";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  return (
    <Container>
      <div className="w-full mx-auto px-12 py-12">
        <div>

        {/* Category Title */}
        <h1 className="text-[50px] font-bold text-[#212121] capitalize mb-10">
          {slug}
        </h1>
        
        </div>

        {/* Top 2 Featured */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left Featured */}
          <div className="group cursor-pointer">
            <div className="relative w-full mb-5">
              <Image
                src={politics}
                alt="Featured News"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h2 className="text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
              Philomena Cunk Is Weird Enough to Take on the World
            </h2>

            <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
              The new Netflix show “Cunk on Earth” looks like an ambitious BBC
              documentary. Until its fictional host, created by Charlie Brooker,
              starts to ask some deeply silly questions. The new Netflix show
              “Cunk on Earth” looks like an ambitious BBC documentary. Until
            </p>
          </div>

          {/* Right Featured */}
          <div className="group cursor-pointer">
            <div className="relative w-full mb-5">
              <Image
                src={politics}
                alt="Featured News"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h2 className="text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
              Philomena Cunk Is Weird Enough to Take on the World
            </h2>

            <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
              The new Netflix show “Cunk on Earth” looks like an ambitious BBC
              documentary. Until its fictional host, created by Charlie Brooker,
              starts to ask some deeply silly questions. The new Netflix show
              “Cunk on Earth” looks like an ambitious BBC documentary. Until
            </p>
          </div>
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
        <div className="grid grid-cols-12 gap-10 mb-16">
          {/* Left Small News (3 cols) */}
          <div className="col-span-12 lg:col-span-3">
            <span className="bg-[#861212] text-white text-xs px-3 py-1 rounded-full">
              Live
            </span>

            <h3 className="font-semibold text-lg mt-4 mb-2">
              NATO Officials Confirm New Aid Package After Emergency Talks
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the dummy text ever since the Philomena Cunk Is
            </p>
          </div>

          {/* Center Big Featured (6 cols) */}
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-4">
              <Image src={poli} alt="news-image" />
            </div>

            <h2 className="font-bold text-3xl text-[#212121] mb-2">
              Western Allies Signal Long-Term Military Support as Fighting
              Intensifies in Easter..
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6 w-[90%] pt-2 border-t border-[#D1D1D1]">
              The new Netflix show “Cunk on Earth” looks like an ambitious BBC
              documentary. Until its fictional host, created by Charlie Brooker,
              starts to ask some deeply silly questions. The new Netflix show
              “Cunk on Earth” looks like an ambitious BBC documentary. Until
            </p>
          </div>

          {/* Right Small News (3 cols) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="mb-4">
              <Image src={poli1} alt="news-image" className="rounded-md" />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              Philomena Cunk Is Weird Enough to Take on the World
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6 pt-2 border-t border-[#D1D1D1]">
              The new Netflix show looks like an ambitious BBC documentary.
            </p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-[#D1D1D1] mb-12" />

        {/* More Articles Grid */}
        <ExploreMore />
      </div>
    </Container>
  );
}
