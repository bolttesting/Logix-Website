import { useId } from 'react';

const TRACKS = {
  1: 'M 10 20 h 79.5 q 5 0 5 5 v 24',
  2: 'M 180 10 h -69.7 q -5 0 -5 5 v 24',
  3: 'M 130 20 v 21.8 q 0 5 -5 5 h -10',
  4: 'M 170 80 v -21.8 q 0 -5 -5 -5 h -50',
  5: 'M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20',
  6: 'M 94.8 95 v -36',
  7: 'M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14',
  8: 'M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20',
};

const MOTION = [
  { track: 1, dur: '2.8s', begin: '0s' },
  { track: 2, dur: '2.6s', begin: '0.2s' },
  { track: 3, dur: '2.4s', begin: '0.4s' },
  { track: 4, dur: '2.5s', begin: '0.1s' },
  { track: 5, dur: '3.2s', begin: '0.3s' },
  { track: 6, dur: '2.2s', begin: '0.5s' },
  { track: 7, dur: '2.9s', begin: '0.15s' },
  { track: 8, dur: '2.7s', begin: '0.35s' },
];

function MotionDot({ maskId, gradId, trackHrefId, dur, begin }) {
  return (
    <g mask={`url(#${maskId})`}>
      <circle cx="0" cy="0" r="9" fill={`url(#${gradId})`}>
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="0" calcMode="linear">
          <mpath href={`#${trackHrefId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/**
 * Animated CPU-style architecture diagram (SVG).
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.width]
 * @param {string} [props.height]
 * @param {string} [props.text]
 * @param {boolean} [props.showCpuConnections]
 * @param {number} [props.lineMarkerSize]
 * @param {boolean} [props.animateText]
 * @param {boolean} [props.animateLines]
 * @param {boolean} [props.animateMarkers]
 */
export function CpuArchitecture({
  className = '',
  width = '100%',
  height = '100%',
  text = 'CPU',
  showCpuConnections = true,
  lineMarkerSize = 18,
  animateText = true,
  animateLines = true,
  animateMarkers = true,
}) {
  const prefix = useId().replace(/:/g, '');
  const I = (name) => `${prefix}-cpu-${name}`;

  const lineAnim = animateLines ? (
    <animate
      attributeName="stroke-dashoffset"
      from="100"
      to="0"
      dur="1s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.25,0.1,0.5,1"
      keyTimes="0; 1"
    />
  ) : null;

  const rootClass = ['cpu-architecture-svg', className].filter(Boolean).join(' ');

  return (
    <svg
      className={rootClass}
      width={width}
      height={height}
      viewBox="0 0 200 100"
      role="img"
      aria-label={text}
    >
      <g stroke="currentColor" fill="none" strokeWidth="0.3" markerStart={`url(#${I('circle-marker')})`}>
        <path strokeDasharray="100 100" pathLength="100" d="M 10 20 h 79.5 q 5 0 5 5 v 30">
          {lineAnim}
        </path>
        <path strokeDasharray="100 100" pathLength="100" d="M 180 10 h -69.7 q -5 0 -5 5 v 30">
          {lineAnim}
        </path>
        <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10" />
        <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50" />
        <path strokeDasharray="100 100" pathLength="100" d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20">
          {lineAnim}
        </path>
        <path d="M 94.8 95 v -36" />
        <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14" />
        <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20" />
      </g>

      {MOTION.map((m, i) => (
        <MotionDot
          key={m.track}
          maskId={I(`mask-${m.track}`)}
          trackHrefId={I(`track-${m.track}`)}
          gradId={I(
            ['blue', 'yellow', 'pinkish', 'white', 'green', 'orange', 'cyan', 'rose'][i] + '-grad'
          )}
          dur={m.dur}
          begin={m.begin}
        />
      ))}

      <g>
        {showCpuConnections && (
          <g fill={`url(#${I('connection-gradient')})`}>
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="116.3" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="122.8" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="104" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="114.5" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="80" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
            <rect x="87" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
          </g>
        )}
        <rect
          x="85"
          y="40"
          width="30"
          height="20"
          rx="2"
          fill="#181818"
          filter={`url(#${I('light-shadow')})`}
        />
        <text
          x="100"
          y="50"
          fontSize="7"
          fill={animateText ? `url(#${I('text-gradient')})` : 'white'}
          fontWeight="600"
          letterSpacing="0.05em"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {text}
        </text>
      </g>

      <defs>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <path key={`tr-${n}`} id={I(`track-${n}`)} d={TRACKS[n]} fill="none" stroke="none" />
        ))}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <mask
            key={`mk-${n}`}
            id={I(`mask-${n}`)}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="200"
            height="100"
          >
            <rect x="0" y="0" width="200" height="100" fill="black" />
            <path
              d={TRACKS[n]}
              fill="none"
              stroke="white"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        ))}

        <radialGradient id={I('blue-grad')} fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('yellow-grad')} fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('pinkish-grad')} fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('white-grad')} fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('green-grad')} fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('orange-grad')} fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('cyan-grad')} fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={I('rose-grad')} fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <filter id={I('light-shadow')} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="black" floodOpacity="0.1" />
        </filter>

        <marker
          id={I('circle-marker')}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle cx="5" cy="5" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
            {animateMarkers && <animate attributeName="r" values="0; 3; 2" dur="0.5s" />}
          </circle>
        </marker>

        <linearGradient id={I('connection-gradient')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>

        <linearGradient id={I('text-gradient')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CpuArchitecture;
