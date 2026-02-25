import ExploreMore from "@/src/components/sections/ExploreMore";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Category Title */}
      <h1 className="text-4xl font-heading capitalize mb-10">{slug}</h1>

      {/* Top 2 Featured */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Left Featured */}
        <div className="group cursor-pointer">
          <div className="relative h-[300px] w-full overflow-hidden rounded-md mb-5">
            <Image
              src="/images/featured1.png"
              alt="Featured News"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <h2 className="text-2xl font-heading leading-snug mb-3 group-hover:text-action transition-colors">
            Philomena Cunk Is Weird Enough to Take on the World
          </h2>

          <p className="text-xs text-gray-500 mb-4 tracking-wide">
            ● BBC • 3h ago • 4 Min Read
          </p>

          <p className="text-gray-600 text-sm leading-6 border-t pt-4">
            The new Netflix show "Cunk on Earth" looks like an ambitious BBC
            documentary. Until its fictional host, created by Charlie Brooker,
            starts to ask some deeply silly questions.
          </p>
        </div>

        {/* Right Featured */}
        <div className="group cursor-pointer">
            <div className="relative h-[300px] w-full overflow-hidden rounded-md mb-5">
              <Image
                src="/images/featured1.png"
                alt="Featured News"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h2 className="text-2xl font-heading leading-snug mb-3 group-hover:text-action transition-colors">
              Philomena Cunk Is Weird Enough to Take on the World
            </h2>

            <p className="text-xs text-gray-500 mb-4 tracking-wide">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-gray-600 text-sm leading-6 border-t pt-4">
              The new Netflix show "Cunk on Earth" looks like an ambitious BBC
              documentary. Until its fictional host, created by Charlie Brooker,
              starts to ask some deeply silly questions.
            </p>
        </div>
      </div>

     
      {/* Divider */}
      <div className="border-t mb-12" />

      {/* Section Tag Navigation */}
        <div className="flex flex-wrap gap-6 text-sm font-medium mb-10 text-gray-700">
          <span className="uppercase font-semibold text-black">
            The Ukraine War
          </span>
          <span className="hover:text-action cursor-pointer">
            Latest Developments ↗
          </span>
          <span className="hover:text-action cursor-pointer">
            Front-Line Shifts ↗
          </span>
          <span className="hover:text-action cursor-pointer">
            NATO Response ↗
          </span>
          <span className="hover:text-action cursor-pointer">
            Russia’s Strategy ↗
          </span>
          <span className="hover:text-action cursor-pointer">
            Global Impact ↗
          </span>
        </div>

      {/* 3 Column Highlight Section */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {/* Left Small News */}
          <div>
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
              Live
            </span>

            <h3 className="font-semibold text-lg mt-4 mb-2">
              NATO Officials Confirm New Aid Package After Emergency Talks
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Center Big Featured */}
          <div>
            <div className="bg-gray-300 h-[240px] rounded-md mb-4" />

            <h2 className="font-semibold text-xl mb-2">
              Western Allies Signal Long-Term Military Support as Fighting
              Intensifies
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6">
              The new Netflix show looks like an ambitious BBC documentary. Until
              its fictional host starts asking deeply silly questions.
            </p>
          </div>

          {/* Right Small Featured */}
          <div>
            <div className="bg-gray-200 h-[180px] rounded-md mb-4" />

            <h3 className="font-semibold text-lg mb-2">
              Philomena Cunk Is Weird Enough to Take on the World
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-sm text-gray-600 leading-6">
              The new Netflix show looks like an ambitious BBC documentary.
            </p>
          </div>
        </div>

      {/* Bottom Divider */}
      <div className="border-t mb-12" />
      {/* More Articles Grid */}
      <ExploreMore />
    </div>
  );
}
