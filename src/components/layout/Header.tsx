import Container from "./Container";
import Navbar from "./Navbar";
import Button from "../ui/Button";

export default function Header() {
  return (
    <header className="border-b">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button className="text-xl">☰</button>
            <input
              placeholder="Search"
              className="border rounded-md px-3 py-1 text-sm"
            />
          </div>

          <h1 className="text-2xl font-bold text-primary font-serif">
            THE JOURNAL
          </h1>

          <div className="flex gap-2">
            <Button variant="outline">Login</Button>
            <Button>SignUp</Button>
          </div>
        </div>
      </Container>
      <Navbar />
    </header>
  );
}
