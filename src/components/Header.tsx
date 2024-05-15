import React from 'react';
import { QuestionMarkCircleIcon, MapPinIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip';

interface HeaderProps {
  selectedView: string;
  setSelectedView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedView, setSelectedView }) => {
  const iconSize = '2em';
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    setSelectedView(view);
    navigate('/');
  };

  const handleAboutClick = () => {
    setSelectedView('');
    navigate('/about');
  };

  return (
    <div className='w-full bg-white'>
      <div className='block md:grid md:grid-cols-12 items-center'>
        <div className='mt-16 md:mb-12 col-start-2 col-span-8 gap-0 text-left'>
          <span className="text-[#3B75A9] text-[1.25rem] md:text-[2rem] font-regular font-['Source Sans Pro'] uppercase">
            North Carolina{` `}
          </span>
          <span className="text-[#092940] text-[1.25rem] md:text-[2rem] font-black font-['Source Sans Pro'] uppercase">
            Digital Equity Resource Finder
          </span>
        </div>
        <div className='flex justify-start items-center col-start-11 col-span-1 my-2 md:my-0 md:mt-3'>
          <Tooltip message='I want to learn more about this tool!'>
            <QuestionMarkCircleIcon
              className='h-auto tooltip-icon cursor-pointer hover:text-[#1E79C8]'
              style={{ width: iconSize, height: iconSize }}
              onClick={handleAboutClick}
            />
          </Tooltip>
        </div>
      </div>
      <div className='grid grid-cols-12 w-full'>
        <div className='col-start-1 col-span-12 md:col-start-2 md:col-span-7 mb-4'>
          <p className=''>
            The North Carolina Office of Digital Equity and Literacy has gathered digital equity
            resources across the state. Use this application to filter and view resources in your
            community, find support across the state, or direct others to the tools they need to
            thrive online. Help us build a stronger state of digital equity!
          </p>
        </div>
        <div className='col-start-1 col-span-12 md:col-start-10 md:col-span-2 flex justify-between md:justify-center'>
          <button
            className={`flex-grow flex items-center justify-center gap-2 py-1 md:h-14 rounded-l-lg ${
              selectedView === 'map'
                ? 'bg-[#BC2442] hover:bg-[#CF1F42] text-white'
                : 'bg-[#1E79C8] hover:bg-[#3892E1] text-white'
            }`}
            onClick={() => handleNavigate('map')}
          >
            <MapPinIcon className='h-5 w-5 md:h-8 md:w-8' />
            Map
          </button>
          <button
            className={`flex-grow flex items-center justify-center gap-2 py-1 md:h-14 rounded-r-lg ${
              selectedView === 'list'
                ? 'bg-[#BC2442] hover:bg-[#CF1F42] text-white'
                : 'bg-[#1E79C8] hover:bg-[#3892E1] text-white'
            }`}
            onClick={() => handleNavigate('list')}
          >
            <ListBulletIcon className='h-5 w-5 md:h-10 md:w-10' />
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
