import LandingHomePageHeroSection from '../../components/landing-page-components/home-page-components/HeroSection';
import WhatWeOfferSection from '../../components/landing-page-components/what-we-offer-components/WhatWeOfferSection';
import AboutUsSection from '../../components/about-us-components/AboutUsSection';
import HowItWorksSection from '../../components/landing-page-components/how-it-works-components/HowItWorksSection';

export default function HomePage() {
  return (
    <>
      <div className='bg-[#181818] text-white'>
        <div className='pt-40 container mx-auto px-4 sm:px-6'>
          <LandingHomePageHeroSection />

          <div className='mt-32 pb-24 md:pb-32 xl:pb-40 overflow-hidden'>
            <WhatWeOfferSection />
          </div>
        </div>
      </div>

      <div className='mt-20 container mx-auto bg-white px-4 sm:px-6'>
        <AboutUsSection />
      </div>

      <div className='mt-20 bg-[#181818]'>
        <div className='container mx-auto text-white px-4 sm:px-6'>
          <div className='pt-20'>
            <HowItWorksSection />
          </div>
        </div>
      </div>
    </>
  );
}
