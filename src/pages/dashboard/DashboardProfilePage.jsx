import SideBar from '../../components/dashboard-components/Sidebar';
import Banner from '../../assets/bg-wave.jpg';
import { z } from 'zod';
import Form from '../../components/dashboard-components/Form';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../../components/ui/skeleton';
import { fetchWithRefresh } from '../../../lib/utils';

const editProfileFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces',
    }),
  birthDate: z.coerce
    .date()
    .max(new Date(), { message: 'Birthdate cannot be in the future' })
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), {
      message: 'Birthdate must be within the last 100 years',
    }),
});

const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: 'Password is required',
    }),
    newPassword: z
      .string()
      .min(12, { message: 'Password must be at least 12 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const changePasswordFields = [
  {
    label: 'Old Password',
    name: 'oldPassword',
    type: 'password',
  },
  {
    label: 'Change Password',
    name: 'newPassword',
    type: 'password',
    className: 'mt-4 md:mt-6',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    className: 'mt-4 md:mt-6',
  },
];

export default function DashboardProfilePage() {
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

  const editProfileFields = [
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      value: userData?.data.email,
    },
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      value: userData?.data.name,
      className: 'mt-4 md:mt-6',
    },
    {
      label: 'Birth Date',
      name: 'birthDate',
      type: 'date',
      value: userData?.data.birthdate,
      className: 'mt-4 md:mt-6',
    },
  ];

  const handleProfileSubmit = data => {
    console.log('Profile Data:', data);
  };

  const handlePasswordSubmit = async payload => {
    console.log('Password Data:', payload);

    const res = await fetchWithRefresh(
      `${import.meta.env.VITE_BASE_URL}/change-password`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
        }),
      }
    );

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className='flex lg:h-screen lg:overflow-y-hidden'>
      <SideBar />

      <div className='p-6 md:p-10 bg-[#F3F3F3] w-full flex flex-col h-full overflow-x-hidden'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Profile
        </h1>

        <div className='mt-6 md:mt-10 h-full bg-white rounded-2xl flex flex-col overflow-hidden'>
          <img
            src={Banner}
            alt='Banner'
            className='object-center object-cover h-[120px] sm:h-[150px] md:h-[200px] lg:h-1/4 rounded-2xl'
          />

          <div className='h-3/4 px-6 md:px-10 lg:px-16 xl:px-20'>
            <div className='flex gap-2 sm:gap-4 md:gap-6'>
              <div className='relative -translate-y-1/4 cursor-pointer'>
                <img
                  src={Banner}
                  alt='profile'
                  className='size-24 sm:size-32 md:size-36 rounded-full border-4 border-white object-center object-cover'
                />

                <div className='bg-[#146EF5] p-1.5 sm:p-2 rounded-full w-max absolute bottom-2 right-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    className='size-3 sm:size-4'
                  >
                    <path
                      d='M4.6665 4.66675H3.99984C3.64622 4.66675 3.30708 4.80722 3.05703 5.05727C2.80698 5.30732 2.6665 5.64646 2.6665 6.00008V12.0001C2.6665 12.3537 2.80698 12.6928 3.05703 12.9429C3.30708 13.1929 3.64622 13.3334 3.99984 13.3334H9.99984C10.3535 13.3334 10.6926 13.1929 10.9426 12.9429C11.1927 12.6928 11.3332 12.3537 11.3332 12.0001V11.3334'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10.6667 3.3334L12.6667 5.3334M13.59 4.39007C13.8526 4.12751 14.0001 3.77139 14.0001 3.40007C14.0001 3.02875 13.8526 2.67264 13.59 2.41007C13.3274 2.14751 12.9713 2 12.6 2C12.2287 2 11.8726 2.14751 11.61 2.41007L6 8.00007V10.0001H8L13.59 4.39007Z'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>

              <div className='mt-2 md:mt-4'>
                {userData ? (
                  <>
                    <h4 className='text-base sm:text-lg md:text-xl font-semibold capitalize'>
                      {userData?.data.name}
                    </h4>

                    <p className='text-sm sm:text-base md:text-lg text-[#484848] capitalize'>
                      {userData?.data.role}
                    </p>
                  </>
                ) : (
                  <>
                    <Skeleton className={'w-32 h-6 rounded-sm'} />
                    <Skeleton className={'mt-2 w-24 h-6 rounded-sm'} />
                  </>
                )}
              </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 pb-10'>
              <Form
                schema={editProfileFormSchema}
                onSubmit={handleProfileSubmit}
                fields={editProfileFields}
                submitLabel='Save Changes'
                className={'lg:w-1/2'}
              />

              <Form
                schema={changePasswordFormSchema}
                onSubmit={handlePasswordSubmit}
                fields={changePasswordFields}
                submitLabel='Change Password'
                className={'lg:w-1/2'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
