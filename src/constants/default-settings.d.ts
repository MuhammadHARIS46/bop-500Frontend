export type DefaultSetting = {
  Kepler: KeplerSettings;
};

export type KeplerSettings = {
  mapId: string;
  mapboxApiAccessToken: string;
  alwaysVisibleLayerIds: string[];
  viewState: ViewState;
};

export type ViewState = {
  zoom: number;
  latitude: number;
  longitude: number;
};
