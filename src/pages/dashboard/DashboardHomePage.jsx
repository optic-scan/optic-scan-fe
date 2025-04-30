import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import CardContainer, {
  CardContent,
  CardContentContainer,
  CardContentSmall,
  CardHeader,
} from '../../components/Card';
import SideBar from '../../components/dashboard-components/Sidebar';
import { fetchWithRefresh, formatDate } from '../../../lib/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function HomePasien() {
  const [userData, setUserData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetchWithRefresh(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        const data = await res.json();

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchResultsData = async () => {
      try {
        const res = await fetchWithRefresh(
          `${import.meta.env.VITE_BASE_URL}/exam/my-result`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        const data = await res.json();
        setResultData(data);
      } catch (error) {
        console.error('Error fetching results data:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const res = await fetchWithRefresh(
          `${import.meta.env.VITE_BASE_URL}/user/users-count`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        const data = await res.json();
        setUserCount(data);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserData();
    fetchResultsData();
    fetchUserCount();
  }, []);

  const overviewPasien = [
    {
      title: 'Total Scan',
      value: resultData?.data.length,
    },
    {
      title: 'Total Doctor Available',
      value: userCount?.data?.total_dokter,
    },
    {
      title: 'OnGoing',
      value:
        resultData?.data.length > 0
          ? `${resultData?.data[0]?.doctor.name.slice(0, 9)} - ${formatDate(
              resultData?.data[0]?.examination_date,
              'day-month'
            )}`
          : 'None',
    },
  ];

  const overviewDokter = [
    {
      title: 'Total Diagnosis',
      value: resultData?.data.length,
    },
    {
      title: 'Total Patient',
      value: userCount?.data?.total_pasien,
    },
    {
      title: 'OnGoing',
      value:
        resultData?.data.length > 0
          ? resultData?.data[0]?.patient.name.slice(0, 9)
          : 'None',
    },
  ];

  const overview =
    userData?.data.role === 'pasien' ? overviewPasien : overviewDokter;

  return (
    <div className='flex min-h-screen xl:h-screen xl:overflow-y-hidden bg-[#F3F3F3]'>
      <SideBar />

      <div className='p-6 md:p-10 w-full flex flex-col h-full overflow-x-hidden overflow-y-auto'>
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
              {userData?.data.role === 'dokter' && index === 2 ? (
                <CardContentContainer>
                  <CardContent
                    className={
                      '!mt-2 xl:!mt-4 2xl:!mt-6 !font-semibold !text-lg md:!text-xl lg:!text-2xl xl:!text-3xl 2xl:!text-4xl'
                    }
                    status={true}
                    online={resultData?.data.length > 0 ? true : false}
                  >
                    {item.value}
                  </CardContent>

                  {resultData?.data.length > 1 && (
                    <CardContentSmall
                      className={
                        '!mt-2 xl:!mt-4 2xl:!mt-6 !font-medium !text-xs md:!text-sm'
                      }
                    >
                      {`and ${resultData?.data.length - 1}+ others`}
                    </CardContentSmall>
                  )}
                </CardContentContainer>
              ) : (
                <CardContent
                  className={
                    '!mt-2 xl:!mt-4 2xl:!mt-6 !font-semibold !text-lg md:!text-xl lg:!text-2xl xl:!text-3xl 2xl:!text-4xl'
                  }
                  status={index === 2}
                  online={resultData?.data.length > 0 ? true : false}
                >
                  {item.value}
                </CardContent>
              )}
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
                {userData?.data.role === 'pasien'
                  ? 'Start scanning your eye with AI powered detection software'
                  : 'Start diagnose possible eye diseases'}
              </p>

              <div className='mt-2 lg:mt-8 xl:mt-10 flex justify-between items-center'>
                {userData?.data.role === 'pasien' ? (
                  <Button
                    className={
                      'px-6 md:px-8 lg:px-10 bg-white text-black font-semibold'
                    }
                    href={'/dashboard/scan-eye'}
                  >
                    Scan Eye
                  </Button>
                ) : (
                  <Button
                    className={
                      'px-6 md:px-8 lg:px-10 bg-white text-black font-semibold'
                    }
                    href={'/dashboard/results'}
                  >
                    Diagnose
                  </Button>
                )}

                {userData?.data.role === 'pasien' ? (
                  /* icon for patient */
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
                ) : (
                  /* icon for doctor */
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='74'
                    height='83'
                    viewBox='0 0 74 83'
                    fill='none'
                    className='size-14 sm:size-16 md:size-18 lg:size-20 xl:size-28'
                  >
                    <path
                      d='M22.8337 38.3333C18.6344 38.3333 14.6071 36.6652 11.6378 33.6958C8.66847 30.7265 7.00032 26.6992 7.00032 22.5V9.83332C7.00032 8.99347 7.33395 8.18802 7.92782 7.59415C8.52168 7.00029 9.32714 6.66666 10.167 6.66666H13.3337C14.1735 6.66666 14.979 6.33303 15.5728 5.73916C16.1667 5.1453 16.5003 4.33985 16.5003 3.49999C16.5003 2.66014 16.1667 1.85469 15.5728 1.26082C14.979 0.666958 14.1735 0.333328 13.3337 0.333328H10.167C7.64743 0.333328 5.23107 1.33422 3.44948 3.11581C1.66788 4.89741 0.666992 7.31377 0.666992 9.83332V22.5C0.671063 26.0775 1.54344 29.6005 3.20919 32.7666C4.87494 35.9326 7.28429 38.647 10.2303 40.6766C13.0636 43.1697 15.361 46.2122 16.9831 49.6198C18.6053 53.0274 19.5183 56.7289 19.667 60.5C19.667 66.3789 22.0024 72.0171 26.1595 76.1742C30.3165 80.3312 35.9547 82.6666 41.8336 82.6666C47.7126 82.6666 53.3508 80.3312 57.5078 76.1742C61.6649 72.0171 64.0003 66.3789 64.0003 60.5V56.89C66.9854 56.1192 69.5869 54.2862 71.3172 51.7346C73.0475 49.183 73.7878 46.0879 73.3993 43.0295C73.0109 39.9711 71.5203 37.1593 69.207 35.1213C66.8938 33.0833 63.9166 31.9589 60.8336 31.9589C57.7507 31.9589 54.7735 33.0833 52.4602 35.1213C50.147 37.1593 48.6564 39.9711 48.2679 43.0295C47.8795 46.0879 48.6198 49.183 50.3501 51.7346C52.0804 54.2862 54.6819 56.1192 57.667 56.89V60.5C57.667 64.6992 55.9988 68.7265 53.0295 71.6958C50.0602 74.6651 46.0329 76.3333 41.8336 76.3333C37.6344 76.3333 33.6071 74.6651 30.6378 71.6958C27.6685 68.7265 26.0003 64.6992 26.0003 60.5C26.157 56.7243 27.0799 53.0198 28.7131 49.612C30.3462 46.2042 32.6554 43.1641 35.5003 40.6766C38.4346 38.64 40.8317 35.9225 42.4862 32.7569C44.1407 29.5913 45.0033 26.0719 45.0003 22.5V9.83332C45.0003 7.31377 43.9994 4.89741 42.2178 3.11581C40.4362 1.33422 38.0199 0.333328 35.5003 0.333328H32.3336C31.4938 0.333328 30.6883 0.666958 30.0945 1.26082C29.5006 1.85469 29.167 2.66014 29.167 3.49999C29.167 4.33985 29.5006 5.1453 30.0945 5.73916C30.6883 6.33303 31.4938 6.66666 32.3336 6.66666H35.5003C36.3402 6.66666 37.1456 7.00029 37.7395 7.59415C38.3333 8.18802 38.667 8.99347 38.667 9.83332V22.5C38.667 24.5792 38.2574 26.6381 37.4617 28.5591C36.666 30.4801 35.4998 32.2256 34.0295 33.6958C32.5592 35.1661 30.8138 36.3324 28.8928 37.1281C26.9718 37.9238 24.9129 38.3333 22.8337 38.3333ZM60.8336 51C59.1539 51 57.543 50.3327 56.3553 49.145C55.1676 47.9573 54.5003 46.3463 54.5003 44.6666C54.5003 42.9869 55.1676 41.376 56.3553 40.1883C57.543 39.0006 59.1539 38.3333 60.8336 38.3333C62.5133 38.3333 64.1242 39.0006 65.312 40.1883C66.4997 41.376 67.167 42.9869 67.167 44.6666C67.167 46.3463 66.4997 47.9573 65.312 49.145C64.1242 50.3327 62.5133 51 60.8336 51Z'
                      fill='white'
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className='xl:w-1/2 flex flex-col'>
            <div className='flex justify-between'>
              <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
                {userData?.data.role === 'pasien'
                  ? 'Result History'
                  : 'Patient History'}
              </h2>
              <a
                href='/dashboard/results'
                className='text-[#146EF5] underline underline-offset-2 font-medium text-sm lg:text-base'
              >
                View All
              </a>
            </div>

            <div className='mt-6 bg-white px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-16 rounded-xl flex-grow'>
              {resultData?.data.length > 0 ? (
                <div className='flex flex-col gap-3'>
                  {resultData?.data.slice(0, 4).map((result, index) => (
                    <div key={index}>
                      <div className='flex justify-between items-center'>
                        <div>
                          <h4 className='text-xs sm:text-sm md:text-base font-semibold'>
                            {userData?.data.role === 'pasien'
                              ? `Dr. ${result.doctor.name}`
                              : result.patient.name}
                          </h4>
                          <p className='mt-1 text-xs md:text-sm text-[#484848] font-medium'>
                            {result.diagnosis}
                          </p>
                        </div>
                        <p className='font-semibold text-xs md:text-sm'>
                          {dayjs(result.examination_date).fromNow()}
                        </p>
                      </div>
                      {index !== 3 && (
                        <hr className='mt-3 border-1 border-[#EAEAEA]' />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-xs md:text-sm text-[#484848]'>
                    Your result history is empty
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
