import React from 'react';
import { QuestionMarkCircleIcon, MapPinIcon, ListBulletIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  selectedView: string;
  setSelectedView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedView, setSelectedView }) => {
  const iconSize = '2em';
  const [hover, setHover] = React.useState(false);
  return (
    <div className='w-full bg-white'>
      {/* Other header content */}
      <div className='block md:grid md:grid-cols-12'>
        {/* Title */}
        <div className='mt-20 md:mb-12 col-start-2 col-span-8 text-left'>
          <span className="text-[#3B75A9] text-[1.25rem] md:text-[2rem] font-regular font-['Source Sans Pro'] uppercase">
            North Carolina{` `}
          </span>
          <span className="text-[#092940] text-[1.25rem] md:text-[2rem] font-black font-['Source Sans Pro'] uppercase">
            Digital Equity Resource Finder
          </span>
        </div>
        {/* Question Mark Icon with Tooltip */}
        <div
          className='mb-4 flex justify-start items-center col-start-11 col-span-1 relative'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <QuestionMarkCircleIcon
            className='h-auto tooltip-icon'
            style={{ width: iconSize, height: iconSize, color: hover ? '#1E79C8' : 'currentColor' }}
          />
          <div className='tooltip-content bg-black text-white text-sm p-4 rounded hidden absolute z-10'>
            I want to learn more about this tool!
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className='grid grid-cols-12'>
        {/* Map and List toggle buttons */}
        <div className='col-start-1 col-span-12 md:col-start-2 md:col-span-7 mb-4'>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquam sagittis
            augue, vitae convallis massa venenatis vel. Integer elementum id ligula vitae congue.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.{' '}
          </p>
        </div>
        <div className='col-start-1 col-span-12 md:col-start-10 md:col-span-2 flex justify-between md:justify-center'>
          <button
            className={`flex-grow flex items-center justify-center gap-2 py-1 md:h-14 rounded-l-lg ${
              selectedView === 'map'
                ? 'bg-[#BC2442] hover:bg-[#CF1F42] text-white'
                : 'bg-[#1E79C8] hover:bg-[#3892E1] text-white'
            }`}
            onClick={() => setSelectedView('map')}
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
            onClick={() => setSelectedView('list')}
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
