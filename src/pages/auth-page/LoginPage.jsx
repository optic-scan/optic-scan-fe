import Logo from '../../assets/logo/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Tabs from '../../components/auth-components/Tabs';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { FaCircleCheck } from 'react-icons/fa6';
import { RiErrorWarningFill } from 'react-icons/ri';
import { PiWarningFill } from 'react-icons/pi';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),

  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const res = await req.json();

      if (req.status === 200) {
        localStorage.setItem('client_access_id', res.accessToken);

        toast('Welcome Back!', {
          description: 'You have logged in successfully. Enjoy your session!',
          icon: <FaCircleCheck className='size-5 text-green-500' />,
          classNames: {
            title: '!text-green-500',
          },
        });

        navigate('/dashboard/home');
      } else if (req.status === 401) {
        toast('Login Failed', {
          description:
            "The email or password you entered doesn't match our records. Please double-check your credentials and try again.",
          icon: <PiWarningFill className='size-5 text-yellow-500' />,
          classNames: {
            title: '!text-yellow-500',
          },
        });
      } else {
        throw new Error(`Unexpected response status: ${req.status}`);
      }
    } catch (error) {
      console.error('Authentication error:', error);

      toast('Oops! Something Went Wrong', {
        description:
          'An error occurred while logging into your account. Please try again later.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <>
        <div className='flex justify-center items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='21'
            viewBox='0 0 27 21'
            fill='none'
            className='size-8'
          >
            <path
              d='M13.0868 0.229095C9.44313 0.229095 6.52549 1.88859 4.40152 3.86375C2.29107 5.82087 0.879601 8.1658 0.212196 9.77569C0.0633826 10.1319 0.0633826 10.5288 0.212196 10.885C0.879601 12.4949 2.29107 14.8399 4.40152 16.797C6.52549 18.7721 9.44313 20.4316 13.0868 20.4316C16.7305 20.4316 19.6481 18.7721 21.7721 16.797C23.8825 14.8353 25.294 12.4949 25.9659 10.885C26.1147 10.5288 26.1147 10.1319 25.9659 9.77569C25.294 8.1658 23.8825 5.82087 21.7721 3.86375C19.6481 1.88859 16.7305 0.229095 13.0868 0.229095ZM6.59313 10.3304C6.59313 8.60813 7.27728 6.95644 8.49508 5.73864C9.71288 4.52084 11.3646 3.83669 13.0868 3.83669C14.809 3.83669 16.4607 4.52084 17.6785 5.73864C18.8963 6.95644 19.5805 8.60813 19.5805 10.3304C19.5805 12.0526 18.8963 13.7043 17.6785 14.9221C16.4607 16.1399 14.809 16.824 13.0868 16.824C11.3646 16.824 9.71288 16.1399 8.49508 14.9221C7.27728 13.7043 6.59313 12.0526 6.59313 10.3304ZM13.0868 7.44429C13.0868 9.03614 11.7926 10.3304 10.2007 10.3304C9.88055 10.3304 9.57391 10.2762 9.2853 10.1815C9.03728 10.1004 8.74867 10.2537 8.75769 10.5153C8.77122 10.8264 8.81631 11.1376 8.90199 11.4487C9.51979 13.7576 11.8963 15.1285 14.2052 14.5107C16.514 13.8929 17.8849 11.5164 17.2671 9.2075C16.7665 7.33606 15.1116 6.07791 13.2717 6.00125C13.0101 5.99223 12.8568 6.27633 12.938 6.52886C13.0327 6.81747 13.0868 7.12411 13.0868 7.44429Z'
              fill='#146EF5'
            />
          </svg>

          <p className='font-semibold text-xl'>IntelliSight</p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-10 text-xs sm:text-sm'
        >
          <InputField
            label='Email'
            name='email'
            type='email'
            register={form.register}
            errors={form.formState.errors}
            className={'mt-4'}
          />

          <InputField
            label='Password'
            name='password'
            type='password'
            register={form.register}
            errors={form.formState.errors}
            className={'mt-4'}
          />

          <p className='mt-4 text-center'>
            Don't have an account?{' '}
            <a
              href='/register'
              className='text-[#146EF5] underline underline-offset-2'
            >
              Register
            </a>
          </p>

          <div className='flex mt-16 gap-2'>
            <Button
              type={'button'}
              variant={'skeleton'}
              onClick={() => navigate(-1)}
              className={'w-1/2'}
            >
              Back
            </Button>

            <Button
              type={'submit'}
              disabled={isLoading}
              className={'bg-[#146EF5] text-white w-1/2'}
            >
              {isLoading ? (
                <FaSpinner className='animate-spin mx-auto' />
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
      </>
    );
  };

  const tabItems = [
    {
      label: 'Login as Patient',
      value: 'pasien',
      content: loginForm(),
    },
    {
      label: 'Login as Doctor',
      value: 'dokter',
      content: loginForm(),
    },
  ];

  return (
    <div className='bg-[url(/src/assets/bg-wave.jpg)] bg-cover bg-center h-screen overflow-hidden flex justify-center items-center'>
      <div className='container px-4 sm:px-6'>
        <Tabs
          tabs={tabItems}
          className={'w-full md:w-6/7 lg:w-5/7 xl:w-1/2 mx-auto'}
        />
      </div>
    </div>
  );
}
