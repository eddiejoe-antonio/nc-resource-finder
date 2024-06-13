import React, { useState } from 'react';
import { MapPinIcon, BookmarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { AssetListItemProps } from '../types/resourceFinderTypes';

const AssetListItem: React.FC<AssetListItemProps> = ({ resource }) => {
  const [showMore, setShowMore] = useState(false);

  const formatType = (type: string | string[]) => {
    if (Array.isArray(type)) {
      return type.join(', ');
    } else {
      return type;
    }
  };

  const formatWebsite = (url: string | undefined | null) => {
    if (!url) {
      return '';
    }
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className='flex flex-col font-inter border bg-white drop-shadow-md border-[#0E3052] overflow-hidden transition-all ease-in-out duration-300 rounded-md '>
      <div className=' text-black bg-[#EEF7FF] p-4'>
        <h3 className='text-md font-bold'>{resource.Name}</h3>
      </div>
      <div className='px-4 pt-4'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <MapPinIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          {resource.Geography}
        </div>
      </div>
      <div className='px-4'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <BookmarkIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          {formatType(resource.Primary_Filter ?? '')}
        </div>
      </div>
      <div className='px-4 pb-6'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <LinkIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          {resource.Website && (
            <a
              href={formatWebsite(resource.Website)}
              target='_blank'
              rel='noopener noreferrer'
              className='md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300'
            >
              {resource.Website}
            </a>
          )}
        </div>
      </div>
      <div className='px-4 pb-4'>
        <button
          aria-label='Toggle to show and hide additional information. '
          onClick={() => setShowMore(!showMore)}
          className='bg-[#092940] hover:bg-[#3892E1] text-white text-sm cursor-pointer px-12 py-2 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 shadow'
        >
          {showMore ? <>Collapse</> : <>Learn More</>}
        </button>
        {showMore && (
          <div className='text-sm text-[#0E3052] mt-4'>
            <h3 className='my-2 font-semibold'>Description</h3>
            <p>{resource.Servicesprovided}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
