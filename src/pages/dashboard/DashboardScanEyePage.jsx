import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import SideBar from '../../components/dashboard-components/Sidebar';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { fetchWithRefresh } from '../../../lib/utils';
import { toast } from 'sonner';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/ui/dialog';
import Lottie from 'lottie-react';
import LoadingImage from '../../assets/dashboard/ai-processing.json';
import SuccessImage from '../../assets/dashboard/ai-success.json';
import { FaSpinner } from 'react-icons/fa';

const formSchema = z.object({
  file: z
    .custom(file => file instanceof File && file.size > 0, {
      message: 'A photo is required',
    })
    .refine(
      file =>
        file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      {
        message: 'Unsupported file format',
      }
    )
    .refine(file => file && file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    }),
  complaints: z.string(),
});

export default function DashboardScanEyePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [controller, setController] = useState(null);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      complaints: '',
    },
  });

  const file = watch('file');

  const onDrop = acceptedFiles => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setValue('file', uploadedFile, { shouldValidate: true });
    }
  };

  const onDropRejected = fileRejections => {
    const error = fileRejections[0]?.errors[0];
    if (error?.code === 'file-too-large') {
      toast('Oops! Something Went Wrong', {
        description: 'File size must be less than or equal to 5MB.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    } else if (error?.code === 'file-invalid-type') {
      toast('Oops! Something Went Wrong', {
        description: 'File must be in JPEG, PNG, or JPG format.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    } else {
      toast('Oops! Something Went Wrong', {
        description:
          'An error occurred while uploading the file. Please try again later.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop,
    onDropRejected,
  });

  const onSubmit = async data => {
    const abortController = new AbortController();
    setController(abortController);

    const formData = new FormData();
    formData.append('eye_pic', data.file);
    formData.append('complaints', data.complaints);

    try {
      setIsLoading(true);
      setIsDialogOpen(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_BASE_URL}/exam/submit-exam`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
          signal: abortController.signal,
        }
      );

      const data = await res.json();

      if (
        res.status === 201 &&
        data.message === 'Pemeriksaan berhasil diajukan'
      ) {
        setIsUploadSuccess(true);

        setValue('file', null);
        setValue('complaints', '');
      } else {
        setIsDialogOpen(false);

        toast('Oops! Something Went Wrong', {
          description:
            'An error occurred while submitting your eye examination. Please try again later.',
          icon: <RiErrorWarningFill className='size-5 text-red-500' />,
          classNames: {
            title: '!text-red-500',
          },
        });
      }
    } catch (error) {
      console.error('Error submitting eye examination:', error);
      setIsDialogOpen(false);

      toast('Oops! Something Went Wrong', {
        description:
          'An error occurred while submitting your eye examination. Please try again later.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    } finally {
      setIsLoading(false);
      setController(null);
    }
  };

  return (
    <div className='flex h-screen overflow-y-hidden'>
      <SideBar />

      <div className='p-6 md:p-10 bg-[#F3F3F3] w-full flex flex-col h-full overflow-x-hidden'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Scan Eye
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-6 md:mt-10 p-6 md:p-10 h-full bg-white rounded-2xl flex flex-col overflow-hidden'
        >
          {/* Upload Photo */}
          <div>
            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
              Upload Photo
            </h2>

            <div
              {...getRootProps()}
              className={`mt-4 p-6 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 ease-out
                ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-100'
                    : isDragAccept
                    ? 'border-green-500 bg-green-100'
                    : isDragReject
                    ? 'border-red-500 bg-red-100'
                    : 'border-dashed border-[#EAEAEA] bg-gray-50 hover:border-gray-400'
                }
              `}
            >
              <input {...getInputProps()} />
              <div className='flex flex-col justify-center items-center h-[175px] md:h-[200px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='64'
                  height='64'
                  viewBox='0 0 64 64'
                  fill='none'
                  className='size-10 md:size-14 mb-2'
                >
                  <path
                    d='M10.6665 42.6773V45.3333C10.6665 47.4551 11.5094 49.4899 13.0096 50.9902C14.5099 52.4905 16.5448 53.3333 18.6665 53.3333H45.3332C47.4549 53.3333 49.4897 52.4905 50.99 50.9902C52.4903 49.4899 53.3332 47.4551 53.3332 45.3333V42.6667M31.9998 41.3333V12M31.9998 12L41.3332 21.3333M31.9998 12L22.6665 21.3333'
                    stroke='#484848'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                {isDragActive ? (
                  <p className='text-sm md:text-base'>Drop the file here...</p>
                ) : (
                  <p className='text-sm md:text-base'>
                    Upload Your Photo <br /> (jpg, png)
                  </p>
                )}
              </div>
            </div>

            {errors.file && (
              <p className='mt-2 text-red-500 text-xs md:text-sm'>
                {errors.file.message}
              </p>
            )}

            {file && (
              <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                <p className='text-gray-800 font-medium'>Selected File:</p>
                <p className='text-sm text-gray-600'>{file.name}</p>
              </div>
            )}
          </div>

          {/* Complaints */}
          <div className='mt-6 md:mt-10 flex flex-col flex-1'>
            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
              Add Complaints
            </h2>

            <div className='mt-4 flex-1'>
              <Controller
                name='complaints'
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className='w-full h-full px-4 py-3 rounded-lg border-2 border-[#EAEAEA] focus:outline-none resize-none text-sm md:text-base'
                    placeholder='Enter your complaints here...'
                  />
                )}
              />
              {errors.complaints && (
                <p className='mt-1 text-red-500 text-xs md:text-sm'>
                  {errors.complaints.message}
                </p>
              )}
            </div>
          </div>

          <div className='mt-6 md:mt-10 flex justify-end gap-2'>
            <Button
              type='button'
              variant='skeleton'
              onClick={() => navigate(-1)}
              className='w-1/2 md:w-max md:px-20'
            >
              Back
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='bg-[#146EF5] text-white w-1/2 md:w-max md:px-20'
            >
              {isLoading ? (
                <FaSpinner className='animate-spin mx-auto' />
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </form>

        <Dialog open={isDialogOpen}>
          <DialogTrigger
            asChild
            onClick={() => setIsDialogOpen(true)}
          ></DialogTrigger>
          <DialogContent
            className={
              'md:min-w-[600px] p-6 sm:p-10 [&>button]:hidden outline-none'
            }
          >
            {isUploadSuccess ? (
              <Lottie
                animationData={SuccessImage}
                loop
                className='w-1/2 mx-auto'
              />
            ) : (
              <Lottie
                animationData={LoadingImage}
                loop
                className='w-1/2 mx-auto'
              />
            )}

            <h4 className='text-base sm:text-lg md:text-xl font-semibold text-center'>
              {isUploadSuccess
                ? 'Your complaint have been submited and being analized by our doctors..'
                : 'Our AI is Processing Your Complaint...'}
            </h4>

            <div className='flex gap-4 mt-6'>
              <DialogClose
                asChild
                onClick={() => {
                  if (controller) {
                    controller.abort();
                  }
                  setIsDialogOpen(false);
                  setIsUploadSuccess(false);
                }}
              >
                <Button
                  type={'button'}
                  variant={isUploadSuccess && 'skeleton'}
                  className={`${
                    isUploadSuccess
                      ? 'w-1/2'
                      : 'mx-auto w-max px-12 bg-red-500 text-white'
                  }`}
                >
                  Cancel
                </Button>
              </DialogClose>

              {isUploadSuccess && (
                <Button
                  type={'button'}
                  href={'/dashboard/results'}
                  className={'w-1/2 bg-[#146EF5] text-white'}
                >
                  Results List
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
