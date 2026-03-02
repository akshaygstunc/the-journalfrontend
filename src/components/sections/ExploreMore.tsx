import Image from "next/image";
import pem from "../../../public/images/pem1.png"

export default function ExploreMore() {
  return (
    <div className="mt-16">
      {/* Section Title */}
      <h2 className="text-[40px] font-bold text-[#212121] mb-8">
        Explore More
      </h2>

      {/* Articles List */}
      <div className="space-y-10">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-6 pb-8">
            {/* Image */}
            
              <Image src={pem} alt="news-image" />
           

            {/* Content */}
            <div>
              <h2 className="text-[30px] text-[#212121] font-bold leading-snug mb-3 transition-colors">
                Philomena Cunk Is Weird Enough to Take on the World
              </h2>

              <p className="text-xs text-[#4F4F4F] mb-4 tracking-wide">
                ● BBC • 3h ago • 4 Min Read
              </p>

              <p className="text-[#2F2F2F] text-[16px] leading-6 border-t border-[#D1D1D1] pt-4">
                The new Netflix show “Cunk on Earth” looks like an ambitious BBC
                documentary. Until its fictional host, created by Charlie
                Brooker, starts to ask some deeply silly questions. The new
                Netflix show “Cunk on Earth” looks like an ambitious BBC
                documentary. Until The new Netflix show “Cunk on Earth” looks
                like an ambitious BBC documentary. Until its fictional host,
                created by Charlie Brooker, starts to ask some deeply sill..
                ooks like an ambitious BBC documentary. Until its fictional
                host, created by Charlie Brooker, starts to ask some deeply
                sill..
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
