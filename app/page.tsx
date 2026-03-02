import Container from "@/src/components/layout/Container";
import { SectionHeader } from "@/src/components/SectionHeader";
import Image from "next/image";
import em from "./../public/images/em.png";
import em1 from "./../public/images/em1.png";
import em2 from "./../public/images/em2.png";
import em3 from "./../public/images/em3.png";
import em4 from "./../public/images/em4.png";
import tn from "./../public/images/tn.png";
import tn1 from "./../public/images/tn1.png";
import tn2 from "./../public/images/tn2.png";
import tn3 from "./../public/images/tn3.png";
import tn4 from "./../public/images/tn4.png";
import mw1 from "./../public/images/mw1.png";
import mw2 from "./../public/images/mw2.png";
import mw3 from "./../public/images/mw3.png";
import mw4 from "./../public/images/mw4.png";

export default function Home() {
  return (
    <Container>
      <div className="bg-[#f5f5f5a9] min-h-screen font-sans">
        <div className="w-full mx-auto mt-12 space-y-20">
          {/* HERO SECTION */}
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2">
              <div className="bg-gray-300 h-[526px] rounded-md" />

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

          {/* MOST WATCHED */}
          <div>
            <SectionHeader title="Most Watched" />
            <div className="grid grid-cols-4 gap-8 mt-8">
              <div>
                  <div>
                    <Image src={mw1} alt="news-image" />
                  </div>

                <span className="bg-[#861212] text-white text-micro px-6 py-1 rounded-full mt-3 inline-block">
                  Live
                </span>

                <h3 className="font-heading font-bold text-[20px] mt-3">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>
              </div>
              <div>
                  <div>
                    <Image src={mw2} alt="news-image" />
                  </div>
                  

                <span className="bg-[#861212] text-white text-micro px-6 py-1 rounded-full mt-3 inline-block">
                  Live
                </span>

                <h3 className="font-heading font-bold text-[20px] mt-3">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>
              </div>
              <div>
                  <div>
                    <Image src={mw3} alt="news-image" />
                  </div>
                 

                <span className="bg-[#861212] text-white text-micro px-6 py-1 rounded-full mt-3 inline-block">
                  Live
                </span>

                <h3 className="font-heading font-bold text-[20px] mt-3">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>
              </div>
              <div>
                  <div>
                    <Image src={mw4} alt="news-image" />
                  </div>
                

                <span className="bg-[#861212] text-white text-micro px-6 py-1 rounded-full mt-3 inline-block">
                  Live
                </span>

                <h3 className="font-heading font-bold text-[20px] mt-3">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>
              </div>
            </div>
          </div>

          {/* TRENDING NEWS */}
          <div>
            <SectionHeader title="Trending News" />

            <div className="grid grid-cols-3 gap-10 mt-8">
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

            <div className="grid grid-cols-4 gap-8 mt-12">
              <div>
                <div>
                  <Image src={tn1} alt="news-image" />
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
                <div>
                  <Image src={tn2} alt="news-image" />
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
                <div>
                  <Image src={tn3} alt="news-image" />
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
                <div>
                  <Image src={tn4} alt="news-image" />
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

          {/* EXPLORE MORE */}
          <div>
            <SectionHeader title="Explore More" />

            <div className="grid grid-cols-3 gap-10 mt-8">
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

            <div className="grid grid-cols-4 gap-8 mt-12">
              <div>
                <div>
                  <Image src={em1} alt="news-image" />
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
                <div>
                  <Image src={em2} alt="news-image" />
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
                <div>
                  <Image src={em3} alt="news-image" />
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
                <div>
                  <Image src={em4} alt="news-image" />
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
          <div className="pb-20">
            <SectionHeader title="Also In News" />

            <div className="grid grid-cols-2 gap-12 mt-10">
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
