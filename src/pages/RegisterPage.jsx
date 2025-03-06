import Logo from '../assets/logo/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Tabs from './Tabs';

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
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const handleSubmit = values => {
    alert('Submitted');
    console.log(values);
  };

  const patientForm = () => {
    return (
      <>
        <img src={Logo} alt='logo' className='mx-auto' />

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-4 text-sm'
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
            <Button type={'button'} variant={'skeleton'} disabled={true}>
              Back
            </Button>

            <Button type={'submit'} className={'bg-[#146EF5] text-white'}>
              Register
            </Button>
          </div>
        </form>
      </>
    );
  };

  const tabItems = [
    {
      label: 'Register as Patient',
      value: 'Patient',
      content: patientForm(),
    },
    {
      label: 'Register as Doctor',
      value: 'Doctor',
      content: patientForm(),
    },
  ];

  return (
    <div className='bg-[url(/bg-wave.jpg)] bg-cover bg-center h-screen overflow-hidden flex justify-center items-center'>
      <Tabs tabs={tabItems} />
    </div>
  );
}
