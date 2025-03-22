import { useState } from 'react';
import SideBar from '../../components/dashboard-components/Sidebar';
import Button from '../../components/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function DashboardResultsPage() {
  const [status, setStatus] = useState('all');

  const handleStatusChange = newStatus => {
    setStatus(newStatus);
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
            <div
              className={`${
                status === 'all'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-6 md:px-8 py-2 md:py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('all')}
            >
              <p>All</p>
            </div>
            <div
              className={`${
                status === 'onGoing'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-6 md:px-8 py-2 md:py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('onGoing')}
            >
              <p>OnGoing</p>
            </div>
            <div
              className={`${
                status === 'completed'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-6 md:px-8 py-2 md:py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('completed')}
            >
              <p>Completed</p>
            </div>
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
              {resultsData.map(result => (
                <tr>
                  <td className='text-center px-4 py-2'>{result.id}</td>
                  <td className='text-center px-4 py-2'>{result.date}</td>
                  <td className='text-center px-4 py-2'>{result.doctorName}</td>
                  <td className='text-center px-4 py-2'>{result.diagnosis}</td>
                  <td
                    className={`${
                      result.status === 'Completed'
                        ? 'text-[#41E846]'
                        : 'text-[#ED9C4B]'
                    } text-center px-4 py-2`}
                  >
                    {result.status}
                  </td>
                  <td className='text-center px-4 py-2'>
                    <Button
                      className={
                        'bg-[#146EF5] px-6 rounded-lg !text-xs lg:!text-sm text-white'
                      }
                    >
                      More Info
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-6 flex gap-4 p-3 bg-white rounded-lg w-max'>
          <Button className={'bg-[#D9D9D9]'}>
            <FaChevronLeft className='size-2 md:size-4' />
          </Button>

          <div className='flex items-center text-xs md:text-sm lg:text-base'>
            <div className='size-6 md:size-8 flex justify-center items-center rounded bg-[#146EF5] text-white cursor-pointer'>
              <p className=''>1</p>
            </div>
            <div className='size-6 md:size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>2</p>
            </div>
            <div className='size-6 md:size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>3</p>
            </div>
            <div className='size-6 md:size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>...</p>
            </div>
            <div className='size-6 md:size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>10</p>
            </div>
          </div>

          <Button className={'bg-[#D9D9D9]'}>
            <FaChevronRight className='size-2 md:size-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}

const resultsData = [
  {
    id: 1,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Possible Cataracts',
    status: 'OnGoing',
  },
  {
    id: 2,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Glaucoma',
    status: 'Completed',
  },
  {
    id: 3,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Possible Cataracts',
    status: 'Completed',
  },
  {
    id: 4,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Cataracts',
    status: 'OnGoing',
  },
  {
    id: 5,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Possible Glaucoma',
    status: 'OnGoing',
  },
  {
    id: 6,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Possible Cataracts',
    status: 'Completed',
  },
  {
    id: 7,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Glaucoma',
    status: 'Completed',
  },
  {
    id: 8,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Cataracts',
    status: 'OnGoing',
  },
  {
    id: 9,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Glaucoma',
    status: 'OnGoing',
  },
  {
    id: 10,
    date: '6 Mar 2025',
    doctorName: 'Dr. Amara Felisha',
    diagnosis: 'Cataracts',
    status: 'OnGoing',
  },
];
