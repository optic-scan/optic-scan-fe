import { useEffect, useState } from 'react';
import SideBar from '../../components/dashboard-components/Sidebar';
import Button from '../../components/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchWithRefresh, formatDate } from '../../../lib/utils';

const ITEMS_PER_PAGE = 10;

export default function DashboardResultsPage() {
  const [status, setStatus] = useState('all');
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = newStatus => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  useEffect(() => {
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
                <th className='text-center font-medium p-4'>Doctor Name</th>
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
                  <tr key={result.id}>
                    <td className='text-center px-4 py-2'>
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {formatDate(result.examination_date)}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {result.doctor_id}
                    </td>
                    <td className='text-center px-4 py-2'>
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
                      <Button className='bg-[#146EF5] px-6 rounded-lg !text-xs lg:!text-sm text-white'>
                        More Info
                      </Button>
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
