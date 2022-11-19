import { useGetCityDataQuery } from "@/app/services/city";
import { useSelector } from "@/app/store";
import { ICityIndicatorType, ICityType } from "@/types/CityType";
import { getColorCode } from "@/utils/bop500Cities/cityIndicatorColorCodes";
import { Box, ListItemText, Typography, useTheme } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { memo, useCallback, useEffect, useState } from "react";
// import { getCityIndicatorCountPercentageValue } from "./helper";
import { LinearProgressSuccess, ListItemButtonWrapper } from "./stylesheet";
import { ISortedCityIndicatorType } from "./types";

interface IProps {
  city: ICityType;
  cityIndicatorInfo: ICityIndicatorType;
  sortedBop500CityIndicatorData: ISortedCityIndicatorType[];
}
const SubcategoryComparisonComponent = ({
  city,
  cityIndicatorInfo,
  sortedBop500CityIndicatorData,
}: IProps) => {
  const theme = useTheme();
  const [cityRank, setCityRank] = useState<number>();

  //* Get Categories based on the active city
  //* Indicator Data ( Categories )
  // const [indicatorData, setIndicatorData] = useState<IndicatorData[]>([]);

  //* If No City is selected, we can skip requesting the categories
  //* data will be undefined if no city is active

  const { isPaid, activeCategory, activeSubcategoryTab } = useSelector(
    (state) => ({
      isPaid: state.auth.isPaid,
      activeCategory: state.cities.activeCategory,
      activeSubcategoryTab: state.cities.activeSubcategoryTab,
    })
  );

  const { data } = useGetCityDataQuery(
    city.city_id && activeCategory
      ? {
          cityId: city.city_id,
          compositeId: activeCategory ? activeCategory.composite_id : 335,
        }
      : skipToken
  );
  const [indicatorCounts, setIndicatorCounts] = useState<any[]>([]);
  const [compositeCount, setCompositeCount] = useState(0);
  useEffect(() => {
    let _indicatorCounts = [];
    if (data && data.data.cityInformation) {
      setCompositeCount(
        data.data.cityInformation.composite_normalized_count_percentage
      );
    }
    if (data) {
      data.data.IndicatorsData.forEach((indicator) => {
        _indicatorCounts.push({
          indicatorName: indicator.IndicatorName,
          count: indicator.totalCount,
        });
      });
      setIndicatorCounts(_indicatorCounts);
    } else {
      setIndicatorCounts([]);
    }
  }, [data, city.city_id, activeCategory]);

  const getCityRank = useCallback(
    () =>
      cityIndicatorInfo?.count
        ? sortedBop500CityIndicatorData.findIndex(
            ({ cityName }) => cityName === city.city_name
          ) + 1
        : 0,
    [city]
  );

  // TODO: needs to update later
  const getIndicatorPercentage = () => {
    const subCategoryInfo = activeCategory?.sub_indicators.find(
      ({ indicator_label }) => indicator_label === activeSubcategoryTab
    );
    const count =
      indicatorCounts.filter(
        (indicator) =>
          indicator.indicatorName === subCategoryInfo?.indicator_name_api
      )[0]?.count || 0;

    return (
      // TODO: replace indicator_mean_average with indicator count value
      (count /
        (subCategoryInfo?.indicator_count_high -
          subCategoryInfo?.indicator_count_low)) *
      100
    );
  };

  const getActiveCategoryPercentageValue = () => {
    return (
      // TODO: replace indicator_mean_average with composite count value of city
      (compositeCount /
        (activeCategory?.indicator_count_high -
          activeCategory?.indicator_count_low)) *
      100
    );
  };

  useEffect(() => {
    setCityRank(getCityRank());
  }, [city, cityIndicatorInfo, sortedBop500CityIndicatorData]);

  return (
    <ListItemButtonWrapper
      sx={{
        display: { xs: "block", sm: "flex" },
        p: { xs: 0, xl: 0.5 },
        mt: 0.7,
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" mb={0.5}>
              <Typography
                color="text.primary"
                variant="h5"
                sx={{
                  fontSize: theme.typography.pxToRem(12),
                }}
              >
                {city.city_name}
              </Typography>
              <Typography
                color={isPaid ? "text.primary" : "text.gray"}
                fontWeight="bold"
                variant="h4"
                sx={{
                  ml: 1,
                  color: theme.colors.secondary.dark,
                  fontSize: theme.typography.pxToRem(12),
                }}
              >
                {isPaid ? cityIndicatorInfo?.count : ""}
              </Typography>
            </Box>
            {
              <Typography
                variant="body2"
                sx={{
                  color: theme.colors.secondary.dark,
                  fontWeight: 600,
                  fontSize: theme.typography.pxToRem(11),
                }}
              >
                {/* TODO: city rank value goes here , for L1-> based composite ranking only, for L2-> based on composite ranking if indicator is not selected otherwise indicator wise*/}
                {`Rank ${cityRank}`}
              </Typography>
            }
          </Box>
        }
        secondary={
          <>
            <LinearProgressSuccess
              variant="determinate"
              value={
                isPaid && activeSubcategoryTab
                  ? getIndicatorPercentage()
                  : // getCityIndicatorCountPercentageValue(
                    //     sortedBop500CityIndicatorData,
                    //     cityIndicatorInfo?.count
                    //   )
                    getActiveCategoryPercentageValue()
              }
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    isPaid && activeSubcategoryTab
                      ? getColorCode(activeSubcategoryTab, isPaid)
                      : theme.colors.info.main,
                },
              }}
            />
          </>
        }
      />
    </ListItemButtonWrapper>
  );
};

export default memo(SubcategoryComparisonComponent);
