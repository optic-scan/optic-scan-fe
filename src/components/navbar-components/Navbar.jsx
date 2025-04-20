import { useLocation } from 'react-router';
import Logo from '../../assets/logo/icon.png';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { fetchWithRefresh } from '../../../lib/utils';

export default function Navbar() {
  const location = useLocation();

  const [userData, setUserData] = useState(null);

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

    fetchUserData();
  }, []);

  return (
    <div className='flex justify-between items-center p-6 fixed inset-x-0 container mx-auto z-50'>
      <div className='flex justify-center items-center gap-3 relative'>
        <img src={Logo} alt='logo' className='w-8 z-10' />
        <h1 className='text-2xl font-semibold z-10'>OpticScan</h1>

        <div className='w-[150%] h-24 absolute bg-radial from-[#146EF5]/15 from-0% to-transparent to-80% z-0'></div>
      </div>

      <div className='flex justify-center items-center gap-10 bg-white/70 backdrop-blur-sm px-10 py-4 rounded-4xl font-medium'>
        <div className='relative'>
          <a
            href='/'
            className={`${
              location.pathname === '/' ? 'text-black' : 'text-[#484848]'
            }`}
          >
            Home
          </a>

          <div
            className={`${
              location.pathname === '/' ? '' : 'hidden'
            } w-3 h-[2px] bg-black rounded-2xl absolute -bottom-[2px] left-1/2 -translate-x-1/2`}
          ></div>
        </div>

        <div className='relative'>
          <a
            href='/about-us'
            className={`${
              location.pathname === '/about-us'
                ? 'text-black'
                : 'text-[#484848]'
            }`}
          >
            About Us
          </a>

          <div
            className={`${
              location.pathname === '/about-us' ? '' : 'hidden'
            } w-3 h-[2px] bg-black rounded-2xl absolute -bottom-[2px] left-1/2 -translate-x-1/2`}
          ></div>
        </div>

        <div className='relative'>
          <a
            href='/how-it-works'
            className={`${
              location.pathname === '/how-it-works'
                ? 'text-black'
                : 'text-[#484848]'
            }`}
          >
            How It Works
          </a>

          <div
            className={`${
              location.pathname === '/how-it-works' ? '' : 'hidden'
            } w-3 h-[2px] bg-black rounded-2xl absolute -bottom-[2px] left-1/2 -translate-x-1/2`}
          ></div>
        </div>
      </div>

      {userData ? (
        <div className='flex gap-4 items-center'>
          <p>{userData?.data.name}</p>

          <a href='/dashboard/home'>
            <img
              src={`${import.meta.env.VITE_BASE_URL}/images/profile-pics/${
                userData?.data.profile_pic
              }`}
              alt='profile'
              className='size-12 rounded-full border-2 border-white object-center object-cover cursor-pointer'
            />
          </a>
        </div>
      ) : (
        <div className='flex gap-4'>
          <a href='/register'>
            <Button
              className={'bg-white text-black px-8 rounded-3xl shadow-xl'}
            >
              Register
            </Button>
          </a>

          <a href='/login'>
            <Button
              className={
                'bg-[#0E57C6] text-white px-8 rounded-3xl shadow-[5px_7px_20px_rgba(20,110,245,0.25)]'
              }
            >
              Login
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
