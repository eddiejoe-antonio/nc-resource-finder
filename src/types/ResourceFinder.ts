// src/types/AssetInventory.ts

export enum ViewType {
  GRID = 1,
  LIST = 2,
}

export interface AssetFields {
  Asset: string;
  'Organization Sub-Type': string[];
  'County (from Org County)': string[];
  Website?: string;
  'Asset Description'?: string;
  'Asset Broadband Focus Area'?: string[];
  'Asset Covered Population'?: string[];
}

export interface Asset {
  fields: AssetFields;
}

export interface AssetListItemProps {
  asset: Asset;
  viewType: ViewType;
}
