import Button from '../../components/Button';
import AboutUsImage from '../../assets/landing-page/about-us-image.jpg';

export default function AboutUsSection() {
  return (
    <>
      <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-right'>
        ABOUT US.
      </h2>

      <div className='mt-8 sm:mt-10 md:mt-14 xl:mt-16 flex flex-col md:flex-row gap-10 items-center'>
        <div className='md:w-4/7 lg:w-3/5 order-2 md:order-1'>
          <h4 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>
            Early Detection for Eye Disease
          </h4>
          <p className='text-sm lg:text-base mt-6 text-[#606060]'>
            By combining AI and IoT, OpticScan offer innovative solutions for
            early detection and diagnosis of eye diseases, making eye care more
            accessible, accurate, and efficient. With a clear vision of
            improving global health, OpticScan empowers both patients and
            healthcare providers with the tools to manage eye health
            proactively, ensuring better outcomes and enhancing the overall
            quality of care.
          </p>

          <Button className='mt-6 w-max bg-[#146EF5] text-white px-6 rounded-3xl'>
            More Info
          </Button>
        </div>

        <div className='md:w-3/7 lg:w-2/5 flex order-1 md:order-2 justify-end'>
          <img
            src={AboutUsImage}
            alt='home'
            className='w-full lg:w-[80%] rounded-3xl md:aspect-square object-cover shadow-[0_4px_65px_rgba(20,110,245,0.15)]'
          />
        </div>
      </div>
    </>
  );
}
