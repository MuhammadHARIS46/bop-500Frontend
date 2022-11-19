import { Layer } from "@/types/kepler.types";
import { layerConfigChange } from "kepler.gl/actions";
import defaultSettings from "@/constants/default-settings";

/**
 *
 * @param {string} dataId takes layer dataId as parameter
 * @param {boolean} visibilty takes true or false as parameter
 * @param {any} state takes current state as parameter
 * @returns
 */
export const toggleKeplerLayer = (dataId, visibilty, state) => {
  const mapLayers = state.layers;
  const selectedLayer = mapLayers.find((x) => x.config.dataId == dataId);
  if (selectedLayer) {
    const selectedLayerConfig = selectedLayer.config;
    selectedLayerConfig.isVisible = visibilty;
    layerConfigChange(selectedLayer, selectedLayerConfig);
  }
};

export const updateLayersVisibility = (
  visibleLayersID: string[],
  allLayers: Layer[]
) => {
  for (let layer of allLayers) {
    //ignore always visible layerIds and geojson layers for cities
    if (
      !defaultSettings.Kepler.alwaysVisibleLayerIds.includes(
        layer.config.dataId
      ) &&
      layer.config.dataId.length < 23 //check for city layers
    ) {
      const selectedLayerConfig = layer.config;
      selectedLayerConfig.isVisible = visibleLayersID.includes(
        layer.config.dataId
      );
      layerConfigChange(layer, selectedLayerConfig);
    }
  }
};

export const deleteEmptyProp = (obj: any = {}) => {
  const object = { ...obj };
  for (const key in object) {
    const element = object[key];
    if (Array.isArray(element) && element.length === 0) {
      delete obj[key];
    } else if (typeof element === "object" && !Array.isArray(element)) {
      const newElement = deleteEmptyProp({ ...element });
      obj[key] = newElement;
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (!element) {
      delete obj[key];
    }
  }
  return obj;
};

export const checkIfObjectHasKey = (key: string, object: any) => {
  if (object && key in object) {
    return object[key];
  }
  return false;
};

export function hasChildren(item: any) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}
