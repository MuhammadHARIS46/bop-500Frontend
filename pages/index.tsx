import { default as Bop500FooterContainer } from "@/components/Bop500FooterContainer";
import { default as HeaderContent } from "@/components/HeaderContent";
import { default as BaseLayout } from "@/components/layouts/BaseLayout";
import Loader from "@/components/Loader";
import { default as Hero } from "@/components/MapContainer";
import { KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";
import { useSelector } from "@app/store";
import { Box, styled, Typography } from "@mui/material";
import { useGetAllCitiesQuery } from "@services/cities";
import { default as Head } from "next/head";
import React from "react";

const HeaderWrapper = styled("div")(
  ({ theme }) => `
    margin: 0 2.2rem;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    position:absolute;
    top:0;
    z-index: 1;
  `
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
  background: ${theme.palette.common.white};
  flex: 1;
  height:100vh;
  overflow:hidden;
  display: flex;
  flex-direction: column;
  `
);

function Overview() {
  //* Getting All Bop500 Cities
  useGetAllCitiesQuery(undefined);
  const keplerState = useSelector(
    (state) => state.keplerGl[KEPLER_INSTANCE_IDS.MAP]
  );

  const { isAuthenticated, selectedCities, isLoading } = useSelector(
    (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.auth.isLoading,
      selectedCities: state.bopView.selectedCities,
    })
  );

  return (
    <OverviewWrapper>
      <Head>
        <title>Dev</title>
      </Head>
      {/* a spinner until kepler is initialized properly */}
      {!keplerState && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      )}
      {keplerState &&
        !isLoading &&
        (!selectedCities.length && !isAuthenticated ? (
          <Box
            mt={10}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            sx={{ position: "absolute", width: "100%", zIndex: 9 }}
          >
            <Typography variant="h6" fontSize={20}>
              Welcome to BOP500 City Data Explorer
            </Typography>
            <Typography variant="h6" fontSize={25} mb={2}>
              Enter Your City
            </Typography>
            <HeaderContent />
          </Box>
        ) : (
          <HeaderWrapper>
            <HeaderContent />
          </HeaderWrapper>
        ))}
      <Hero />
      {keplerState && <Bop500FooterContainer />}
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
