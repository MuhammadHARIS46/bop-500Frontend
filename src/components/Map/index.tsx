import { useGetCityDataQuery } from "@/app/services/city";
import { default as defaultSettings } from "@/constants/default-settings";
import { setMap } from "@/features/bopView/bopViewSlice";
import { setCityData } from "@/features/city/citySlice";
import { RootState, useDispatch, useSelector } from "@app/store";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { injectComponents, MapControlFactory } from "kepler.gl/components";
import { Map } from "mapbox-gl";
import { useEffect } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import CustomMapControlFactory from "./KeplerFactories/CustomMapControlFactory";
import { GlobalStyle, MapContainer } from "./stylesheet";
const KeplerGl = injectComponents([
  [MapControlFactory, CustomMapControlFactory],
]);
const KeplerMap = () => {
  const dispatch = useDispatch();
  const keplerGlGetState = (state: RootState) => state.keplerGl;
  let _getMapboxRef = (mapbox: any, _: number) => {
    if (!mapbox) {
    } else {
      const map = mapbox.getMap() as Map;
      dispatch(setMap(map));
    }
  };

  //* Add Data to the Map
  const { activeCityId } = useSelector((state: RootState) => state.bopView);
  const { activeCategory } = useSelector((state: RootState) => state.cities);
  //* If No City is selected, we can skip requesting city data
  const { data } = useGetCityDataQuery(
    activeCityId && activeCategory
      ? {
          cityId: activeCityId,
          compositeId: activeCategory ? activeCategory.composite_id : 335,
        }
      : skipToken
  ) as { data: any };
  //* Temporary solution

  useEffect(() => {
    if (data) {
      dispatch(
        setCityData({
          ...data,
        })
      );
    }
  }, [data, activeCityId, activeCategory]);

  return (
    <GlobalStyle>
      <MapContainer>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <>
              <KeplerGl
                id={defaultSettings.Kepler.mapId}
                mapboxApiAccessToken={
                  defaultSettings.Kepler.mapboxApiAccessToken
                }
                /*
                 * Specify path to keplerGl state, because it is not mount at the root reducer
                 */
                getState={keplerGlGetState}
                getMapboxRef={_getMapboxRef}
                width={width}
                height={height}
              />
            </>
          )}
        </AutoSizer>
      </MapContainer>
    </GlobalStyle>
  );
};

export default KeplerMap;
