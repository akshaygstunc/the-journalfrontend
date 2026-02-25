export default function ExploreMore() {
  return (
    <div className="mt-16">
      
      {/* Section Title */}
      <h2 className="text-3xl font-heading mb-8">
        Explore More
      </h2>

      {/* Articles List */}
      <div className="space-y-10">

        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-6 border-b pb-8">

            {/* Image */}
            <div className="w-[220px] h-[150px] bg-gray-300 rounded-md shrink-0" />

            {/* Content */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Philomena Cunk Is Weird Enough to Take on the World
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                ● BBC • Nature • 3h ago • 4 Min Read
              </p>

              <p className="text-sm text-gray-600 leading-6">
                The new Netflix show looks like an ambitious BBC documentary.
                Until its fictional host, created by Charlie Brooker,
                starts to ask some deeply silly questions.
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}