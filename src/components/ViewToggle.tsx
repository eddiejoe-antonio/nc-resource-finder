import React from 'react';

interface ViewToggleProps {
  selectedView: string;
  handleNavigate: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ selectedView, handleNavigate }) => {
  return (
    <div className='flex space-x-4' role='group' aria-label='View Toggle'>
      <button
        type='button'
        onClick={() => handleNavigate('map')}
        className={`px-4 py-2 rounded-md ${
          selectedView === 'map' ? 'bg-[#1E79C8] text-white' : 'bg-gray-200 md:hover:bg-[#dedede]'
        }`}
      >
        Map View
      </button>

      <button
        type='button'
        onClick={() => handleNavigate('list')}
        className={`px-4 py-2 rounded-md ${
          selectedView === 'list' ? 'bg-[#1E79C8] text-white' : 'bg-gray-200 md:hover:bg-[#dedede]'
        }`}
      >
        List View
      </button>
    </div>
  );
};

export default ViewToggle;
