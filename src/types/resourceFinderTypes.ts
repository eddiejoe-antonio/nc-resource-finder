// src/types/ResourceFinder.ts

export enum ViewType {
  GRID = 1,
  LIST = 2,
}
// In your types/ResourceFinder.ts file, or wherever you define your types
export interface Resource {
  name: string;
  geography?: string;
  zip_code?: string;
  primary_type?: string; // Now Type can be either a string or an array of strings
  website?: string;
  description?: string; // Define this property if it's missing
  OrganizationTypeBroadsector?: string; // Define this property if it's missing
  long: number;
  lat: number;
}

export interface AssetListItemProps {
  resource: Resource;
}
