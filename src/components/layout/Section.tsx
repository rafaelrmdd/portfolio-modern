import type { ReactNode } from "react";

import { Reveal } from "../ui/Reveal";
import { Container } from "./Container";

export function Section({
  id,
  label,
  heading,
  intro,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{label}</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {heading}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </Reveal>

        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
