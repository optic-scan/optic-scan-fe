import CardContainer, { CardContent, CardHeader } from '../../components/Card';
import Footer from '../../components/footer-components/Footer';
import Navbar from '../../components/navbar-components/Navbar';
import HowItWorks1 from '../../assets/landing-page/how-it-works-1.png';
import HowItWorks2 from '../../assets/landing-page/how-it-works-2.png';
import HowItWorks3 from '../../assets/landing-page/how-it-works-3.png';

export default function HowItWorksPage() {
  return (
    <div className='bg-[#181818] text-white'>
      <div className='container mx-auto px-4 sm:px-6'>
        <Navbar />

        <h2 className='pt-48 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold relative z-10'>
          HOW IT WORKS.
        </h2>

        <div className='flex items-center gap-10 mt-8 sm:mt-10 md:mt-14 xl:mt-16'>
          <CardContainer
            className={
              'w-1/2 bg-[#474747]/60 text-white border border-[#474747]/10 px-8 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 h-max'
            }
          >
            <CardHeader className='capitalize !text-base sm:!text-lg md:!text-xl lg:!text-2xl'>
              Step 1: Upload Your Photo
            </CardHeader>

            <CardContent>
              Simply upload a photo of your eye, or use our smart camera tool to
              take a high-resolution image. The AI system uses cutting-edge
              technology to capture the most detailed features of your eye for
              precise detection.
            </CardContent>
          </CardContainer>

          <img
            src={HowItWorks1}
            alt='how-it-works-1'
            className='w-1/3 mx-auto'
          />
        </div>

        <div className='flex flex-row-reverse items-center gap-10 mt-10 sm:mt-20 md:mt-24 xl:mt-26'>
          <CardContainer
            className={
              'w-1/2 bg-[#474747]/60 text-white border border-[#474747]/10 px-8 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 h-max'
            }
          >
            <CardHeader className='capitalize !text-base sm:!text-lg md:!text-xl lg:!text-2xl'>
              Step 2: AI-Powered Analysis
            </CardHeader>

            <CardContent>
              Our powerful AI algorithm processes the image, identifying
              potential indicators of common eye conditions like glaucoma,
              macular degeneration, and diabetic retinopathy—before they become
              noticeable to the human eye.
            </CardContent>
          </CardContainer>

          <img
            src={HowItWorks2}
            alt='how-it-works-2'
            className='w-1/3 mx-auto'
          />
        </div>

        <div className='flex items-center gap-10 mt-8 sm:mt-10 md:mt-14 xl:mt-16'>
          <CardContainer
            className={
              'w-1/2 bg-[#474747]/60 text-white border border-[#474747]/10 px-8 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 h-max'
            }
          >
            <CardHeader className='capitalize !text-base sm:!text-lg md:!text-xl lg:!text-2xl'>
              Step 3: Doctor Reviews & Diagnosis
            </CardHeader>

            <CardContent>
              A licensed doctor will review the AI-generated scan results to
              confirm the presence of any eye diseases and provide an accurate
              diagnosis. Based on their assessment, you’ll receive personalized
              treatment recommendations or further actions to take
            </CardContent>
          </CardContainer>

          <img
            src={HowItWorks3}
            alt='how-it-works-3'
            className='w-1/3 mx-auto'
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
