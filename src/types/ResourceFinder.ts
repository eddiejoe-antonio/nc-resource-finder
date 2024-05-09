// src/types/ResourceFinder.ts

export enum ViewType {
  GRID = 1,
  LIST = 2,
}

export interface ResourceFields {
  Name: string;
  Geography: string[];
  Website: string[];
  Servicesprovided: string;
  OrganizationTypeBroadsector: string;
  // Add other fields as necessary based on your JSON structure
}

export interface Resource {
  fields: ResourceFields;
}

export interface AssetListItemProps {
  resource: Resource;
  viewType: ViewType;
}
