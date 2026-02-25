import HorizontalCard from "@/src/components/cards/HorizontalCard";
import Container from "@/src/components/layout/Container";

export default function LatestPage() {
  return (
    <Container>
      <h2 className="text-3xl font-bold mt-10 font-serif">Latest</h2>
      <div className="space-y-8 mt-8">
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </div>
    </Container>
  );
}
