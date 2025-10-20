import { COLORS } from "@/lib/constants";

interface PageTitleProps {
  text: string;
  color?: string;
}

export default function PageTitle({ text, color }: PageTitleProps) {
  return (
    <h1
      className="text-3xl md:text-4xl font-bold text-center mb-10"
      style={{ color: color || COLORS.primary }}
    >
      {text}
    </h1>
  );
}
