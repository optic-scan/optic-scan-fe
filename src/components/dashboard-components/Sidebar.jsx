import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../Button';
import { IoMenu } from 'react-icons/io5';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (req.status === 200) {
        localStorage.removeItem('client_access_id');
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* hamburger menu */}
      <div
        className='block xl:hidden absolute inset-0 ml-6 mt-6 md:ml-10 md:mt-10 bg-white p-1 size-max rounded shadow-lg cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu className='size-6' />
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 z-10 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* sidebar */}
      <div
        className={`${
          isOpen ? 'translate-0' : '-translate-x-full'
        } h-dvh bg-[#262626] w-max xl:w-[250px] px-4 md:px-6 py-6 md:py-10 fixed xl:translate-0 xl:static z-20 transition-all duration-300 ease-in-out`}
      >
        <div className='flex flex-col justify-between items-center h-full'>
          <div className='flex flex-col gap-12 items-center w-full'>
            <div
              className='block xl:hidden bg-white p-1 size-max rounded shadow-lg cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoMenu className='size-6' />
            </div>

            {/* logo */}
            <div className='flex items-center gap-3 relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='19'
                viewBox='0 0 24 19'
                fill='#0E57C6'
                className='size-8 md:size-9 z-10'
              >
                <path d='M11.9999 0.333496C8.63327 0.333496 5.93744 1.86683 3.97494 3.69183C2.02494 5.50016 0.720768 7.66683 0.104102 9.15433C-0.0333984 9.4835 -0.0333984 9.85016 0.104102 10.1793C0.720768 11.6668 2.02494 13.8335 3.97494 15.6418C5.93744 17.4668 8.63327 19.0002 11.9999 19.0002C15.3666 19.0002 18.0624 17.4668 20.0249 15.6418C21.9749 13.8293 23.2791 11.6668 23.8999 10.1793C24.0374 9.85016 24.0374 9.4835 23.8999 9.15433C23.2791 7.66683 21.9749 5.50016 20.0249 3.69183C18.0624 1.86683 15.3666 0.333496 11.9999 0.333496ZM5.99994 9.66683C5.99994 8.07553 6.63208 6.54941 7.75729 5.42419C8.88251 4.29897 10.4086 3.66683 11.9999 3.66683C13.5912 3.66683 15.1174 4.29897 16.2426 5.42419C17.3678 6.54941 17.9999 8.07553 17.9999 9.66683C17.9999 11.2581 17.3678 12.7843 16.2426 13.9095C15.1174 15.0347 13.5912 15.6668 11.9999 15.6668C10.4086 15.6668 8.88251 15.0347 7.75729 13.9095C6.63208 12.7843 5.99994 11.2581 5.99994 9.66683ZM11.9999 7.00016C11.9999 8.471 10.8041 9.66683 9.33327 9.66683C9.03744 9.66683 8.7541 9.61683 8.48744 9.52933C8.25827 9.45433 7.9916 9.596 7.99994 9.83766C8.01243 10.1252 8.0541 10.4127 8.13327 10.7002C8.7041 12.8335 10.8999 14.1002 13.0333 13.5293C15.1666 12.9585 16.4333 10.7627 15.8624 8.62933C15.3999 6.90016 13.8708 5.73766 12.1708 5.66683C11.9291 5.6585 11.7874 5.921 11.8624 6.15433C11.9499 6.421 11.9999 6.70433 11.9999 7.00016Z' />
              </svg>

              <h1 className='text-xl font-semibold text-white hidden xl:block z-10'>
                IntelliSight
              </h1>

              <div className='w-[120%] h-20 absolute bg-radial from-[#146EF5]/0 xl:from-[#146EF5]/15 from-0% to-transparent to-80% z-0 -left-3'></div>
            </div>

            <div className='flex flex-col gap-6 w-full'>
              <a href='/dashboard/home'>
                <div
                  className={`${
                    location.pathname === '/dashboard/home'
                      ? 'bg-[#146EF5]'
                      : ''
                  } p-2 xl:px-4 w-full rounded-xl xl:rounded-sm flex items-center`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='min-w-6 min-h-6 md:min-w-7 md:min-h-7'
                  >
                    <g
                      fill='none'
                      stroke={
                        location.pathname === '/dashboard/home'
                          ? 'white'
                          : '#C4C4C4'
                      }
                      strokeWidth='1.5'
                    >
                      <path d='M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z' />
                      <path strokeLinecap='round' d='M12 15v3' />
                    </g>
                  </svg>

                  <p
                    className={`${
                      location.pathname === '/dashboard/home'
                        ? 'text-white'
                        : 'text-[#C4C4C4]'
                    } ml-4 font-semibold hidden xl:block`}
                  >
                    Home
                  </p>
                </div>
              </a>

              <a href='/dashboard/results'>
                <div
                  className={`${
                    location.pathname === '/dashboard/results'
                      ? 'bg-[#146EF5]'
                      : ''
                  } p-2 xl:px-4 w-full rounded-xl xl:rounded-sm  flex items-center`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='min-w-6 min-h-6 md:min-w-7 md:min-h-7'
                  >
                    <path
                      fill={
                        location.pathname === '/dashboard/results'
                          ? 'white'
                          : '#C4C4C4'
                      }
                      fillRule='evenodd'
                      d='M7.263 3.26A2.25 2.25 0 0 1 9.5 1.25h5a2.25 2.25 0 0 1 2.237 2.01c.764.016 1.423.055 1.987.159c.758.14 1.403.404 1.928.93c.602.601.86 1.36.982 2.26c.116.866.116 1.969.116 3.336v6.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-6.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-6.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.525-.525 1.17-.79 1.928-.929c.564-.104 1.224-.143 1.987-.159m.002 1.5c-.718.016-1.272.052-1.718.134c-.566.104-.895.272-1.138.515c-.277.277-.457.665-.556 1.4c-.101.754-.103 1.756-.103 3.191v6c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h6c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191v-6c0-1.435-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.244-.243-.572-.41-1.138-.515c-.446-.082-1-.118-1.718-.133A2.25 2.25 0 0 1 14.5 6.75h-5a2.25 2.25 0 0 1-2.235-1.99M9.5 2.75a.75.75 0 0 0-.75.75v1c0 .414.336.75.75.75h5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75zM6.25 10.5A.75.75 0 0 1 7 9.75h10a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m1 3.5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m1 3.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75'
                      clipRule='evenodd'
                    />
                  </svg>

                  <p
                    className={`${
                      location.pathname === '/dashboard/results'
                        ? 'text-white'
                        : 'text-[#C4C4C4]'
                    } ml-4 font-semibold hidden xl:block`}
                  >
                    Results
                  </p>
                </div>
              </a>

              <a href='/dashboard/profile'>
                <div
                  className={`${
                    location.pathname === '/dashboard/profile'
                      ? 'bg-[#146EF5]'
                      : ''
                  } p-2 xl:px-4 w-full rounded-xl xl:rounded-sm  flex items-center`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='min-w-6 min-h-6 md:min-w-7 md:min-h-7'
                  >
                    <g
                      fill='none'
                      stroke={
                        location.pathname === '/dashboard/profile'
                          ? 'white'
                          : '#C4C4C4'
                      }
                      strokeWidth='1.5'
                    >
                      <path
                        strokeLinejoin='round'
                        d='M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'
                      />
                      <circle cx='12' cy='7' r='3' />
                    </g>
                  </svg>

                  <p
                    className={`${
                      location.pathname === '/dashboard/profile'
                        ? 'text-white'
                        : 'text-[#C4C4C4]'
                    } ml-4 font-semibold hidden xl:block`}
                  >
                    Profile
                  </p>
                </div>
              </a>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild className='w-full'>
              <Button
                disabled={isLoading}
                className='p-2 xl:px-4 bg-[#F00] rounded-xl xl:rounded-sm  flex items-center cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='min-w-6 min-h-6 md:min-w-7 md:min-h-7'
                >
                  <path
                    d='M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z'
                    fill='white'
                  />
                </svg>

                <p className='ml-4 text-white font-semibold hidden xl:block'>
                  Logout
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className={'w-[600px] p-10 [&>button]:hidden'}>
              <div className='flex justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='230'
                  height='230'
                  viewBox='0 0 230 230'
                  fill='none'
                  className='size-40 md:size-50'
                >
                  <path
                    opacity='0.6'
                    d='M86.2502 19.1666H95.8335C122.935 19.1666 136.496 19.1666 144.91 27.5904C153.333 36.0045 153.333 49.565 153.333 76.6666V153.333C153.333 180.435 153.333 193.995 144.91 202.41C136.496 210.833 122.935 210.833 95.8335 210.833H86.2502C59.1485 210.833 45.5881 210.833 37.1739 202.41C28.7502 193.995 28.7502 180.435 28.7502 153.333V76.6666C28.7502 49.565 28.7502 36.0045 37.1739 27.5904C45.5881 19.1666 59.1485 19.1666 86.2502 19.1666Z'
                    fill='#FF0000'
                  />
                  <path
                    opacity='0.4'
                    d='M153.333 76.6667C153.333 61.9275 153.333 51.2037 151.982 43.125H153.333C175.921 43.125 187.22 43.125 194.235 50.14C201.25 57.155 201.25 68.4537 201.25 91.0417V138.958C201.25 161.546 201.25 172.835 194.235 179.86C187.22 186.885 175.921 186.875 153.333 186.875H151.982C153.333 178.796 153.333 168.072 153.333 153.333V76.6667Z'
                    fill='#FF0000'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M187.163 109.921C188.509 111.269 189.265 113.095 189.265 115C189.265 116.905 188.509 118.732 187.163 120.079L167.996 139.246C166.633 140.515 164.831 141.207 162.969 141.174C161.107 141.141 159.331 140.387 158.014 139.07C156.697 137.753 155.943 135.976 155.91 134.114C155.877 132.252 156.568 130.45 157.838 129.088L164.738 122.188H95.8335C93.9272 122.188 92.0991 121.43 90.7512 120.082C89.4032 118.734 88.646 116.906 88.646 115C88.646 113.094 89.4032 111.266 90.7512 109.918C92.0991 108.57 93.9272 107.813 95.8335 107.813H164.738L157.838 100.913C157.131 100.254 156.565 99.461 156.172 98.5793C155.779 97.6977 155.568 96.7459 155.551 95.7808C155.534 94.8158 155.712 93.8572 156.073 92.9622C156.435 92.0672 156.973 91.2542 157.655 90.5717C158.338 89.8892 159.151 89.3512 160.046 88.9897C160.941 88.6282 161.899 88.4506 162.864 88.4677C163.829 88.4847 164.781 88.6959 165.663 89.0888C166.544 89.4816 167.338 90.048 167.996 90.7542L187.163 109.921Z'
                    fill='#FF0000'
                  />
                </svg>
              </div>

              <div className='mt-6'>
                <DialogTitle className='text-black text-center font-semibold text-base md:text-xl'>
                  Are you sure you want to logout?
                </DialogTitle>

                <div className='mt-10 flex gap-4'>
                  <DialogClose asChild>
                    <Button
                      variant={'skeleton'}
                      className={'text-black w-1/2'}
                      data-slot='dialog-close'
                    >
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    className={'bg-[#F33D3D] text-white w-1/2'}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
