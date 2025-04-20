export default function CardContainer({ children, className }) {
  return (
    <div
      className={`${className} rounded-xl px-8 sm:px-8 md:px-10 py-8 sm:py-10 xl:py-14`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <h4
      className={`${className} text-base sm:text-lg md:text-xl font-semibold`}
    >
      {children}
    </h4>
  );
}

export function CardContentContainer({ children, className }) {
  return <div className={`${className} flex gap-4 items-end`}>{children}</div>;
}

export function CardContent({ children, className, status, online }) {
  return (
    <div className={`${className} mt-4 md:mt-6 flex items-center gap-4`}>
      {status && (
        <div
          className={`size-3 ${
            online ? 'bg-green-500' : 'bg-red-500'
          } rounded-full`}
        ></div>
      )}
      <p>{children}</p>
    </div>
  );
}

export function CardContentSmall({ children, className }) {
  return (
    <p
      className={`${className} mt-4 md:mt-6 text-xs md:text-sm text-[#303030]`}
    >
      {children}
    </p>
  );
}
