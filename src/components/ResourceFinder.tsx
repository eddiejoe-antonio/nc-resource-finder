import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, MapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssetListItem from './AssetListItem';
import { geographyFilterData, typeFilterData, FilterOption } from '../static/filterResourceFinder';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Position } from 'geojson';
import Pagination from './Pagination';
import { fetchResources, fetchGeoResources } from '../utils/apiService';
import { Resource } from '../types/resourceFinderTypes'; // Import the Resource type
import Fuse from 'fuse.js';
import type GeoJSON from 'geojson'; // Ensure you have the 'geojson' types installed

type GeoJsonFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  GeoJSON.GeoJsonProperties
>;

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWRkaWVqb2VhbnRvbmlvIiwiYSI6ImNsNmVlejU5aDJocHMzZW8xNzhhZnM3MGcifQ.chkV7QUpL9e3-hRc977uyA';

interface County {
  value: string;
  label: string;
}

interface ResourceFinderProps {
  isModalOpen: boolean;
}

const ResourceFinder: React.FC<ResourceFinderProps> = ({ isModalOpen }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [geoResource, setGeoResource] = useState<GeoJsonFeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [countyQuery, setCountyQuery] = useState<string>('');
  const [showCountyOptions, setShowCountyOptions] = useState<boolean>(false);
  const [highlightedCountyIndex, setHighlightedCountyIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isMapFocused, setIsMapFocused] = useState<boolean>(false);
  const [countyList, setCountyList] = useState<County[]>([]);
  const [currentCountyIndex, setCurrentCountyIndex] = useState<number>(-1);
  const ITEMS_PER_PAGE = 18;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countyInputRef = useRef<HTMLInputElement>(null);
  const assetSectionRef = useRef<HTMLDivElement>(null);
  const srCountyRef = useRef<HTMLDivElement>(null); // Ref for screen reader announcement
  const [selectedView, setSelectedView] = useState('list');
  const navigate = useNavigate();
  const handleNavigate = (view: string) => {
    setSelectedView(view);
    navigate('/');
  };
  const filteredCounties = geographyFilterData.options.filter((option) =>
    option.label.toLowerCase().includes(countyQuery.toLowerCase()),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResources();
        const geoData = await fetchGeoResources();
        setResources(data);
        setGeoResource(geoData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchData();
  }, []);

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
        setCurrentPage(1);
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
        style: 'mapbox://styles/eddiejoeantonio/clxdqaemw007001qj6xirfmxv',
        center: [-79, 35],
        zoom: 5.5,
        maxZoom: 20,
        maxBounds: [
          [-90, 30],
          [-70, 40],
        ],
        attributionControl: false,
      });

      // Add navigation controls with higher z-index
      const navControl = new mapboxgl.NavigationControl();
      mapInstance.current.addControl(navControl, 'top-right');

      // Handle zoom interaction to avoid selecting a county
      const zoomInButton = mapContainer.current.querySelector('.mapboxgl-ctrl-zoom-in');
      const zoomOutButton = mapContainer.current.querySelector('.mapboxgl-ctrl-zoom-out');
      const compassButton = mapContainer.current.querySelector('.mapboxgl-ctrl-compass');

      if (zoomInButton) {
        zoomInButton.addEventListener('keydown', (e) => {
          if ((e as KeyboardEvent).key === 'Enter') {
            e.stopPropagation();
            mapInstance.current?.zoomIn();
          }
        });
      }

      if (zoomOutButton) {
        zoomOutButton.addEventListener('keydown', (e) => {
          if ((e as KeyboardEvent).key === 'Enter') {
            e.stopPropagation();
            mapInstance.current?.zoomOut();
          }
        });
      }

      if (compassButton) {
        compassButton.addEventListener('keydown', (e) => {
          if ((e as KeyboardEvent).key === 'Enter') {
            e.stopPropagation();
            mapInstance.current?.zoomIn();
          }
        });
      }

      mapInstance.current.on('load', () => {
        if (mapInstance.current) {
          mapInstance.current.addSource('counties', {
            type: 'vector',
            url: 'mapbox://eddiejoeantonio.5kdb3ae2',
          });
          mapInstance.current.addSource('zipcodes', {
            type: 'vector',
            url: 'mapbox://eddiejoeantonio.23a15qmt',
          });

          const layers = mapInstance.current.getStyle().layers;
          let firstPlaceLabelId;
          for (const layer of layers) {
            if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
              firstPlaceLabelId = layer.id;
              break;
            }
          }

          mapInstance.current.addLayer(
            {
              id: 'counties-layer',
              type: 'fill',
              source: 'counties',
              'source-layer': 'ncgeo',
              paint: {
                'fill-color': '#acacac',
                'fill-opacity': 0.5,
                'fill-outline-color': 'white',
              },
            },
            firstPlaceLabelId,
          );
          // mapInstance.current.addLayer(
          //   {
          //     id: 'zipcode-layer',
          //     type: 'fill',
          //     source: 'zipcodes',
          //     'source-layer': 'NC_Zipcodes',
          //     paint: {
          //       'fill-color': '#6a3d3d',
          //       'fill-opacity': 0.5,
          //       'fill-outline-color': 'white',
          //     },
          //   },
          //   firstPlaceLabelId,
          // );

          mapInstance.current.addLayer(
            {
              id: 'counties-layer-hover',
              type: 'fill',
              source: 'counties',
              'source-layer': 'ncgeo',
              paint: {
                'fill-color': 'rgba(0,0,0,0)',
                'fill-outline-color': '#BC2442',
                'fill-opacity': 1.0,
              },
              filter: ['==', 'County', ''],
            },
            firstPlaceLabelId,
          );

          if (geoResource) {
            mapInstance.current.addSource('geojson-data', {
              type: 'geojson',
              data: geoResource,
            });

            mapInstance.current.addLayer({
              id: 'geojson-layer',
              type: 'circle',
              source: 'geojson-data',
              paint: {
                'circle-radius': {
                  stops: [
                    [8, 2.5],
                    [11, 6],
                    [16, 8],
                  ],
                },
                'circle-color': '#BC2442',
                'circle-stroke-color': 'white',
                'circle-stroke-width': 0.5,
              },
            });

            // Create a tooltip div
            const tooltip = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            });

            // Display the tooltip on hover
            mapInstance.current!.on('mousemove', 'geojson-layer', (e) => {
              const coordinates = e.lngLat;
              const feature = e.features?.[0];

              if (feature && feature.properties) {
                // Set the tooltip content
                tooltip
                  .setLngLat(coordinates)
                  .setHTML(
                    `<h1><strong>${feature.properties.name}</strong></h1><p>${feature.properties.address_geocode}</p>`,
                  )
                  .addTo(mapInstance.current!);
              }
            });

            // Remove the tooltip on mouseleave
            mapInstance.current!.on('mouseleave', 'geojson-layer', () => {
              tooltip.remove();
            });
          }

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

          // Populate the county list for keyboard navigation
          const counties = geographyFilterData.options.map((option) => ({
            value: option.value,
            label: option.label,
          }));
          setCountyList(counties);

          // Make the map focusable
          mapInstance.current.getContainer().setAttribute('tabindex', '0');
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [selectedView, isMobile]);

  useEffect(() => {
    if (mapInstance.current && mapInstance.current.isStyleLoaded()) {
      mapInstance.current.setPaintProperty('counties-layer', 'fill-color', [
        'case',
        ['==', ['get', 'County'], selectedCounty ? selectedCounty.value : ''],
        'rgba(255, 255, 255, 0)',
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
    setCurrentPage(1);
  }, [selectedView]);

  const handleCountySelection = (county: County) => {
    setSelectedCounty((prevCounty) => {
      if (prevCounty && prevCounty.value === county.value) {
        setCountyQuery('');
        // Reset to the overall boundaries
        if (mapInstance.current) {
          mapInstance.current.flyTo({
            center: [-79.0193, 35.7596],
            zoom: 6,
          });
        }
        return null;
      }
      setCountyQuery(county.label);
      return county;
    });
    setShowCountyOptions(false);
    setCurrentPage(1);
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedType((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type],
    );
    setCurrentPage(1);
    scrollToTop();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    scrollToTop();
  };

  const handleCountyQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountyQuery(e.target.value);
    setShowCountyOptions(true);
    setHighlightedCountyIndex(-1);
    setCurrentPage(1);
    scrollToTop();
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

  const handleMapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isMapFocused) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentCountyIndex((prevIndex) =>
          prevIndex < countyList.length - 1 ? prevIndex + 1 : 0,
        );
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentCountyIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : countyList.length - 1,
        );
      } else if (e.key === 'Enter' && currentCountyIndex >= 0) {
        const countyName = countyList[currentCountyIndex].value;
        handleCountySelection({ value: countyName, label: countyName });

        // Zoom to the selected county
        if (mapInstance.current) {
          const features = mapInstance.current.querySourceFeatures('counties', {
            sourceLayer: 'ncgeo',
            filter: ['==', 'County', countyName],
          });

          if (features.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
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
        }
      } else if (e.key === 'Escape') {
        setIsMapFocused(false);
        setCurrentCountyIndex(-1);
        // Reset to the overall boundaries
        if (mapInstance.current) {
          mapInstance.current.flyTo({
            center: [-79.0193, 35.7596],
            zoom: 6,
          });
        }
      }

      if (currentCountyIndex >= 0 && srCountyRef.current) {
        srCountyRef.current.innerText = `Focused on ${countyList[currentCountyIndex].label} County`;
      }
    }
  };

  useEffect(() => {
    if (currentCountyIndex >= 0 && mapInstance.current) {
      const selectedCounty = countyList[currentCountyIndex];
      mapInstance.current.setFilter('counties-layer-hover', ['==', 'County', selectedCounty.value]);
    }
  }, [currentCountyIndex]);

  const scrollToTop = () => {
    if (assetSectionRef.current) {
      assetSectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const currentGeography = selectedCounty ? `${selectedCounty.label} County` : 'North Carolina';
  const currentType =
    selectedType.length > 0
      ? selectedType
          .map((type) => typeFilterData.options.find((option) => option.value === type)?.label)
          .join(', ')
      : 'with technical issues';

  const fuseOptions = {
    keys: ['name', 'description', 'primary_type', 'geography'],
    threshold: 0.3,
  };

  const fuse = new Fuse(resources, fuseOptions);

  const filteredResources = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : resources;

  const filteredAndMappedResources = filteredResources
    .map((resource) => ({
      ...resource,
      Type: resource.primary_type
        ? resource.primary_type.split(',').map((type) => type.trim())
        : [],
      Geography: resource.geography ? resource.geography.split(',').map((geo) => geo.trim()) : [],
    }))
    .filter((resource) => {
      const countyMatch =
        !selectedCounty || resource.Geography.includes(selectedCounty?.value || '');
      const typeMatch =
        selectedType.length === 0 || selectedType.some((type) => resource.Type.includes(type));
      return countyMatch && typeMatch;
    });

  const totalPages = Math.ceil(filteredAndMappedResources.length / ITEMS_PER_PAGE);
  const paginatedResources = filteredAndMappedResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className='w-full py-4'>
      <div className='flex flex-col border-t border-[#3B75A9] lg:flex-row lg:items-start lg:space-x-16 py-4'>
        <div className='relative flex-1 lg:w-1/2 md:mb-0 mb-2'>
          <p className='my-2 font-semibold'>What are you looking for?</p>
          <label htmlFor='keyword-input' className='sr-only'>
            Keyword Search
          </label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-2 flex items-center'>
              <MagnifyingGlassIcon className='h-6 w-6 text-black' aria-hidden='true' />
            </span>
            <input
              id='keyword-input'
              type='text'
              placeholder='Search for resources'
              className='w-full bg-white border border-[#3B75A9] rounded-full pl-10 pr-4 py-2 text-left cursor-default text-black'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className='relative flex-1 lg:w-1/2 md:mb-0 mb-2' ref={dropdownRef}>
          <p className='my-2 font-semibold'>Where are you looking?</p>
          <label htmlFor='county-input' className='sr-only'>
            County Selector
          </label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-2 flex items-center'>
              <MapIcon className='h-6 w-6 text-black' aria-hidden='true' />
            </span>
            <input
              id='county-input'
              type='text'
              placeholder='Enter county or zip code'
              className='w-full bg-white border border-[#3B75A9] rounded-full pl-10 pr-4 py-2 text-left cursor-default text-black'
              value={countyQuery}
              onChange={handleCountyQueryChange}
              onFocus={() => setShowCountyOptions(true)}
              onKeyDown={handleKeyDown}
              ref={countyInputRef}
            />
          </div>

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
      <div>Try searching for popular resources</div>
      <div className='flex flex-col border-b border-[#3B75A9] md:flex-row flex-wrap pt-2 pb-6 justify-start'>
        <div className='text-md flex flex-wrap'>
          {typeFilterData.options.map((option: FilterOption) => (
            <button
              aria-pressed={selectedType.includes(option.value) ? 'true' : 'false'}
              key={option.value}
              onClick={() => toggleTypeSelection(option.value)}
              className={`flex items-center px-6 py-2 ml-1 md:ml-2 mb-2 md:mb-1 rounded-full transition-colors whitespace-nowrap ${
                selectedType.includes(option.value)
                  ? 'bg-[#1E79C8] text-white border border-white'
                  : 'bg-[#EEF7FF] text-[#092940] border border-[#3B75A9] md:hover:bg-[#3892E1]'
              } `}
            >
              {option.icon && <option.icon className='w-6 h-6 mr-2' />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {selectedView === 'list' ? (
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='my-2 md:mt-8 text-lg'>
                Showing {filteredAndMappedResources.length} results for{' '}
                <strong>{currentGeography}</strong>
                {selectedType.length > 0 && (
                  <>
                    {' '}
                    that help you <strong>{currentType}</strong>
                  </>
                )}
              </p>
            </div>
            <div className='flex space-x-4'>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='view'
                  value='map'
                  onChange={() => handleNavigate('map')}
                  className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
                />
                <span className='text-[#092940]'>Map View</span>
              </label>

              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='view'
                  value='list'
                  checked={selectedView === 'list'}
                  onChange={() => handleNavigate('list')}
                  className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
                />
                <span className='text-[#092940]'>List View</span>
              </label>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-0'>
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
        <div className='flex flex-col md:flex-row my-8'>
          <div
            ref={mapContainer}
            className='map-container h-[50vh] md:h-[60vh] lg:h-[80vh] w-full md:w-[55vw] md:flex-2'
            tabIndex={0}
            onKeyDown={handleMapKeyDown}
            onFocus={() => setIsMapFocused(true)}
            onBlur={() => setIsMapFocused(false)}
            aria-label='Map of counties'
          />
          <div ref={srCountyRef} className='sr-only' aria-live='assertive'></div>
          <div
            ref={assetSectionRef}
            className='md:flex-grow-0 md:flex-shrink-0 h-[40vh] md:h-[60vh] lg:h-[80vh] py-2 md:py-0 md:p-4 w-full'
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <div className='flex space-x-4'>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='view'
                  value='map'
                  onChange={() => handleNavigate('map')}
                  className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
                />
                <span className='text-[#092940]'>Map View</span>
              </label>

              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='view'
                  value='list'
                  checked={selectedView === 'list'}
                  onChange={() => handleNavigate('list')}
                  className='form-radio h-5 w-5 text-[#092940] border-[#092940] focus:ring-0'
                />
                <span className='text-[#092940]'>List View</span>
              </label>
            </div>
            <div className='pb-3'>
              <p className='my-2 md:my-2 text-lg'>
                Showing {filteredAndMappedResources.length} results for{' '}
                <strong>{currentGeography}</strong>
                {selectedType.length > 0 && (
                  <>
                    {' '}
                    that help you <strong>{currentType}</strong>
                  </>
                )}
              </p>
            </div>
            <div className='space-y-4'>
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
