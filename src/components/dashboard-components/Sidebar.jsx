import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../Button';
import { IoMenu } from 'react-icons/io5';

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
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
      <div
        className='block xl:hidden absolute inset-0 ml-6 mt-6 md:ml-10 md:mt-10 bg-white p-1 size-max rounded shadow-lg cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu className='size-6' />
      </div>

      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`${
          isOpen ? 'left-0' : '-translate-x-full'
        } h-screen bg-[#262626] w-max px-4 md:px-6 py-6 md:py-10 absolute xl:static z-10 transition-all duration-300 ease-in-out`}
      >
        <div className='flex flex-col justify-between items-center h-full'>
          <div className='flex flex-col gap-12 items-center'>
            <div
              className='block xl:hidden bg-white p-1 size-max rounded shadow-lg cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoMenu className='size-6' />
            </div>

            {/* logo */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='19'
              viewBox='0 0 24 19'
              fill='#0E57C6'
              className='size-8 md:size-9'
            >
              <path d='M11.9999 0.333496C8.63327 0.333496 5.93744 1.86683 3.97494 3.69183C2.02494 5.50016 0.720768 7.66683 0.104102 9.15433C-0.0333984 9.4835 -0.0333984 9.85016 0.104102 10.1793C0.720768 11.6668 2.02494 13.8335 3.97494 15.6418C5.93744 17.4668 8.63327 19.0002 11.9999 19.0002C15.3666 19.0002 18.0624 17.4668 20.0249 15.6418C21.9749 13.8293 23.2791 11.6668 23.8999 10.1793C24.0374 9.85016 24.0374 9.4835 23.8999 9.15433C23.2791 7.66683 21.9749 5.50016 20.0249 3.69183C18.0624 1.86683 15.3666 0.333496 11.9999 0.333496ZM5.99994 9.66683C5.99994 8.07553 6.63208 6.54941 7.75729 5.42419C8.88251 4.29897 10.4086 3.66683 11.9999 3.66683C13.5912 3.66683 15.1174 4.29897 16.2426 5.42419C17.3678 6.54941 17.9999 8.07553 17.9999 9.66683C17.9999 11.2581 17.3678 12.7843 16.2426 13.9095C15.1174 15.0347 13.5912 15.6668 11.9999 15.6668C10.4086 15.6668 8.88251 15.0347 7.75729 13.9095C6.63208 12.7843 5.99994 11.2581 5.99994 9.66683ZM11.9999 7.00016C11.9999 8.471 10.8041 9.66683 9.33327 9.66683C9.03744 9.66683 8.7541 9.61683 8.48744 9.52933C8.25827 9.45433 7.9916 9.596 7.99994 9.83766C8.01243 10.1252 8.0541 10.4127 8.13327 10.7002C8.7041 12.8335 10.8999 14.1002 13.0333 13.5293C15.1666 12.9585 16.4333 10.7627 15.8624 8.62933C15.3999 6.90016 13.8708 5.73766 12.1708 5.66683C11.9291 5.6585 11.7874 5.921 11.8624 6.15433C11.9499 6.421 11.9999 6.70433 11.9999 7.00016Z' />
            </svg>

            <div className='flex flex-col gap-6'>
              <a
                href='/dashboard/home'
                className={`${
                  location.pathname === '/dashboard/home' ? 'bg-[#146EF5]' : ''
                } p-2 rounded-xl`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='size-6 md:size-7'
                >
                  <g fill='none' stroke='white' strokeWidth='1.5'>
                    <path d='M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z' />
                    <path strokeLinecap='round' d='M12 15v3' />
                  </g>
                </svg>
              </a>

              <a
                href='/dashboard/results'
                className={`${
                  location.pathname === '/dashboard/results'
                    ? 'bg-[#146EF5]'
                    : ''
                } p-2 rounded-xl`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='size-6 md:size-7'
                >
                  <path
                    fill='white'
                    fillRule='evenodd'
                    d='M7.263 3.26A2.25 2.25 0 0 1 9.5 1.25h5a2.25 2.25 0 0 1 2.237 2.01c.764.016 1.423.055 1.987.159c.758.14 1.403.404 1.928.93c.602.601.86 1.36.982 2.26c.116.866.116 1.969.116 3.336v6.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-6.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-6.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.525-.525 1.17-.79 1.928-.929c.564-.104 1.224-.143 1.987-.159m.002 1.5c-.718.016-1.272.052-1.718.134c-.566.104-.895.272-1.138.515c-.277.277-.457.665-.556 1.4c-.101.754-.103 1.756-.103 3.191v6c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h6c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191v-6c0-1.435-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.244-.243-.572-.41-1.138-.515c-.446-.082-1-.118-1.718-.133A2.25 2.25 0 0 1 14.5 6.75h-5a2.25 2.25 0 0 1-2.235-1.99M9.5 2.75a.75.75 0 0 0-.75.75v1c0 .414.336.75.75.75h5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75zM6.25 10.5A.75.75 0 0 1 7 9.75h10a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m1 3.5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m1 3.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75'
                    clipRule='evenodd'
                  />
                </svg>
              </a>

              <a
                href='/dashboard/profile'
                className={`${
                  location.pathname === '/dashboard/profile'
                    ? 'bg-[#146EF5]'
                    : ''
                } p-2 rounded-xl`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='size-6 md:size-7'
                >
                  <g fill='none' stroke='white' strokeWidth='1.5'>
                    <path
                      strokeLinejoin='round'
                      d='M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'
                    />
                    <circle cx='12' cy='7' r='3' />
                  </g>
                </svg>
              </a>
            </div>
          </div>

          <Button
            disabled={isLoading}
            onClick={handleLogout}
            className='p-2 bg-[#F00] rounded-xl cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='size-5 md:size-6'
            >
              <path
                d='M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z'
                fill='white'
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}
