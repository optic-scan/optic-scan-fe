export default function Button({
  children,
  className,
  type = 'button',
  variant,
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        variant == 'skeleton' && 'border border-[#C4C4C4]'
      } p-2 text-xs sm:text-sm lg:text-base rounded cursor-pointer disabled:cursor-default disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
