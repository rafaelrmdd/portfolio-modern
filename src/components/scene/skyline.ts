/**
 * Deterministic skyline generation for the hero scene.
 *
 * The alternative was hand-typing sixty <rect> elements per depth layer, which
 * nobody can read or tune. Seeded so the city is identical on every render and
 * between server and client — change a seed to reroll a layer.
 */

export type Window = { x: number; y: number; w: number; h: number; dim: boolean };

export type Skyline = {
  path: string;
  windows: Window[];
  antennas: { x: number; y: number; h: number }[];
};

/** mulberry32 — small, fast, good enough for scenery. */
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type SkylineOptions = {
  seed: number;
  /** Horizontal span to fill, in viewBox units. */
  width: number;
  /** Baseline the buildings stand on. */
  baseY: number;
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  maxWidth: number;
  /** 0 = no windows. Fraction of each facade that gets a window grid. */
  windowDensity?: number;
  antennaChance?: number;
};

export function buildSkyline({
  seed,
  width,
  baseY,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  windowDensity = 0,
  antennaChance = 0,
}: SkylineOptions): Skyline {
  const random = seededRandom(seed);

  // Overshoot both edges so parallax translation never exposes a gap.
  const startX = -120;
  const endX = width + 120;

  const segments: string[] = [`M ${startX} ${baseY}`];
  const windows: Window[] = [];
  const antennas: { x: number; y: number; h: number }[] = [];

  let x = startX;

  while (x < endX) {
    const w = minWidth + random() * (maxWidth - minWidth);
    const h = minHeight + random() * (maxHeight - minHeight);
    const top = baseY - h;

    // Roughly one building in four is stepped rather than a flat box.
    const stepped = random() < 0.26;

    if (stepped) {
      const inset = w * (0.16 + random() * 0.18);
      const shoulder = top + h * (0.12 + random() * 0.16);
      segments.push(
        `L ${x} ${shoulder}`,
        `L ${x + inset} ${shoulder}`,
        `L ${x + inset} ${top}`,
        `L ${x + w - inset} ${top}`,
        `L ${x + w - inset} ${shoulder}`,
        `L ${x + w} ${shoulder}`,
      );
    } else {
      segments.push(`L ${x} ${top}`, `L ${x + w} ${top}`);
    }

    if (antennaChance > 0 && random() < antennaChance) {
      antennas.push({
        x: x + w / 2,
        y: top,
        h: 24 + random() * 58,
      });
    }

    if (windowDensity > 0) {
      const cell = 9;
      const pad = 4;
      const cols = Math.floor((w - pad * 2) / cell);
      const rows = Math.floor((h - pad * 2) / cell);

      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          if (random() > windowDensity) continue;
          windows.push({
            x: x + pad + col * cell,
            y: top + pad + row * cell,
            w: 3.4,
            h: 4.6,
            dim: random() < 0.42,
          });
        }
      }
    }

    x += w;
  }

  segments.push(`L ${x} ${baseY}`, `L ${endX + 200} ${baseY}`, "Z");

  return { path: segments.join(" "), windows, antennas };
}

/** Rain streaks for one depth layer. */
export function buildRain(seed: number, count: number, width: number, height: number) {
  const random = seededRandom(seed);

  return Array.from({ length: count }, () => ({
    x: random() * (width + 200) - 100,
    y: random() * height,
    length: 14 + random() * 30,
    opacity: 0.14 + random() * 0.34,
  }));
}
