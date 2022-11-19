import { useDispatch, useSelector } from "@/app/store";
import {
  setBop500TableData,
  setLoading,
  setTotalCitiesInRegion,
} from "@/features/cities";
import { IBop500CityTYPE } from "@/types/CityType";
import { getBop500Data } from "@/utils/bop500Cities/helpers";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { default as numeral } from "numeral";
import { ChangeEvent, memo, useEffect, useState } from "react";
import Loader from "src/components/Loader";

const TableDataSubValueTypography = styled(Typography)(
  ({ theme }) => `
      font-size: ${theme.typography.pxToRem(13)};
      font-weight: 600;
`
);
const applyFilters = (cities: IBop500CityTYPE[], query: string) => {
  return cities?.filter((city) => {
    let matches = true;

    if (query) {
      const properties = ["city_name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (city[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });
};

const indicatorList = [
  "Libraries",
  "Museums",
  "Cinemas",
  "Concert Halls",
  "Opera Houses",
  "Theme Parks",
  "World Heritage Sites",
  "Startups",
  "CCI Jobs",
  "CCI He",
];

interface IProps {
  activeRegionTab: string;
}

const Bop500Table = ({ activeRegionTab }: IProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>("");
  const [selectedItems, setSelectedTableCities] = useState<number[]>([]);

  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { loading, bop500TableData } = useSelector((state) => state.cities);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllCities = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTableCities(
      event.target.checked ? bop500TableData?.map(({ city_id }) => city_id) : []
    );
  };

  const handleSelectOneCity = (
    _event: ChangeEvent<HTMLInputElement>,
    cityId: number
  ): void => {
    if (!selectedItems.includes(cityId)) {
      setSelectedTableCities((prevSelected) => [...prevSelected, cityId]);
    } else {
      setSelectedTableCities((prevSelected) =>
        prevSelected.filter((id) => id !== cityId)
      );
    }
  };

  const filteredCities: IBop500CityTYPE[] = applyFilters(
    activeRegionTab === "BOP500" || !activeRegionTab
      ? bop500TableData
      : bop500TableData.filter(
          ({ country_region }) => country_region === activeRegionTab
        ),
    query
  );
  const selectedSomeCities =
    selectedItems.length > 0 && selectedItems.length < bop500TableData?.length;
  const selectedAllCities = selectedItems.length === bop500TableData?.length;

  const fetchData = async () => {
    if (!bop500TableData?.length) {
      dispatch(setLoading(true));
      const {
        bop500data,
        totalAfricanCities,
        totalAmericasCities,
        totalAsianCities,
        totalEuropeanCities,
        totalOceaniaCities,
      } = await getBop500Data();

      dispatch(
        setTotalCitiesInRegion({
          totalCities: bop500data?.length,
          totalAfricanCities,
          totalAmericasCities,
          totalAsianCities,
          totalEuropeanCities,
          totalOceaniaCities,
        })
      );
      dispatch(setBop500TableData(bop500data || []));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <Card sx={{ width: "100%", borderRadius: "0 0 10px 10px" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ backgroundColor: "#0f1521" }}
        >
          <Box
            flex={1}
            p={2}
            display={{ xs: "block", md: "flex" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                mb: { xs: 2, md: 0 },
              }}
            >
              <TextField
                size="small"
                fullWidth={mobile}
                onChange={handleQueryChange}
                value={query}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <SearchTwoToneIcon /> */}
                    </InputAdornment>
                  ),
                }}
                placeholder={"Search by city name..."}
              />
            </Box>
          </Box>
        </Box>
        <Divider />

        {!filteredCities?.length ? (
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {"Empty"}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#0f1521" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllCities}
                        indeterminate={selectedSomeCities}
                        onChange={handleSelectAllCities}
                      />
                    </TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Population</TableCell>
                    <TableCell>Public Libraries</TableCell>
                    <TableCell>Museum</TableCell>
                    <TableCell>Cinemas</TableCell>
                    <TableCell
                      sx={{
                        minWidth: 105,
                      }}
                    >
                      Concert Halls
                    </TableCell>
                    <TableCell
                      sx={{
                        minWidth: 105,
                      }}
                    >
                      Opera Houses
                    </TableCell>
                    <TableCell
                      sx={{
                        minWidth: 105,
                      }}
                    >
                      Theme Parks
                    </TableCell>
                    <TableCell>WHS</TableCell>
                    <TableCell sx={{ minWidth: 230 }}>
                      Share of CCI-Related Startups
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontSize: (theme) => theme.typography.pxToRem(12),
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        {/* CII-related Startups | All Startups */}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 210 }}>
                      Share of CCI-Related jobs
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontSize: (theme) => theme.typography.pxToRem(12),
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        {/* CII-related Jobs | All Workforce */}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        minWidth: 250,
                      }}
                    >
                      Share of CCI-Focused Higher Education Institutions (HEI)
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontSize: (theme) => theme.typography.pxToRem(12),
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        {/* CII-related HEI | All HEI */}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#121926" }}>
                  {filteredCities?.map((city: IBop500CityTYPE) => {
                    const iscitySelected = selectedItems.includes(city.city_id);

                    return (
                      <TableRow
                        hover
                        key={city.city_id}
                        selected={iscitySelected}
                        sx={{
                          "& td": {
                            fontWeight: "600 !important",
                          },
                          "& .MuiTypography-subtitle1": {
                            fontWeight: "600 !important",
                          },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={iscitySelected}
                            onChange={(event) =>
                              handleSelectOneCity(event, city.city_id)
                            }
                            value={iscitySelected}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 210,
                          }}
                        >
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Typography variant="h5">
                                {city.city_name}
                              </Typography>
                              <Typography variant="subtitle1">
                                {city.country_name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 200,
                          }}
                        >
                          <Typography variant="h5">
                            {city.country_region}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: (theme) => theme.typography.pxToRem(12),
                            }}
                            noWrap
                          >
                            {city.country_subregion}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {numeral(city.city_population).format(`0,0`)}
                          <TableDataSubValueTypography variant="subtitle2">
                            per capita
                          </TableDataSubValueTypography>
                        </TableCell>
                        {indicatorList.map((indicator, index) => {
                          const countValue = city.cityIndicators?.find(
                            ({ indicatorName }) => indicatorName === indicator
                          )?.count;

                          return (
                            <TableCell key={`indicator-${index}`}>
                              {indicator === "Startups"
                                ? numeral(countValue).format("0")
                                : countValue}
                              <TableDataSubValueTypography variant="subtitle2">
                                {/* 80/100 */}
                              </TableDataSubValueTypography>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Card>
    </>
  );
};

export default memo(Bop500Table);
