export default function Button({
  children,
  className,
  type = 'button',
  variant,
  disabled,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${
        variant == 'skeleton' && 'border border-[#C4C4C4]'
      } w-1/2 py-2 rounded cursor-pointer disabled:cursor-default disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
