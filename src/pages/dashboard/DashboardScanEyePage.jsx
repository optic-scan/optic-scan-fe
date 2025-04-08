import { useState } from 'react';
import SideBar from '../../components/dashboard-components/Sidebar';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/Button';
import { useNavigate } from 'react-router';

export default function DashboardScanEyePage() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleFileUpload = acceptedFiles => {
    const uploadedFile = acceptedFiles[0];

    if (uploadedFile) {
      setFile(uploadedFile);

      const formData = new FormData();
      formData.append('file', uploadedFile);

      /* TODO: Upload file */
      console.log('Uploaded file:', uploadedFile);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
    fileRejections,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    maxFiles: 1,
    onDrop: handleFileUpload,
  });

  return (
    <div className='flex h-screen overflow-y-hidden'>
      <SideBar />

      <div className='p-6 md:p-10 bg-[#F3F3F3] w-full flex flex-col h-full overflow-x-hidden'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Scan Eye
        </h1>

        <div className='mt-6 md:mt-10 p-6 md:p-10 h-full bg-white rounded-2xl flex flex-col overflow-hidden'>
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

            {fileRejections.length > 0 && (
              <p className='mt-2 text-red-500 text-xs md:text-sm'>
                File type not supported. Only .jpg, .jpeg, and .png files are
                allowed.
              </p>
            )}

            {file && (
              <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                <p className='text-gray-800 font-medium'>Selected File:</p>
                <p className='text-sm text-gray-600'>{file.name}</p>
              </div>
            )}
          </div>

          {/* Add Complaints */}
          <div className='mt-6 md:mt-10 flex flex-col flex-1'>
            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold'>
              Add Complaints
            </h2>

            <div className='mt-4 flex-1'>
              <textarea
                className='w-full h-full px-4 py-3 rounded-lg border-2 border-[#EAEAEA] focus:outline-none resize-none text-sm md:text-base'
                placeholder='Enter your complaints here...'
              />
            </div>
          </div>

          <div className='mt-6 md:mt-10 flex justify-end gap-2'>
            <Button
              type={'button'}
              variant={'skeleton'}
              onClick={() => navigate(-1)}
              className={'w-1/2 md:w-max md:px-20'}
            >
              Back
            </Button>

            <Button
              type={'submit'}
              className={'bg-[#146EF5] text-white w-1/2 md:w-max md:px-20'}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
