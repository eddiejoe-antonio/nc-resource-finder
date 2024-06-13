import Papa from 'papaparse';
import { Resource } from '../types/resourceFinderTypes';

export const fetchResources = async (): Promise<Resource[]> => {
  const response = await fetch('https://nc-resource-finder.s3.amazonaws.com/resources.csv');
  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }
  const csvText = await response.text();
  const parsedData = Papa.parse<Resource>(csvText, {
    header: true,
    dynamicTyping: true,
  }).data;
  return parsedData;
};
