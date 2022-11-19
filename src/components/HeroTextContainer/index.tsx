// @ts-nocheck
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import numeral from "numeral";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

import { useSelector } from "@/app/store";
import TooltipComponent from "@/components/HeroTextContainer/Tooltip";
import { ICity } from "@/types/City";
import { getIndicatorNameMapping } from "@/utils/bop500Cities/constants";
import { sortBop500DataWithCityIndicatorName } from "@/utils/bop500Cities/helpers";
import Loader from "../Loader";
import {
  HeroTextContent,
  // LinearProgressSuccess,
  TypographyPrimary,
  UnlockCityDataButton,
} from "./stylesheet";
import { default as SubcategoryComparisonComponent } from "./SubcategoryComparisonComponent";
import {
  ICategoryWiseCityIndicatorType,
  ISortedCityIndicatorType,
} from "./types";

const HeroTextContainer = () => {
  const theme = useTheme();
  const [activeCityInfo, setActiveCityInfo] = useState<ICity>();
  const [sortedBop500CityIndicatorData, setSortedBop500CityIndicatorData] =
    useState<ISortedCityIndicatorType[]>([]);
  const [_, setCategoryWiseCityIndicatorInfo] =
    useState<ICategoryWiseCityIndicatorType>();

  const {
    cities: { bop500TableData, activeSubcategoryTab, activeCategory, loading },
    isPaid,
  } = useSelector((state) => ({
    cities: state.cities,
    isPaid: state.auth.isPaid,
  }));

  const { activeIndicator } = useSelector((state) => state.city);
  const { activeCityId, selectedCities } = useSelector(
    (state) => state.bopView
  );
  useEffect(() => {
    if (
      bop500TableData?.length &&
      activeCategory?.indicator_label !== "BOP500"
    ) {
      // sub-category wise sorting
      const sortedData = sortBop500DataWithCityIndicatorName(
        bop500TableData,
        activeIndicator
      );
      // category wise sorting
      const categoryWiseSortedData = sortBop500DataWithCityIndicatorName(
        bop500TableData,
        activeCategory?.indicator_label
      );

      // Category/Subcategory wise ranking and percentage calculations
      const cityData = bop500TableData.find(
        ({ city_id }) => city_id === activeCityId
      );
      const categoryWiseIndicatorInfo = cityData?.cityIndicators?.find(
        ({ indicatorName }) =>
          indicatorName ===
          getIndicatorNameMapping(activeCategory?.indicator_label)
      );
      const categoryWiseCityRankInSortedData = categoryWiseIndicatorInfo?.count
        ? categoryWiseSortedData.findIndex(
            ({ cityName }) => cityName === cityData.city_name
          ) + 1
        : 0;
      const categoryWiseMaxCityIndicatorCount = categoryWiseSortedData.length
        ? categoryWiseSortedData[0].count
        : 0;
      const categoryWinCityIndicatorCount = categoryWiseSortedData.length
        ? categoryWiseSortedData.at(-1).count
        : 0;
      const categoryWiseMaxValue =
        categoryWiseMaxCityIndicatorCount - categoryWinCityIndicatorCount;
      // calculating the percentage value of count out of max value => what percentage of maxValue is count value
      const categoryWisePercentageValue =
        (categoryWiseIndicatorInfo?.count / categoryWiseMaxValue) * 100;
      setCategoryWiseCityIndicatorInfo({
        rank: categoryWiseCityRankInSortedData,
        percentageValue: categoryWisePercentageValue,
      });

      setSortedBop500CityIndicatorData(sortedData);
      // setActiveCityInfo(cityData);
    }
    // new
    selectedCities?.length &&
      setActiveCityInfo(
        selectedCities.find(({ city_id }) => city_id === activeCityId)
      );
  }, [
    selectedCities,
    bop500TableData,
    activeCityId,
    activeSubcategoryTab,
    activeCategory,
  ]);

  return (
    <HeroTextContent>
      <Box mb={1}>
        <TypographyPrimary
          variant="h1"
          sx={(theme) => ({
            fontSize: {
              sx: theme.typography.pxToRem(35),
              xl: theme.typography.pxToRem(50),
            },
          })}
        >
          {activeCityInfo?.city_name}
        </TypographyPrimary>
        <Box mt={{ xs: 0.2, xl: 0.5, position: "relative" }}>
          {loading && (
            <Loader circularProgressbarProps={{ size: 30, thickness: 5 }} />
          )}
          <TypographyPrimary
            fontWeight="bold"
            sx={{ color: theme.colors.secondary.dark, mr: 1 }}
            variant="caption"
            align="center"
          >
            {`POPULATION`}
          </TypographyPrimary>
          <TypographyPrimary
            fontWeight="bold"
            sx={{ color: theme.palette.grey[300] }}
            variant="caption"
            align="center"
          >
            {activeCityInfo?.city_population
              ? numeral(activeCityInfo?.city_population).format(`0,0`)
              : "---"}
          </TypographyPrimary>
        </Box>
      </Box>
      <Box
        sx={{
          width: (theme) => theme.typography.pxToRem(350),
          marginBottom: 3,
        }}
      >
        {!!selectedCities.length && (
          <List disablePadding>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mb={0.7}
            >
              <Typography
                variant="h4"
                fontWeight="normal"
                sx={{
                  color: theme.colors.alpha.trueWhite[100],
                }}
              >
                {isPaid
                  ? activeSubcategoryTab || activeCategory?.indicator_label
                  : activeCategory?.indicator_label}
                <TooltipComponent />
              </Typography>
              <Typography
                sx={{
                  fontSize: ".7rem",
                  padding: ".3rem .7rem",
                  background: "#272f50",
                  borderRadius: "100px",
                }}
              >
                By Population
              </Typography>
            </Box>
            <Divider />

            {selectedCities.map((city, idx) => {
              const cityData = bop500TableData?.find(
                ({ city_id }) => city_id === city.city_id
              );
              // Sub-Category wise ranking and percentage calculations
              const cityIndicatorInfo = cityData?.cityIndicators?.find(
                ({ indicatorName }) =>
                  indicatorName === getIndicatorNameMapping(activeIndicator)
              );
              return (
                <SubcategoryComparisonComponent
                  key={idx}
                  city={city}
                  sortedBop500CityIndicatorData={sortedBop500CityIndicatorData}
                  cityIndicatorInfo={cityIndicatorInfo}
                />
              );
            })}
          </List>
        )}
      </Box>
      {!isPaid && (
        <UnlockCityDataButton variant="contained">
          UNLOCK CITY DATA
          <Tooltip title="">
            <IconButton component="span" size="small" color="secondary">
              <InfoIcon fontSize="small" color="black" />
            </IconButton>
          </Tooltip>
        </UnlockCityDataButton>
      )}
    </HeroTextContent>
  );
};

export default HeroTextContainer;
