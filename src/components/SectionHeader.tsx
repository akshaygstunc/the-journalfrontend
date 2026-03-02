export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-heading font-bold text-[#212121] text-[40px] text-heading">
        {title}
      </h2>
      <span className="text-[#861212] text-buttonM cursor-pointer">
        View All →
      </span>
    </div>
  );
}
