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
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
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
        alert(res.message);
        navigate('/dashboard/home');
      } else if (req.status === 401) {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <>
        <img src={Logo} alt='logo' className='mx-auto' />

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
              disabled={true}
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
    <div className='bg-[url(/bg-wave.jpg)] bg-cover bg-center h-screen overflow-hidden flex justify-center items-center'>
      <div className='container px-4 sm:px-6'>
        <Tabs
          tabs={tabItems}
          className={'w-full md:w-6/7 lg:w-5/7 xl:w-1/2 mx-auto'}
        />
      </div>
    </div>
  );
}
