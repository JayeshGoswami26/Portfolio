import Reveal from "@/components/ui/Reveal";

interface SectionNumProps {
  seal: string;
  label: string;
}

/** "SECTION №0X" eyebrow with its hanko seal. */
export default function SectionNum({ seal, label }: SectionNumProps) {
  return (
    <Reveal className="section-num">
      <span className="seal">{seal}</span> {label}
    </Reveal>
  );
}
