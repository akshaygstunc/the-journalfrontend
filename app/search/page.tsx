import Image from "next/image";
import Container from "@/src/components/layout/Container";
import pem from "../../public/images/pem1.png";

export default function SearchPage() {
  return (
    <Container>
      <div className="mt-10 mb-8">
        <h2 className="text-[50px] font-bold">
          <span className="text-[#6D6D6D]"> Showing Results for </span>
          <span className="text-[#212121]">Election Commission</span>
        </h2>
        <p className="text-xs text-[#4F4F4F]">24 Results</p>
      </div>
      {/* Articles List */}
      <div className="space-y-10  border-b border-[#D1D1D1]">
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
    </Container>
  );
}
