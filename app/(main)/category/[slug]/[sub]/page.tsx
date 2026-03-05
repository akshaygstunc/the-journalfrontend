import HorizontalCard from "@/src/components/cards/HorizontalCard";
import Container from "@/src/components/layout/Container";

export default function CategorySubPage() {
  return (
    <Container>
      <h2 className="text-3xl font-serif font-bold mt-10">Politics</h2>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <HorizontalCard />
        <HorizontalCard />
      </div>

      <h3 className="text-2xl font-semibold mt-14">Explore More</h3>
      <div className="space-y-6 mt-6">
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </div>
    </Container>
  );
}
