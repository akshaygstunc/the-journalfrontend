"use client";
import Image from "next/image";
import pem from "../../../public/images/pem1.png";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ExploreMore({ news }: any) {
  const [visible, setVisible] = useState(3);
  const params = useParams();

  const id = params.sub as string;
  const slug = params.slug as string;
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };
  return (
    <div className="mt-10 md:mt-16">
      {/* Section Title */}
      <h2 className="text-[40px] font-bold text-[#212121] mb-8">
        Explore More
      </h2>

      {/* Articles List */}
      <div className="space-y-10">
        {news.slice(0, visible).map((item: any, index: number) => (
          <Link href={`/category/${slug}/${item._id}`}>
            <div key={item} className="md:flex-row flex flex-col gap-6 pb-8">
              {/* Image */}

              <div className="lg:w-75 w-full">
                <Image
                  src={item.image || pem}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-[24px] md:text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
                  {item.title}
                </h2>

                <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
                  ● {item.source}
                </p>

                <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
                  {item.summary}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Load More Button */}
      {visible < news.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-[#861212] text-white rounded-md hover:bg-[#6d0f0f]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
