// @ts-nocheck
import { useGetCityDataQuery } from "@/app/services/city";
import { TooltipTitleContainer } from "@/components/Bop500FooterContainer/SmallCardTooltipTitleContainer";
import CircularProgressCard from "@/components/CircularProgressCard";
import { KEPLER_DATASET_TYPE, KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";
import { ICategoryFooter } from "@/types/SubCategorySmallCards";
import { getColorCode } from "@/utils/bop500Cities/cityIndicatorColorCodes";
import { RootState, useDispatch, useSelector } from "@app/store";
import { setActiveSubcategoryTab } from "@features/cities";
import { Grid } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { layerConfigChange } from "kepler.gl/actions";
import { memo, useCallback, useEffect, useState } from "react";

const SubCategorySmallCards = ({
  activeCategory,
}: {
  activeCategory: ICategoryFooter;
}) => {
  const { activeCityTab, activeSubcategoryTab, selectedCities } = useSelector(
    (state) => state.cities
  );

  //* Get Categories based on the active city
  const { activeCityId } = useSelector((state: RootState) => state.bopView);
  //* Indicator Data ( Categories )
  // const [indicatorData, setIndicatorData] = useState<IndicatorData[]>([]);

  //* If No City is selected, we can skip requesting the categories
  //* data will be undefined if no city is active

  const { data } = useGetCityDataQuery(
    activeCategory && activeCityId
      ? {
          cityId: activeCityId,
          compositeId: activeCategory ? activeCategory.composite_id : 335,
        }
      : skipToken
  );

  const { isPaid, visState } = useSelector((state) => ({
    visState: state.keplerGl[KEPLER_INSTANCE_IDS.MAP].visState,
    isPaid: state.auth.isPaid,
  }));
  const dispatch = useDispatch();

  const [indicatorCounts, setIndicatorCounts] = useState<any[]>([]);

  useEffect(() => {
    let _indicatorCounts = [];
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
  }, [data, isPaid, activeCityId, activeCategory]);

  return (
    <Grid
      container
      p={2}
      sx={{
        flexWrap: "nowrap",
        overflowX: "scroll",
      }}
    >
      {activeCategory?.sub_indicators?.map((subCategory) => (
        <Grid
          item
          xs={6}
          md={4}
          lg={3}
          key={subCategory.id}
          sx={{
            paddingRight: { xs: "0.5rem", xxl: "1rem" },
            maxWidth: "20rem !important",
          }}
          onMouseEnter={() => {
            if (!isPaid) return;

            dispatch(setActiveSubcategoryTab(subCategory.indicator_name_api));
            const layers = visState.layers;
            const layersToHide = layers.filter((layer) => {
              if (layer.config.dataId.includes(subCategory.indicator_name_api))
                return false;
              return (
                layer.config.dataId.includes(
                  `${KEPLER_DATASET_TYPE.FREE_DATA}_${activeCityId}`
                ) ||
                layer.config.dataId.includes(
                  `${KEPLER_DATASET_TYPE.PAID_DATA}_${activeCityId}`
                )
              );
            });
            //* Hiding layers
            layersToHide.forEach((layer) => {
              dispatch(
                layerConfigChange(layer, {
                  ...layer.config,
                  isVisible: false,
                })
              );
            });
          }}
          onMouseLeave={() => {
            if (!isPaid) return;
            dispatch(setActiveSubcategoryTab(""));
            const layers = visState.layers;
            const layersToHide = layers.filter((layer) => {
              return (
                layer.config.dataId.includes(
                  `${KEPLER_DATASET_TYPE.FREE_DATA}_${activeCityId}`
                ) ||
                layer.config.dataId.includes(
                  `${KEPLER_DATASET_TYPE.PAID_DATA}_${activeCityId}`
                )
              );
            });
            //* Show layers
            layersToHide.forEach((layer) => {
              dispatch(
                layerConfigChange(layer, {
                  ...layer.config,
                  isVisible: true,
                })
              );
            });
          }}
        >
          <CircularProgressCard
            title={subCategory.indicator_label}
            progressbarValue={
              isPaid &&
              indicatorCounts.some((indicator) => {
                return (
                  indicator.indicatorName === subCategory.indicator_name_api
                );
              })
                ? (indicatorCounts.filter((indicator) => {
                    return (
                      indicator.indicatorName === subCategory.indicator_name_api
                    );
                  })[0].count /
                    (subCategory.indicator_count_high -
                      subCategory.indicator_count_low)) *
                  100
                : 100
            }
            value={
              isPaid
                ? indicatorCounts.some((indicator) => {
                    return (
                      indicator.indicatorName === subCategory.indicator_name_api
                    );
                  })
                  ? indicatorCounts.filter((indicator) => {
                      return (
                        indicator.indicatorName ===
                        subCategory.indicator_name_api
                      );
                    })[0].count
                  : 0
                : "Unlock full city data set"
            }
            valueColor={isPaid ? "" : "#44caf7"}
            icon="Up"
            onClick={() => {}}
            isActive={activeSubcategoryTab === subCategory.indicator_name_api}
            linearProgressColor={getColorCode(
              subCategory.indicator_label,
              isPaid
            )}
            tooltipTitle={
              <TooltipTitleContainer
                buttonType="ReadMore"
                category={activeCategory?.indicator_label}
                title={""}
                description={""}
              />
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(SubCategorySmallCards);
