import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icons';
import OrbitalBeams from './OrbitalBeams';
import './RadialOrbitalTimeline.css';

const STATUS_CLASS = {
  completed: 'orbital-badge--completed',
  'in-progress': 'orbital-badge--in-progress',
  pending: 'orbital-badge--pending',
};

const STATUS_LABEL = {
  completed: 'COMPLETE',
  'in-progress': 'IN PROGRESS',
  pending: 'PENDING',
};

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const centerOffset = { x: 0, y: 0 };
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [orbitRadius, setOrbitRadius] = useState(200);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});
  const [orbitBox, setOrbitBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setOrbitRadius(Math.min(200, Math.max(104, w * 0.34)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      setOrbitBox({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!autoRotate || prefersReducedMotion) return;
    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(rotationTimer);
  }, [autoRotate, prefersReducedMotion]);

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const centerViewOnNode = useCallback(
    (nodeId) => {
      const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
      if (nodeIndex < 0) return;
      const totalNodes = timelineData.length;
      const targetAngle = (nodeIndex / totalNodes) * 360;
      setRotationAngle(270 - targetAngle);
    },
    [timelineData]
  );

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const nextOpen = !prev[id];
      const newState = {};
      timelineData.forEach((item) => {
        newState[item.id] = item.id === id ? nextOpen : false;
      });

      queueMicrotask(() => {
        if (nextOpen) {
          setActiveNodeId(id);
          setAutoRotate(false);
          const currentItem = timelineData.find((item) => item.id === id);
          const relatedItems = currentItem?.relatedIds ?? [];
          const newPulse = {};
          relatedItems.forEach((relId) => {
            newPulse[relId] = true;
          });
          setPulseEffect(newPulse);
          centerViewOnNode(id);
        } else {
          setActiveNodeId(null);
          setAutoRotate(true);
          setPulseEffect({});
        }
      });

      return newState;
    });
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = orbitRadius;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="orbital"
      ref={containerRef}
      onClick={handleContainerClick}
      role="presentation"
    >
      <div className="orbital__stage">
        <div
          className="orbital__orbit-area"
          ref={orbitRef}
          style={{
            perspective: '1000px',
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <OrbitalBeams
            width={orbitBox.w}
            height={orbitBox.h}
            rotationAngle={rotationAngle}
            orbitRadius={orbitRadius}
            nodeCount={timelineData.length}
            reducedMotion={prefersReducedMotion}
          />

          <div className="orbital__ring-line" aria-hidden />

          <div className="orbital__hub" aria-label="Logix Contact">
            <span className="orbital__hub-core">
              <img
                src="/LC.svg"
                alt=""
                width={48}
                height={48}
                decoding="async"
                fetchPriority="low"
                className="orbital__hub-logo"
              />
            </span>
          </div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="orbital__node"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleItem(item.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={!!isExpanded}
                aria-label={`${item.title}. ${isExpanded ? 'Expanded' : 'Collapsed'}`}
              >
                <div
                  className={`orbital__node-glow ${isPulsing ? 'orbital__node-glow--pulse' : ''}`}
                  style={{
                    width: `${item.energy * 0.5 + 52}px`,
                    height: `${item.energy * 0.5 + 52}px`,
                    marginLeft: `-${(item.energy * 0.5 + 52 - 52) / 2}px`,
                    marginTop: `-${(item.energy * 0.5 + 52 - 52) / 2}px`,
                  }}
                />

                <div
                  className={[
                    'orbital__node-btn',
                    isExpanded ? 'orbital__node-btn--open' : '',
                    !isExpanded && isRelated ? 'orbital__node-btn--related' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Icon name={item.icon} size={20} />
                </div>

                <div className={`orbital__node-label ${isExpanded ? 'orbital__node-label--open' : ''}`}>
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="orbital-card" onClick={(e) => e.stopPropagation()}>
                    <div className="orbital-card__pin" aria-hidden />
                    <div className="orbital-card__head">
                      <div className="orbital-card__row">
                        <span className={`orbital-badge ${STATUS_CLASS[item.status] ?? 'orbital-badge--pending'}`}>
                          {STATUS_LABEL[item.status] ?? 'PENDING'}
                        </span>
                        <span className="orbital-card__date">{item.date}</span>
                      </div>
                      <h4 className="orbital-card__title">{item.title}</h4>
                    </div>
                    <div className="orbital-card__body">
                      <p className="orbital-card__text">{item.content}</p>

                      <div className="orbital-card__energy">
                        <div className="orbital-card__energy-row">
                          <span className="orbital-card__energy-label">
                            <Icon name="zap" size={10} /> Energy level
                          </span>
                          <span className="orbital-card__energy-value">{item.energy}%</span>
                        </div>
                        <div className="orbital-card__energy-track">
                          <div
                            className="orbital-card__energy-fill"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="orbital-card__related">
                          <div className="orbital-card__related-title">Connected nodes</div>
                          <div className="orbital-card__related-btns">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="orbital-card__related-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <Icon name="arrowRight" size={10} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
