// src/components/AssetListItem.tsx
import React, { useState } from 'react';
import { ArrowUpIcon, ArrowRightIcon, MapIcon, LinkIcon } from '@heroicons/react/24/outline';
import { classNames } from '../utils/helper';
import { AssetListItemProps, ViewType } from '../types/ResourceFinder';

const AssetListItem: React.FC<AssetListItemProps> = ({ asset, viewType }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={classNames(
        'flex flex-col justify-between border bg-white drop-shadow-md border-gray-300 rounded-md p-6 overflow-hidden',
        viewType === ViewType.GRID ? 'min-h-72' : 'flex-row items-center',
      )}
    >
      <div className='flex flex-col w-full'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-lg'>{asset.fields.Asset}</h3>
          <button
            onClick={() => setShowMore(!showMore)}
            className='text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm flex items-center'
          >
            {showMore ? 'Less Details' : 'More Details'}{' '}
            {showMore ? <ArrowUpIcon /> : <ArrowRightIcon />}
          </button>
        </div>
        <div className='text-gray-600 text-sm mb-2'>
          {asset.fields['Organization Sub-Type'].join(', ')}
        </div>
        <div className='flex items-center text-gray-600'>
          <MapIcon />
          <span className='ml-2'>{asset.fields['County (from Org County)'].join(', ')} County</span>
        </div>
        {asset.fields.Website && (
          <a
            href={asset.fields.Website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm mt-2'
          >
            <LinkIcon /> Visit Website
          </a>
        )}
      </div>
      {showMore && (
        <div className='mt-4'>
          <div className='text-sm'>
            <strong>Description:</strong> {asset.fields['Asset Description']}
          </div>
          {asset.fields['Asset Broadband Focus Area'] && (
            <div className='mt-2'>
              <strong>Focus Areas:</strong> {asset.fields['Asset Broadband Focus Area'].join(', ')}
            </div>
          )}
          {asset.fields['Asset Covered Population'] && (
            <div className='mt-2'>
              <strong>Population Served:</strong>{' '}
              {asset.fields['Asset Covered Population'].join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssetListItem;
