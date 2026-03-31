/**
 * SVG beams from orbit center to each node — geometry matches RadialOrbitalTimeline.
 */
export default function OrbitalBeams({
  width,
  height,
  rotationAngle,
  orbitRadius,
  nodeCount,
  reducedMotion,
}) {
  if (width <= 0 || height <= 0 || !nodeCount) return null;

  const cx = width / 2;
  const cy = height / 2;

  const lines = [];
  for (let index = 0; index < nodeCount; index += 1) {
    const angle = ((index / nodeCount) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = orbitRadius * Math.cos(radian);
    const y = orbitRadius * Math.sin(radian);
    lines.push({
      id: index,
      x2: cx + x,
      y2: cy + y,
    });
  }

  return (
    <svg
      className={`orbital__beams${reducedMotion ? ' orbital__beams--static' : ''}`}
      width={width}
      height={height}
      aria-hidden
    >
      <defs>
        <filter id="orbital-beam-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      {lines.map((L, i) => (
        <g key={L.id}>
          <line
            className="orbital__beam orbital__beam--glow"
            x1={cx}
            y1={cy}
            x2={L.x2}
            y2={L.y2}
            style={{ animationDelay: `${i * 0.22}s` }}
            filter="url(#orbital-beam-blur)"
          />
          <line
            className="orbital__beam"
            x1={cx}
            y1={cy}
            x2={L.x2}
            y2={L.y2}
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
