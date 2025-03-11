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

export function CardContent({ children, className }) {
  return (
    <p
      className={`${className} mt-4 md:mt-6 text-sm md:text-base text-[#303030]`}
    >
      {children}
    </p>
  );
}
