interface DividerSlashProps {
  left: string;
  kanji: string;
  right: string;
}

/** Horizontal section divider with a center kanji. */
export default function DividerSlash({ left, kanji, right }: DividerSlashProps) {
  return (
    <div className="divider-slash">
      <span>{left}</span>
      <span className="kanji">{kanji}</span>
      <span>{right}</span>
    </div>
  );
}
