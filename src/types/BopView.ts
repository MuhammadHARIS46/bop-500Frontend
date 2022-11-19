import { Map } from "mapbox-gl";
import { ICity } from "./City";

export interface IBopView {
  cities: ICity[];
  selectedCities: ICity[];
  activeCityId: number | undefined;
  map: Map | undefined;
}
