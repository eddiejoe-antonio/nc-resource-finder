// src/utils/apiService.ts
import { Resource } from '../types/resourceFinderTypes';

export const fetchResources = async (): Promise<Resource[]> => {
  const response = await fetch('https://nc-resource-finder.s3.amazonaws.com/resources.json');
  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }
  const data = await response.json();
  return data as Resource[];
};
