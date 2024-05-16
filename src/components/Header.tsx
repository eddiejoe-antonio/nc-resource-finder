import React, { useState } from 'react';
import { QuestionMarkCircleIcon, MapPinIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import AboutModal from './AboutModal'; // Import the modal component

interface HeaderProps {
  selectedView: string;
  setSelectedView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedView, setSelectedView }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleNavigate = (view: string) => {
    setSelectedView(view);
    navigate('/');
  };

  const handleAboutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className='w-full'>
      <div className='block md:grid md:grid-cols-12 items-center'>
        <div className='mt-16 md:mb-12 col-start-2 col-span-8 gap-0 text-left'>
          <span className="block md:inline text-[#3B75A9] text-[1.5rem] md:text-[2rem] font-regular font-['Source Sans Pro'] uppercase">
            North Carolina{` `}
          </span>
          <span className="block md:inline text-[#092940] text-[1.5rem] md:text-[2rem] font-black font-['Source Sans Pro'] uppercase">
            Digital Equity Resource Finder
          </span>
        </div>
        <div className='flex justify-start items-center col-start-10 col-span-2 my-4 md:my-0 md:mt-3'>
          <button
            onClick={handleAboutClick}
            className='flex items-center px-4 py-2 bg-[#FFE9EE] rounded-full shadow-lg cursor-pointer md:hover:bg-[#BC2442] md:hover:text-[#FFE9EE] text-[#BC2442] transition ease-in-out duration-300'
          >
            <QuestionMarkCircleIcon className='w-6 h-6 mr-2' />
            <span className='whitespace-nowrap'>Learn More</span>
          </button>
        </div>
      </div>
      <div className='grid grid-cols-12 w-full'>
        <div className='col-start-1 col-span-12 md:col-start-2 md:col-span-7 mb-4'>
          <p className=''>
            <strong className=''>Welcome to the Resource Finder!</strong> The North Carolina Office
            of Digital Equity and Literacy built this interactive tool for exploring the digital
            equity resources available in North Carolina. Scroll, filter, and click through the
            results to find support for digital equity needs across North Carolina.{' '}
          </p>
        </div>
        <div className='col-start-1 col-span-12 md:col-start-10 md:col-span-2 flex justify-between md:justify-center'>
          <button
            className={`flex-grow flex items-center justify-center gap-2 py-1 md:h-14 rounded-l-lg ${
              selectedView === 'map'
                ? 'bg-[#092940] hover:bg-[#092940] text-white transition ease-in-out duration-300'
                : 'bg-[#1E79C8] hover:bg-[#3892E1] text-white transition ease-in-out duration-300'
            }`}
            onClick={() => handleNavigate('map')}
          >
            <MapPinIcon className='h-5 w-5 md:h-8 md:w-8' />
            Map
          </button>
          <button
            className={`flex-grow flex items-center justify-center gap-2 py-1 md:h-14 rounded-r-lg ${
              selectedView === 'list'
                ? 'bg-[#092940] hover:bg-[#092940] text-white transition ease-in-out duration-300'
                : 'bg-[#1E79C8] hover:bg-[#3892E1] text-white transition ease-in-out duration-300'
            }`}
            onClick={() => handleNavigate('list')}
          >
            <ListBulletIcon className='h-5 w-5 md:h-10 md:w-10' />
            List
          </button>
        </div>
      </div>

      {/* About Modal */}
      {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Header;
