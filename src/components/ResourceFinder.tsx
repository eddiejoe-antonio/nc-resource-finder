import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon, MapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssetListItem from './AssetListItem';
import { geographyFilterData, typeFilterData, FilterOption } from '../static/filterResourceFinder';
import resources from '../static/updated_resources.json';
import mapboxgl from 'mapbox-gl';
import { Position } from 'geojson';
import Pagination from './Pagination';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWRkaWVqb2VhbnRvbmlvIiwiYSI6ImNsNmVlejU5aDJocHMzZW8xNzhhZnM3MGcifQ.chkV7QUpL9e3-hRc977uyA';

interface County {
  value: string;
  label: string;
}

interface ResourceFinderProps {
  selectedView: string;
  isModalOpen: boolean;
}

const ResourceFinder: React.FC<ResourceFinderProps> = ({ selectedView, isModalOpen }) => {
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [countyQuery, setCountyQuery] = useState<string>('');
  const [showCountyOptions, setShowCountyOptions] = useState<boolean>(false);
  const [highlightedCountyIndex, setHighlightedCountyIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const ITEMS_PER_PAGE = 18;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countyInputRef = useRef<HTMLInputElement>(null);
  const assetSectionRef = useRef<HTMLDivElement>(null);

  const filteredCounties = geographyFilterData.options.filter((option) =>
    option.label.toLowerCase().includes(countyQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isModalOpen) {
        setSelectedType([]);
        setCurrentPage(1); // Reset to first page
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedView === 'map' && !mapInstance.current && mapContainer.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/eddiejoeantonio/clwtppqme058301ql266g5top',
        center: [-79, 35],
        zoom: 5.5,
        maxBounds: [
          [-90, 30],
          [-70, 40],
        ],
        attributionControl: false,
      });

      mapInstance.current.on('load', () => {
        if (mapInstance.current) {
          mapInstance.current.addSource('counties', {
            type: 'vector',
            url: 'mapbox://eddiejoeantonio.5kdb3ae2',
          });

          mapInstance.current.addLayer({
            id: 'counties-layer',
            type: 'fill',
            source: 'counties',
            'source-layer': 'ncgeo',
            paint: {
              'fill-color': '#acacac',
              'fill-opacity': 0.9,
              'fill-outline-color': 'white',
            },
          });

          mapInstance.current.addLayer({
            id: 'counties-layer-hover',
            type: 'fill',
            source: 'counties',
            'source-layer': 'ncgeo',
            paint: {
              'fill-color': '#888',
              'fill-outline-color': 'white',
              'fill-opacity': 0.7,
            },
            filter: ['==', 'County', ''],
          });

          mapInstance.current.on('click', 'counties-layer', (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              if (feature.properties) {
                const countyName = feature.properties['County'];
                if (countyName) {
                  const county = { value: countyName, label: countyName };
                  handleCountySelection(county);
                }
              }
            }
          });

          mapInstance.current.on('mouseenter', 'counties-layer', () => {
            if (!isMobile) {
              mapInstance.current!.getCanvas().style.cursor = 'pointer';
            }
          });

          mapInstance.current.on('mouseleave', 'counties-layer', () => {
            if (!isMobile) {
              mapInstance.current!.getCanvas().style.cursor = '';
              mapInstance.current!.setFilter('counties-layer-hover', ['==', 'County', '']);
              if (popupRef.current) {
                popupRef.current.remove();
              }
            }
          });

          mapInstance.current.on('mousemove', 'counties-layer', (e) => {
            if (!isMobile && e.features && e.features.length > 0) {
              const feature = e.features[0];
              if (feature.properties) {
                const countyName = feature.properties['County'];
                if (countyName) {
                  mapInstance.current!.setFilter('counties-layer-hover', [
                    '==',
                    'County',
                    countyName,
                  ]);
                }
              }
            }
          });
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    };
  }, [selectedView, isMobile]);

  useEffect(() => {
    if (mapInstance.current && mapInstance.current.isStyleLoaded()) {
      mapInstance.current.setPaintProperty('counties-layer', 'fill-color', [
        'case',
        ['==', ['get', 'County'], selectedCounty ? selectedCounty.value : ''],
        '#888',
        '#adadad',
      ]);

      if (selectedCounty) {
        const bounds = new mapboxgl.LngLatBounds();
        const features = mapInstance.current.querySourceFeatures('counties', {
          sourceLayer: 'ncgeo',
          filter: ['==', 'County', selectedCounty.value],
        });

        if (features.length > 0) {
          features.forEach((feature) => {
            if (feature.geometry.type === 'Polygon') {
              (feature.geometry.coordinates[0] as Position[]).forEach((coord) => {
                bounds.extend(coord as mapboxgl.LngLatLike);
              });
            }
          });

          if (!bounds.isEmpty()) {
            mapInstance.current.fitBounds(bounds, { padding: 20 });
          }
        }
      } else {
        mapInstance.current.flyTo({
          center: [-79.0193, 35.7596],
          zoom: 6,
        });
      }
    }
  }, [selectedCounty]);

  useEffect(() => {
    if (!countyQuery) {
      setSelectedCounty(null);
    }
  }, [countyQuery]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when view changes
  }, [selectedView]);

  const handleCountySelection = (county: County) => {
    setSelectedCounty((prevCounty) => {
      if (prevCounty && prevCounty.value === county.value) {
        setCountyQuery('');
        return null;
      }
      setCountyQuery(county.label);
      return county;
    });
    setShowCountyOptions(false);
    setCurrentPage(1); // Reset to first page
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedType((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type],
    );
    setCurrentPage(1); // Reset to first page
    scrollToTop(); // Scroll to top
  };

  const filteredResources = resources
    .map((resource) => ({
      ...resource,
      Type: Array.isArray(resource.Primary_Filter)
        ? resource.Primary_Filter
        : [resource.Primary_Filter || ''],
    }))
    .filter((resource) => {
      const countyMatch = !selectedCounty || resource.Geography === (selectedCounty?.value || '');
      const typeMatch =
        selectedType.length === 0 || selectedType.some((type) => resource.Type.includes(type));
      const searchMatch = searchQuery
        ? ['Name', 'Description', 'Type', 'Geography'].some((field) =>
            field === 'Type'
              ? resource.Type.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase()))
              : resource[field as keyof typeof resource] &&
                typeof resource[field as keyof typeof resource] === 'string' &&
                (resource[field as keyof typeof resource] as string)
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
          )
        : true;
      return countyMatch && typeMatch && searchMatch;
    });

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
    scrollToTop(); // Scroll to top
  };

  const handleCountyQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountyQuery(e.target.value);
    setShowCountyOptions(true);
    setHighlightedCountyIndex(-1);
    setCurrentPage(1); // Reset to first page
    scrollToTop(); // Scroll to top
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedCountyIndex((prevIndex) =>
        prevIndex < filteredCounties.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedCountyIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter') {
      if (highlightedCountyIndex >= 0 && highlightedCountyIndex < filteredCounties.length) {
        handleCountySelection(filteredCounties[highlightedCountyIndex]);
      }
    } else if (e.key === 'Tab') {
      setShowCountyOptions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountyOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const scrollToTop = () => {
    if (assetSectionRef.current) {
      assetSectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop(); // Scroll to top
  };

  return (
    <div className='w-full md:px-28 2xl:px-40 py-4'>
      <hr className='border-t-1 border-black' />
      <div className='flex flex-col lg:flex-row lg:items-start lg:space-x-4 py-4 px-2 bg-[#EEF7FF]'>
        <div className='relative flex-1 mb-4 lg:mb-0 lg:w-1/2'>
          <label htmlFor='keyword-input' className='hidden text-sm font-medium text-gray-700'>
            Keyword Search
          </label>
          <span className='absolute inset-y-0 left-2 flex items-center'>
            <MagnifyingGlassIcon className='h-6 w-6 text-black' aria-hidden='true' />
          </span>
          <input
            id='keyword-input'
            type='text'
            placeholder="I'm looking for..."
            className='w-full bg-white border border-gray-300 rounded-full shadow-md pl-10 pr-4 py-2 text-left cursor-default text-black'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className='relative flex-1 mb-0 md:mb-4 lg:mb-0 lg:w-1/2' ref={dropdownRef}>
          <label htmlFor='county-input' className='hidden text-sm font-medium text-gray-700'>
            County Selector
          </label>
          <span className='absolute inset-y-0 left-2 flex items-center'>
            <MapIcon className='h-6 w-6 text-black' aria-hidden='true' />
          </span>
          <input
            id='county-input'
            type='text'
            placeholder='I am looking in...'
            className='w-full bg-white border border-gray-300 rounded-full shadow-md pl-10 pr-4 py-2 text-left cursor-default text-black'
            value={countyQuery}
            onChange={handleCountyQueryChange}
            onFocus={() => setShowCountyOptions(true)}
            onKeyDown={handleKeyDown}
            ref={countyInputRef}
          />

          {showCountyOptions && (
            <div className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              {filteredCounties.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleCountySelection(option)}
                  onMouseEnter={() => setHighlightedCountyIndex(-1)}
                  className={`cursor-default select-none relative py-2 pl-10 pr-4 text-gray-900 hover:bg-blue-600 hover:text-white ${
                    highlightedCountyIndex === index ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  <span
                    className={`block truncate ${
                      selectedCounty && selectedCounty.value === option.value
                        ? 'font-medium'
                        : 'font-normal'
                    }`}
                  >
                    {option.label} County
                  </span>
                  {selectedCounty && selectedCounty.value === option.value && (
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-wrap py-2 justify-start bg-[#EEF7FF]'>
        {typeFilterData.options.map((option: FilterOption) => (
          <button
            aria-pressed='false'
            key={option.value}
            onClick={() => toggleTypeSelection(option.value)}
            className={`flex items-center px-6 py-2 ml-1 md:ml-2 mb-2 rounded-full shadow-lg transition-colors whitespace-nowrap ${
              selectedType.includes(option.value)
                ? 'bg-[#092940] text-white'
                : 'bg-[#1E79C8] text-white md:hover:bg-[#3892E1]'
            } `}
          >
            {option.icon && <option.icon className='w-6 h-6 mr-2' />}
            {option.label}
          </button>
        ))}
      </div>
      <hr className='border-t-1 border-black' />
      {selectedView === 'list' ? (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 space-y-0'>
            {paginatedResources.map((resource, index) => (
              <AssetListItem key={index} resource={resource} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className='flex flex-col md:flex-row'>
          <div
            ref={mapContainer}
            className='map-container h-[50vh] md:h-[60vh] lg:h-[80vh] w-full md:w-[55vw] md:flex-2'
          />
          <div
            ref={assetSectionRef}
            className='md:flex-grow-0 md:flex-shrink-0 h-[40vh] md:h-[60vh] lg:h-[80vh] py-2 md:py-0 md:p-4 w-full'
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <div className='space-y-4 py-6'>
              {paginatedResources.map((resource, index) => (
                <AssetListItem key={index} resource={resource} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceFinder;
