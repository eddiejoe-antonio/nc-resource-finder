import { useAppSelector } from '@/app/hooks';
import { useGetAssetInventoryQuery } from '@/services/dataDashboard';
import _ from 'lodash';
import { GridIcon, ListIcon, QuestionCircleIcon } from '../IconSvg';
import { useMemo, useRef, useState } from 'react';
import { classNames } from '@/utils/helper';
import { AssetInfo } from '@/types/AssetInventory';
import { Avatar, Group, MultiSelect, Pagination, Popover } from '@mantine/core';
import AssetListItem, { ViewType, AssetListItemSkeleton } from './AssetListItem';
import {
  FilterOption,
  countyFilter,
  filterDataAssetInventory,
} from '@/static/filterDataAssetInventory';

export default function AssetInventory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFetching } = useGetAssetInventoryQuery();
  const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
  const allAssets = useAppSelector((s) => s.ui.assets);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [activeCounties, setActiveCounties] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT = viewType === ViewType.LIST ? 20 : 21;

  const filteredAssets: AssetInfo[][] = useMemo(() => {
    setCurrentPage(1);
    if (allAssets) {
      const activeFilters = _.flatMap(_.toArray(selectedFilters), (f) => f);

      return _.chunk(
        _.filter(allAssets, (asset: any) => {
          if (
            _.size(activeCounties) > 0 &&
            !_.some(activeCounties, (ac) => asset.fields['County (from Org County)'].includes(ac))
          ) {
            return false;
          }

          if (
            _.size(activeFilters) > 0 &&
            !_.some(
              activeFilters,
              (af) =>
                asset.fields['Asset Broadband Focus Area'].includes(af) ||
                asset.fields['Asset Covered Population'].includes(af) ||
                asset.fields['Organization Sub-Type'].includes(af),
            )
          ) {
            return false;
          }
          // Check if the 'Hide' field equals 'true'
          if (asset.fields['Hide'] === true) {
            return false;
          }

          return true;
        }),
        LIMIT,
      );
    }
    return [];
  }, [allAssets, selectedFilters, activeCounties]);

  const totalPage = _.size(filteredAssets);

  return (
    <div ref={containerRef} className='w-full h-full max-w-screen-xl m-auto px-8 py-4'>
      <div className='flex w-full justify-between'>
        <h3 className='font-semibold text-[28px] subpixel-antialiased'>Texas Asset Inventory</h3>
        <div className='flex w-1/2 gap-2 items-center justify-end'>
          <div
            onClick={() => setViewType(ViewType.GRID)}
            className={classNames(
              'p-3 border bg-white drop-shadow rounded-md cursor-pointer',
              viewType === ViewType.GRID ? 'border-blue-400' : 'border-gray-400',
            )}
          >
            <GridIcon />
          </div>
          <div
            onClick={() => setViewType(ViewType.LIST)}
            className={classNames(
              'p-3 border bg-white drop-shadow rounded-md cursor-pointer',
              viewType === ViewType.LIST ? 'border-blue-400' : 'border-gray-400',
            )}
          >
            <ListIcon />
          </div>
        </div>
      </div>
      <div className='py-2 text-slate-600 text-sm'>Search and filter below.</div>

      <div className='flex flex-wrap w-full py-8 border-y border-gray-200'>
        <div className='pr-8 py-2 lg:w-1/4 md:w-1/2 w-full'>
          <MultiSelect
            classNames={{
              label: 'text-gray-700 text-sm font-medium',
              wrapper: 'py-1 drop-shadow',
              input: 'rounded-md',
            }}
            color='#0000000'
            className='bg-transparent'
            label='County'
            value={activeCounties}
            onChange={setActiveCounties}
            data={_.map(countyFilter.options, (option) => ({
              label: option.label,
              value: option.label,
            }))}
            rightSectionPointerEvents='auto'
            rightSection={
              <Popover width={200} position='right-end' withArrow shadow='md'>
                <Popover.Target>
                  <span className='cursor-pointer'>
                    <QuestionCircleIcon />
                  </span>
                </Popover.Target>
                <Popover.Dropdown>{countyFilter.explanation}</Popover.Dropdown>
              </Popover>
            }
            clearable
            searchable
          />
        </div>

        {_.map(filterDataAssetInventory, (filter, i) => (
          <div key={i} className='pr-8 py-2 lg:w-1/4 md:w-1/2 w-full'>
            <MultiSelect
              classNames={{
                label: 'text-gray-700 text-sm font-medium',
                wrapper: 'py-1 drop-shadow',
                input: 'rounded-md',
              }}
              label={filter.name}
              renderOption={(data) => {
                const option = data.option as FilterOption;
                return option.icon ? (
                  <Group
                    className='flex w-full gap-2 justify-start items-center'
                    style={{ flexWrap: 'nowrap' }}
                  >
                    <div className=''>
                      {option?.icon && (
                        <Avatar src={null} size={20}>
                          {option?.icon}
                        </Avatar>
                      )}
                    </div>
                    <div className='inline'>{option.value} </div>
                  </Group>
                ) : (
                  <div> {option.value}</div>
                );
              }}
              value={selectedFilters[filter.id]}
              onChange={(value) => {
                setSelectedFilters((s) => _.clone(_.assign(s, { [filter.id]: value })));
              }}
              data={_.map(filter.options, (option) => ({
                icon: option?.icon,
                label: option.label,
                value: option.label,
                color: option?.color,
              }))}
              rightSectionPointerEvents='auto'
              rightSection={
                <Popover width={200} position='right-start' withArrow shadow='md'>
                  <Popover.Target>
                    <span className='cursor-pointer'>
                      <QuestionCircleIcon />
                    </span>
                  </Popover.Target>
                  <Popover.Dropdown>{filter.explanation}</Popover.Dropdown>
                </Popover>
              }
              clearable
              searchable
            />
          </div>
        ))}
      </div>
      <div className='py-2 text-slate-600 text-sm'>
        Showing {_.size(_.flatten(filteredAssets))} results.
      </div>
      <div
        className={classNames(
          'grid min-h-96 grid-cols-1 py-4 w-full gap-4',
          viewType == ViewType.GRID && 'sm:grid-cols-2 lg:grid-cols-3 ',
        )}
      >
        {isFetching &&
          _.size(filteredAssets) < 1 &&
          _.map(_.range(LIMIT), () => <AssetListItemSkeleton viewType={viewType} />)}

        {_.map(filteredAssets[currentPage - 1], (asset, i) => (
          <div key={i}>
            <AssetListItem asset={asset} viewType={viewType} />
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        {_.size(filteredAssets) > 1 && (
          <Pagination.Root
            value={currentPage}
            onChange={(val) => {
              window.scrollTo({ top: containerRef.current?.offsetTop, behavior: 'smooth' });
              setCurrentPage(val);
            }}
            total={totalPage}
            classNames={{
              control: 'border-0 rounded-none outline outline-1 outline-gray-300',
              dots: 'bg-white outline outline-1 outline-gray-300',
            }}
          >
            <Group className=' w-full border-collapse rounded-md' gap={0} mt='xl'>
              <Pagination.Previous className='border-0 outline rounded-l-md rounde outline-gray-300 rounded-none' />
              <Pagination.Items />
              <Pagination.Next className='border-0 oultine outline-gray-300 rounded-r-md rounded-none' />
            </Group>
          </Pagination.Root>
        )}
      </div>
    </div>
  );
}
