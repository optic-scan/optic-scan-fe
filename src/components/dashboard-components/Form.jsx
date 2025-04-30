import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import InputField from '../InputField';

const Form = forwardRef(
  ({ schema, onSubmit, fields, submitLabel, className }, ref) => {
    const form = useForm({
      resolver: zodResolver(schema),
    });

    const { reset } = form;

    useImperativeHandle(ref, () => ({
      resetForm: values => {
        const initialValues = fields.reduce((acc, field) => {
          acc[field.name] = values?.[field.name] ?? field.value ?? '';
          return acc;
        }, {});
        reset(initialValues);
      },
    }));

    useEffect(() => {
      const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.value ?? '';
        return acc;
      }, {});
      reset(initialValues);
    }, [fields, reset]);

    return (
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            register={form.register}
            errors={form.formState.errors}
            className={field.className}
            labelClassName='font-semibold text-sm md:text-base lg:text-lg'
            inputClassName='!rounded text-[#484848] text-sm md:text-base'
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
  }
);

export default Form;
