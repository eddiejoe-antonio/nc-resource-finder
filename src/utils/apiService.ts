import Papa from 'papaparse';
import { Resource } from '../types/resourceFinderTypes';
import type GeoJSON from 'geojson';

export const fetchGeoResources = async (): Promise<
  GeoJSON.FeatureCollection<
    GeoJSON.Point,
    {
      name: string;
      geography?: string;
      zip_code?: string;
      primary_type?: string;
      website?: string;
      description?: string;
      address_geocode?: string;
      googlemaps_link?: string;
    }
  >
> => {
  const timestamp = new Date().getTime();
  const url = `https://files.nc.gov/asset-hub/resources.csv?t=${timestamp}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }

  const csvText = await response.text();
  const parsedData = Papa.parse<Resource>(csvText, {
    header: true,
    dynamicTyping: true,
  }).data;

  // Sort the parsed data alphabetically by the "name" column
  const sortedData = parsedData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  // Convert the parsed data to GeoJSON format, ensuring only Point geometries
  const geoJsonData: GeoJSON.FeatureCollection<
    GeoJSON.Point,
    {
      name: string;
      geography?: string;
      zip_code?: string;
      primary_type?: string;
      website?: string;
      description?: string;
      address_geocode?: string;
      googlemaps_link?: string;
    }
  > = {
    type: 'FeatureCollection',
    features: sortedData
      .filter((resource) => resource.long !== null && resource.lat !== null) // Filter out null coordinates
      .map((resource) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [resource.long, resource.lat],
        },
        properties: {
          name: resource.name,
          geography: resource.geography,
          zip_code: resource.zip_code,
          primary_type: resource.primary_type,
          website: resource.website,
          description: resource.description,
          address_geocode: resource.address_geocode,
          googlemaps_link: resource.googlemaps_link,
        },
      })),
  };

  return geoJsonData;
};
