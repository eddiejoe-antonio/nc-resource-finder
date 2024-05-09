import { useMemo, useState } from 'react';
import AssetListItem from './AssetListItem';
import { ViewType } from '../types/ResourceFinder';

import resources from '../static/resources.json'; // Ensure this points to your resources JSON file

export default function ResourceFinder() {
  const [viewType, setViewType] = useState(ViewType.GRID);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeGeographies, setActiveGeographies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      console.log(resource.Geography);

      const includesGeography =
        activeGeographies.length === 0 ||
        activeGeographies.some((ag) => resource.Geography.includes(ag));
      return includesGeography;
    });
  }, [activeGeographies]);

  const LIMIT = viewType === ViewType.LIST ? 20 : 21;
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    return filteredResources.slice(startIndex, startIndex + LIMIT);
  }, [currentPage, filteredResources, LIMIT]);

  return (
    <div className='w-full h-full md:px-28 py-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
        {paginatedResources.map((resource, i) => (
          <AssetListItem key={i} resource={resource} viewType={viewType} />
        ))}
      </div>
      {/* Pagination and other UI components */}
    </div>
  );
}
