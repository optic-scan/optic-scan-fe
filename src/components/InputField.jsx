export default function InputField({
  className,
  label,
  name,
  type = 'text',
  register,
  errors,
}) {
  return (
    <div className={`${className} flex flex-col`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        {...register(name)}
        className='mt-1 border border-[#C4C4C4] rounded-md p-2'
      />
      {errors[name] && (
        <small className='mt-1 text-red-500'>{errors[name]?.message}</small>
      )}
    </div>
  );
}
