import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, MapIcon } from '@heroicons/react/24/outline';
import AssetListItem from './AssetListItem';
import { geographyFilterData, typeFilterData } from '../static/filterResourceFinder';
import resources from '../static/resources.json';

export default function ResourceFinder() {
  const [selectedCounty, setSelectedCounty] = useState<{ value: string; label: string } | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 18; // Change as needed

  const filteredResources = resources
    .map((resource) => ({
      ...resource,
      Type: Array.isArray(resource.Type) ? resource.Type : [resource.Type || ''],
    }))
    .filter((resource) => {
      const countyMatch = !selectedCounty || resource.Geography === (selectedCounty?.value || '');
      const typeMatch =
        selectedType.length === 0 || selectedType.some((type) => resource.Type.includes(type));
      return countyMatch && typeMatch;
    });

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCountySelection = (option: { value: string; label: string }) => {
    setSelectedCounty(selectedCounty === option ? null : option);
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedType((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type],
    );
  };

  return (
    <div className='w-full md:px-28 py-4'>
      <hr className='border-t-1 border-black' />
      <div className='flex flex-col md:flex-row md:items-start py-4 bg-[#EEF7FF]'>
        <div className='md:w-80 md:pl-2 w-full'>
          <Listbox value={selectedCounty} onChange={handleCountySelection}>
            {() => (
              <>
                <div className='mt-1 relative'>
                  <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-full shadow-md pl-3 pr-10 py-2 text-left cursor-default'>
                    <span className='absolute inset-y-0 left-2 flex items-center pr-2 pointer-events-none'>
                      <MapIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                    <span className='ml-6 block truncate'>
                      {selectedCounty ? selectedCounty.label : 'I am looking in...'}
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                    {geographyFilterData.options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 pl-10 pr-4 ${
                            active ? 'text-white bg-blue-600' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                            >
                              {option.label} County
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className='flex flex-grow overflow-x-auto mt-4 md:mt-1 md:ml-4 md:mr-2 space-x-4'>
          {typeFilterData.options.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleTypeSelection(option.value)}
              className={`text-white px-6 py-2 rounded-full shadow-lg transition-colors whitespace-nowrap ${
                selectedType.includes(option.value)
                  ? 'bg-[#092940]' // Selected state color
                  : 'bg-[#1E79C8] md:hover:bg-[#3892E1]' // Default state with hover effect
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <hr className='border-t-1 border-black' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8'>
        {paginatedResources.map((resource, index) => (
          <AssetListItem key={index} resource={resource} />
        ))}
      </div>
      {/* Pagination component */}
      <div className='flex justify-center items-center my-4'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 mx-2 bg-gray-200 rounded-md cursor-pointer'
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredResources.length / ITEMS_PER_PAGE)}
          className='px-4 py-2 mx-2 bg-gray-200 rounded-md cursor-pointer'
        >
          Next
        </button>
      </div>
      <div className='my-20 bg-black'></div>
    </div>
  );
}
