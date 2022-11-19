import { useDispatch } from "@/app/store";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";

import { useSelector } from "@/app/store";

import { ICategoryFooter } from "@/types/SubCategorySmallCards";
import { setActiveCategory, setCategories } from "@features/cities";
import { BOP500FooterTabValue } from "@features/cities/initialState";

import { default as IndicatorMetaData } from "@/static/IndicatorMetadata.json";
import SubCategorySmallCards from "./smallCards/SubCategorySmallCards";
import { TabsContainerWrapper } from "./stylesheet";

function DemoOne() {
  const dispatch = useDispatch();
  const { selectedCities } = useSelector((state) => state.bopView);
  const { activeCategory, categories } = useSelector((state) => state.cities);

  // const [activeRegionTab, setActiveRegionTab] = useState("BOP500");

  // const handleRegionTabChange = (regionName: string) => {
  //   setActiveRegionTab(regionName);
  // };

  // sets active category tab (BOP500, Cultural Facilities, etc.)
  const handleCategoryTabsChange = (_, value: ICategoryFooter) => {
    dispatch(setActiveCategory(value));
  };

  // const showCulturalFacilities = () => {
  //   updateLayersVisibility(
  //   //   [
  //   //     KEPLER_LAYER_DATA_IDS.MUSEUMS,
  //   //     KEPLER_LAYER_DATA_IDS.MOVIE_THEATRES,
  //   //     KEPLER_LAYER_DATA_IDS.PUBLIC_LIBRARIES,
  //   //     KEPLER_LAYER_DATA_IDS.OPERA_HOUSE,
  //   //     KEPLER_LAYER_DATA_IDS.CONCERT_HALL,
  //   //     KEPLER_LAYER_DATA_IDS.THEME_PARKS,
  //   //     KEPLER_LAYER_DATA_IDS.WORLD_HERITAGE_SITES,
  //   //   ],
  //   //   visState.layers
  //   // );
  // };
  useEffect(() => {
    selectedCities.length === 1 &&
      //@ts-ignore
      dispatch(setActiveCategory(IndicatorMetaData[0]));
  }, [selectedCities]);

  useEffect(() => {
    //@ts-ignore
    if (activeCategory?.indicator_label === "Cultural Facilities") {
      // showCulturalFacilities();
    }
    //@ts-ignore
    dispatch(setCategories(IndicatorMetaData));
  }, [activeCategory, setActiveCategory, IndicatorMetaData]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "calc(100vh - 184px)",
        width: { xs: "99.5%", xl: "99%" },
        ml: { xs: "0.25%", xl: ".5%" },
      }}
    >
      {!!selectedCities.length && (
        <>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
            }}
          >
            <TabsContainerWrapper>
              <Tabs
                onChange={handleCategoryTabsChange}
                value={activeCategory}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& button": {
                    background:
                      "linear-gradient(to bottom, #08101d, #0f2633 99%) !important",
                    border: "1px solid rgba(203, 204, 210, 0.1)",
                  },
                }}
              >
                <Tab label="BOP500 | City Index" value={BOP500FooterTabValue} />

                {categories.map((category) => (
                  <Tab
                    key={category.composite_id}
                    //@ts-ignore
                    label={`${category.indicator_label}`}
                    value={category}
                    onClick={() => {
                      // TODO:
                      // showCulturalFacilities();
                    }}
                  />
                ))}
              </Tabs>
            </TabsContainerWrapper>

            <Card
              variant="outlined"
              sx={{
                position: "relative",
                background: "linear-gradient(to bottom, #08101d, #0f2633 99%)",
                borderRadius: "9px 9px 0 0",
              }}
            >
              <SubCategorySmallCards activeCategory={activeCategory} />
              {/* {activeCategory?.name === "BOP500" && (
                <Bop500SmallCards
                  activeRegionTab={activeRegionTab}
                  handleRegionTabChange={handleRegionTabChange}
                />
              )} */}
            </Card>
          </Box>
          {/* <Card
            variant="outlined"
            sx={{
              position: "relative",
              mt: { xs: "11.65rem", xl: "11.5rem" },
              zIndex: (theme) => theme.zIndex.appBar,
              borderRadius: "0 0 9px 9px",
              mb: 2,
            }}
          >
            {activeCategory?.name === "BOP500" ? (
              <Bop500Table activeRegionTab={activeRegionTab} />
            ) : (
              <IndicatorsTable />
            )}
          </Card> */}
        </>
      )}
    </Box>
  );
}

export default DemoOne;
