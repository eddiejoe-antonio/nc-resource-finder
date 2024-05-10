import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { CheckIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import AssetListItem from './AssetListItem';
import { geographyFilterData } from '../static/filterResourceFinder';
import resources from '../static/resources.json';

export default function ResourceFinder() {
  const [selectedCounty, setSelectedCounty] = useState<{ value: string; label: string } | null>(
    null,
  );

  // Filter resources based on selected county or show all if selectedCounty is null
  const filteredResources = resources.filter(
    (resource) => !selectedCounty || resource.Geography === (selectedCounty?.value || ''),
  );

  const handleCountySelection = (option: { value: string; label: string }) => {
    // Toggle selection by checking if the clicked county is the currently selected one
    setSelectedCounty(selectedCounty === option ? null : option);
  };

  return (
    <div className='w-full md:px-28 py-4'>
      <div className='w-full md:w-[20vw]'>
        <Listbox value={selectedCounty} onChange={handleCountySelection}>
          {() => (
            <>
              <div className='mt-1 relative'>
                <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  <span className='block truncate'>
                    {selectedCounty ? selectedCounty.label : 'I am looking in..'}
                  </span>{' '}
                  {/* Show 'No Filter' if no county is selected */}
                  <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <ArrowDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </span>
                </Listbox.Button>
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                  {geographyFilterData.options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {option.label}
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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
        {filteredResources.map((resource, index) => (
          <AssetListItem key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
}
