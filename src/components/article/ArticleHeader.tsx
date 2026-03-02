import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { SiLinkedin } from "react-icons/si";
import Container from "../layout/Container";

// ArticleHeader.tsx
export default function ArticleHeader() {
  return (
    <Container>
      {/* Title */}
      <h1 className="font-heading text-[40px] md:text-[44px] leading-[1.15] tracking-tight font-bold text-[#1a1a1a] mb-6">
        Gen Z toppled an autocrat - but old guard tipped to win Bangladesh vote
      </h1>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-sm text-[#4F4F4F] font-normal mb-10">
        <div className="flex items-center gap-2">
          <span>● BBC</span>
          <span>• 3h ago</span>
          <span>• 4 Min Read</span>
        </div>

        <div className="flex gap-2">
          <span className="p-2 bg-[#1275B1]  rounded-3xl cursor-pointer hover:text-[#861212] text-xl"><FaLinkedinIn className="text-white " /></span>
          <span className="p-2 rounded-md cursor-pointer hover:text-[#861212] border border-[#E7E7E7] text-xl"><MdOutlineShare /></span>
        </div>
      </div>
    </Container>
  );
}
