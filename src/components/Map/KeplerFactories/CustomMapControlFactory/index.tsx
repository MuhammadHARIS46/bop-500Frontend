import { useGetCityDataQuery } from "@/app/services/city";
import { RootState, useSelector } from "@/app/store";
import ProfileSettingComponent from "@/components/user/ProfileSettingComponent";
import { Box, Divider, Grow } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { MapControlFactory, withState } from "kepler.gl/components";
import { uiStateLens, visStateLens } from "kepler.gl/reducers";
import React, { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import IndicatorListing from "./IndicatorListing";
import MenuButtonsContainer from "./MenuButtonsContainer";
import {
  MenuContent,
  MenuContentBottom,
  StyledMapControlOverlay,
} from "./stylesheet";

CustomMapControlFactory.deps = MapControlFactory.deps;

export enum MenuTypes {
  "CART" = "CART",
  "INDICATORS" = "INDICATORS",
  "C" = "C",
  "D" = "D",
  "E" = "E",
  "F" = "F",
}

const IndicatorName = {
  Museums: "Museums",
  "Theme Parks": "Theme Parks",
  Cinemas: "Cinemas",
  Libraries: "Libraries",
  "Opera Houses": "Opera Houses",
  "Concert Halls": "Concert Halls",
};

export interface IndicatorSubListItem {
  name: string;
  count: number;
}

interface IndicatorData {
  label: string;
  subList: IndicatorSubListItem[];
}

function CustomMapControlFactory() {
  const CustomMapControl = () => {
    //* Get Categories based on the active city
    const { activeCityId } = useSelector((state: RootState) => state.bopView);
    //* Indicator Data ( Categories )
    const [indicatorData, setIndicatorData] = useState<IndicatorData[]>([]);

    //* If No City is selected, we can skip requesting the categories
    //* data will be undefined if no city is active
    const { data } = useGetCityDataQuery(
      activeCityId
        ? {
            cityId: activeCityId,
            compositeId: 335,
          }
        : skipToken
    ) as { data: any };

    useEffect(() => {
      let categories = [];

      //* When the data changes, update the categories
      if (data) {
        if (!data.data.categories) {
          data.data.IndicatorsData.forEach((indicator) => {
            let subList = [];
            for (let indicatorDetails of indicator.indicatorData) {
              subList.push({
                name: indicatorDetails.category_name_en,
                count: indicatorDetails.count,
              });
            }
            categories.push({
              label: IndicatorName[indicator.IndicatorName],
              subList,
            });
          });
        } else {
          for (const [key, value] of Object.entries(
            data.data.categories as { string: string[] }
          )) {
            categories.push({
              label: IndicatorName[key],
              subList: value.map((category_name) => ({
                name: category_name,
                count: undefined,
              })),
            });
          }
        }
        setIndicatorData(categories);
      } else {
        // if data is undefined, set IndicatorData to empty array
        setIndicatorData([]);
      }
    }, [data, activeCityId]);

    const [activeMenu, setActiveMenu] = useState<MenuTypes>(
      MenuTypes.INDICATORS
    );

    const [activeIndicatorMenu, setActiveIndicatorMenu] = useState("Museums");

    const toggleIndicatorSubMenu = (indicatorName: string) =>
      activeIndicatorMenu === indicatorName
        ? setActiveIndicatorMenu("")
        : setActiveIndicatorMenu(indicatorName);

    // toggle side menu buttons
    const toggleMenu = (menuName: MenuTypes) => {
      menuName === activeMenu
        ? setActiveMenu(undefined)
        : setActiveMenu(menuName);
    };

    const { selectedCities } = useSelector((state) => state.bopView);
    return (
      !!selectedCities.length && (
        <StyledMapControlOverlay>
          <Box display="flex">
            {!!activeMenu && (
              <Grow
                in={!!activeMenu}
                style={{ transformOrigin: "0 0 0" }}
                {...(!!activeMenu ? { timeout: 1000 } : {})}
              >
                <MenuContent>
                  <ProfileSettingComponent />
                  <MenuContentBottom>
                    {activeMenu === MenuTypes.INDICATORS && (
                      <IndicatorListing
                        indicatorDataList={indicatorData}
                        toggleIndicatorSubMenu={toggleIndicatorSubMenu}
                        activeIndicatorMenu={activeIndicatorMenu}
                      />
                    )}
                    {activeMenu !== MenuTypes.INDICATORS && <CartContainer />}
                  </MenuContentBottom>
                  <Divider />
                  {/* <Box
                    className="paid-toggle-buttons"
                    display="flex"
                    justifyContent="center"
                  >
                    <Button
                      size="small"
                      className={clsx({ active: isPaid === false })}
                      onClick={() => {
                        dispatch(
                          setToken(process.env.NEXT_PUBLIC_TOKEN_LEVEL_1)
                        );
                        dispatch(setPaid(false));
                      }}
                      sx={{ mr: 1 }}
                    >
                      L1
                    </Button>
                    <Button
                      size="small"
                      className={clsx({ active: isPaid })}
                      onClick={() => {
                        dispatch(
                          setToken(process.env.NEXT_PUBLIC_TOKEN_LEVEL_2)
                        );
                        dispatch(setPaid(true));
                      }}
                    >
                      L2
                    </Button>
                  </Box> */}
                </MenuContent>
              </Grow>
            )}

            <MenuButtonsContainer
              onClick={toggleMenu}
              activeMenu={activeMenu}
            />
          </Box>
        </StyledMapControlOverlay>
      )
    );
  };

  return withState(
    // lenses
    [visStateLens, uiStateLens],
    // mapStateToProps
    (state) => ({ keplerInternalState: state.keplerGl.foo }),
    //actions
    {}
  )(CustomMapControl);
}

export default CustomMapControlFactory;
