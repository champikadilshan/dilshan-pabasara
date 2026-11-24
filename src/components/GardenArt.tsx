import type { CSSProperties, SVGProps } from 'react';
import styles from './GardenArt.module.css';

/*
 * Animated artwork for the opening screen and the header, drawn inline so each part can move:
 * lotus petals unfold, the pond ripples, the string lights twinkle, lanterns sway and petals drift down.
 * Everything respects the phone's "reduce motion" setting (see globals.css).
 */

const petalPath = 'M0 0 C -7 -9 -7 -21 0 -30 C 7 -21 7 -9 0 0 Z';

// [angle, scale, unfold delay in ms]: the centre petal first, then outwards
const petals: [number, number, number][] = [
  [-72, 0.78, 420],
  [72, 0.78, 420],
  [-44, 0.92, 280],
  [44, 0.92, 280],
  [-17, 1, 140],
  [17, 1, 140],
  [0, 1.08, 0],
];

type BloomMode = 'load' | 'open' | 'still';

const vars = (values: Record<string, string | number>) => values as CSSProperties;

function LotusBloom({
  x,
  y,
  scale = 1,
  mode = 'still',
  delay = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  mode?: BloomMode;
  delay?: number;
}) {
  const modeClass = mode === 'load' ? styles.bloomLoad : mode === 'open' ? styles.bloomOpen : '';

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="-15" cy="2" rx="17" ry="4.5" fill="#B7C4A0" />
      <ellipse cx="15" cy="2.5" rx="17" ry="4.5" fill="#A9B892" />
      <g
        className={modeClass}
        fill="#FFFFFF"
        stroke="#D8D1BE"
        strokeWidth="0.8"
        strokeLinejoin="round"
        style={vars({ '--d': `${delay}ms` })}
      >
        {petals.map(([angle, size, petalDelay]) => (
          <g
            key={angle}
            className={styles.petal}
            style={vars({ '--r': `${angle}deg`, '--s': size, '--pd': `${petalDelay}ms` })}
          >
            <path d={petalPath} />
          </g>
        ))}
      </g>
      <path d="M0 -5 V -24" stroke="#E9E2CF" strokeWidth="0.7" className={modeClass ? styles.vein : undefined} />
    </g>
  );
}

function Bloom({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="-10" cy="3" rx="9" ry="4" fill="#B7C4A0" transform="rotate(-20 -10 3)" />
      <ellipse cx="11" cy="4" rx="9" ry="4" fill="#A9B892" transform="rotate(18 11 4)" />
      <g fill="#FFFFFF" stroke="#D8D1BE" strokeWidth="0.7">
        <circle cx="-6" cy="-3" r="6.5" />
        <circle cx="6" cy="-4" r="7" />
        <circle cx="0" cy="-10" r="6" />
      </g>
    </g>
  );
}

/** String-light bulbs with a soft glow that twinkles, each on its own beat. */
function Bulbs({ points, r }: { points: [number, number][]; r: number }) {
  return (
    <>
      {points.map(([cx, cy], index) => (
        <g key={cx} className={styles.bulb} style={vars({ '--tw': `${(index * 0.53) % 2.4}s` })}>
          <circle cx={cx} cy={cy} r={r * 2.6} fill="#F3E2B4" className={styles.glow} />
          <circle cx={cx} cy={cy} r={r} fill="#FFFDF6" stroke="#A88A4A" strokeWidth="0.6" />
        </g>
      ))}
    </>
  );
}

/** Opening screen: a white lotus opening on a pond inside the arch window. */
export function OpeningScene({ className }: { className?: string }) {
  const arch = 'M20 290 V 120 A 100 100 0 0 1 220 120 V 290 Z';

  return (
    <svg viewBox="0 0 240 300" width={240} height={300} className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="opening-arch">
          <path d={arch} />
        </clipPath>
      </defs>
      <g clipPath="url(#opening-arch)">
        <rect width="240" height="300" fill="#EEF2E6" />
        <g fill="#C9D4B8" className={styles.leaves}>
          <circle cx="30" cy="70" r="52" />
          <circle cx="105" cy="30" r="48" />
          <circle cx="175" cy="38" r="50" />
          <circle cx="228" cy="86" r="50" />
        </g>
        <g fill="#AFBF97" opacity="0.85">
          <circle cx="18" cy="150" r="40" />
          <circle cx="226" cy="146" r="40" />
        </g>
        <path d="M0 118 Q 120 150 240 118" fill="none" stroke="#7C7461" strokeWidth="0.6" />
        <Bulbs
          r={2.3}
          points={[
            [40, 128],
            [80, 136],
            [120, 139],
            [160, 136],
            [200, 128],
          ]}
        />
        <path d="M0 196 C 60 186 180 186 240 196 V 300 H 0 Z" fill="#FFFFFF" />
        <ellipse cx="120" cy="238" rx="96" ry="26" fill="#DFE7D2" />
        <ellipse cx="120" cy="238" rx="70" ry="16" fill="#D3DEC3" />
        <g fill="none" stroke="#FFFFFF" strokeWidth="1.2">
          <ellipse cx="120" cy="240" rx="40" ry="9" className={styles.ripple} />
          <ellipse cx="120" cy="240" rx="40" ry="9" className={styles.ripple} style={vars({ '--rd': '1.6s' })} />
          <ellipse cx="120" cy="240" rx="40" ry="9" className={styles.ripple} style={vars({ '--rd': '3.2s' })} />
        </g>
        <g fill="#A9BB8C">
          <ellipse cx="56" cy="246" rx="20" ry="6" />
          <ellipse cx="186" cy="232" rx="16" ry="5" />
        </g>
        <ellipse cx="170" cy="254" rx="13" ry="4" fill="#B7C4A0" />
        <LotusBloom x={120} y={238} scale={2.1} mode="load" delay={500} />
        <LotusBloom x={58} y={244} scale={0.7} mode="load" delay={1100} />
        <LotusBloom x={188} y={230} scale={0.6} mode="load" delay={1300} />
      </g>
      <path d={arch} pathLength={1} fill="none" stroke="#A88A4A" strokeWidth="1.2" className={styles.archLine} />
      <path d="M11 298 V 120 A 109 109 0 0 1 229 120 V 298 Z" fill="none" stroke="#DCCFAE" strokeWidth="0.9" />
    </svg>
  );
}

/** Header: the garden in the arch window from the V3c card, with swaying lanterns and lotuses that bloom. */
export function HeroScene(props: SVGProps<SVGSVGElement>) {
  const arch = 'M100 420 V 230 A 170 170 0 0 1 440 230 V 420 Z';

  return (
    <svg viewBox="50 40 440 400" width={440} height={400} aria-hidden="true" focusable="false" {...props}>
      <defs>
        <clipPath id="hero-arch">
          <path d={arch} />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-arch)">
        <rect x="90" y="50" width="360" height="380" fill="#EEF2E6" />
        <g fill="#C9D4B8" className={styles.leaves}>
          <circle cx="110" cy="130" r="70" />
          <circle cx="200" cy="80" r="64" />
          <circle cx="300" cy="72" r="66" />
          <circle cx="410" cy="120" r="72" />
        </g>
        <g fill="#AFBF97" opacity="0.85">
          <circle cx="100" cy="220" r="52" />
          <circle cx="440" cy="214" r="54" />
        </g>
        <path d="M90 186 Q 270 236 450 186" fill="none" stroke="#7C7461" strokeWidth="0.7" />
        <Bulbs
          r={2.6}
          points={[
            [130, 200],
            [175, 209],
            [225, 214],
            [315, 214],
            [365, 209],
            [410, 200],
          ]}
        />
        {[200, 340].map((cx, index) => (
          <g key={cx} className={styles.lantern} style={vars({ '--sd': `${index * -1.7}s` })}>
            <path d={`M${cx} 212 V 223`} stroke="#7C7461" strokeWidth="0.6" />
            <circle cx={cx} cy="234" r="11" fill="#FFFFFF" stroke="#D8D1BE" strokeWidth="0.8" />
            <path d={`M${cx - 9} 230 H ${cx + 9} M${cx - 9} 238 H ${cx + 9}`} stroke="#E6E0D0" strokeWidth="0.6" />
          </g>
        ))}
        <path
          d="M90 280 C 140 272, 166 248, 196 250 C 214 252, 216 268, 204 270 C 194 271, 193 260, 201 258 C 252 242, 320 268, 360 252 C 392 240, 420 240, 450 248 V 380 H 90 Z"
          fill="#FFFFFF"
          stroke="#D8D2C0"
          strokeWidth="0.9"
        />
        <path d="M248 380 V 300 M292 380 V 300" stroke="#E8E2D2" strokeWidth="3.5" />
        <Bloom x={252} y={304} />
        <Bloom x={270} y={298} scale={1.1} />
        <Bloom x={288} y={304} />
        <path d="M90 378 H 450 V 430 H 90 Z" fill="#A9BB8C" />
        <g fill="#F2EEE4" stroke="#D5CDB8" strokeWidth="0.7">
          <rect x="252" y="386" width="36" height="6" rx="2" />
          <rect x="248" y="398" width="44" height="7" rx="2" />
          <rect x="242" y="412" width="56" height="9" rx="3" />
        </g>
        <LotusBloom x={132} y={400} scale={1.15} mode="open" delay={900} />
        <LotusBloom x={408} y={400} scale={1.15} mode="open" delay={1150} />
        <Bloom x={205} y={396} scale={0.8} />
        <Bloom x={335} y={396} scale={0.8} />
      </g>
      <path d={arch} fill="none" stroke="#A88A4A" strokeWidth="1.2" />
      <path d="M90 430 V 230 A 180 180 0 0 1 450 230 V 430 Z" fill="none" stroke="#DCCFAE" strokeWidth="0.9" />
      <path d="M60 430 H 480" stroke="#A88A4A" strokeWidth="0.9" />
    </svg>
  );
}

// Fixed positions so the server and the phone draw the same petals.
const fallingPetals = [
  { left: 6, size: 14, duration: 11, delay: 0, drift: 40, spin: 220 },
  { left: 18, size: 10, duration: 14, delay: 3.5, drift: -30, spin: -260 },
  { left: 29, size: 16, duration: 12, delay: 7, drift: 50, spin: 300 },
  { left: 41, size: 11, duration: 15, delay: 1.5, drift: -45, spin: -200 },
  { left: 53, size: 13, duration: 12.5, delay: 5, drift: 35, spin: 240 },
  { left: 64, size: 9, duration: 16, delay: 9, drift: -25, spin: -320 },
  { left: 75, size: 15, duration: 11.5, delay: 2.5, drift: 45, spin: 280 },
  { left: 86, size: 12, duration: 14.5, delay: 6, drift: -40, spin: -240 },
  { left: 94, size: 10, duration: 13, delay: 10.5, drift: 30, spin: 200 },
];

/**
 * White lotus petals drifting down. `loop` keeps them falling (opening screen);
 * otherwise they fall once, after the invitation is opened (header).
 */
export function Petals({ loop = false }: { loop?: boolean }) {
  return (
    <div className={`${styles.petals} ${loop ? styles.petalsLoop : styles.petalsOnce}`} aria-hidden="true">
      {fallingPetals.map((petal) => (
        <span
          key={petal.left}
          className={styles.falling}
          style={vars({
            left: `${petal.left}%`,
            '--size': `${petal.size}px`,
            '--dur': `${loop ? petal.duration : petal.duration * 0.7}s`,
            '--delay': `${loop ? petal.delay : petal.delay * 0.45}s`,
            '--drift': `${petal.drift}px`,
            '--spin': `${petal.spin}deg`,
          })}
        >
          <svg viewBox="-8 -31 16 32" width="100%" height="100%">
            <path d={petalPath} fill="#FFFFFF" stroke="#D8D1BE" strokeWidth="0.9" />
          </svg>
        </span>
      ))}
    </div>
  );
}
