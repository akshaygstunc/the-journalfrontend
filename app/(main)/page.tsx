"use client";
import Container from "@/src/components/layout/Container";
import { SectionHeader } from "@/src/components/SectionHeader";
import Image from "next/image";
import em from "../../public/images/em.png";
import em1 from "../../public/images/em1.png";
import em2 from "../../public/images/em2.png";
import em3 from "../../public/images/em3.png";
import em4 from "../../public/images/em4.png";
import tn from "../../public/images/tn.png";
import tn1 from "../../public/images/tn1.png";
import tn2 from "../../public/images/tn2.png";
import tn3 from "../../public/images/tn3.png";
import tn4 from "../../public/images/tn4.png";
import mw1 from "../../public/images/mw1.png";
import mw2 from "../../public/images/mw2.png";
import mw3 from "../../public/images/mw3.png";
import mw4 from "../../public/images/mw4.png";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/src/lib/api/news";

// data/homeData.ts

export const heroData = {
  title:
    "Gen Z toppled an autocrat - but old guard tipped to win Bangladesh vote",
  source: "BBC",
  time: "3h ago",
  read: "4 Min Read",
  description:
    "Rahat Hossain was almost killed trying to save his friend in a youth uprising...",
};

export const sideNews = Array(3).fill({
  title: "Philomena Cunk Is Weird Enough to Take on the World",
  source: "BBC",
  time: "3h ago",
  read: "4 Min Read",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
});

export const mostWatched = [
  { image: "mw1" },
  { image: "mw2" },
  { image: "mw3" },
  { image: "mw4" },
];
const imageMap: any = { mw1, mw2, mw3, mw4 };
export const gridNews = Array(4).fill({
  title: "Philomena Cunk Is Weird Enough to Take on the World",
  source: "BBC",
  time: "3h ago",
  read: "4 Min Read",
  description:
    "The new Netflix show looks like an ambitious BBC documentary...",
});

export const alsoNews = Array(6).fill({
  title: "Philomena Cunk Is Weird Enough to Take on the World",
  category: "Nature",
  source: "BBC",
  time: "3h ago",
  read: "4 Min Read",
  description:
    "The new Netflix show looks like an ambitious BBC documentary...",
});
export default function Home() {


  return (
    <Container>
      <div className="bg-[#f5f5f5a9] min-h-screen font-sans">
        <div className="w-full mx-auto mt-12 space-y-20">
          {/* HERO SECTION */}
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10">
            
            <div className="lg:col-span-2 px-4 lg:px-0">
              <div className="bg-gray-300 h-131.5 rounded-md" />

              <h4 className="font-heading font-bold text-[24px] mt-6">
                Gen Z toppled an autocrat - but old guard tipped to win
                Bangladesh vote
              </h4>

              <p className="text-[12px] text-[#4F4F4F] mt-3">
                ● BBC • 3h ago • 4 Min Read
              </p>

              <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                Rahat Hossain was almost killed trying to save his friend in a
                youth uprising that became one of the bloodiest episodes in
                Bangladesh's history. Footage of him trying to pull Emam Hasan
                Taim Bhuiyan, who'd been shot by police, to safety went viral
                during a revolution that toppled the country's leader.
              </p>
            </div>

            <div className="space-y-8 px-4 lg:px-0">
              <div className="pb-6">
                <h3 className="font-heading font-bold text-[18px] text-heading">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1] ">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the dummy text ever since the
                  Philomena Cunk Is{" "}
                </p>
              </div>
              <div className="pb-6">
                <h3 className="font-heading font-bold text-[18px] text-heading">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the dummy text ever since the
                  Philomena Cunk Is{" "}
                </p>
              </div> 
              <div className="pb-6">
                <h3 className="font-heading font-bold text-[18px] text-heading">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the dummy text ever since the
                  Philomena Cunk Is{" "}
                </p>
              </div>
            </div>
          </div>

          {/* MOST WATCHED */}
          <div className="px-4 lg:px-0">
            <SectionHeader title="Most Watched" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {[mw1, mw2, mw3, mw4].map((img, index) => (
                <div key={index} className="flex gap-4 lg:flex-col">
                  {/* Image */}
                  <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                    <Image
                      src={img}
                      alt="news-image"
                       className="w-full h-full object-cover rounded-md" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <span className="bg-[#861212] text-white text-xs px-4 py-1 rounded-full w-fit mb-2">
                      Live
                    </span>

                    <h3 className="font-heading font-bold text-[16px] lg:text-[20px] leading-tight">
                      Philomena Cunk Is Weird Enough to Take on the World
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING NEWS */}
          <div className="px-4 lg:px-0 w-full">
            <SectionHeader title="Trending News" />

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
              <div className="col-span-2">
                <div>
                  <Image src={tn} alt="news-image" />
                </div>

                <h4 className="font-heading font-bold text-[24px] mt-6">
                  Gen Z toppled an autocrat - but old guard tipped to win
                  Bangladesh vote
                </h4>

                <p className="text-[12px] text-[#4F4F4F] mt-3">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                  Rahat Hossain was almost killed trying to save his friend in a
                  youth uprising that became one of the bloodiest episodes in
                  Bangladesh's history. Footage of him trying to pull Emam Hasan
                  Taim Bhuiyan, who'd been shot by police, to safety went viral
                  during a revolution that toppled the country's leader.
                </p>
              </div>

              <div className="space-y-8">
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1] ">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              <div className="flex gap-4 lg:flex-col">
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={tn1} alt="news-image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-h5 mt-0 lg:mt-4">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    The new Netflix show looks like an ambitious BBC
                    documentary...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 lg:flex-col">
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={tn2} alt="news-image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-h5 mt-0 lg:mt-4">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    The new Netflix show looks like an ambitious BBC
                    documentary...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 lg:flex-col">
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={tn3} alt="news-image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-h5 mt-0 lg:mt-4">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    The new Netflix show looks like an ambitious BBC
                    documentary...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 lg:flex-col">
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={tn4} alt="news-image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-h5 mt-0 lg:mt-4">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    The new Netflix show looks like an ambitious BBC
                    documentary...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORE MORE */}
          <div  className="px-4 lg:px-0 w-full">
            <SectionHeader title="Explore More" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
              <div className="col-span-2">
                <div>
                  <Image src={em} alt="news-image" />
                </div>

                <h4 className="font-heading font-bold text-[24px] mt-6">
                  Gen Z toppled an autocrat - but old guard tipped to win
                  Bangladesh vote
                </h4>

                <p className="text-[12px] text-[#4F4F4F] mt-3">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-[#2F2F2F] mt-3 pt-3 border-t border-[#D1D1D1]">
                  Rahat Hossain was almost killed trying to save his friend in a
                  youth uprising that became one of the bloodiest episodes in
                  Bangladesh's history. Footage of him trying to pull Emam Hasan
                  Taim Bhuiyan, who'd been shot by police, to safety went viral
                  during a revolution that toppled the country's leader.
                </p>
              </div>

              <div className="space-y-8">
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1] ">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
                <div className="pb-6">
                  <h3 className="font-heading font-bold text-[18px] text-heading">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>

                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● BBC • 3h ago • 4 Min Read
                  </p>

                  <p className="text-bodyM text-gray-600 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the dummy text ever since the
                    Philomena Cunk Is{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 lg:mt-12">
              <div>
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={em1} alt="news-image"  className="w-full h-full object-cover rounded-md" />
                </div>

                <h3 className="font-heading font-bold text-h5 mt-4">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  The new Netflix show looks like an ambitious BBC
                  documentary...
                </p>
              </div>
              <div>
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={em2} alt="news-image"  className="w-full h-full object-cover rounded-md"  />
                </div>

                <h3 className="font-heading font-bold text-h5 mt-4">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  The new Netflix show looks like an ambitious BBC
                  documentary...
                </p>
              </div>
              <div>
               <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={em3} alt="news-image"  className="w-full h-full object-cover rounded-md" />
                </div>

                <h3 className="font-heading font-bold text-h5 mt-4">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  The new Netflix show looks like an ambitious BBC
                  documentary...
                </p>
              </div>
              <div>
                <div className="w-[110px] h-[110px] lg:w-full lg:h-auto flex-shrink-0">
                  <Image src={em4} alt="news-image" className="w-full h-full object-cover rounded-md"  />
                </div>

                <h3 className="font-heading font-bold text-h5 mt-4">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>

                <p className="text-micro text-label mt-2">
                  ● BBC • 3h ago • 4 Min Read
                </p>

                <p className="text-bodyM text-gray-600 mt-3">
                  The new Netflix show looks like an ambitious BBC
                  documentary...
                </p>
              </div>
            </div>
          </div>

          {/* ALSO IN NEWS */}
          <div className="pb-20 px-4 lg:px-0">
            <SectionHeader title="Also In News" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="pb-4">
                  <h3 className="font-heading font-bold text-[20px]">
                    Philomena Cunk Is Weird Enough to Take on the World
                  </h3>
                  <p className="text-micro text-label mt-2 border-b pb-2 border-[#D1D1D1]">
                    ● BBC • Nature • 3h ago • 4 Min Read
                  </p>
                  <p className="text-bodyM text-[#2F2F2F] mt-3">
                    The new Netflix show looks like an ambitious BBC
                    documentary...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
