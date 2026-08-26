import { useI18n } from "../../i18n/useI18n";

/**
 * THE SWAP POINT.
 *
 * The hero artwork is undecided, so this reserves the space at its final
 * dimensions instead of guessing at a visual. When the WebGL scene is ready,
 * replace the contents of this component with the canvas and nothing else on
 * the page has to move: Hero only knows that something square-ish lives here.
 */
export function HeroVisual() {
  const { t } = useI18n();

  return (
    <div className="relative aspect-square w-full max-w-lg lg:ml-auto">
      <div className="absolute inset-0 rounded-3xl border border-dashed border-line" />

      {/* Corner ticks, so the empty frame reads as deliberate rather than broken. */}
      <span className="absolute -left-px -top-px h-6 w-6 rounded-tl-3xl border-l-2 border-t-2 border-accent" />
      <span className="absolute -bottom-px -right-px h-6 w-6 rounded-br-3xl border-b-2 border-r-2 border-accent" />

      <div className="absolute inset-0 grid place-items-center px-8 text-center">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
            {t.hero.visualPlaceholder}
          </p>
          <p className="mt-2 text-sm text-muted/70">{t.hero.visualHint}</p>
        </div>
      </div>
    </div>
  );
}
