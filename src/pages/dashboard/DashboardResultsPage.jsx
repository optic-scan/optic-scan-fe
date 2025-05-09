import { useEffect, useState } from 'react';
import SideBar from '../../components/dashboard-components/Sidebar';
import Button from '../../components/Button';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import {
  fetchWithRefresh,
  formatDate,
  formatDateToYearsMonths,
} from '../../../lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../../components/InputField';
import { toast } from 'sonner';
import { RiErrorWarningFill } from 'react-icons/ri';
import Lottie from 'lottie-react';
import SuccessImage from '../../assets/dashboard/ai-success.json';

const ITEMS_PER_PAGE = 10;

const loginFormSchema = z.object({
  diagnosis: z.string().min(1, {
    message: 'Diagnosis is required',
  }),
  doctorsNote: z.string(),
});

export default function DashboardResultsPage() {
  const [status, setStatus] = useState('all');
  const [resultData, setResultData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [seletedResultIndex, setSeletedResultIndex] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const handleStatusChange = newStatus => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const fetchResultsData = async () => {
    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_BASE_URL}/exam/my-result`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const data = await res.json();
      setResultData(data?.data || []);
    } catch (error) {
      console.error('Error fetching results data:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetchWithRefresh(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        const data = await res.json();

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    fetchResultsData();
  }, []);

  const filteredResults = resultData.filter(result =>
    status === 'all' ? true : result.status === status
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      const req = await fetchWithRefresh(
        `${import.meta.env.VITE_BASE_URL}/exam/diagnosis-dokter`,
        {
          method: 'POST',
          body: JSON.stringify({
            examination_id: resultData[seletedResultIndex]?.examination_id,
            diagnosis: values.diagnosis,
            doctors_note: values.doctorsNote || null,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (req.status === 200) {
        setIsSuccess(true);
        fetchResultsData();

        form.reset();
      } else {
        setIsDialogOpen(false);

        toast('Oops! Something Went Wrong', {
          description:
            'There was an error processing your request. Please try again later.',
          icon: <RiErrorWarningFill className='size-5 text-red-500' />,
          classNames: {
            title: '!text-red-500',
          },
        });
      }
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
      setIsDialogOpen(false);

      toast('Oops! Something Went Wrong', {
        description:
          'There was an error processing your request. Please try again later.',
        icon: <RiErrorWarningFill className='size-5 text-red-500' />,
        classNames: {
          title: '!text-red-500',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen overflow-y-hidden'>
      <SideBar />

      <div className='p-6 md:p-10 bg-[#F3F3F3] w-full flex flex-col h-full overflow-x-hidden overflow-y-auto'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Results
        </h1>

        <div className='mt-6 xl:mt-0 flex justify-center xl:justify-end'>
          <div className='flex p-1 bg-white rounded-4xl w-max text-xs lg:text-sm border border-[#E8E8E8]'>
            {['all', 'ongoing', 'complete'].map(s => (
              <div
                key={s}
                className={`${
                  status === s
                    ? 'bg-[#146EF5] text-white'
                    : 'bg-white text-black'
                } px-6 md:px-8 py-2 md:py-3 rounded-3xl cursor-pointer capitalize`}
                onClick={() => handleStatusChange(s)}
              >
                <p>
                  {s === 'ongoing'
                    ? 'OnGoing'
                    : s === 'complete'
                    ? 'Completed'
                    : 'All'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 xl:mt-4 bg-white rounded-xl border border-[#E8E8E8] overflow-y-auto pb-4'>
          <table className='min-w-max w-full border-collapse text-xs md:text-sm lg:text-base'>
            <thead className='text-[#707070] sticky top-0 bg-white shadow'>
              <tr>
                <th className='text-center font-medium p-4'>No</th>
                <th className='text-center font-medium p-4'>Date</th>
                <th className='text-center font-medium p-4'>
                  {userData?.data.role === 'pasien'
                    ? 'Doctor Name'
                    : 'Patient Name'}
                </th>
                <th className='text-center font-medium p-4'>Diagnosis</th>
                <th className='text-center font-medium p-4'>Status</th>
                <th className='text-center font-medium p-4'>Details</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan='6' className='text-center py-6'>
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedResults.map((result, index) => (
                  <tr key={index}>
                    <td className='text-center px-4 py-2'>
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {formatDate(result.examination_date)}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {userData?.data.role === 'pasien'
                        ? `Dr. ${result.doctor.name}`
                        : result.patient.name}
                    </td>
                    <td className='text-center px-4 py-2 capitalize'>
                      {result.diagnosis}
                    </td>
                    <td
                      className={`${
                        result.status === 'complete'
                          ? 'text-[#41E846]'
                          : 'text-[#ED9C4B]'
                      } text-center font-medium px-4 py-2`}
                    >
                      {result.status === 'complete' ? 'Completed' : 'OnGoing'}
                    </td>
                    <td className='text-center px-4 py-2'>
                      <Dialog open={isDialogOpen}>
                        <DialogTrigger
                          asChild
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <Button
                            onClick={() => setSeletedResultIndex(index)}
                            className='bg-[#146EF5] px-6 rounded-lg !text-xs lg:!text-sm text-white'
                          >
                            More Info
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className={
                            'md:min-w-[600px] p-6 sm:p-10 [&>button]:hidden outline-none'
                          }
                        >
                          {!isSuccess && (
                            <h4 className='text-lg md:text-xl font-semibold text-center'>
                              Details
                            </h4>
                          )}

                          {!isSuccess && (
                            <img
                              src={`${
                                import.meta.env.VITE_BASE_URL
                              }/images/eye-scans/${
                                resultData[seletedResultIndex]?.eye_pic
                              }`}
                              alt='result'
                              className='w-2/3 h-full object-cover mt-4 mx-auto rounded-lg'
                            />
                          )}

                          {!isDiagnosing && (
                            <div className=''>
                              <div className='mt-6 flex justify-between'>
                                <p className='font-semibold'>
                                  {resultData[seletedResultIndex]?.status ===
                                  'complete'
                                    ? 'Diagnosis'
                                    : 'Early Diagnosis by AI'}
                                </p>
                                <p className='text-right capitalize font-semibold text-[#484848]'>
                                  {resultData[seletedResultIndex]?.diagnosis}
                                </p>
                              </div>

                              <div className='mt-2 flex justify-between'>
                                <p className='font-semibold'>
                                  {userData?.data.role === 'pasien'
                                    ? 'Doctor Name'
                                    : 'Patient Name'}
                                </p>
                                <p className='text-right capitalize font-semibold text-[#484848]'>
                                  {userData?.data.role === 'pasien'
                                    ? `Dr. ${resultData[seletedResultIndex]?.doctor.name}`
                                    : resultData[seletedResultIndex]?.patient
                                        .name}
                                </p>
                              </div>

                              <div className='mt-2 flex justify-between'>
                                <p className='font-semibold'>
                                  {userData?.data.role === 'pasien'
                                    ? 'Date'
                                    : 'Age'}
                                </p>
                                <p className='text-right font-semibold text-[#484848]'>
                                  {userData?.data.role === 'pasien'
                                    ? formatDate(
                                        resultData[seletedResultIndex]
                                          ?.examination_date
                                      )
                                    : formatDateToYearsMonths(
                                        resultData[seletedResultIndex]?.patient
                                          .birthdate
                                      )}
                                </p>
                              </div>

                              <div className='mt-2 flex justify-between'>
                                <p className='font-semibold'>
                                  {userData?.data.role === 'pasien'
                                    ? 'Status'
                                    : 'Date'}
                                </p>

                                {userData?.data.role === 'pasien' && (
                                  <p
                                    className={`text-right capitalize font-semibold ${
                                      resultData[seletedResultIndex]?.status ===
                                      'complete'
                                        ? 'text-[#41E846]'
                                        : 'text-[#ED9C4B]'
                                    }`}
                                  >
                                    {resultData[seletedResultIndex]?.status ===
                                    'complete'
                                      ? 'Completed'
                                      : 'OnGoing'}
                                  </p>
                                )}

                                {userData?.data.role === 'dokter' && (
                                  <p className='text-right font-semibold text-[#484848]'>
                                    {formatDate(
                                      resultData[seletedResultIndex]
                                        ?.examination_date
                                    )}
                                  </p>
                                )}
                              </div>

                              <div className='mt-2 flex justify-between'>
                                <p className='font-semibold'>
                                  {userData?.data.role === 'pasien'
                                    ? 'Doctors Note'
                                    : 'Status'}
                                </p>

                                {userData?.data.role === 'pasien' && (
                                  <p className='text-right capitalize font-semibold text-[#484848]'>
                                    {resultData[seletedResultIndex]
                                      ?.doctors_note
                                      ? resultData[seletedResultIndex]
                                          ?.doctors_note
                                      : '-'}
                                  </p>
                                )}

                                {userData?.data.role === 'dokter' && (
                                  <p
                                    className={`text-right capitalize font-semibold ${
                                      resultData[seletedResultIndex]?.status ===
                                      'complete'
                                        ? 'text-[#41E846]'
                                        : 'text-[#ED9C4B]'
                                    }`}
                                  >
                                    {resultData[seletedResultIndex]?.status ===
                                    'complete'
                                      ? 'Completed'
                                      : 'OnGoing'}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {isDiagnosing && !isSuccess && (
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                              <InputField
                                label='Diagnosis'
                                name='diagnosis'
                                type='text'
                                register={form.register}
                                errors={form.formState.errors}
                                className={'mt-4'}
                                labelClassName={'text-sm md:text-base'}
                                inputClassName={'text-sm md:text-base'}
                              />

                              <InputField
                                label='Add Note'
                                name='doctorsNote'
                                type='text'
                                as='textarea'
                                register={form.register}
                                errors={form.formState.errors}
                                className={'mt-4'}
                                labelClassName={'text-sm md:text-base'}
                                inputClassName={'text-sm md:text-base'}
                              />
                            </form>
                          )}

                          {isSuccess && (
                            <>
                              <Lottie
                                animationData={SuccessImage}
                                loop
                                className='w-1/2 mx-auto'
                              />

                              <h4 className='text-base sm:text-lg md:text-xl font-semibold text-center'>
                                Patient Successfully Diagnose
                              </h4>

                              <div className='mt-6 mx-auto'>
                                <DialogClose
                                  asChild
                                  onClick={() => {
                                    setIsDialogOpen(false);
                                    setIsDiagnosing(false);
                                    setIsSuccess(false);
                                  }}
                                >
                                  <Button className='rounded-md bg-[#146EF5] text-white px-18 py-3 !text-xs lg:!text-sm'>
                                    Back
                                  </Button>
                                </DialogClose>
                              </div>
                            </>
                          )}

                          {!isSuccess && (
                            <div className='mt-6 flex justify-center gap-4'>
                              <DialogClose
                                asChild
                                variant={
                                  userData?.data.role === 'dokter' && 'skeleton'
                                }
                                onClick={
                                  isDiagnosing
                                    ? () => setIsDiagnosing(false)
                                    : () => setIsDialogOpen(false)
                                }
                              >
                                <Button
                                  className={`${
                                    userData?.data.role === 'dokter'
                                      ? 'w-1/2'
                                      : 'bg-[#146EF5] text-white px-16 py-3'
                                  } rounded-md !text-xs lg:!text-sm`}
                                >
                                  Back
                                </Button>
                              </DialogClose>

                              {userData?.data.role === 'dokter' && (
                                <Button
                                  onClick={
                                    isDiagnosing
                                      ? form.handleSubmit(handleSubmit)
                                      : () => setIsDiagnosing(true)
                                  }
                                  className='w-1/2 bg-[#146EF5] py-3 rounded-md !text-xs lg:!text-sm text-white'
                                >
                                  {isLoading ? (
                                    <FaSpinner className='animate-spin mx-auto' />
                                  ) : (
                                    'Diagnose'
                                  )}
                                </Button>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className='mt-6 flex gap-4 p-3 bg-white rounded-lg w-max'>
            <Button
              className={`bg-[#D9D9D9] ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft className='size-2 md:size-4' />
            </Button>

            <div className='flex items-center text-xs md:text-sm lg:text-base gap-2'>
              {[...Array(totalPages)].map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`size-6 md:size-8 flex justify-center items-center rounded cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-[#146EF5] text-white'
                      : 'text-black'
                  }`}
                >
                  <p>{idx + 1}</p>
                </div>
              ))}
            </div>

            <Button
              className={`bg-[#D9D9D9] ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight className='size-2 md:size-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
