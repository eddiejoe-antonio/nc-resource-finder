// src/types/ResourceFinder.ts

export enum ViewType {
  GRID = 1,
  LIST = 2,
}
// In your types/ResourceFinder.ts file, or wherever you define your types
export interface Resource {
  Name: string;
  Geography: string;
  Type: string;
  Website: string;
  Servicesprovided: string; // Define this property if it's missing
  OrganizationTypeBroadsector: string; // Define this property if it's missing
}

export interface AssetListItemProps {
  resource: Resource;
  viewType: ViewType;
}
