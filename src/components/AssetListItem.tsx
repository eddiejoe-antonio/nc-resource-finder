import React, { useState } from 'react';
import { MapPinIcon, BookmarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { classNames } from '../utils/helper';
import { AssetListItemProps, ViewType } from '../types/ResourceFinder';

const AssetListItem: React.FC<AssetListItemProps> = ({ resource, viewType }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={classNames(
        'flex flex-col font-inter border bg-white drop-shadow-md border-primary-800 overflow-hidden transition-all ease-in-out duration-300',
        viewType === ViewType.GRID ? 'self-center' : '',
      )}
    >
      <div className='bg-[#EEF7FF] p-4'>
        <h3 className='text-lg font-semibold'>{resource.Name}</h3>
      </div>
      <div className='px-4 pt-6'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <MapPinIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          {resource.Geography}
        </div>
      </div>
      <div className='px-4'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <BookmarkIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          {resource.Type}
        </div>
      </div>
      <div className='px-4 pb-6'>
        <div className='flex items-center text-sm px-2 py-2 mb-2 border border-gray-300 rounded-lg'>
          <LinkIcon className='h-5 w-5 mr-2 text-[#0E3052]' />
          <a
            href={resource.Website}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-700'
          >
            {resource.Website}
          </a>
        </div>
      </div>
      <div className='px-4 pb-4'>
        <button
          onClick={() => setShowMore(!showMore)}
          className='bg-blue-500 hover:bg-blue-600 text-white text-sm px-8 py-2 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center gap-2'
        >
          {showMore ? <>Collapse</> : <>Learn More</>}
        </button>
        {showMore && (
          <div className='text-sm text-[#0E3052] mt-4'>
            <h3 className='my-2 font-semibold'>Description</h3>
            <p>{resource.Servicesprovided}</p>
            <h3 className='my-2 font-semibold'>Organization Type</h3>
            <p>{resource.OrganizationTypeBroadsector}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
