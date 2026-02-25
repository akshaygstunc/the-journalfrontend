export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-heading font-bold text-h4 text-heading">
        {title}
      </h2>
      <span className="text-action text-buttonM cursor-pointer">
        View All →
      </span>
    </div>
  );
}
