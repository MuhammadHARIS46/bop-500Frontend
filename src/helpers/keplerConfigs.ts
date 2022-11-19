import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";

export const cityDotsConfig = (keplerDataType: KEPLER_DATASET_TYPE) => ({
  version: "v1",
  config: {
    visState: {
      filters: [],
      layers: [
        {
          id: keplerDataType,
          type: "point",
          config: {
            dataId: keplerDataType,
            label: "Bop500 Index",
            color: [246, 209, 138],
            highlightColor: [252, 242, 26, 255],
            columns: {
              lat: "city_latitude",
              lng: "city_longitude",
              altitude: null,
            },
            isVisible: true,
            visConfig: {
              radius: 13.6,
              fixedRadius: false,
              opacity: 0.12,
              outline: true,
              thickness: 7.8,
              strokeColor: null,
              colorRange: {
                name: "Custom Palette",
                type: "custom",
                category: "Custom",
                colors: ["#F9E200"],
              },
              strokeColorRange: {
                name: "Ice And Fire",
                type: "diverging",
                category: "Uber",
                colors: [
                  "#0198BD",
                  "#49E3CE",
                  "#E8FEB5",
                  "#FEEDB1",
                  "#FEAD54",
                  "#D50255",
                ],
              },
              radiusRange: [0, 50],
              filled: false,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: "start",
                alignment: "center",
              },
            ],
          },
          visualChannels: {
            colorField: {
              name: "country_id",
              type: "string",
            },
            colorScale: "ordinal",
            strokeColorField: {
              name: "country_id",
              type: "string",
            },
            strokeColorScale: "ordinal",
            sizeField: null,
            sizeScale: "linear",
          },
        },
        {
          id: "stlijds",
          type: "point",
          config: {
            dataId: keplerDataType,
            label: "City Dot",
            color: [246, 209, 138],
            highlightColor: [252, 242, 26, 255],
            columns: {
              lat: "city_latitude",
              lng: "city_longitude",
              altitude: null,
            },
            isVisible: true,
            visConfig: {
              radius: 5.8,
              fixedRadius: false,
              opacity: 1,
              outline: true,
              thickness: 2,
              strokeColor: [253, 236, 0],
              colorRange: {
                name: "Custom Palette",
                type: "custom",
                category: "Custom",
                colors: ["#F9E200"],
              },
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              radiusRange: [0, 50],
              filled: true,
            },
            hidden: false,
            textLabel: [],
          },
          visualChannels: {
            colorField: null,
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: null,
            sizeScale: "linear",
          },
        },
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            [keplerDataType]: [
              {
                name: "city_id",
                format: null,
              },
              {
                name: "city_name",
                format: null,
              },
              {
                name: "country_name",
                format: null,
              },
              {
                name: "city_latitude",
                format: null,
              },
              {
                name: "city_longitude",
                format: null,
              },
              {
                name: "city_administrative_level",
                format: null,
              },
              {
                name: "state_code",
                format: null,
              },
              {
                name: "country_iso2",
                format: null,
              },
              {
                name: "state_name",
                format: null,
              },
            ],
          },
          compareMode: false,
          compareType: "absolute",
          enabled: true,
        },
        brush: {
          size: 0.5,
          enabled: false,
        },
        geocoder: {
          enabled: false,
        },
        coordinate: {
          enabled: false,
        },
      },
      layerBlending: "normal",
      splitMaps: [],
      animationConfig: {
        currentTime: null,
        speed: 1,
      },
    },
  },
});

export const freeCityDataConfig = (
  label: string,
  dataId: string,
  layerId: string
) => ({
  version: "v1",
  config: {
    mapStyle: {},
    mapState: {},
    visState: {
      layers: [
        {
          label,
          id: layerId,
          type: "point",
          config: {
            dataId: dataId,
            label: "Cultural Facilities",
            color: [26, 23, 36],
            highlightColor: [252, 242, 26, 255],
            columns: {
              lat: "address_latitude",
              lng: "address_longitude",
              altitude: null,
            },
            isVisible: true,
            visConfig: {
              radius: 7.8,
              fixedRadius: false,
              opacity: 1,
              outline: true,
              thickness: 0.5,
              strokeColor: [232, 250, 250],
              colorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              radiusRange: [0, 50],
              filled: false,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: "start",
                alignment: "center",
              },
            ],
          },
          visualChannels: {
            colorField: null,
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: null,
            sizeScale: "linear",
          },
        },
      ],
    },
  },
});

export const outerBoundaryConfig = (
  label: string,
  dataId: string,
  layerId: string
) => ({
  version: "v1",
  config: {
    visState: {
      layers: [
        {
          id: layerId,
          type: "geojson",
          config: {
            dataId: dataId,
            label: label,
            color: [26, 23, 36],
            highlightColor: [252, 242, 26, 255],
            columns: {
              geojson: "_geojson",
            },
            isVisible: true,
            visConfig: {
              opacity: 0.1,
              strokeOpacity: 0.8,
              thickness: 0.7,
              strokeColor: [16, 129, 136],
              colorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#5A1846",
                  "#900C3F",
                  "#C70039",
                  "#E3611C",
                  "#F1920E",
                  "#FFC300",
                ],
              },
              radius: 10,
              sizeRange: [0, 10],
              radiusRange: [0, 50],
              heightRange: [0, 500],
              elevationScale: 5,
              enableElevationZoomFactor: true,
              stroked: true,
              filled: false,
              enable3d: false,
              wireframe: false,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: "start",
                alignment: "center",
              },
            ],
          },
          visualChannels: {
            colorField: null,
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: null,
            sizeScale: "linear",
            heightField: null,
            heightScale: "linear",
            radiusField: null,
            radiusScale: "linear",
          },
        },
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            [dataId]: [
              {
                name: "name",
                format: null,
              },
              {
                name: "admin_level",
                format: null,
              },
              {
                name: "boundary",
                format: null,
              },
              {
                name: "wikidata",
                format: null,
              },
            ],
          },
          compareMode: false,
          compareType: "absolute",
          enabled: true,
        },
        brush: {
          size: 0.5,
          enabled: false,
        },
        geocoder: {
          enabled: false,
        },
        coordinate: {
          enabled: false,
        },
      },
    },
  },
});

export const paidCityDataConfig = ({
  type,
  cityId,
  date,
}: {
  type: KEPLER_DATASET_TYPE;
  cityId: number;
  date: number;
}) => {
  return {
    version: "v1",
    config: {
      visState: {
        filters: [
          {
            dataId: [`${type}_${cityId}_Museums`],
            id: `${cityId}_Museums`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
          {
            dataId: [`${type}_${cityId}_Theme Parks`],
            id: `${cityId}_Theme Parks`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
          {
            dataId: [`${type}_${cityId}_Cinemas`],
            id: `${cityId}_Cinemas`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
          {
            dataId: [`${type}_${cityId}_Libraries`],
            id: `${cityId}_Libraries`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
          {
            dataId: [`${type}_${cityId}_Opera Houses`],
            id: `${cityId}_Opera Houses`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
          {
            dataId: [`${type}_${cityId}_Concert Halls`],
            id: `${cityId}_Concert Halls`,
            name: ["category_name_en"],
            type: "multiSelect",
            value: [],
            enlarged: false,
            plotType: "histogram",
            animationWindow: "free",
            yAxis: null,
            speed: 1,
          },
        ],
        layers: [
          {
            id: `${type}_${cityId}_CCI He_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_CCI He`,
              label: `${type}_${cityId}_CCI He_${date}`,
              color: [166, 143, 126],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 12.1,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
          },
          {
            id: `${type}_${cityId}_CCI Jobs_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_CCI Jobs`,
              label: `${type}_${cityId}_CCI Jobs_${date}`,
              color: [195, 40, 153],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "city_latitude",
                lng: "city_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 18.8,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: null,
              colorScale: "quantile",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Startups_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Startups`,
              label: `${type}_${cityId}_Startups_${date}`,
              color: [136, 87, 44],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 6.5,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#b23ffd", "#4daf4a"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "startup_cci_related",
                type: "integer",
              },
              colorScale: "quantile",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_World Heritage Sites_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_World Heritage Sites`,
              label: `${type}_${cityId}_World Heritage Sites_${date}`,
              color: [231, 159, 213],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 12.3,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#fcc0d3", "#fa9fcf"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Museums_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Museums`,
              label: `${type}_${cityId}_Museums_${date}`,
              color: [136, 87, 44],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 5.2,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#F1920E", "#FFC300"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Cinemas_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Cinemas`,
              label: `${type}_${cityId}_Cinemas_${date}`,
              color: [197, 21, 74],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 5.8,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: [218, 0, 0],
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#BD0143", "#D50255"],
                },
                strokeColorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#D50255", "#BD0143 "],
                  reversed: true,
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: null,
              colorScale: "quantile",
              strokeColorField: {
                name: "category_name_en",
                type: "string",
              },
              strokeColorScale: "ordinal",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Libraries_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Libraries`,
              label: `${type}_${cityId}_Libraries_${date}`,
              color: [130, 154, 227],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 8.4,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#75BBC1", "#4BA7AF", "#00939C"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Concert Halls_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Concert Halls`,
              label: `${type}_${cityId}_Concert Halls_${date}`,
              color: [23, 184, 190],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 14.3,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "ColorBrewer Greys-3",
                  type: "singlehue",
                  category: "ColorBrewer",
                  colors: ["#f0f0f0", "#bdbdbd", "#636363"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Theme Parks_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Theme Parks`,
              label: `${type}_${cityId}_Theme Parks_${date}`,
              color: [179, 173, 158],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 15.6,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#addd8e", "#78c679", "#31a354"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
          {
            id: `${type}_${cityId}_Opera Houses_${date}`,
            type: "point",
            config: {
              dataId: `${type}_${cityId}_Opera Houses`,
              label: `${type}_${cityId}_Opera Houses_${date}`,
              color: [179, 173, 158],
              highlightColor: [252, 242, 26, 255],
              columns: {
                lat: "address_latitude",
                lng: "address_longitude",
                altitude: null,
              },
              isVisible: true,
              visConfig: {
                radius: 13,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                strokeColor: null,
                colorRange: {
                  name: "Custom Palette",
                  type: "custom",
                  category: "Custom",
                  colors: ["#E6FAFA", "#AAD7DA"],
                },
                strokeColorRange: {
                  name: "Global Warming",
                  type: "sequential",
                  category: "Uber",
                  colors: [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300",
                  ],
                },
                radiusRange: [0, 50],
                filled: true,
              },
              hidden: false,
              textLabel: [
                {
                  field: null,
                  color: [255, 255, 255],
                  size: 18,
                  offset: [0, 0],
                  anchor: "start",
                  alignment: "center",
                },
              ],
            },
            visualChannels: {
              colorField: {
                name: "category_name_en",
                type: "string",
              },
              colorScale: "ordinal",
              strokeColorField: null,
              strokeColorScale: "quantile",
              sizeField: null,
              sizeScale: "linear",
            },
          },
        ],
        interactionConfig: {
          tooltip: {
            fieldsToShow: {
              [`${type}_${cityId}_CCI He`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "whds_cci_fields_of_study",
                  format: null,
                },
                {
                  name: "whds_number_of_subjects",
                  format: null,
                },
                {
                  name: "whds_cci_number_of_related_subjects",
                  format: null,
                },
                {
                  name: "whds_cci_%_fields_of_study",
                  format: null,
                },
              ],
              [`${type}_${cityId}_CCI Jobs`]: [
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "state_name",
                  format: null,
                },
                {
                  name: "country_name",
                  format: null,
                },
                {
                  name: "cci_jobs_percentage",
                  format: null,
                },
                {
                  name: "cci_jobs_value",
                  format: null,
                },
                {
                  name: "cci_jobs_year",
                  format: null,
                },
                {
                  name: "cci_workforce_value",
                  format: null,
                },
                {
                  name: "cci_workforce_year",
                  format: null,
                },
                {
                  name: "data_level",
                  format: null,
                },
                {
                  name: "cityId",
                  format: null,
                },
                {
                  name: "city_latitude",
                  format: null,
                },
                {
                  name: "city_longitude",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Startups`]: [
                {
                  name: "startup_cci_related",
                  format: null,
                },
                {
                  name: "startup_5years",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
              ],
              [`${type}_${cityId}_World Heritage Sites`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "country_name",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Museums`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "categories",
                  format: null,
                },
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "reviewsCount",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Cinemas`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "categories",
                  format: null,
                },
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "state_name",
                  format: null,
                },
                {
                  name: "reviewsCount",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Libraries`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "categories",
                  format: null,
                },
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "state_name",
                  format: null,
                },
                {
                  name: "reviewsCount",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Concert Halls`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "categories",
                  format: null,
                },
                {
                  name: "cityName",
                  format: null,
                },
                {
                  name: "state_name",
                  format: null,
                },
                {
                  name: "reviewsCount",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Theme Parks`]: [
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "city_name_district",
                  format: null,
                },
                {
                  name: "cityName_district",
                  format: null,
                },
              ],
              [`${type}_${cityId}_Opera Houses`]: [
                {
                  name: "name_en",
                  format: null,
                },
                {
                  name: "category_name_en",
                  format: null,
                },
                {
                  name: "categories",
                  format: null,
                },
                {
                  name: "city_name",
                  format: null,
                },
                {
                  name: "state_name",
                  format: null,
                },
                {
                  name: "reviewsCount",
                  format: null,
                },
              ],
            },
            compareMode: false,
            compareType: "absolute",
            enabled: true,
          },
          brush: {
            size: 0.5,
            enabled: false,
          },
          geocoder: {
            enabled: false,
          },
          coordinate: {
            enabled: false,
          },
        },
        layerBlending: "normal",
        splitMaps: [],
        animationConfig: {
          currentTime: null,
          speed: 1,
        },
      },
    },
  };
};
