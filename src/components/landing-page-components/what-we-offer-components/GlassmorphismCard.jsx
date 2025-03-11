export default function GlassmorphismCardContainer({ children, className }) {
  return (
    <div
      className={`${className} lg:w-1/3 flex flex-col justify-center px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-20 xl:py-30 border border-[#EDEDED]/20 rounded-3xl backdrop-blur-2xl bg-linear-180 from-[#C4C4C4]/24 to-[#5E5E5E]/24`}
    >
      {children}
    </div>
  );
}

export function GlassmorphismCardIcon({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function GlassmorphismCardHeader({ children, className }) {
  return (
    <div className={className}>
      <h4 className='mt-6 md:mt-8 text-sm md:text-base font-semibold'>
        {children}
      </h4>
    </div>
  );
}

export function GlassmorphismCardContent({ children, className }) {
  return (
    <div className={className}>
      <p className='mt-2 text-sm md:text-base text-[#E1E1E1]'>{children}</p>
    </div>
  );
}
