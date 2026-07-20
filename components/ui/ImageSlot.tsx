import Image from "next/image";

interface ImageSlotProps {
  id: string;
  placeholder: string;
  src?: string;
  alt?: string;
}

/**
 * Project screenshot slot. Renders the image when provided, otherwise a
 * styled placeholder frame — set `image` on the project in
 * lib/data/projects.ts to fill it.
 */
export default function ImageSlot({ id, placeholder, src, alt }: ImageSlotProps) {
  return (
    <div className="image-slot" data-slot-id={id}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? placeholder}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className="cap">
          <span className="mark">◆</span>
          {placeholder}
        </span>
      )}
    </div>
  );
}
