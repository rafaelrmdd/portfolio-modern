import type { ReactNode } from "react";

import { SECTION_IDS, type SectionId } from "../../lib/sections";
import { Reveal } from "../ui/Reveal";
import { Container } from "./Container";

export function Section({
  id,
  label,
  heading,
  intro,
  children,
}: {
  id: SectionId;
  label: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  const index = String(SECTION_IDS.indexOf(id) + 1).padStart(2, "0");

  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <span
              aria-hidden="true"
              className="outlined block font-display text-[clamp(3rem,7vw,6.5rem)] leading-none"
            >
              {index}
            </span>
          </Reveal>

          <Reveal delay={0.06} className="max-w-2xl">
            <p className="hud">{label}</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5.2vw,4rem)] uppercase leading-[0.88] tracking-[-0.01em]">
              {heading}
            </h2>
            {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
          </Reveal>
        </div>

        <div className="mt-9 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}
