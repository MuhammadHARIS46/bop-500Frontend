export interface ICityBounds {
  _id: string;
  city_admin_level: number;
  city_id: number;
  city_name: string;
  city_osm_id: number;
  features: Feature[];
  type: string;
  order: number;
}

export interface Feature {
  type: string;
  id: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  //ISO3166-2: string;
  admin_level: string;
  alt_name: string;
  boundary: string;
  int_name?: string;
  name: string;
  official_name: string;
  note?: string;
  place: string;
  ref: string;
  state_code: string;
  type: string;
  wikidata: string;
  wikipedia: string;
  id: string;

  //custom properties for geogson styling on the map
  lineColor: number[];
  lineWidth: number;
  fillColor: number[];
  radius: number; //for point
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}
