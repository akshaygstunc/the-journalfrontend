import HorizontalCard from "@/src/components/cards/HorizontalCard";
import Container from "@/src/components/layout/Container";

export default function SearchPage() {
  return (
    <Container>
      <h2 className="text-3xl font-bold mt-10">
        Showing Results for <span className="text-primary">Election Commission</span>
      </h2>

      <div className="space-y-8 mt-10">
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </div>   
    </Container>
  );
}
