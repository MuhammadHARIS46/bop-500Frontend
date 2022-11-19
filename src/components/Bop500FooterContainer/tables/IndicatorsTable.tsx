import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as R from "ramda";
import { useEffect, useState } from "react";

import { useSelector } from "@/app/store";
import { KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";

const IndicatorsTable = () => {
  const {
    keplerstate,
    cities: { activeCityTab, activeSubcategoryTab },
    isPaid,
  } = useSelector((state) => ({
    cities: state.cities,
    keplerstate: state.keplerGl[KEPLER_INSTANCE_IDS.MAP],
    isPaid: state.auth.isPaid,
  }));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // TODO: needs to update naming to match with backend and also needs to fix table data
    if (isPaid && activeSubcategoryTab === "Museums") {
      const subCategoryindicatorInitial = R.split(
        " ",
        activeSubcategoryTab
      )[0].toLocaleLowerCase();
      const museumsData = R.find((data) => {
        return R.pipe(
          R.prop("label"),
          R.split("_"),
          R.nth(0),
          R.equals(subCategoryindicatorInitial)
        )(data);
      }, R.values(keplerstate?.visState?.datasets) ?? []) as any;
      const fields = museumsData?.fields;
      const filteredData = museumsData?.dataContainer?._rows?.filter(
        (rowData) =>
          rowData[
            fields.findIndex((fieldObj) => fieldObj.name === "cityId")
          ] === activeCityTab
      );
      setTableData(filteredData);
    } else {
      setTableData([]);
    }
  }, [keplerstate, activeCityTab, activeSubcategoryTab, isPaid]);

  return (
    <>
      <Card sx={{ width: "100%", borderRadius: "0 0 10px 10px" }}>
        <>
          <TableContainer>
            {isPaid && (
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#0f1521" }}>
                  <TableRow
                    sx={{
                      "& th": {
                        padding: "1rem",
                      },
                    }}
                  >
                    <TableCell>Category Name</TableCell>
                    <TableCell>All Categories</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Rank</TableCell>
                    <TableCell>Reviews Count</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                {!tableData?.length ? (
                  <TableBody sx={{ backgroundColor: "#121926" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        Empty
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody sx={{ backgroundColor: "#121926" }}>
                    {tableData?.map((indicator, index) => {
                      return (
                        <TableRow
                          hover
                          key={`${indicator[0] + index}`}
                          sx={{
                            "& td": {
                              fontWeight: "600 !important",
                            },
                            "& .MuiTypography-subtitle1": {
                              fontWeight: "600 !important",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              minWidth: 210,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <Typography variant="subtitle1">
                                {activeSubcategoryTab}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: 200,
                            }}
                          >
                            <Typography variant="h5">
                              {JSON.parse(indicator[8]).join(", ")}
                            </Typography>
                          </TableCell>
                          <TableCell>{indicator[3]}</TableCell>
                          <TableCell>{indicator[2]}</TableCell>
                          <TableCell>---</TableCell>
                          <TableCell>{indicator[5]}</TableCell>
                          <TableCell>{indicator[10]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
            )}
          </TableContainer>
        </>
      </Card>
    </>
  );
};

export default IndicatorsTable;
