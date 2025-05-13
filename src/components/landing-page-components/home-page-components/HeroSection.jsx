import HeroImage1 from '../../../assets/landing-page/hero-1.png';
import HeroImage2 from '../../../assets/landing-page/hero-2.png';
import Button from '../../Button';

export default function LandingHomePageHeroSection() {
  return (
    <>
      {/* headers */}
      <div className=' text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight'>
          Smart Diagnosis <br className='hidden md:block' /> For Eyes Problems
        </h1>

        <p className='mt-4 sm:mt-5 md:mt-7 text-sm sm:text-base md:text-lg lg:text-xl text-[#DADADA]'>
          IntelliSight: Artificial Intelligence (AI) Based Eye Disease
          Diagnostic System
        </p>

        <Button className='mt-8 sm:mt-10 bg-white text-black px-6 rounded-xl'>
          Get Started
        </Button>
      </div>

      {/* hero image */}
      <div className='relative mt-20 sm:mt-24 md:mt-32 pb-[60%] sm:pb-110 md:pb-130 lg:pb-150 xl:pb-160'>
        <img
          src={HeroImage1}
          alt='home'
          className='absolute top-20 left-0 shadow-[0_-32px_83px_rgba(20,110,245,0.15)] hidden lg:block md:w-auto lg:w-[70%] xl:w-auto'
        />
        <img
          src={HeroImage2}
          alt='home'
          className='absolute top-0 right-0 shadow-[0_-32px_83px_rgba(20,110,245,0.15)] md:w-auto lg:w-[70%] xl:w-auto'
        />
      </div>
    </>
  );
}
