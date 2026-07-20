# Jayesh Puri Goswami — Portfolio (Next.js)

Cinematic katana / hannya-mask portfolio, converted from the static HTML site in
`../Portfolio Website` to Next.js (App Router, TypeScript, Tailwind v4, Three.js).

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Structure

```
app/
  layout.tsx            # fonts (next/font), metadata, site chrome + FX canvases
  page.tsx              # assembles the one-page sections in order
  globals.css           # design tokens + full theme (ported styles)
  fonts/                # TheLastShuriken display font (next/font/local)
  icon.svg              # shuriken favicon
components/
  chrome/               # Nav, ChromeCorners (+ live Clock), ScrollProgress, Footer
  fx/                   # KatanaCanvas (Three.js scroll companion), PetalsCanvas (sakura)
  sections/             # Hero (scroll-driven mask cut), Manifesto, Stack, Marquee,
                        # Work, Journey, About, Contact
  ui/                   # Reveal (IntersectionObserver fade-up), SectionNum,
                        # ImageSlot, DividerSlash
lib/
  data/                 # all site content: site.ts, stack.ts, projects.ts, journey.ts
public/
  assets/               # masks, textures, dragon, grain, shuriken mark
  models/katana.glb     # 3D blade model
```

## Editing content

All copy lives in `lib/data/` — nav links, contact details, stack rows, project
cards and the journey timeline. To fill a project card's screenshot, drop the
image in `public/` and set `image: "/your-file.png"` on that project in
`lib/data/projects.ts` (the placeholder frame disappears automatically).
