import Logo from '../../assets/logo/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Tabs from '../../components/auth-components/Tabs';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name can only contain letters and spaces',
      }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: 'Invalid email address',
      }),
    birthDate: z.coerce
      .date()
      .max(new Date(), { message: 'Birthdate cannot be in the future' })
      .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), {
        message: 'Birthdate must be within the last 100 years',
      }),
    password: z
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
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const [currentRole, setCurrentRole] = useState('pasien');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRole = value => {
    setCurrentRole(value);
  };

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          birthdate: values.birthDate,
          role: currentRole,
          password: values.password,
        }),
      });

      /* const res = await req.json(); */

      if (req.status === 201) {
        toast('Account created successfully', {
          description:
            'Your account has been created successfully. You can now log in and start exploring.',
          icon: <FaCircleCheck className='size-4 text-green-500' />,
          classNames: {
            title: '!text-green-500',
          },
        });

        form.reset();

        navigate('/login');
      } else if (req.status === 409) {
        toast('User already exists', {
          description:
            ' An account with this email already exists. Please log in or use a different email.',
          icon: <RiErrorWarningFill className='size-5 text-red-500' />,
          classNames: {
            title: '!text-red-500',
          },
        });

        form.reset();
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registerForm = () => {
    return (
      <>
        <img src={Logo} alt='logo' className='mx-auto' />

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-4 text-xs sm:text-sm'
        >
          <InputField
            label='Name'
            name='name'
            type='text'
            register={form.register}
            errors={form.formState.errors}
          />

          <InputField
            label='Email'
            name='email'
            type='email'
            register={form.register}
            errors={form.formState.errors}
            className={'mt-4'}
          />

          <InputField
            label='Birth Date'
            name='birthDate'
            type='date'
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

          <InputField
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            register={form.register}
            errors={form.formState.errors}
            className={'mt-4'}
          />

          <p className='mt-4 text-center'>
            Already have an account?{' '}
            <a
              href='/login'
              className='text-[#146EF5] underline underline-offset-2'
            >
              Sign in
            </a>
          </p>

          <div className='flex mt-8 gap-2'>
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
                'Register'
              )}
            </Button>
          </div>
        </form>
      </>
    );
  };

  const tabItems = [
    {
      label: 'Register as Patient',
      value: 'pasien',
      content: registerForm(),
    },
    {
      label: 'Register as Doctor',
      value: 'dokter',
      content: registerForm(),
    },
  ];

  return (
    <div className='bg-[url(/bg-wave.jpg)] bg-cover bg-center h-screen overflow-hidden flex justify-center items-center'>
      <div className='container px-4 sm:px-6'>
        <Tabs
          tabs={tabItems}
          onChange={handleChangeRole}
          className={'w-full md:w-6/7 lg:w-5/7 xl:w-1/2 mx-auto'}
        />
      </div>
    </div>
  );
}
