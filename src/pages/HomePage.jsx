import Button from '../components/Button';
import HeroImage1 from '../assets/landing-page/hero-1.png';
import HeroImage2 from '../assets/landing-page/hero-2.png';
import WhatWeOfferOrnament1 from '../assets/landing-page/what-we-offer-ornament-1.png';
import WhatWeOfferOrnament2 from '../assets/landing-page/what-we-offer-ornament-2.png';
import AboutUsImage from '../assets/landing-page/about-us-image.jpg';
import { MdOutlineQuiz } from 'react-icons/md';
import { LuBookText } from 'react-icons/lu';
import { BiStats } from 'react-icons/bi';

export default function HomePage() {
  return (
    <>
      <div className='bg-[#181818] text-white'>
        <div className='pt-40 container max-w-screen-xl mx-auto'>
          {/* headers */}
          <div className=' text-center'>
            <h1 className='text-6xl font-semibold'>Smart Diagnosis</h1>
            <h1 className='text-6xl font-semibold leading-tight'>
              For Eyes Problems
            </h1>

            <p className='mt-7 text-xl text-[#DADADA]'>
              OpticScan: Artificial Intelligence (AI) Based Eye Disease
              Diagnostic System
            </p>

            <Button className='mt-10 bg-white text-black w-max px-6 rounded-xl'>
              Get Started
            </Button>
          </div>

          {/* image */}
          <div className='relative mt-32 pb-20'>
            <img
              src={HeroImage1}
              alt='home'
              className='relative top-20 left-0 shadow-[0_-32px_83px_rgba(20,110,245,0.15)]'
            />
            <img
              src={HeroImage2}
              alt='home'
              className='absolute top-0 right-0 shadow-[0_-32px_83px_rgba(20,110,245,0.15)]'
            />
          </div>

          <div className='mt-32 pb-40'>
            <h2 className='text-6xl font-semibold relative z-10'>
              .WHAT WE OFFER
            </h2>

            <div className='relative flex gap-10 mt-16'>
              <div className='w-1/3 flex flex-col justify-center px-10 py-20 border border-[#EDEDED]/20 rounded-3xl backdrop-blur-2xl bg-linear-180 from-[#C4C4C4]/24 to-[#5E5E5E]/24 z-10'>
                <div className='p-3 rounded-lg bg-[#146EF5] w-max'>
                  <MdOutlineQuiz className='size-8' />
                </div>

                <div className='mt-8'>
                  <h4 className='font-semibold'>
                    AI-Powered Eye Disease Detection
                  </h4>
                  <p className='mt-2 text-[#E1E1E1]'>
                    Get accurate and early insights into potential eye
                    conditions with advanced AI analysis.
                  </p>
                </div>
              </div>

              <div className='w-1/3 flex flex-col justify-center px-10 py-20 border border-[#EDEDED]/20 rounded-3xl backdrop-blur-3xl bg-linear-180 from-[#C4C4C4]/24 to-[#5E5E5E]/24 z-10'>
                <div className='p-3 rounded-lg bg-white w-max'>
                  <LuBookText className='size-8 text-black' />
                </div>

                <div className='mt-8'>
                  <h4 className='font-semibold'>
                    Fast & Hassle-Free Screening
                  </h4>
                  <p className='mt-2 text-[#E1E1E1]'>
                    Scan your eyes in minutes and receive instant results—no
                    appointments needed.
                  </p>
                </div>
              </div>

              <div className='w-1/3 flex flex-col justify-center px-10 py-20 border border-[#EDEDED]/20 rounded-3xl backdrop-blur-2xl bg-linear-180 from-[#C4C4C4]/24 to-[#5E5E5E]/24 z-10'>
                <div className='p-3 rounded-lg bg-black w-max'>
                  <BiStats className='size-8' />
                </div>

                <div className='mt-8'>
                  <h4 className='font-semibold'>
                    Personalized Eye Health Reports
                  </h4>
                  <p className='mt-2 text-[#E1E1E1]'>
                    Receive detailed reports and expert-backed recommendations
                    tailored to your eye health.
                  </p>
                </div>
              </div>

              <img
                src={WhatWeOfferOrnament1}
                alt='home'
                className='absolute top-30 left-[40%] -translate-x-1/2 -translate-y-1/2 z-0'
              />
              <img
                src={WhatWeOfferOrnament2}
                alt='home'
                className='absolute top-40 left-[60%] -translate-x-1/2 -translate-y-1/2 z-0'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-20 container max-w-screen-xl mx-auto bg-white'>
        <h2 className='text-6xl font-semibold text-right'>ABOUT US.</h2>

        <div className='mt-20 flex items-center'>
          <div className='w-3/5'>
            <h4 className='text-4xl font-semibold'>
              Early Detection for Eye Disease
            </h4>
            <p className='mt-6 text-[#606060]'>
              By combining AI and IoT, OpticScan offer innovative solutions for
              early detection and diagnosis of eye diseases, making eye care
              more accessible, accurate, and efficient. With a clear vision of
              improving global health, OpticScan empowers both patients and
              healthcare providers with the tools to manage eye health
              proactively, ensuring better outcomes and enhancing the overall
              quality of care.
            </p>

            <Button className='mt-6 w-max bg-[#146EF5] text-white px-6 rounded-3xl'>
              More Info
            </Button>
          </div>

          <div className='w-2/5 flex justify-end'>
            <img
              src={AboutUsImage}
              alt='home'
              className='w-[80%] rounded-3xl aspect-square object-cover shadow-[0_4px_65px_rgba(20,110,245,0.15)]'
            />
          </div>
        </div>
      </div>

      <div className='mt-20 bg-[#181818]'>
        <div className='container max-w-screen-xl mx-auto text-white'>
          <div className='pt-20 flex'>
            <div className='w-1/2'>
              <h2 className='text-6xl font-semibold'>.HOW IT WORKS</h2>
            </div>

            <div className='w-1/2'>
              <div className='flex flex-col gap-6'>
                <div className='bg-white rounded-xl px-10 py-14 text-black'>
                  <h4 className='text-xl font-semibold'>
                    Step 1: Scan Your Eyes
                  </h4>
                  <p className='mt-6 text-[#303030]'>
                    Simply upload a photo of your eye, or use our smart camera
                    tool to take a high-resolution image. The AI system uses
                    cutting-edge technology to capture the most detailed
                    features of your eye for precise detection.
                  </p>
                </div>

                <div className='bg-white/80 rounded-xl px-10 py-14 text-black'>
                  <h4 className='text-xl font-semibold'>
                    Step 2: AI-Powered Analysis
                  </h4>
                  <p className='mt-6 text-[#303030]'>
                    Our powerful AI algorithm processes the image, identifying
                    potential indicators of common eye conditions like glaucoma,
                    macular degeneration, and diabetic retinopathy—before they
                    become noticeable to the human eye.
                  </p>
                </div>

                <div className='bg-white/60 rounded-xl px-10 py-14 text-black'>
                  <h4 className='text-xl font-semibold'>
                    Step 3: Doctor Reviews & Diagnosis
                  </h4>
                  <p className='mt-6 text-[#303030]'>
                    A licensed doctor will review the AI-generated scan results
                    to confirm the presence of any eye diseases and provide an
                    accurate diagnosis. Based on their assessment, you’ll
                    receive personalized treatment recommendations or further
                    actions to take.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
