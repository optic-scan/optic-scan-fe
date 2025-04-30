import WhatWeOfferOrnament1 from '../../../assets/landing-page/what-we-offer-ornament-1.png';
import WhatWeOfferOrnament2 from '../../../assets/landing-page/what-we-offer-ornament-2.png';
import { MdOutlineQuiz } from 'react-icons/md';
import { LuBookText } from 'react-icons/lu';
import { BiStats } from 'react-icons/bi';
import GlassmorphismCardContainer, {
  GlassmorphismCardContent,
  GlassmorphismCardHeader,
  GlassmorphismCardIcon,
} from '../../../components/landing-page-components/what-we-offer-components/GlassmorphismCard';
export default function WhatWeOfferSection() {
  return (
    <>
      <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold relative z-10'>
        .WHAT WE OFFER
      </h2>

      <div className='relative flex flex-col lg:flex-row gap-6 xl:gap-10 mt-8 sm:mt-10 md:mt-14 xl:mt-16'>
        <GlassmorphismCardContainer className='z-10'>
          <GlassmorphismCardIcon>
            <div className='p-2 md:p-3 rounded-lg bg-[#146EF5] w-max'>
              <MdOutlineQuiz className='size-6 md:size-8' />
            </div>
          </GlassmorphismCardIcon>
          <GlassmorphismCardHeader>
            AI-Powered Eye Disease Detection
          </GlassmorphismCardHeader>
          <GlassmorphismCardContent>
            Get accurate and early insights into potential eye conditions with
            advanced AI analysis.
          </GlassmorphismCardContent>
        </GlassmorphismCardContainer>

        <GlassmorphismCardContainer className='z-10'>
          <GlassmorphismCardIcon>
            <div className='p-2 md:p-3 rounded-lg bg-white w-max'>
              <LuBookText className='size-6 md:size-8 text-black' />
            </div>
          </GlassmorphismCardIcon>
          <GlassmorphismCardHeader>
            Fast & Hassle-Free Screening
          </GlassmorphismCardHeader>
          <GlassmorphismCardContent>
            Scan your eyes in minutes and receive instant results—no
            appointments needed.
          </GlassmorphismCardContent>
        </GlassmorphismCardContainer>

        <GlassmorphismCardContainer className='z-10'>
          <GlassmorphismCardIcon>
            <div className='p-2 md:p-3 rounded-lg bg-black w-max'>
              <BiStats className='size-6 md:size-8' />
            </div>
          </GlassmorphismCardIcon>
          <GlassmorphismCardHeader>
            Personalized Eye Health Reports
          </GlassmorphismCardHeader>
          <GlassmorphismCardContent>
            Receive detailed reports and expert-backed recommendations tailored
            to your eye health.
          </GlassmorphismCardContent>
        </GlassmorphismCardContainer>

        <img
          src={WhatWeOfferOrnament1}
          alt='home'
          className='absolute top-40 lg:top-30 lg:w-3/5 left-[40%] -translate-x-1/2 -translate-y-1/2 z-0'
        />
        <img
          src={WhatWeOfferOrnament2}
          alt='home'
          className='absolute top-120 sm:top-140 lg:top-80 left-[60%] -translate-x-1/2 -translate-y-1/2 z-0'
        />
      </div>
    </>
  );
}
