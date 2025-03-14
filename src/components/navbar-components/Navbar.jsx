import { useLocation } from 'react-router';
import Logo from '../../assets/logo/icon.png';
import Button from '../../components/Button';

export default function Navbar() {
  const location = useLocation();

  return (
    <div className='flex justify-between items-center py-6'>
      <div className='flex justify-center items-center gap-3'>
        <img src={Logo} alt='logo' className='w-8' />
        <h1 className='text-2xl font-semibold'>OpticScan</h1>
      </div>

      <div className='flex justify-center items-center gap-10 bg-white/70 px-10 py-4 rounded-4xl font-medium'>
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

      <div className='flex gap-4'>
        <a href='/register'>
          <Button className={'bg-white text-black px-8 rounded-3xl'}>
            Register
          </Button>
        </a>

        <a href='/login'>
          <Button className={'bg-[#0E57C6] text-white px-8 rounded-3xl'}>
            Login
          </Button>
        </a>
      </div>
    </div>
  );
}
