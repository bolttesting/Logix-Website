import { useEffect, useState } from 'react';
import './arc-gallery-hero.css';

const PLACEHOLDER_SVG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect fill="#1a1a24" width="96" height="96" rx="12"/><text x="48" y="54" text-anchor="middle" fill="#71717a" font-size="11" font-family="system-ui">?</text></svg>`,
  );

/**
 * Semicircular arc of logo tiles (e.g. tech stack icons).
 * @param {object} props
 * @param {{ iconSrc: string, label: string }[]} props.items
 */
export function ArcGalleryHero({
  items,
  startAngle = 22,
  endAngle = 158,
  radiusLg = 440,
  radiusMd = 320,
  radiusSm = 220,
  cardSizeLg = 108,
  cardSizeMd = 88,
  cardSizeSm = 68,
  cardTiltFactor = 0.22,
  className = '',
}) {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const list = items?.length ? items : [];
  const count = Math.max(list.length, 2);
  const step = (endAngle - startAngle) / (count - 1);
  const ringHeight = dimensions.radius * 1.22;

  return (
    <div className={`arc-gallery-hero ${className}`.trim()}>
      <div
        className="arc-gallery-hero__ring-wrap"
        style={{ height: ringHeight }}
      >
        <div className="arc-gallery-hero__pivot">
          {list.map((item, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            const tilt = `rotate(${angle * cardTiltFactor}deg)`;

            return (
              <div
                key={item.id ?? item.label ?? i}
                className="arc-gallery-hero__slot"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: 'translate(-50%, 50%)',
                  animationDelay: `${i * 90}ms`,
                  zIndex: count - i,
                }}
              >
                <div className="arc-gallery-hero__card">
                  <div className="arc-gallery-hero__card-inner" style={{ transform: tilt }}>
                    <img
                      src={item.iconSrc}
                      alt={item.label}
                      draggable={false}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_SVG;
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
