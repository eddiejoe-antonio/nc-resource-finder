import _ from 'lodash';
import { LinkIcon, LocationIcon, RightArrowIcon, UpArrowIcon } from '../IconSvg';
import { useState } from 'react';
import { addHttpsPrefix, classNames } from '@/utils/helper';
import { AssetInfo } from '@/types/AssetInventory';
import { filterDataAssetInventory } from '@/static/filterDataAssetInventory';

export enum ViewType {
  GRID = 1,
  LIST = 2,
}

const AssetListItem = ({ asset, viewType }: { asset: AssetInfo; viewType: ViewType }) => {
  const [showMore, setShowMore] = useState(false);

  const { options: serviceList } =
    _.find(filterDataAssetInventory, (f: any) => f.id === 'focus') ?? {};

  return (
    <div
      className={classNames(
        'flex flex-col justify-between font-inter border bg-white drop-shadow border-primary-800 rounded-md p-6 overflow-hidden',
        viewType === ViewType.GRID && 'self-center min-h-72',
      )}
    >
      <div
        className={classNames(
          'flex w-full py-2 gap-2 flex-col',
          viewType === ViewType.LIST && 'lg:flex-row',
        )}
      >
        <div
          className={classNames(
            'flex flex-col gap-2 w-full',
            viewType == ViewType.LIST && 'lg:w-3/5',
          )}
        >
          <div className='flex gap-2 flex-wrap'>
            {_.map(asset.fields['Organization Sub-Type'], (orgType, i) => (
              <span
                key={i}
                className='bg-[#256B28] text-white text-xs  me-2 px-2.5 py-0.5 rounded-md border  border-[#256B28] inline-flex items-center justify-center'
              >
                {orgType}
              </span>
            ))}
          </div>
          <h3 className='font-semibold text-base'>{asset.fields.Asset}</h3>
        </div>

        <div
          className={classNames(
            'flex w-full justify-between flex-col gap-4',
            viewType == ViewType.LIST && 'justify-between lg:flex-row lg:w-2/5',
          )}
        >
          <div
            className={classNames(
              'flex self-start gap-2 text-xs justify-center items-center px-3 py-1 rounded-lg border border-gray-200 text-gray-700',
              viewType === ViewType.LIST && 'lg:self-center',
            )}
          >
            <LocationIcon /> {asset.fields['County (from Org County)'][0]} County
          </div>
          {asset.fields['Website'] ? (
            <a
              target='_blank'
              rel='noopener'
              href={addHttpsPrefix(asset.fields['Website'])}
              className={classNames(
                'cursor-pointer md:hover:bg-[#ececec] transition-colors duration-300 self-start text-xs flex gap-2 justify-center items-center px-3 py-1 rounded-md border border-gray-200 text-gray-700',
                viewType === ViewType.LIST && 'lg:self-center lg:justify-items-end',
              )}
            >
              <LinkIcon /> {addHttpsPrefix(asset.fields['Website'])}
            </a>
          ) : (
            <div
              className={classNames(
                'cursor-pointer self-start text-xs flex gap-2 justify-center items-center px-3 py-1 rounded-lg border border-gray-200 text-gray-700',
                viewType === ViewType.LIST && 'lg:self-center lg:justify-items-end',
              )}
            >
              <LinkIcon /> No Link Found
            </div>
          )}
        </div>
      </div>
      <div className='py-2'>
        <button
          onClick={() => setShowMore((m) => !m)}
          className='bg-[#002768] gap-2 md:hover:bg-[#fff] md:hover:text-[#002768] text-white transition-colors duration-300  text-xs  me-2 px-2.5 py-1 rounded-md border-2 border-[#002768] inline-flex items-center justify-center'
        >
          {showMore ? (
            <>
              Collapse <UpArrowIcon />
            </>
          ) : (
            <>
              {' '}
              Read More <RightArrowIcon />
            </>
          )}
        </button>
        {showMore && (
          <div className='pt-3 transition-transform translate-y-0'>
            {asset.fields['Asset Description'] && (
              <>
                <h3 className='text-sm font-semibold text-blue-800'>DESCRIPTION</h3>
                <p className='text-xs leading-[18px] py-2'>{asset.fields['Asset Description']}</p>
              </>
            )}

            {_.size(asset.fields['Asset Broadband Focus Area']) > 0 && (
              <>
                <h3 className='text-sm font-semibold text-blue-800'>SERVICES OFFERED</h3>
                <div className='flex flex-wrap py-2 gap-2'>
                  {_.map(asset.fields['Asset Broadband Focus Area'], (focus, i) => (
                    <div
                      key={i}
                      className={classNames(
                        'flex gap-2 text-xs leading-5 justify-center items-center px-3 py-1 rounded-lg border border-gray-200 text-gray-700',
                        viewType === ViewType.LIST ? 'lg:self-center' : '',
                      )}
                    >
                      {
                        (
                          _.find(serviceList, (o: any) => {
                            return o.label.trim() == focus.trim();
                          }) as any
                        )?.icon
                      }{' '}
                      {focus}
                    </div>
                  ))}
                </div>
              </>
            )}
            {_.size(asset.fields['Asset Broadband Focus Area']) > 0 && (
              <>
                <h3 className='text-sm font-semibold text-blue-800'>COVERED POPULATIONS</h3>
                <div className='flex flex-wrap py-2 gap-2'>
                  {_.map(asset.fields['Asset Covered Population'], (focus, i) => (
                    <div
                      key={i}
                      className={classNames(
                        'flex gap-2 text-xs leading-5 justify-center items-center px-3 py-1 rounded-lg border border-gray-200 text-gray-700',
                        viewType === ViewType.LIST ? 'lg:self-center' : '',
                      )}
                    >
                      {focus}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListItem;

export const AssetListItemSkeleton = ({ viewType }: { viewType: ViewType }) => {
  return (
    <div
      className={classNames(
        'flex flex-col font-inter border bg-white drop-shadow-md border-primary-800 rounded-md p-6 ',
        viewType === ViewType.GRID && 'self-center min-h-72',
      )}
    >
      <div role='status' className='w-full animate-pulse'>
        <div className='h-2.5 bg-gray-200 rounded-full  w-48 mb-4'></div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full max-w-[360px]'></div>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
