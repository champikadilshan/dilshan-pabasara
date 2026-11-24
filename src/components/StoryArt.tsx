import type { ReactNode } from 'react';
import type { StoryArt as StoryArtKind } from '@/config/wedding';

/*
 * Small garden scenes drawn inside the same arch window as the invitation card.
 * Used by "Our Story in Frames" in place of photos.
 */

const petal = 'M0 0 C -7 -9 -7 -21 0 -30 C 7 -21 7 -9 0 0 Z';

function Lotus({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="-15" cy="2" rx="17" ry="4.5" fill="#B7C4A0" />
      <ellipse cx="15" cy="2.5" rx="17" ry="4.5" fill="#A9B892" />
      <g fill="#FFFFFF" stroke="#D8D1BE" strokeWidth="0.8" strokeLinejoin="round">
        <path d={petal} transform="rotate(-72) scale(0.78)" />
        <path d={petal} transform="rotate(72) scale(0.78)" />
        <path d={petal} transform="rotate(-44) scale(0.92)" />
        <path d={petal} transform="rotate(44) scale(0.92)" />
        <path d={petal} transform="rotate(-17)" />
        <path d={petal} transform="rotate(17)" />
        <path d={petal} transform="scale(1.08)" />
      </g>
      <path d="M0 -5 V -24" stroke="#E9E2CF" strokeWidth="0.7" />
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

function Lights({ y = 92 }: { y?: number }) {
  return (
    <>
      <path d={`M0 ${y} Q 100 ${y + 30} 200 ${y}`} fill="none" stroke="#7C7461" strokeWidth="0.6" />
      <g fill="#FFFDF6" stroke="#A88A4A" strokeWidth="0.55">
        {[30, 65, 100, 135, 170].map((cx) => (
          <circle key={cx} cx={cx} cy={y + 30 * 2 * (cx / 200) * (1 - cx / 200) + 1.5} r="2.2" />
        ))}
      </g>
    </>
  );
}

const scenes: Record<StoryArtKind, ReactNode> = {
  // A video camera on a tripod: we met filming Himidiraya
  camera: (
    <>
      <Lights y={84} />
      <path d="M0 176 C 50 168 150 168 200 176 V 250 H 0 Z" fill="#A9BB8C" />
      <g stroke="#3D4634" strokeWidth="2.2" strokeLinecap="round">
        <path d="M96 168 L 76 214 M96 168 L 116 214 M96 168 V 212" />
      </g>
      <rect x="88" y="162" width="16" height="7" rx="2" fill="#3D4634" />
      <g fill="#FFFFFF" stroke="#3D4634" strokeWidth="2">
        <circle cx="80" cy="122" r="11" />
        <circle cx="104" cy="122" r="11" />
      </g>
      <g fill="#3D4634">
        <circle cx="80" cy="122" r="2.5" />
        <circle cx="104" cy="122" r="2.5" />
      </g>
      <rect x="66" y="133" width="50" height="30" rx="4" fill="#3D4634" />
      <path d="M116 141 L 136 132 V 164 L 116 155 Z" fill="#4A5340" />
      <circle cx="75" cy="141" r="2.6" fill="#CDAE72" />
      <path d="M72 156 H 106" stroke="#5C6B4A" strokeWidth="1.2" />
      <Bloom x={30} y={206} scale={1.1} />
      <Bloom x={170} y={206} scale={1.1} />
      <Lotus x={150} y={232} scale={0.7} />
      <Lotus x={44} y={234} scale={0.6} />
    </>
  ),
  // Two lanterns, lit side by side
  lanterns: (
    <>
      <Lights />
      <path d="M66 106 V 124 M134 106 V 124" stroke="#7C7461" strokeWidth="0.6" />
      <g fill="#F3E6CB" opacity="0.7">
        <circle cx="66" cy="140" r="22" />
        <circle cx="134" cy="140" r="22" />
      </g>
      <g fill="#FFFFFF" stroke="#D8D1BE" strokeWidth="0.9">
        <circle cx="66" cy="140" r="15" />
        <circle cx="134" cy="140" r="15" />
      </g>
      <path d="M53 135 H 79 M53 145 H 79 M121 135 H 147 M121 145 H 147" stroke="#E6E0D0" strokeWidth="0.8" />
      <path d="M0 190 C 50 182 150 182 200 190 V 250 H 0 Z" fill="#A9BB8C" />
      <Lotus x={100} y={214} scale={1} />
      <Bloom x={34} y={206} scale={1} />
      <Bloom x={166} y={206} scale={1} />
      <Bloom x={64} y={230} scale={0.7} />
      <Bloom x={136} y={230} scale={0.7} />
    </>
  ),
  // A white lotus opening on the pond
  lotus: (
    <>
      <Lights y={86} />
      <path d="M0 160 C 50 150 150 150 200 160 V 250 H 0 Z" fill="#FFFFFF" />
      <ellipse cx="100" cy="200" rx="86" ry="22" fill="#DFE7D2" />
      <ellipse cx="100" cy="200" rx="60" ry="13" fill="#D3DEC3" />
      <ellipse cx="44" cy="208" rx="16" ry="5" fill="#A9BB8C" />
      <ellipse cx="160" cy="194" rx="13" ry="4" fill="#B7C4A0" />
      <Lotus x={100} y={200} scale={1.75} />
      <Lotus x={46} y={206} scale={0.55} />
      <Lotus x={160} y={194} scale={0.5} />
      <path d="M0 230 H 200 V 250 H 0 Z" fill="#A9BB8C" />
    </>
  ),
  // Two rings beneath the flower arch
  rings: (
    <>
      <path d="M0 150 C 60 140 140 140 200 150 V 250 H 0 Z" fill="#FFFFFF" />
      <path d="M58 212 V 112 M142 212 V 112" stroke="#E8E2D2" strokeWidth="4" />
      <Bloom x={62} y={116} />
      <Bloom x={82} y={106} scale={1.1} />
      <Bloom x={100} y={102} scale={1.15} />
      <Bloom x={118} y={106} scale={1.1} />
      <Bloom x={138} y={116} />
      <g fill="none" strokeWidth="3.2">
        <circle cx="90" cy="160" r="16" stroke="#A88A4A" />
        <circle cx="110" cy="160" r="16" stroke="#CDAE72" />
      </g>
      <path d="M90 144 a 16 16 0 0 1 11 4.4" fill="none" stroke="#A88A4A" strokeWidth="3.2" />
      <path d="M0 210 H 200 V 250 H 0 Z" fill="#A9BB8C" />
      <Lotus x={32} y={226} scale={0.8} />
      <Lotus x={168} y={226} scale={0.8} />
      <Bloom x={100} y={232} scale={0.8} />
    </>
  ),
  // The marriage register and a pen
  register: (
    <>
      <Lights y={80} />
      <path d="M0 150 C 60 140 140 140 200 150 V 250 H 0 Z" fill="#FFFFFF" />
      <path d="M26 196 H 174 L 186 214 H 14 Z" fill="#F2EEE4" stroke="#D5CDB8" strokeWidth="0.8" />
      <g stroke="#D8D1BE" strokeWidth="0.8">
        <path d="M100 150 C 84 142 58 142 44 148 V 192 C 58 186 84 186 100 194 Z" fill="#FFFFFF" />
        <path d="M100 150 C 116 142 142 142 156 148 V 192 C 142 186 116 186 100 194 Z" fill="#FFFFFF" />
      </g>
      <g stroke="#E3D5B8" strokeWidth="0.8">
        <path d="M54 158 H 90 M54 166 H 90 M54 174 H 82" />
        <path d="M110 158 H 146 M110 166 H 140" />
      </g>
      <path
        d="M112 178 C 118 172 124 182 130 175 C 134 171 138 178 142 174"
        fill="none"
        stroke="#8C6D2F"
        strokeWidth="0.9"
      />
      <g transform="rotate(-38 150 172)">
        <rect x="146" y="150" width="6" height="40" rx="2" fill="#3D4634" />
        <path d="M146 190 L 149 199 L 152 190 Z" fill="#A88A4A" />
        <rect x="146" y="150" width="6" height="5" fill="#A88A4A" />
      </g>
      <path d="M0 214 H 200 V 250 H 0 Z" fill="#A9BB8C" />
      <Bloom x={30} y={214} scale={1.1} />
      <Bloom x={170} y={214} scale={1.1} />
      <Lotus x={100} y={236} scale={0.7} />
    </>
  ),
};

export function StoryArt({ kind, id }: { kind: StoryArtKind; id: string }) {
  const clipId = `${id}-arch`;
  const arch = 'M12 250 V 100 A 88 88 0 0 1 188 100 V 250 Z';

  return (
    <svg viewBox="0 0 200 256" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <path d={arch} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="256" fill="#EEF2E6" />
        <g fill="#C9D4B8">
          <circle cx="22" cy="62" r="48" />
          <circle cx="90" cy="20" r="44" />
          <circle cx="160" cy="28" r="46" />
          <circle cx="200" cy="80" r="46" />
        </g>
        <g fill="#AFBF97" opacity="0.85">
          <circle cx="8" cy="132" r="34" />
          <circle cx="196" cy="128" r="34" />
        </g>
        {scenes[kind]}
      </g>
      <path d={arch} fill="none" stroke="#A88A4A" strokeWidth="1.2" />
      <path d="M4 256 V 100 A 96 96 0 0 1 196 100 V 256" fill="none" stroke="#DCCFAE" strokeWidth="0.9" />
    </svg>
  );
}
