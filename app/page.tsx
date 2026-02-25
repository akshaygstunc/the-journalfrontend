import Navbar from "@/src/components/layout/Navbar";
import { SectionHeader } from "@/src/components/SectionHeader";


export default function Home() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">

      <Navbar />

      <div className="max-w-[1200px] mx-auto mt-12 space-y-20">

        {/* HERO SECTION */}
        <div className="grid grid-cols-3 gap-10">

          <div className="col-span-2">
            <div className="bg-gray-300 h-[420px] rounded-md" />

            <h1 className="font-heading font-bold text-h1 mt-6">
              Gen Z toppled an autocrat - but old guard tipped to win Bangladesh vote
            </h1>

            <p className="text-micro text-label mt-3">
              ● BBC • 3h ago • 4 Min Read
            </p>

            <p className="text-bodyM text-gray-700 mt-6">
              Rahat Hossain was almost killed trying to save his friend in a youth uprising...
            </p>
          </div>

          <div className="space-y-8">
             <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
            <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
            <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
          </div>

        </div>

        {/* MOST WATCHED */}
        <div>
          <SectionHeader title="Most Watched" />
          <div className="grid grid-cols-4 gap-8 mt-8">
            <div>
      <div className="relative">
        <div className="bg-gray-300 h-40 rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 p-3 rounded-full">▶</div>
        </div>
      </div>

      <span className="bg-action text-white text-micro px-2 py-1 rounded-full mt-3 inline-block">
        Live
      </span>

      <h3 className="font-heading font-bold text-h6 mt-3">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>
    </div>
            <div>
      <div className="relative">
        <div className="bg-gray-300 h-40 rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 p-3 rounded-full">▶</div>
        </div>
      </div>

      <span className="bg-action text-white text-micro px-2 py-1 rounded-full mt-3 inline-block">
        Live
      </span>

      <h3 className="font-heading font-bold text-h6 mt-3">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>
    </div>
            <div>
      <div className="relative">
        <div className="bg-gray-300 h-40 rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 p-3 rounded-full">▶</div>
        </div>
      </div>

      <span className="bg-action text-white text-micro px-2 py-1 rounded-full mt-3 inline-block">
        Live
      </span>

      <h3 className="font-heading font-bold text-h6 mt-3">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>
    </div>
            <div>
      <div className="relative">
        <div className="bg-gray-300 h-40 rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 p-3 rounded-full">▶</div>
        </div>
      </div>

      <span className="bg-action text-white text-micro px-2 py-1 rounded-full mt-3 inline-block">
        Live
      </span>

      <h3 className="font-heading font-bold text-h6 mt-3">
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
              <div className="bg-gray-300 h-[400px] rounded-md" />

              <h2 className="font-heading font-bold text-h4 mt-6">
                Gen Z toppled an autocrat - but old guard tipped to win Bangladesh vote
              </h2>

              <p className="text-bodyM text-gray-600 mt-4">
                Rahat Hossain was almost killed trying to save his friend...
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
            </div>

          </div>

          <div className="grid grid-cols-4 gap-8 mt-12">
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
          </div>
        </div>

        {/* EXPLORE MORE */}
        <div>
          <SectionHeader title="Explore More" />

          <div className="grid grid-cols-3 gap-10 mt-8">

            <div className="col-span-2">
              <div className="bg-gray-300 h-[420px] rounded-md" />

              <h2 className="font-heading font-bold text-h4 mt-6">
                Gen Z toppled an autocrat - but old guard tipped to win Bangladesh vote
              </h2>

              <p className="text-bodyM text-gray-600 mt-4">
                Rahat Hossain was almost killed trying to save his friend...
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
              <div className="border-b pb-6">
      <h3 className="font-heading font-bold text-h6 text-heading">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
            </div>

          </div>

          <div className="grid grid-cols-4 gap-8 mt-12">
            <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
            <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
             <div>
      <div className="bg-gray-300 h-48 rounded-md" />

      <h3 className="font-heading font-bold text-h5 mt-4">
        Philomena Cunk Is Weird Enough to Take on the World
      </h3>

      <p className="text-micro text-label mt-2">
        ● BBC • 3h ago • 4 Min Read
      </p>

      <p className="text-bodyM text-gray-600 mt-3">
        The new Netflix show looks like an ambitious BBC documentary...
      </p>
    </div>
          </div>
        </div>

        {/* ALSO IN NEWS */}
        <div className="pb-20">
          <SectionHeader title="Also In News" />

          <div className="grid grid-cols-2 gap-12 mt-10">
            {[1,2,3,4,5,6].map((i)=>(
              <div key={i} className="border-b pb-6">
                <h3 className="font-heading font-bold text-h6">
                  Philomena Cunk Is Weird Enough to Take on the World
                </h3>
                <p className="text-micro text-label mt-2">
                  ● BBC • Nature • 3h ago • 4 Min Read
                </p>
                <p className="text-bodyM text-gray-600 mt-3">
                  The new Netflix show looks like an ambitious BBC documentary...
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
