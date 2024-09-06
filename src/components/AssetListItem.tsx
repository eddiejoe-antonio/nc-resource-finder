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
    <div className='flex flex-col border-b border-[#3B75A9] transition-all ease-in-out duration-300'>
      <div className='text-black py-2'>
        <h2 className='mt-1 font-bold text-md'>{resource.properties.name}</h2>
      </div>
      <div className=''>
        <div className='flex items-center text-sm py-2 text-[#0E3052]'>
          <MapPinIcon className='h-6 w-6 mr-2 flex-shrink-0 [stroke-width:2]' />
          <div className='overflow-x-auto flex-grow min-w-0'>{resource.properties.geography}</div>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center text-sm py-2 text-[#0E3052]'>
          <BookmarkIcon className='h-6 w-6 mr-2 flex-shrink-0 [stroke-width:2]' />
          <div className='flex-grow min-w-0 whitespace-normal break-words'>
            {formatType(resource.properties.primary_type ?? '')}
          </div>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center text-sm py-2 text-[#0E3052]'>
          <LinkIcon className='h-6 w-6 mr-2 flex-shrink-0 [stroke-width:2]' />
          {resource.properties.website && (
            <a
              href={formatWebsite(resource.properties.website)}
              target='_blank'
              rel='noopener noreferrer'
              className='md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300 flex-grow min-w-0 whitespace-normal break-words'
            >
              {resource.properties.website}
            </a>
          )}
        </div>
      </div>
      <div className='pt-4 pb-6'>
        <button
          aria-label={`Learn more about ${resource.properties.name}`}
          onClick={() => setShowMore(!showMore)}
          className='border border-[#1E79C8] text-[#1E79C8] hover:bg-[#3892E1] hover:text-white text-sm cursor-pointer px-12 py-2 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 font-semibold'
        >
          {showMore ? <>Collapse</> : <>Learn More</>}
        </button>
        {showMore && (
          <div className='my-4 text-md'>
            <div className='my-4'>
              <p className='my-2 font-semibold'>Description</p>
              <p className='whitespace-normal break-words'>{resource.properties.description}</p>
            </div>
            <div className='my-4'>
              <p className='my-2 font-semibold'>Address</p>
              <a
                href={resource.properties.googlemaps_link}
                target='_blank'
                rel='noopener noreferrer'
                className='md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300 flex-grow min-w-0 whitespace-normal break-words'
              >
                {resource.properties.address_geocode}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
