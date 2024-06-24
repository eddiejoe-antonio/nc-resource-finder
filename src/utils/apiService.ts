import Papa from 'papaparse';
import { Resource } from '../types/resourceFinderTypes';

export const fetchResources = async (): Promise<Resource[]> => {
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

  console.log(parsedData);

  return parsedData;
};
