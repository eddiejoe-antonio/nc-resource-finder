import Papa from 'papaparse';
import { Resource } from '../types/resourceFinderTypes';

export const fetchResources = async (): Promise<Resource[]> => {
  const timestamp = new Date().getTime();
  // const url = `https://nc-resource-finder.s3.amazonaws.com/resources.csv`;
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

  return sortedData;
};

export const fetchGeoResources = async (): Promise<GeoJSON.FeatureCollection> => {
  const timestamp = new Date().getTime();
  // const url = `https://nc-resource-finder.s3.amazonaws.com/resources.csv`;
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

  // Convert the parsed data to GeoJSON format
  const geoJsonData: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: parsedData.map((resource) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [resource.long, resource.lat],
      },
      properties: {
        name: resource.name,
        // Add other relevant properties here
      },
    })),
  };

  return geoJsonData;
};
