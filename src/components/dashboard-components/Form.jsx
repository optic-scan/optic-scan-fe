import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import InputField from '../InputField';

const Form = ({ schema, onSubmit, fields, submitLabel, className }) => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <InputField
          key={index}
          label={field.label}
          name={field.name}
          type={field.type}
          register={form.register}
          errors={form.formState.errors}
          className={field.className}
          labelClassName='font-semibold text-sm md:text-base lg:text-lg'
          inputClassName='!rounded text-[#484848]'
        />
      ))}

      <div className='flex justify-center'>
        <Button
          type='submit'
          className='mt-6 bg-[#146EF5] text-white px-8 py-3'
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
