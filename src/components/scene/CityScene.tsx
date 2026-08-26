import { useMemo } from "react";

import { buildRain, buildSkyline } from "./skyline";

const VIEW_W = 1600;
const VIEW_H = 900;

/** Top of the parapet the figure stands on. Everything else is placed off it. */
const ROOF_Y = 648;

/**
 * The hero artwork: a figure standing on a rooftop parapet, back to us,
 * looking out over the city.
 *
 * Authored as SVG rather than shipped as an image so it recolors with the
 * theme (every fill reads a --scene-* custom property), stays sharp at any
 * viewport, and costs a few KB instead of a few hundred. Depth layers carry a
 * translation driven by --mx/--my, which Hero sets from pointer position — the
 * parallax is pure CSS, so it costs no React renders.
 */
export function CityScene() {
  const far = useMemo(
    () =>
      buildSkyline({
        seed: 20260826,
        width: VIEW_W,
        baseY: 520,
        minHeight: 70,
        maxHeight: 210,
        minWidth: 44,
        maxWidth: 108,
      }),
    [],
  );

  const mid = useMemo(
    () =>
      buildSkyline({
        seed: 71177,
        width: VIEW_W,
        baseY: 596,
        minHeight: 120,
        maxHeight: 330,
        minWidth: 70,
        maxWidth: 148,
        windowDensity: 0.36,
        antennaChance: 0.34,
      }),
    [],
  );

  const near = useMemo(
    () =>
      buildSkyline({
        seed: 4242,
        width: VIEW_W,
        baseY: ROOF_Y,
        minHeight: 150,
        maxHeight: 290,
        minWidth: 130,
        maxWidth: 250,
        windowDensity: 0.17,
        antennaChance: 0.18,
      }),
    [],
  );

  const rainBack = useMemo(() => buildRain(11, 52, VIEW_W, VIEW_H), []);
  const rainFront = useMemo(() => buildRain(29, 30, VIEW_W, VIEW_H), []);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-sky-1)" />
          <stop offset="55%" stopColor="var(--scene-sky-1)" />
          <stop offset="100%" stopColor="var(--scene-sky-2)" />
        </linearGradient>

        <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--scene-sun)" stopOpacity="0.65" />
          <stop offset="55%" stopColor="var(--scene-sun)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--scene-sun)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="horizon-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-haze)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--scene-haze)" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="fade-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.85" />
        </linearGradient>

        <filter id="neon-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* --- sky and moon ----------------------------------------------- */}
      <rect width={VIEW_W} height={VIEW_H} fill="url(#sky)" />
      <g style={{ animation: "drift 30s ease-in-out infinite" }}>
        <circle cx={930} cy={262} r={320} fill="url(#moon-glow)" />
        <circle cx={930} cy={262} r={104} fill="var(--scene-sun)" opacity="0.45" />
      </g>
      <rect y={250} width={VIEW_W} height={360} fill="url(#horizon-haze)" />

      {/* --- far skyline ------------------------------------------------ */}
      <g
        className="scene-layer"
        style={{
          transform:
            "translate(calc(var(--mx, 0) * -9px), calc(var(--my, 0) * -5px))",
        }}
      >
        <path d={far.path} fill="var(--scene-far)" opacity="0.9" />
      </g>

      {/* --- mid skyline, the lit one ----------------------------------- */}
      <g
        className="scene-layer"
        style={{
          transform:
            "translate(calc(var(--mx, 0) * -20px), calc(var(--my, 0) * -11px))",
        }}
      >
        <path d={mid.path} fill="var(--scene-mid)" />

        {mid.antennas.map((antenna, index) => (
          <g key={index}>
            <line
              x1={antenna.x}
              y1={antenna.y}
              x2={antenna.x}
              y2={antenna.y - antenna.h}
              stroke="var(--scene-mid)"
              strokeWidth="2.5"
            />
            <circle
              cx={antenna.x}
              cy={antenna.y - antenna.h}
              r="3"
              fill="var(--scene-neon-a)"
              style={{
                animation: `pulse-dot ${2.4 + (index % 5) * 0.6}s ease-in-out infinite`,
              }}
            />
          </g>
        ))}

        <g fill="var(--scene-window)">
          {mid.windows.map((win, index) => (
            <rect
              key={index}
              x={win.x}
              y={win.y}
              width={win.w}
              height={win.h}
              opacity={win.dim ? 0.24 : 0.78}
            />
          ))}
        </g>

        {/* Signage — the only fully saturated things in the scene. */}
        <g filter="url(#neon-glow)">
          <rect x={214} y={286} width={7} height={158} fill="var(--scene-neon-a)" />
          <rect
            x={470}
            y={366}
            width={108}
            height={6}
            fill="var(--scene-neon-b)"
            style={{ animation: "flicker 6.5s steps(1, end) infinite" }}
          />
          <rect x={1246} y={238} width={6} height={132} fill="var(--scene-neon-b)" />
          <rect
            x={1386}
            y={318}
            width={90}
            height={6}
            fill="var(--scene-neon-a)"
            style={{ animation: "flicker 9s steps(1, end) infinite" }}
          />
          <rect x={676} y={402} width={5} height={96} fill="var(--scene-neon-a)" />
          <rect x={1520} y={362} width={6} height={112} fill="var(--scene-neon-b)" />
        </g>

        {/* Traffic lanes between the towers. */}
        <g opacity="0.7">
          <rect x={0} y={486} width={VIEW_W} height={1.5} fill="var(--scene-neon-b)" opacity="0.25" />
          <rect
            x={300}
            y={480}
            width={90}
            height={3}
            fill="var(--scene-neon-b)"
            filter="url(#neon-glow)"
          />
          <rect
            x={1108}
            y={444}
            width={64}
            height={3}
            fill="var(--scene-neon-a)"
            filter="url(#neon-glow)"
          />
        </g>
      </g>

      {/* --- near skyline ----------------------------------------------- */}
      <g
        className="scene-layer"
        style={{
          transform:
            "translate(calc(var(--mx, 0) * -34px), calc(var(--my, 0) * -17px))",
        }}
      >
        <path d={near.path} fill="var(--scene-near)" />
        <g fill="var(--scene-window)">
          {near.windows.map((win, index) => (
            <rect
              key={index}
              x={win.x}
              y={win.y}
              width={win.w}
              height={win.h}
              opacity={win.dim ? 0.12 : 0.36}
            />
          ))}
        </g>
      </g>

      {/* --- rain behind the figure ------------------------------------- */}
      <g
        className="scene-rain"
        stroke="var(--scene-rain)"
        strokeWidth="1.3"
        style={{ animation: "rain-fall 1.5s linear infinite" }}
      >
        {rainBack.map((drop, index) => (
          <line
            key={index}
            x1={drop.x}
            y1={drop.y}
            x2={drop.x - 8}
            y2={drop.y + drop.length}
            opacity={drop.opacity * 1.35}
          />
        ))}
      </g>

      {/* --- rooftop and figure ----------------------------------------- */}
      <g
        className="scene-layer"
        style={{
          transform:
            "translate(calc(var(--mx, 0) * -54px), calc(var(--my, 0) * -24px))",
        }}
      >
        <Figure />

        {/* Parapet, then the roof slab running to the bottom of the frame. */}
        <rect
          x={-160}
          y={ROOF_Y}
          width={VIEW_W + 320}
          height={VIEW_H - ROOF_Y + 40}
          fill="var(--scene-fore)"
        />
        <rect
          x={-160}
          y={ROOF_Y}
          width={VIEW_W + 320}
          height={4}
          fill="var(--scene-neon-b)"
          opacity="0.3"
          filter="url(#neon-glow)"
        />

        {/* Roof clutter, kept to the left where the headline scrim covers it. */}
        <g fill="var(--scene-fore)">
          <rect x={90} y={ROOF_Y - 54} width={132} height={54} />
          <rect x={116} y={ROOF_Y - 72} width={26} height={20} />
          <rect x={286} y={ROOF_Y - 34} width={74} height={34} />
          <path d={`M420 ${ROOF_Y} L420 ${ROOF_Y - 150} L426 ${ROOF_Y - 150} L426 ${ROOF_Y} Z`} />
          <path d={`M404 ${ROOF_Y - 150} L442 ${ROOF_Y - 150} L442 ${ROOF_Y - 156} L404 ${ROOF_Y - 156} Z`} />
        </g>
        <g fill="var(--scene-fore)">
          <rect x={1290} y={ROOF_Y - 42} width={96} height={42} />
          <rect x={1436} y={ROOF_Y - 66} width={58} height={66} />
        </g>
        <circle
          cx={423}
          cy={ROOF_Y - 162}
          r={4}
          fill="var(--scene-neon-a)"
          style={{ animation: "pulse-dot 3.1s ease-in-out infinite" }}
        />
      </g>

      {/* --- rain in front ---------------------------------------------- */}
      <g
        className="scene-rain"
        stroke="var(--scene-rain)"
        strokeWidth="1.8"
        style={{ animation: "rain-fall 1.05s linear infinite" }}
      >
        {rainFront.map((drop, index) => (
          <line
            key={index}
            x1={drop.x}
            y1={drop.y}
            x2={drop.x - 12}
            y2={drop.y + drop.length * 1.4}
            opacity={drop.opacity * 0.85}
          />
        ))}
      </g>

      <rect y={VIEW_H - 210} width={VIEW_W} height={210} fill="url(#fade-down)" />
    </svg>
  );
}

/**
 * The figure, seen from behind: long coat and hair pulled leftward by the wind
 * coming off the roof, rim-lit cyan on the windward edge and rose on the lee
 * edge by the signage below. Drawn in a local 100 x 230 box and placed by the
 * transform, so changing the pose means editing one set of small numbers.
 */
function Figure() {
  const HEIGHT = 348;
  const SCALE = HEIGHT / 231;
  const WIDTH = 100 * SCALE;
  const CENTER_X = 900;

  return (
    <g
      transform={`translate(${CENTER_X - WIDTH / 2} ${ROOF_Y - HEIGHT}) scale(${SCALE})`}
    >
      {/* Backlight, so the silhouette separates from the towers behind it. */}
      <ellipse
        cx={50}
        cy={115}
        rx={74}
        ry={130}
        fill="var(--scene-neon-a)"
        opacity="0.32"
        filter="url(#soft-glow)"
      />

      <g fill="var(--scene-figure)">
        {/* Legs. The coat hem sits at mid-calf so roughly a quarter of the
            figure is leg — at the first pass the hem reached the ankle and the
            whole thing read as a bollard. */}
        <path d="M39 174 L35 221 L32 231 L52 231 L52 176 Z" />
        <path d="M56 176 L56 231 L76 231 L73 221 L69 174 Z" />

        {/* Long coat: narrow through the body, modest hem flare, one long
            windward tail. The wind lives in the tail and the scarf, not in a
            full-width flare — that read as a cape. */}
        <path
          d="M50 42
             C 38 42, 30 50, 28.5 63
             C 27.5 80, 26.5 96, 26 112
             C 25.5 136, 25 156, 24.5 172
             L 14 187
             L 30 180
             L 69 180
             L 86 189
             L 75.5 172
             C 75 156, 74.5 136, 74 112
             C 73.5 96, 72.5 80, 71.5 63
             C 70 50, 62 42, 50 42 Z"
        />

        {/* Collar, standing up against the wind. */}
        <path d="M36 40 C 41 31, 59 31, 64 40 L 60 50 L 40 50 Z" />

        {/* Neck */}
        <rect x={44.5} y={29} width={11} height={13} />

        {/* Head — one seventh of the figure, which is what stops it reading
            as a doll. */}
        <ellipse cx={50} cy={18} rx={12.5} ry={15} />

        {/* Hair: a close cap plus a blunt tail streaming with the coat. */}
        <path d="M37.5 14 C 38 3, 62 2, 62.5 14 C 59 6, 41 6, 37.5 14 Z" />
        <path d="M41 9 C 31 7, 23 14, 17 26 C 22 22, 27 20, 31 20 C 35 13, 37 11, 42 13 Z" />

      </g>

      {/* Rim light: cyan on the windward edge, rose on the lee edge. */}
      <g fill="none" strokeLinecap="round" filter="url(#neon-glow)">
        <path
          d="M38 12 C 39 3, 61 3, 62 13
             M28.5 63 C 27.5 80, 26.5 96, 26 112 C 25.5 136, 25 156, 24.5 172 L 14 187"
          stroke="var(--scene-neon-b)"
          strokeWidth="2.4"
          opacity="0.95"
        />
        <path
          d="M71.5 63 C 72.5 80, 73.5 96, 74 112 C 74.5 136, 75 156, 75.5 172 L 86 189"
          stroke="var(--scene-neon-a)"
          strokeWidth="2.4"
          opacity="0.9"
        />
      </g>

      {/* Earpiece: one saturated point of light on the head. */}
      <circle
        cx={61}
        cy={20}
        r={2.4}
        fill="var(--scene-neon-b)"
        filter="url(#neon-glow)"
        style={{ animation: "pulse-dot 2.8s ease-in-out infinite" }}
      />
    </g>
  );
}
