import Button from '../../components/Button';
import CardContainer, { CardContent, CardHeader } from '../../components/Card';
import SideBar from '../../components/dashboard-components/Sidebar';

export default function HomePasien() {
  return (
    <div className='flex h-screen overflow-y-hidden'>
      <SideBar />

      <div className='p-6 md:p-10 bg-[#F3F3F3] w-full flex flex-col h-full overflow-x-hidden overflow-y-auto'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Home
        </h1>

        <div className='mt-6 md:mt-10 flex justify-between gap-4 xl:gap-6 2xl:gap-10 lg:h-2/5 overflow-x-auto'>
          {overview.map((item, index) => (
            <CardContainer
              key={index}
              className={
                'bg-white min-w-[250px] md:min-w-[300px] w-full flex flex-col justify-center !px-6 md:!px-8 lg:!px-10 !py-6 md:!py-8 lg:!py-16'
              }
            >
              <CardHeader
                className={
                  '!text-sm md:!text-base lg:text-lg xl:!text-xl !font-medium'
                }
              >
                {item.title}
              </CardHeader>
              <CardContent
                className={
                  '!mt-2 xl:!mt-4 2xl:!mt-6 !font-semibold !text-lg md:!text-xl lg:!text-2xl xl:!text-3xl 2xl:!text-4xl'
                }
              >
                {item.value}
              </CardContent>
            </CardContainer>
          ))}
        </div>

        <div className='mt-6 md:mt-10 flex flex-col xl:flex-row gap-10 md:flex-grow md:h-3/5'>
          <div className='xl:w-1/2 flex flex-col'>
            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
              Scan Eye
            </h2>
            <div className='mt-6 bg-[#146EF5] px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-16 rounded-xl flex flex-col justify-center flex-grow'>
              <p className='text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium w-[75%] md:w-2/3'>
                Start scanning your eye with AI powered detection software
              </p>

              <div className='mt-2 lg:mt-8 xl:mt-10 flex justify-between items-center'>
                <Button
                  className={
                    'px-6 md:px-8 lg:px-10 bg-white text-black font-semibold'
                  }
                >
                  Scan Eye
                </Button>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='107'
                  height='95'
                  viewBox='0 0 107 95'
                  fill='none'
                  className='size-14 sm:size-16 md:size-18 lg:size-20 xl:size-28'
                >
                  <g clipPath='url(#clip0_124_24)'>
                    <path
                      d='M53.4377 5.93747C38.4456 5.93747 26.4407 12.7656 17.7014 20.8925C9.01782 28.9453 3.2102 38.5937 0.464111 45.2177C-0.148193 46.6835 -0.148193 48.3164 0.464111 49.7822C3.2102 56.4062 9.01782 66.0546 17.7014 74.1074C26.4407 82.2343 38.4456 89.0624 53.4377 89.0624C68.4299 89.0624 80.4348 82.2343 89.1741 74.1074C97.8577 66.0361 103.665 56.4062 106.43 49.7822C107.042 48.3164 107.042 46.6835 106.43 45.2177C103.665 38.5937 97.8577 28.9453 89.1741 20.8925C80.4348 12.7656 68.4299 5.93747 53.4377 5.93747ZM26.719 47.5C26.719 40.4137 29.534 33.6177 34.5447 28.6069C39.5555 23.5962 46.3515 20.7812 53.4377 20.7812C60.524 20.7812 67.32 23.5962 72.3307 28.6069C77.3415 33.6177 80.1565 40.4137 80.1565 47.5C80.1565 54.5862 77.3415 61.3822 72.3307 66.3929C67.32 71.4037 60.524 74.2187 53.4377 74.2187C46.3515 74.2187 39.5555 71.4037 34.5447 66.3929C29.534 61.3822 26.719 54.5862 26.719 47.5ZM53.4377 35.625C53.4377 42.1748 48.1125 47.5 41.5627 47.5C40.2454 47.5 38.9836 47.2773 37.7961 46.8876C36.7756 46.5537 35.5881 47.1845 35.6252 48.2607C35.6809 49.541 35.8665 50.8212 36.219 52.1015C38.761 61.6015 48.5393 67.2421 58.0393 64.7001C67.5393 62.1581 73.1799 52.3798 70.6379 42.8798C68.5784 35.1796 61.7688 30.0029 54.1985 29.6875C53.1223 29.6503 52.4915 30.8193 52.8254 31.8584C53.2151 33.0459 53.4377 34.3076 53.4377 35.625Z'
                      fill='white'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_124_24'>
                      <rect width='106.875' height='95' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className='xl:w-1/2 flex flex-col'>
            <div className='flex justify-between'>
              <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
                Result History
              </h2>
              <a
                href='/dashboard/results'
                className='text-[#146EF5] underline underline-offset-2 font-medium text-sm lg:text-base'
              >
                View All
              </a>
            </div>

            <div className='mt-6 md:mb-10 xl:mb-0 bg-white px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-16 rounded-xl flex-grow'>
              <div className='flex flex-col gap-3'>
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h4 className='text-xs sm:text-sm md:text-base font-semibold'>
                          Dr Amara
                        </h4>
                        <p className='mt-1 text-xs md:text-sm text-[#484848] font-medium'>
                          Cataracts
                        </p>
                      </div>
                      <p className='font-semibold text-xs md:text-sm'>
                        a day ago
                      </p>
                    </div>
                    {i !== 3 && (
                      <hr className='mt-3 border-1 border-[#EAEAEA]' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const overview = [
  {
    title: 'Total Scan',
    value: '64',
  },
  {
    title: 'Total Doctor Available',
    value: '32',
  },
  {
    title: 'OnGoing',
    value: 'Dr. Amara - 6 Mar',
  },
];
