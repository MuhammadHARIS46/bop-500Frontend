import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { BopDataset } from "@/types/BopDatasets";
import { ICity } from "@/types/City";
import { processGeojson, processRowObject } from "kepler.gl/processors";
import {
  cityDotsConfig,
  freeCityDataConfig,
  outerBoundaryConfig,
  paidCityDataConfig,
} from "./keplerConfigs";

export const prepareData = (bopData: BopDataset, selectedCity: ICity) => {
  let date = Date.now();
  let datasets = [];
  let config = {};
  bopData = JSON.parse(JSON.stringify(bopData));
  switch (bopData.type) {
    case KEPLER_DATASET_TYPE.CITIES_DOTS: {
      const processedData = processRowObject(bopData.data);
      datasets.push({
        info: {
          label: bopData.type,
          id: bopData.type, // dataId
        },
        data: processedData,
      });
      config = cityDotsConfig(bopData.type);
      break;
    }
    case KEPLER_DATASET_TYPE.FREE_DATA: {
      const processedData = processRowObject(bopData.data.IndicatorsData);
      datasets.push({
        info: {
          label: `${bopData.type}_${bopData.data.city_id}`,
          id: `${bopData.type}_${bopData.data.city_id}`,
        },
        data: processedData,
      });
      config = freeCityDataConfig(
        `${bopData.type}_${bopData.data.city_id}_${date}`,
        `${bopData.type}_${bopData.data.city_id}`,
        `${bopData.type}_${bopData.data.city_id}_${date}`
      );
      break;
    }
    case KEPLER_DATASET_TYPE.CITY_BOUNDARY: {
      const processedData = processGeojson(bopData.data);
      datasets.push({
        info: {
          label: `${bopData.type}_${bopData.data.city_id}`,
          id: `${bopData.type}_${bopData.data.city_id}`,
        },
        data: processedData,
      });
      config = outerBoundaryConfig(
        `${bopData.type}_${bopData.data.city_id}_${date}`,
        `${bopData.type}_${bopData.data.city_id}`,
        `${bopData.type}_${bopData.data.city_id}_${date}`
      );

      break;
    }
    case KEPLER_DATASET_TYPE.PAID_DATA: {
      for (let indicatorData of bopData.data.IndicatorsData) {
        //* Get All Data
        let data = [];
        for (let indicatorInfo of indicatorData.indicatorData) {
          data.push(...indicatorInfo.categoryData);
        }
        const processedData = processRowObject(data);
        datasets.push({
          info: {
            label: `${bopData.type}_${bopData.data.city_id}_${indicatorData.IndicatorName}`,
            id: `${bopData.type}_${bopData.data.city_id}_${indicatorData.IndicatorName}`,
          },
          data: processedData,
        });
      }
      config = paidCityDataConfig({
        type: bopData.type,
        cityId: bopData.data.city_id,
        date: date,
      });

      break;
    }
  }
  return {
    datasets,
    options: {
      centerMap:
        bopData.type === KEPLER_DATASET_TYPE.CITY_BOUNDARY &&
        !(
          selectedCity &&
          selectedCity?.zoom_latitude &&
          selectedCity?.zoom_longitude
        ),
      keepExistingConfig: true,
    },
    config,
  };
};
