import Logo from '../assets/logo/logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Tabs from './Tabs';

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
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
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
          className='mt-10 text-sm'
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
            <Button type={'button'} variant={'skeleton'} disabled={true}>
              Back
            </Button>

            <Button type={'submit'} className={'bg-[#146EF5] text-white'}>
              Login
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
