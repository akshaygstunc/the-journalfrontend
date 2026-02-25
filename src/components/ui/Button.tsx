interface Props {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({ children, variant = "primary" }: Props) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        variant === "primary"
          ? "bg-primary text-white hover:bg-red-800"
          : "border border-primary text-primary hover:bg-primary hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
