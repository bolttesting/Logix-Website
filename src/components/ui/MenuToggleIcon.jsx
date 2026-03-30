import './MenuToggleIcon.css';

/** Animated hamburger ↔ close for mobile nav (`duration` in ms). */
export default function MenuToggleIcon({ open = false, className = '', duration = 300 }) {
  return (
    <span
      className={`menu-toggle-icon ${className}`.trim()}
      style={{ '--menu-toggle-dur': `${duration}ms` }}
      aria-hidden
    >
      <span className="menu-toggle-icon__bar menu-toggle-icon__bar--1" data-open={open} />
      <span className="menu-toggle-icon__bar menu-toggle-icon__bar--2" data-open={open} />
      <span className="menu-toggle-icon__bar menu-toggle-icon__bar--3" data-open={open} />
    </span>
  );
}
