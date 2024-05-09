import { useMemo, useRef, useState } from 'react';
import AssetListItem from './AssetListItem';
import { AssetListItemProps, ViewType } from '../types/ResourceFinder';

import assets from '../static/assets.json'; // Import local JSON

export default function ResourceFinder() {
  const [viewType, setViewType] = useState(ViewType.GRID);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeCounties, setActiveCounties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const includesCounty =
        activeCounties.length === 0 ||
        activeCounties.some((ac) => asset.fields['County (from Org County)'].includes(ac));
      const isActive = !asset.fields.Hide;
      return includesCounty && isActive;
    });
  }, [activeCounties]);

  const LIMIT = viewType === ViewType.LIST ? 20 : 21;
  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    return filteredAssets.slice(startIndex, startIndex + LIMIT);
  }, [currentPage, filteredAssets, LIMIT]);

  return (
    <div className='w-full h-full max-w-screen-xl m-auto px-8 py-4'>
      <div className='flex w-full justify-between'>
        <div className='flex w-1/2 gap-2 items-center justify-end'>{/* Icon buttons here */}</div>
      </div>
      {/* Additional UI components like filters, pagination here */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
        {paginatedAssets.map((asset, i) => (
          <AssetListItem key={i} asset={asset} viewType={viewType} />
        ))}
      </div>
      {/* Pagination component here */}
    </div>
  );
}
