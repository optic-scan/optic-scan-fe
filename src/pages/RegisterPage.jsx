import { useState } from 'react';
import Logo from '../assets/logo/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name can only contain letters and spaces',
      }),
    email: z.string().email({
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
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const [currentTab, setCurrentTab] = useState('Patient');

  const handleSubmit = values => {
    alert('Submitted');
    console.log(values);
  };

  return (
    <div className='bg-[url(/bg-wave.jpg)] bg-cover bg-center h-screen overflow-hidden flex justify-center items-center'>
      <div className='bg-white w-1/3 rounded-2xl shadow-xl'>
        <div className='flex text-sm'>
          <div
            className={`w-1/2 ${
              currentTab === 'Patient' ? 'bg-blue-50' : 'bg-white'
            } p-5 rounded-t-2xl cursor-pointer relative`}
            onClick={() => setCurrentTab('Patient')}
          >
            <p
              className={`${
                currentTab === 'Patient' ? 'text-[#146EF5]' : 'text-black'
              } text-center`}
            >
              Register as Patient
            </p>
            <span
              className={`${
                currentTab === 'Patient' ? 'absolute' : 'hidden'
              } -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-[#146EF5] rounded`}
            ></span>
          </div>

          <div
            className={`w-1/2 ${
              currentTab === 'Doctor' ? 'bg-blue-50' : 'bg-white'
            } p-5 rounded-t-2xl cursor-pointer relative`}
            onClick={() => setCurrentTab('Doctor')}
          >
            <p
              className={`${
                currentTab === 'Doctor' ? 'text-[#146EF5]' : 'text-black'
              } text-center`}
            >
              Register as Doctor
            </p>
            <span
              className={`${
                currentTab === 'Doctor' ? 'absolute' : 'hidden'
              } -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-[#146EF5] rounded`}
            ></span>
          </div>
        </div>

        <div className='px-20 pt-12 pb-16'>
          <img src={Logo} alt='logo' className='mx-auto' />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mt-4 text-sm'
          >
            <div className='flex flex-col'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                {...form.register('name')}
                className='mt-1 border border-[#C4C4C4] rounded-md p-2'
              />
              <small className='mt-1 text-red-500'>
                {form.formState.errors.name?.message}
              </small>
            </div>

            <div className='mt-4 flex flex-col'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='email'
                id='email'
                {...form.register('email')}
                className='mt-1 border border-[#C4C4C4] rounded-md p-2'
              />
              <small className='mt-1 text-red-500'>
                {form.formState.errors.email?.message}
              </small>
            </div>

            <div className='mt-4 flex flex-col'>
              <label htmlFor='birthDate'>Birth Date</label>
              <input
                type='date'
                name='birthDate'
                id='birthDate'
                {...form.register('birthDate')}
                className='mt-1 border border-[#C4C4C4] rounded-md p-2'
              />
              <small className='mt-1 text-red-500'>
                {form.formState.errors.birthDate?.message}
              </small>
            </div>

            <div className='mt-4 flex flex-col'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                {...form.register('password')}
                className='mt-1 border border-[#C4C4C4] rounded-md p-2'
              />
              <small className='mt-1 text-red-500'>
                {form.formState.errors.password?.message}
              </small>
            </div>

            <div className='mt-4 flex flex-col'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                {...form.register('confirmPassword')}
                className='mt-1 border border-[#C4C4C4] rounded-md p-2'
              />
              <small className='mt-1 text-red-500'>
                {form.formState.errors.confirmPassword?.message}
              </small>
            </div>

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
              <button
                disabled
                type='button'
                className='w-1/2 border border-[#C4C4C4] py-2 rounded cursor-pointer disabled:cursor-default disabled:opacity-50'
              >
                Back
              </button>
              <button
                type='submit'
                className='w-1/2 bg-[#146EF5] text-white py-2 rounded cursor-pointer'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
