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
    <div className='flex flex-col font-inter border bg-white drop-shadow-md border-black transition-all ease-in-out duration-300 rounded-md'>
      <div className='text-black rounded-md bg-[#EEF7FF] px-4 py-2'>
        <h2 className='mt-1 font-bold text-md'>{resource.name}</h2>
      </div>
      <div className='px-4 pt-4'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <MapPinIcon className='h-5 w-5 mr-2 text-[#0E3052] flex-shrink-0' />
          <div className='overflow-x-auto flex-grow min-w-0'>{resource.geography}</div>
        </div>
      </div>
      <div className='px-4'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <BookmarkIcon className='h-5 w-5 mr-2 text-[#0E3052] flex-shrink-0' />
          <div className='flex-grow min-w-0 whitespace-normal break-words'>
            {formatType(resource.primary_type ?? '')}
          </div>
        </div>
      </div>
      <div className='px-4 pb-6'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <LinkIcon className='h-5 w-5 mr-2 text-[#0E3052] flex-shrink-0' />
          {resource.website && (
            <a
              href={formatWebsite(resource.website)}
              target='_blank'
              rel='noopener noreferrer'
              className='md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300 flex-grow min-w-0 whitespace-normal break-words'
            >
              {resource.website}
            </a>
          )}
        </div>
      </div>
      <div className='px-4 pb-4'>
        <button
          aria-label={`Learn more about ${resource.name}`}
          onClick={() => setShowMore(!showMore)}
          className='bg-[#092940] hover:bg-[#3892E1] text-white text-sm cursor-pointer px-12 py-2 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 shadow'
        >
          {showMore ? <>Collapse</> : <>Learn More</>}
        </button>
        {showMore && (
          <div className='text-sm mt-4'>
            <p className='my-2 font-semibold'>Description</p>
            <p className='whitespace-normal break-words'>{resource.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
