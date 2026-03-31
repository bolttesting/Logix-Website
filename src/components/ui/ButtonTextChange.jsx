import './button-text-change.css';

/** Pill gradient control with sliding label on hover (renders `<a>` when `href` is set). */
export default function ButtonTextChange({
  children,
  variant = 'filled',
  className = '',
  href,
  type = 'button',
  ...rest
}) {
  const v = variant === 'outline' ? 'outline' : 'filled';
  const cls = ['btn-text-change', v === 'outline' ? 'btn-text-change--outline' : '', className]
    .filter(Boolean)
    .join(' ');

  const label = (
    <span className="btn-text-change__wrap">
      <span className="btn-text-change__track">
        <span className="btn-text-change__line">{children}</span>
        <span className="btn-text-change__line" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );

  if (href != null && href !== '') {
    return (
      <a href={href} className={cls} {...rest}>
        {label}
      </a>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {label}
    </button>
  );
}
