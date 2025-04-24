export default function InputField({
  className,
  inputClassName,
  labelClassName,
  label,
  name,
  type = 'text',
  placeholder = '',
  readOnly = false,
  register,
  errors,
  value,
  as = 'input', // 'input' or 'textarea'
}) {
  return (
    <div className={`${className} flex flex-col`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`${inputClassName} mt-1 border border-[#C4C4C4] rounded-md p-2 resize-none`}
          readOnly={readOnly}
          value={value}
          rows={4}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`${inputClassName} mt-1 border border-[#C4C4C4] rounded-md p-2`}
          readOnly={readOnly}
          value={value}
        />
      )}

      {errors[name] && (
        <small className='mt-1 text-red-500'>{errors[name]?.message}</small>
      )}
    </div>
  );
}
