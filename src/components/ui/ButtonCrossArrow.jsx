import { Link } from 'react-router-dom';
import './ButtonCrossArrow.css';

const arrowPath =
  'M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z';

function ArrowPair({ variant }) {
  const fillClass =
    variant === 'light' ? 'btn-cross-arrow__svg--light' : 'btn-cross-arrow__svg--dark';
  return (
    <>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`btn-cross-arrow__svg btn-cross-arrow__svg--a ${fillClass}`}
        aria-hidden
      >
        <path fillRule="evenodd" clipRule="evenodd" d={arrowPath} fill="currentColor" />
      </svg>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`btn-cross-arrow__svg btn-cross-arrow__svg--b ${fillClass}`}
        aria-hidden
      >
        <path fillRule="evenodd" clipRule="evenodd" d={arrowPath} fill="currentColor" />
      </svg>
    </>
  );
}

/**
 * Pill CTA with double-arrow icon (Tailwind reference ported to CSS).
 * @param {'dark' | 'light'} [variant='dark']
 */
export default function ButtonCrossArrow({
  children,
  to,
  href,
  variant = 'dark',
  className = '',
  type = 'button',
  ...rest
}) {
  const rootClass = `btn-cross-arrow btn-cross-arrow--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn-cross-arrow__label">{children}</span>
      <span className="btn-cross-arrow__icon-ring" aria-hidden>
        <span className="btn-cross-arrow__icon-shift">
          <ArrowPair variant={variant} />
        </span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={rootClass} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={rootClass} rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={rootClass} {...rest}>
      {inner}
    </button>
  );
}
