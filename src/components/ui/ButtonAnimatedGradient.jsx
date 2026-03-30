import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import './ButtonAnimatedGradient.css';

const SPOT_INNER = 'rgba(167, 139, 250, 0.42)';
const SPOT_OUTER = 'rgba(10, 10, 15, 0.22)';
const SPOT_INNER_LIGHT = 'rgba(255, 255, 255, 0.45)';
const SPOT_OUTER_LIGHT = 'rgba(61, 90, 241, 0.2)';

/**
 * Spotlight follows cursor / centers on keyboard focus (gradient border button).
 * Brand styling; use `variant="light"` for pale gradient backgrounds.
 */
export default function ButtonAnimatedGradient({
  children,
  to,
  href,
  variant = 'dark',
  className = '',
  type = 'button',
  ...rest
}) {
  const rootRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const reduceMotion = useReducedMotion();

  const rootClass = `btn-animated-gradient btn-animated-gradient--${variant} ${className}`.trim();

  const centerSpot = (el) => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setPosition({ x: w / 2, y: h / 2 });
  };

  const handleMouseMove = (e) => {
    if (!rootRef.current || isFocused || reduceMotion) return;
    const rect = rootRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    setOpacity(1);
    centerSpot(e.currentTarget);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = (e) => {
    if (reduceMotion) {
      centerSpot(e.currentTarget);
      setOpacity(0.38);
    } else {
      setOpacity(1);
    }
  };

  const handleMouseLeave = () => {
    if (!isFocused) setOpacity(0);
  };

  const [inner, outer] =
    variant === 'light' ? [SPOT_INNER_LIGHT, SPOT_OUTER_LIGHT] : [SPOT_INNER, SPOT_OUTER];

  const glowStyle = {
    opacity,
    background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, ${inner}, ${outer})`,
  };

  const interactiveProps = {
    ref: rootRef,
    className: rootClass,
    onMouseMove: handleMouseMove,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...rest,
  };

  const content = (
    <>
      <span className="btn-animated-gradient__glow" style={glowStyle} aria-hidden />
      <span className="btn-animated-gradient__label">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} {...interactiveProps}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} rel="noopener noreferrer" {...interactiveProps}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} {...interactiveProps}>
      {content}
    </button>
  );
}
