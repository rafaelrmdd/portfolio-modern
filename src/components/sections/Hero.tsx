import { useEffect, useRef } from "react";

import { useI18n } from "../../i18n/useI18n";
import { CityScene } from "../scene/CityScene";
import { Container } from "../layout/Container";

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // Pointer parallax. Written straight to CSS custom properties rather than
  // React state: the scene has ~400 nodes and must not re-render on mousemove.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        element.style.setProperty("--mx", x.toFixed(3));
        element.style.setProperty("--my", y.toFixed(3));
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--mx", "0");
      element.style.setProperty("--my", "0");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    element.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const [firstName, ...restOfName] = t.hero.name.split(" ");
  const lastName = restOfName.join(" ");

  return (
    <section
      ref={sectionRef}
      id="top"
      className="scanlines relative min-h-dvh overflow-hidden"
    >
      {/* On a portrait viewport the scene is scaled to cover a very tall box,
          which puts the figure directly behind the tagline — dark type on a
          dark coat. Confining the artwork to the upper hero on small screens
          keeps the copy on flat background, and a scrim cannot fix it: the
          text sits too far up the gradient to ever be opaque enough. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[62%] lg:h-full">
        <CityScene />
      </div>

      {/* Legibility scrims: one from the left for the type column, one from the
          bottom to seat the whole scene on the page background. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-bg via-bg/55 to-transparent lg:via-bg/25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-linear-to-t from-bg via-bg/40 to-transparent" />

      <div className="relative z-20 flex min-h-dvh flex-col justify-between pb-10 pt-24 sm:pt-28">
        <Container>
          <div className="flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 shrink-0 bg-accent"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
            <span className="hud">{t.hero.eyebrow}</span>
            <span className="hidden h-px flex-1 bg-line sm:block" />
            <span className="hud hidden sm:inline">{t.hero.hud.location}</span>
          </div>
        </Container>

        <Container>
          <h1 className="font-display uppercase leading-[0.8] tracking-[-0.015em] text-[clamp(4rem,13.5vw,11.5rem)]">
            <span className="block">{firstName}</span>
            {lastName && (
              <span className="outlined-fg block">{lastName}</span>
            )}
          </h1>

          <div className="mt-10 grid gap-8 border-t border-line pt-7 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-lg">
              <p className="hud text-accent">{t.hero.role}</p>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                {t.hero.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">
                {t.hero.primaryCta}
              </a>
              <a href="#contact" className="btn btn-ghost">
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Vertical scroll cue, riding the right edge below the rail. */}
      <div className="pointer-events-none absolute bottom-10 right-8 z-20 hidden items-center gap-3 lg:flex lg:flex-col">
        <span className="hud text-fg/70" style={{ writingMode: "vertical-rl" }}>
          {t.hero.scrollHint}
        </span>
        <span className="h-14 w-px bg-linear-to-b from-line to-accent" />
      </div>
    </section>
  );
}
