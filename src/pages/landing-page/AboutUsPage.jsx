import CardContainer, { CardContent, CardHeader } from '../../components/Card';

export default function AboutUsPage() {
  return (
    <div className='bg-[#181818] text-white'>
      <div className='pt-40 container mx-auto px-4 sm:px-6'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold relative z-10'>
          .WHO ARE WE
        </h2>

        <CardContainer
          className={
            'mt-8 sm:mt-10 md:mt-14 xl:mt-16 bg-white text-black px-8 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 xl:py-20'
          }
        >
          <CardHeader className='capitalize !text-base sm:!text-lg md:!text-xl lg:!text-2xl'>
            OpticScan is an innovative solution that uses IoT and AI technology
            Build by the HUMIC Engineering Team for early detection of eye
            diseases. With a vision to create a healthier world, OpticScan
            provides affordable and accessible solutions for the community and
            healthcare facilities.
          </CardHeader>
        </CardContainer>

        <h2 className='mt-8 sm:mt-10 md:mt-14 xl:mt-16 text-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold relative z-10'>
          .VISION & MISSION
        </h2>

        <div className='mt-8 sm:mt-10 md:mt-14 xl:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-10'>
          <CardContainer className={'lg:w-1/2 bg-white text-black'}>
            <CardHeader className={'!text-2xl'}>Vision</CardHeader>
            <CardContent>
              To be the leading solution in early detection of eye diseases
              through innovative monitoring technology, creating a healthier and
              safer world.
            </CardContent>
          </CardContainer>

          <CardContainer className={'lg:w-1/2 bg-white text-black'}>
            <CardHeader className={'!text-2xl'}>Mission</CardHeader>
            <CardContent>
              Developing IoT-based systems and artificial intelligence
              algorithms to monitor and analyze factors related to eye diseases,
              and providing affordable and accessible solutions for the general
              public and healthcare facilities.
            </CardContent>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
