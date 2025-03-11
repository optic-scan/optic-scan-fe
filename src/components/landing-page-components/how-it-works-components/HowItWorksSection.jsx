import CardContainer, {
  CardContent,
  CardHeader,
} from '../../../components/Card';

export default function HowItWorksSection() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='lg:w-1/2'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold'>
          .HOW IT WORKS
        </h2>
      </div>

      <div className='lg:w-1/2 mt-8 sm:mt-10 md:mt-14 lg:mt-0'>
        <div className='flex flex-col gap-6 md:gap-8'>
          <CardContainer className={'bg-white text-black'}>
            <CardHeader>Step 1: Scan Your Eyes</CardHeader>
            <CardContent>
              Simply upload a photo of your eye, or use our smart camera tool to
              take a high-resolution image. The AI system uses cutting-edge
              technology to capture the most detailed features of your eye for
              precise detection.
            </CardContent>
          </CardContainer>

          <CardContainer className={'bg-white/80 text-black'}>
            <CardHeader>Step 2: AI-Powered Analysis</CardHeader>
            <CardContent>
              Our powerful AI algorithm processes the image, identifying
              potential indicators of common eye conditions like glaucoma,
              macular degeneration, and diabetic retinopathy—before they become
              noticeable to the human eye.
            </CardContent>
          </CardContainer>

          <CardContainer className={'bg-white/60 text-black'}>
            <CardHeader>Step 3: Doctor Reviews & Diagnosis</CardHeader>
            <CardContent>
              A licensed doctor will review the AI-generated scan results to
              confirm the presence of any eye diseases and provide an accurate
              diagnosis. Based on their assessment, you’ll receive personalized
              treatment recommendations or further actions to take.
            </CardContent>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
