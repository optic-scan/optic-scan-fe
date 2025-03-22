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
    <div className='flex h-screen'>
      <SideBar />

      <div className='p-10 bg-[#F3F3F3] w-full flex flex-col h-full'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center xl:text-left'>
          Results
        </h1>

        <div className='flex justify-end'>
          <div className='flex p-1 bg-white rounded-4xl w-max text-sm border border-[#E8E8E8]'>
            <div
              className={`${
                status === 'all'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-8 py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('all')}
            >
              <p>All</p>
            </div>
            <div
              className={`${
                status === 'onGoing'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-8 py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('onGoing')}
            >
              <p>OnGoing</p>
            </div>
            <div
              className={`${
                status === 'completed'
                  ? 'bg-[#146EF5] text-white'
                  : 'bg-white text-black'
              } px-8 py-3 rounded-3xl cursor-pointer`}
              onClick={() => handleStatusChange('completed')}
            >
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className='mt-4 p-10 bg-white rounded-xl border border-[#E8E8E8]'>
          <table className='w-full border-separate'>
            <thead className='text-[#707070]'>
              <tr>
                <th className='text-center font-medium py-2'>No</th>
                <th className='text-center font-medium py-2'>Date</th>
                <th className='text-center font-medium py-2'>Doctor Name</th>
                <th className='text-center font-medium py-2'>Diagnosis</th>
                <th className='text-center font-medium py-2'>Status</th>
                <th className='text-center font-medium py-2'>Details</th>
              </tr>
            </thead>

            <tbody>
              {resultsData.map(result => (
                <tr>
                  <td className='text-center py-2'>{result.id}</td>
                  <td className='text-center py-2'>{result.date}</td>
                  <td className='text-center py-2'>{result.doctorName}</td>
                  <td className='text-center py-2'>{result.diagnosis}</td>
                  <td
                    className={`${
                      result.status === 'Completed'
                        ? 'text-[#41E846]'
                        : 'text-[#ED9C4B]'
                    } text-center py-2`}
                  >
                    {result.status}
                  </td>
                  <td className='text-center py-2'>
                    <Button
                      className={
                        'bg-[#146EF5] px-6 rounded-lg !text-sm text-white'
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
            <FaChevronLeft className='size-4' />
          </Button>

          <div className='flex items-center'>
            <div className='size-8 flex justify-center items-center rounded bg-[#146EF5] text-white cursor-pointer'>
              <p className=''>1</p>
            </div>
            <div className='size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>2</p>
            </div>
            <div className='size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>3</p>
            </div>
            <div className='size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>...</p>
            </div>
            <div className='size-8 flex justify-center items-center rounded cursor-pointer'>
              <p className=''>10</p>
            </div>
          </div>

          <Button className={'bg-[#D9D9D9]'}>
            <FaChevronRight className='size-4' />
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
