import Logo from '../../assets/logo/icon-black.png';

export default function Footer() {
  return (
    <div className='mt-24 md:mt-32 pb-10 lg:pb-0'>
      <div className='bg-white text-black px-8 sm:px-14 lg:px-20 py-8 sm:py-12 lg:py-16 rounded-4xl shadow-[0_-8px_50px_rgba(20,110,245,0.50)]'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-6 sm:gap-10 lg:gap-0'>
          <div className='lg:w-3/5'>
            <div className='flex items-center gap-2'>
              <img src={Logo} alt='logo' className='w-6 sm:w-7 lg:w-8' />
              <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>
                IntelliSight
              </h1>
            </div>

            <p className='mt-6 md:mt-8 text-xs sm:text-sm lg:text-base'>
              With a clear vision of improving global health, IntelliSight
              empowers both patients and healthcare providers with the tools to
              manage eye health proactively, ensuring better outcomes and
              enhancing the overall quality of care.
            </p>

            <a
              href='/about-us'
              className='block mt-4 md:mt-6 font-semibold text-xs sm:text-sm lg:text-base'
            >
              Learn more {'>>'}
            </a>
          </div>

          <div className='lg:w-1/5'>
            <h4 className='font-semibold text-lg sm:text-xl lg:text-2xl'>
              Sitemap
            </h4>

            <div className='mt-4 md:mt-6 text-xs lg:text-sm flex lg:flex-col gap-4'>
              <a href='/#what-we-offer'>What We Offer</a>

              <a href='/about-us'>About Us</a>

              <a href='/how-it-works'>How It Works</a>
            </div>
          </div>
        </div>

        <p className='mt-8 md:mt-10 text-center text-xs sm:text-sm lg:text-base'>
          Get the mobile app{' '}
          <a
            href={`${import.meta.env.VITE_BASE_URL}/app-arm64-v8a-release.apk`}
            className='font-medium text-[#0E57C6] underline underline-offset-4 cursor-pointer'
          >
            here
          </a>
          .
        </p>
      </div>

      <p className='hidden lg:block text-center py-10'>
        © 2025 IntelliSight. HUMIC Enginnering All rights reserved
      </p>
    </div>
  );
}
