// src/types/ResourceFinder.ts

import type GeoJSON from 'geojson';

export enum ViewType {
  GRID = 1,
  LIST = 2,
}

// The existing Resource type can be maintained if you still use it in other parts of the application.
export interface Resource {
  name: string;
  geography?: string;
  zip_code?: string;
  primary_type: string;
  website?: string;
  description?: string;
  long: number;
  lat: number;
  address_geocode?: string;
  googlemaps_link?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface AssetListItemProps {
  resource: GeoJSON.Feature<
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
      contact_name?: string;
      contact_email?: string;
      contact_phone?: string;
    }
  >;
  zoomToAsset?: (resource: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>) => void;
}
