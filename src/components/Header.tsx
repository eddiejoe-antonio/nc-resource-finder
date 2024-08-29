import React, { useState, useEffect, useRef } from 'react';
import { PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import AboutModal from './AboutModal';

interface HeaderProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsModalOpen }) => {
  const [isModalOpen, setIsModalOpenLocal] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const learnMoreButtonRef = useRef<HTMLButtonElement>(null);

  const handleAboutClick = () => {
    setIsModalOpenLocal(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpenLocal(false);
    setIsModalOpen(false);
    learnMoreButtonRef.current?.focus();
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (isModalOpen) {
        handleModalClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='mt-16 md:mb-12 col-start-1 col-span-8 gap-0 text-left'>
          <h1 className="block md:inline text-[#092940] text-[1.5rem] md:text-[2rem] font-semibold font-['Source Sans Pro']">
            Find Technology Resources{` `}
          </h1>
          <h1 className="block md:inline text-[#3B75A9] text-[1.5rem] md:text-[2rem] font-light font-['Source Sans Pro']">
            In North Carolina
          </h1>
        </div>
        <div className='flex justify-start items-center col-start-10 col-span-2 my-4 md:my-0 md:mt-3'>
          <button
            ref={learnMoreButtonRef}
            aria-modal='true'
            role='alertdialog'
            aria-label='Contribute to the North Carolina Resource Finder'
            onClick={handleAboutClick}
            className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition ease-in-out duration-300 ${
              isModalOpen
                ? 'bg-[#BC2442] text-[#FFE9EE]'
                : 'bg-[#FFE9EE] text-[#BC2442] hover:bg-[#BC2442] hover:text-[#FFE9EE]'
            }`}
          >
            <PlusCircleIcon className='w-6 h-6 mr-2' />
            <span className='whitespace-nowrap'>Add a Resource</span>
          </button>
        </div>
      </div>
      <div className='w-full'>
        <div className='pb-4'>
          <p className='text-lg'>
            Use this tool to find resources like public Wi-Fi sites, technical assistance and
            digital classes across the state of North Carolina.
          </p>
        </div>
        {/* <div className='col-start-1 col-span-12 md:col-start-10 md:col-span-3 flex justify-between md:justify-center'>
          <button
            className={`flex-grow flex items-center justify-center shadow-md gap-2 py-1 md:h-14 rounded-l-lg ${
              selectedView === 'map'
                ? 'bg-[#1E79C8] text-white'
                : 'bg-[#092940] hover:bg-[#3892E1] text-white transition ease-in-out duration-300'
            }`}
            onClick={() => handleNavigate('map')}
          >
            <MapPinIcon className='h-5 w-5 md:h-8 md:w-8' />
            Map
          </button>
          <button
            className={`flex-grow flex items-center justify-center shadow-md gap-2 py-1 md:h-14 rounded-r-lg ${
              selectedView === 'list'
                ? 'bg-[#1E79C8] text-white'
                : 'bg-[#092940] hover:bg-[#3892E1] text-white transition ease-in-out duration-300'
            }`}
            onClick={() => handleNavigate('list')}
          >
            <ListBulletIcon className='h-5 w-5 md:h-10 md:w-10' />
            List
          </button>
        </div> */}
      </div>

      {/* About Modal */}
      {isModalOpen && <AboutModal onClose={handleModalClose} />}
      <a
        href='https://nc-resource-finder.s3.amazonaws.com/trainingVideo.mp4' // Replace with the desired URL
        target='_blank'
        rel='noopener noreferrer'
        className='hidden z-10 fixed left-3 bottom-[80px] md:flex items-center px-4 py-2 rounded-full cursor-pointer transition ease-in-out duration-300 bg-[#FFE9EE] text-[#BC2442] hover:bg-[#BC2442] hover:text-[#FFE9EE]'
        aria-label='Learn how to use this tool'
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
      >
        <QuestionMarkCircleIcon className='w-6 h-6' />
        {isHovered && ( // Conditionally render the text on hover
          <span className='ml-2 whitespace-nowrap'>Learn How to Use This Tool</span>
        )}
      </a>
    </div>
  );
};

export default Header;
