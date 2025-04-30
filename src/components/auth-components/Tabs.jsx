import { useState } from 'react';

const Tabs = ({ tabs, onChange, className }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const handleTabClick = value => {
    setCurrentTab(value);
    onChange(value);
  };

  return (
    <div className={`${className} bg-white rounded-2xl shadow-xl`}>
      <div className='flex text-xs sm:text-sm'>
        {tabs.map(tab => (
          <div
            key={tab.value}
            className={`w-1/2 ${
              currentTab === tab.value ? 'bg-blue-50' : 'bg-white'
            } p-5 rounded-t-2xl cursor-pointer relative`}
            onClick={() => handleTabClick(tab.value)}
          >
            <p
              className={`${
                currentTab === tab.value ? 'text-[#146EF5]' : 'text-black'
              } text-center`}
            >
              {tab.label}
            </p>
            <span
              className={`${
                currentTab === tab.value ? 'absolute' : 'hidden'
              } -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-[#146EF5] rounded`}
            ></span>
          </div>
        ))}
      </div>
      <div className='px-6 sm:px-8 md:px-10 lg:px-12 pt-12 pb-12 sm:pb-16'>
        {tabs.find(tab => tab.value === currentTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
