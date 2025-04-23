export default function Button({
  children,
  className = '',
  type = 'button',
  variant,
  disabled,
  onClick,
  href,
}) {
  const baseClass = `${className} ${
    variant === 'skeleton' && 'border border-[#C4C4C4]'
  } p-2 text-center text-xs sm:text-sm lg:text-base rounded cursor-pointer disabled:cursor-default disabled:opacity-50`;

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </button>
  );
}
