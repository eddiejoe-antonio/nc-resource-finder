import React from 'react';

interface ViewToggleProps {
  selectedView: string;
  handleNavigate: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ selectedView, handleNavigate }) => {
  return (
    <div className='flex space-x-4' role='radiogroup' aria-label='View Toggle'>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          name='view'
          value='map'
          checked={selectedView === 'map'}
          onChange={() => handleNavigate('map')}
          className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
          tabIndex={selectedView === 'map' ? 0 : -1} // Ensure both buttons are tabbable
        />
        <span className='text-[#092940]'>Map View</span>
      </label>

      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          name='view'
          value='list'
          checked={selectedView === 'list'}
          onChange={() => handleNavigate('list')}
          className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
          tabIndex={selectedView === 'list' ? 0 : -1} // Ensure both buttons are tabbable
        />
        <span className='text-[#092940]'>List View</span>
      </label>
    </div>
  );
};

export default ViewToggle;
