import { KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";
import { CSSProperties } from "react";

export type KeplerState = {
  [KEPLER_INSTANCE_IDS.MAP]: KeplerStateInstance;
};

export type KeplerStateInstance = {
  mapState: MapState;
  mapStyle: MapStyle;
  uiState: UiState;
  visState: VisState;
  providerState: any;
};

//definition for MapState, MapStyle, UiState, visState
export type VisState = {
  mapInfo: MapInfo;
  layers: Layer[];
  layerData: any[];
  layerToBeMerged: any[];
  layerOrder: number[];
  filters: object[];
  filterToBeMerged: any[];
  datasets: object;
  editingDataset: string | undefined;
  interactionConfig: object;
  interactionToBeMerged: any;
  layerBlending: string;
  hoverInfo: any;
  clicked: any;
  mousePos: any;
  maxDefaultTooltips: number;
  layerClasses: object;
  animationConfig: object;
  editor: object;
  splitMaps: object[];
  splitMapsToBeMerged: object[];
  fileLoading: object | false;
  fileLoadingProgress: object;
  loaders: object[];
  loadOptions: object;
  initialState?: Partial<VisState>;
  mergers: object;
  schema: object;
  preserveLayerOrder?: number[];
};

export type MapState = {
  pitch: number;
  bearing: number;
  latitude: number;
  longitude: number;
  zoom: number;
  dragRotate: boolean;
  width: number;
  height: number;
  isSplit: boolean;
  initialState?: any;
  scale?: number;
};

export type MapStyle = {
  styleType: string;
  visibleLayerGroups: VisibleLayerGroups;
  topLayerGroups: VisibleLayerGroups;
  mapStyles: MapStyles;
  // save mapbox access token
  mapboxApiAccessToken: string | null;
  mapboxApiUrl: string;
  mapStylesReplaceDefault: boolean;
  inputStyle: InputStyle;
  threeDBuildingColor: RGBColor;
  custom3DBuildingColor: boolean;

  initialState?: MapStyle;
};

export type UiState = {
  readOnly: boolean;
  activeSidePanel: string;
  currentModal: string | null;
  datasetKeyToRemove: string | null;
  visibleDropdown: string | null;
  // export image modal ui
  exportImage: object;
  // export data modal ui
  exportData: ExportData;
  // html export
  exportMap: ExportMap;
  // map control panels
  mapControls: MapControls;
  // ui notifications
  notifications: object[];
  // load files
  loadFiles: object;
  // Locale of the UI
  locale: any;
  layerPanelListView: LayerPanelListView;
};

export type LayerGroup = {
  slug: string;
  filter(layer: { id: string }): boolean;
  defaultVisibility: boolean;
};

export type VisibleLayerGroups = {
  [key: string]: boolean;
};

export type BaseMapStyle = {
  id: string;
  label: string;
  url: string;
  icon: string;
  style?: Object;
  layerGroups: LayerGroup[];
};

export type MapStyles = {
  [key: string]: BaseMapStyle;
};

export type InputStyle = {
  accessToken: string | null;
  error: boolean;
  isValid: boolean;
  label: string | null;
  style: any | null;
  url: string | null;
  icon: string | null;
  custom: boolean;
};

export type RGBColor = [number, number, number];
export type RGBAColor = [number, number, number, number];

export type ExportData = {
  selectedDataset: string;
  dataType: string;
  filtered: boolean;
};
export type ExportJson = {
  hasData: boolean;
};
export type ExportMap = {
  HTML: ExportHtml;
  JSON: ExportJson;
  format: "HTML" | "JSON";
};

export type ExportHtml = {
  exportMapboxAccessToken: null | string;
  userMapboxToken: string;
  mode: string;
};
export type MapControl = {
  show: boolean;
  active: boolean;
  disableClose?: boolean;
  activeMapIndex?: number;
};
export type MapControls = {
  visibleLayers?: MapControl;
  mapLegend?: MapControl;
  toggle3d?: MapControl;
  splitMap?: MapControl;
  mapDraw?: MapControl;
  mapLocale?: MapControl;
};
export type LayerPanelListView = "list" | "sortByDataset";

export type MapInfo = {
  title: string;
  description: string;
};

export type Layer = {
  id: string;
  meta: {};
  visConfigSettings: {
    [key: string]: any;
  };
  config: LayerBaseConfig;
  _oldDataUpdateTriggers: any;
};
export type LayerBaseConfig = {
  dataId: string | null;
  label: string;
  color: RGBColor;

  columns: object;
  isVisible: boolean;
  isConfigActive: boolean;
  highlightColor: RGBColor | RGBAColor;
  hidden: boolean;

  visConfig: LayerVisConfig;
  textLabel: object[];

  colorUI: {
    color: object;
    colorRange: object;
  };
  animation: {
    enabled: boolean;
  };
};

export type LayerVisConfig = {
  thickness: number;
  sizeRange: number;
  trailLength: number;
  radius: number;
  fixedRadius: boolean;
  radiusRange: [number, number];
  clusterRadius: number;
  opacity: number;
  coverage: number;
  outline: boolean;
  colorRange: ColorRange;
  strokeColorRange: ColorRange;
  targetColor: any;
  strokeColor: any;
  colorAggregation: object;
  sizeAggregation: object;
  percentile: [number, number];
  elevationPercentile: [number, number];
  resolution: number;
  sizeScale: number;
  angle: number;
  worldUnitSize: number;
  elevationScale: number;
  enableElevationZoomFactor: boolean;
  heightRange: [number, number];
  coverageRange: [number, number];
  "hi-precision": boolean;
  enable3d: boolean;
  stroked: boolean;
  filled: boolean;
  extruded: boolean;
  wireframe: boolean;
  weight: number;
};

export type ColorRange = {
  name: string;
  type: string;
  category: string;
  colors: object[];
  reversed?: boolean;
  colorMap?: object;
  colorLegends?: object;
};

export type BaseProps = {
  /** Set the height of the icon, ex. '16px' */
  height?: string;
  /** Set the width of the icon, ex. '16px' */
  width?: string;
  /** Set the viewbox of the svg */
  viewBox?: string;
  /** Path element */

  predefinedClassName?: string;
  className?: string;
  style?: CSSProperties;
  colors?: string[];
  totalColor?: number;
} & React.SVGAttributes<SVGSVGElement> &
  React.DOMAttributes<SVGSVGElement>;

export type SidePanelProps = {
  panels: Panel[];
  sidebarComponents: object;
  uiState: object;
  visStateActions: object;
  mapStyleActions: object;
  uiStateActions: object;
  availableProviders: object;
  mapInfo: object;
};

export type Panel = {
  id: string;
  label: string;
  iconComponent: React.FC<any>;
  onClick?: null;
  component: React.FC<any>;
};
